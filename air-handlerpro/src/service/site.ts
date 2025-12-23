/**
 * Service Sites Service Layer - COMPLETE VERSION
 * Handles all business logic and Supabase calls for service sites
 */

import { supabase } from "@/lib/supabase";

export interface ServiceSiteFormData {
  siteName: string;
  parentCompany?: string | null;
  primaryContact: string;
  serviceAddress: string;
  manuallySetOwner?: boolean;
  siteOwner?: string;
}

export interface ServiceSite {
  id: string;
  site_name: string;
  site_type?: string | null;
  parent_company_id: string | null;
  primary_contact_id: string;
  service_address: string;
  site_owner_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Joined data
  primary_contact?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
  site_owner?: {
    id: string;
    email?: string;
  };
  parent_company?: {
    id: string;
    name?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create a new service site
 */
export async function createServiceSite(
  formData: ServiceSiteFormData
): Promise<ApiResponse<ServiceSite>> {
  try {
    // Get the current authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create a service site");
    }

    // Prepare the data to insert
    const insertData = {
      site_name: formData.siteName,
      parent_company_id: formData.parentCompany || null,
      primary_contact_id: formData.primaryContact,
      service_address: formData.serviceAddress,
      manually_set_owner: formData.manuallySetOwner || false,
      site_owner_id: formData.siteOwner || user.id,
      created_by: user.id,
    };

    // Insert data directly into Supabase
    const { data, error } = await supabase
      .from("service_sites")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create service site");
    }

    return {
      success: true,
      data: data as ServiceSite,
      message: "Service site created successfully",
    };
  } catch (error) {
    console.error("Create service site error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Fetch all service sites with related data (contacts, owners, parent company)
 */
export async function fetchServiceSites(
  parentCompanyId?: string
): Promise<ApiResponse<ServiceSite[]>> {
  try {
    // Build query with joins to related tables
    let query = supabase
      .from("service_sites")
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
        site_owner:site_owner_id (
          id,
          email
        ),
        parent_company:parent_company_id (
          id,
          name
        )
      `
      )
      .order("created_at", { ascending: false });

    // Filter by parent company if provided
    if (parentCompanyId) {
      query = query.eq("parent_company_id", parentCompanyId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message || "Failed to fetch service sites");
    }

    return {
      success: true,
      data: (data || []) as ServiceSite[],
      message: "Service sites fetched successfully",
    };
  } catch (error) {
    console.error("Fetch service sites error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Fetch a single service site by ID with related data
 */
export async function fetchServiceSiteById(
  siteId: string
): Promise<ApiResponse<ServiceSite>> {
  try {
    const { data, error } = await supabase
      .from("service_sites")
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
        site_owner:site_owner_id (
          id,
          email
        ),
        parent_company:parent_company_id (
          id,
          name
        )
      `
      )
      .eq("id", siteId)
      .single();

    if (error) {
      throw new Error(error.message || "Failed to fetch service site");
    }

    return {
      success: true,
      data: data as ServiceSite,
      message: "Service site fetched successfully",
    };
  } catch (error) {
    console.error("Fetch service site error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Update an existing service site
 */
export async function updateServiceSite(
  siteId: string,
  formData: Partial<ServiceSiteFormData>
): Promise<ApiResponse<ServiceSite>> {
  try {
    const updateData: any = {};

    if (formData.siteName !== undefined)
      updateData.site_name = formData.siteName;
    if (formData.parentCompany !== undefined)
      updateData.parent_company_id = formData.parentCompany;
    if (formData.primaryContact !== undefined)
      updateData.primary_contact_id = formData.primaryContact;
    if (formData.serviceAddress !== undefined)
      updateData.service_address = formData.serviceAddress;
    if (formData.siteOwner !== undefined)
      updateData.site_owner_id = formData.siteOwner;

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("service_sites")
      .update(updateData)
      .eq("id", siteId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update service site");
    }

    return {
      success: true,
      data: data as ServiceSite,
      message: "Service site updated successfully",
    };
  } catch (error) {
    console.error("Update service site error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Delete a service site
 */
export async function deleteServiceSite(
  siteId: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from("service_sites")
      .delete()
      .eq("id", siteId);

    if (error) {
      throw new Error(error.message || "Failed to delete service site");
    }

    return {
      success: true,
      message: "Service site deleted successfully",
    };
  } catch (error) {
    console.error("Delete service site error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
