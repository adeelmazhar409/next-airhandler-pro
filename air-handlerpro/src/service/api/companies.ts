// Companies data endpoints
import { supabase } from "@/lib/supabase";

export interface CompanyFormData {
  businessName: string;
  companyType: string;
  primaryContact: string;
  billingAddress: string;
  serviceSites?: string[]; // Array of site IDs
}



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
          service_address
        ),
        owner_id
      `
    );
    console.log(companies)
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
export async function createCompany(
  formData: CompanyFormData
): Promise<ApiResponse<any>> {
  try {
    // Get the current authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create a company");
    }

    // Prepare the data to insert
    const insertData = {
      business_name: formData.businessName,
      company_type: formData.companyType,
      primary_contact: formData.primaryContact,
      billing_address: formData.billingAddress,
      owner_id: user.id,
      created_by: user.id,
    };

    // Insert data directly into Supabase
    const { data, error } = await supabase
      .from("companies")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create company");
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
export async function updateCompany(
  companyId: string,
  formData: Partial<CompanyFormData>
): Promise<ApiResponse<any>> {
  try {
    const updateData: any = {};

    if (formData.businessName !== undefined)
      updateData.business_name = formData.businessName;
    if (formData.companyType !== undefined)
      updateData.company_type = formData.companyType;
    if (formData.primaryContact !== undefined)
      updateData.primary_contact = formData.primaryContact;
    if (formData.billingAddress !== undefined)
      updateData.billing_address = formData.billingAddress;

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("companies")
      .update(updateData)
      .eq("id", companyId)
      .select()
      .single();

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
