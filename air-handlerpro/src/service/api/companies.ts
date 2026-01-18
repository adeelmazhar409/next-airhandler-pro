// Companies data endpoints
import { CompanyFormProps } from "@/components/forms/forms-instructions/CompanyProp";
import { mapTitlesToLabels } from "@/components/utility/HelperFunctions";
import { supabase } from "@/lib/supabase";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// fetch Companies data
export async function fetchCompanies(): Promise<any> {
  try {
    const { data: companies, error } = await supabase.from("companies").select(
      `
        id,
        business_name,
        company_type_id,
        billing_address,
        notes,
        primary_contact_id,
        sites(
          id,
          site_name,
          service_address,
          site_type
        ),
        owner_id
      `
    );

    if (error) {
      throw new Error(error.message || "Failed to fetch companies");
    }

    return {
      success: true,
      data: companies,
      message: "Companies fetched successfully",
    };
  } catch (error) {
    console.error("Fetch companies error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
// Create Company
//
// Create Company - FIXED with correct column name
export async function createCompany(
  formData: any
): Promise<ApiResponse<any>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create a company");
    }

    const insertData = mapTitlesToLabels(formData, CompanyFormProps);
    insertData.created_by = user.id;
    const { sites, ...companyData } = insertData;

    const { data, error } = await supabase
      .from("companies")
      .insert({
        ...companyData,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create company");
    }

    // Link existing sites to this company
    if (sites && Array.isArray(sites) && sites.length > 0) {
      for (const siteId of sites) {
        const { error: siteError } = await supabase
          .from("sites")
          .update({
            parent_company_id: data.id,  // ✅ Correct column name
          })
          .eq("id", siteId);

        if (siteError) {
          console.error(`Failed to link site ${siteId}:`, siteError.message);
        }
      }
    }

    return {
      success: true,
      data: data as any,
      message: "Company created successfully",
    };
  } catch (error) {
    console.error("Create company error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
// fetch Company by ID
export async function fetchCompanyById(
  companyId: string
): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select(
        `
        *,
        primary_contact:primary_contact_id (
          id,
          first_name,
          last_name,
          email,
          phone
        ),
        owner:owner_id (
          id,
          email
        )
      `
      )
      .eq("id", companyId)
      .single();

    if (error) {
      throw new Error(error.message || "Failed to fetch company");
    }

    return {
      success: true,
      data: data as any,
      message: "Company fetched successfully",
    };
  } catch (error) {
    console.error("Fetch company error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
// Update Company by ID
// Update Company by ID
export async function updateCompany(
  companyId: string,
  formData: Partial<any>
): Promise<ApiResponse<any>> {
  try {
    const updateData = mapTitlesToLabels(formData, CompanyFormProps);

    console.log(updateData, companyId)
    const { data, error } = await supabase
      .from("companies")
      .update({
        business_name: updateData.business_name,
        company_type_id: updateData.company_type_id,
        billing_address: updateData.billing_address,
        notes: updateData.notes,
        primary_contact_id: updateData.primary_contact_id,
        owner_id: updateData.owner_id,
      })
      .eq("id", companyId)
      .select()
      .single();
    
    // one-to-many relationships - only process if sites exist
    if (updateData.sites && Array.isArray(updateData.sites) && updateData.sites.length > 0) {
      for (const site of updateData.sites) {
        const { error: siteError } = await supabase
          .from("sites")
          .update({
            parent_company_id: companyId  // Use parent_company_id to match createCompany
          })
          .eq("id", site);
        
        if (siteError) {
          console.error(`Failed to link site ${site}:`, siteError.message);
        }
      }
    }

    if (error) {
      throw new Error(error.message || "Failed to update company");
    }

    return {
      success: true,
      data: data as any,
      message: "Company updated successfully",
    };
  } catch (error) {
    console.error("Update company error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
// Delete Company by ID
export async function deleteCompany(
  companyId: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from("companies")
      .delete()
      .eq("id", companyId);

    if (error) {
      throw new Error(error.message || "Failed to delete company");
    }

    return {
      success: true,
      message: "Company deleted successfully",
    };
  } catch (error) {
    console.error("Delete company error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
