/**
 * Service Sites Service Layer - FIXED
 * Changed table name from service_sites to sites
 */

import { supabase } from "@/lib/supabase";

export interface ServiceSiteFormData {
  siteName: string;
  siteType?: string;
  parentCompany?: string | null;
  primaryContact: string;
  serviceAddress: string;
  manuallySetOwner?: boolean;
  siteOwner?: string | null;
}

export interface ServiceSite {
  id: string;
  site_name: string;
  site_type: string;
  parent_company_id: string | null;
  primary_contact_id: string;
  service_address: string;
  site_owner_id: string;
  manually_set_owner: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function createServiceSite(
  formData: ServiceSiteFormData
): Promise<ApiResponse<ServiceSite>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create a service site");
    }

    const insertData = {
      site_name: formData.siteName,
      site_type: formData.siteType || "standalone",
      parent_company_id: formData.parentCompany || null,
      primary_contact_id: formData.primaryContact,
      service_address: formData.serviceAddress,
      manually_set_owner: formData.manuallySetOwner || false,
      site_owner_id: formData.siteOwner || user.id,
      created_by: user.id,
    };

    // Try "sites" table first, fallback to "service_sites"
    let { data, error } = await supabase
      .from("sites")
      .insert([insertData])
      .select()
      .single();

    // If sites table doesn't exist, try service_sites
    if (
      error &&
      error.message.includes("relation") &&
      error.message.includes("does not exist")
    ) {
      const result = await supabase
        .from("service_sites")
        .insert([insertData])
        .select()
        .single();

      data = result.data;
      error = result.error;
    }

    if (error) {
      throw new Error(error.message || "Failed to create service site");
    }

    return {
      success: true,
      data: data as ServiceSite,
      message: "Service site created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function fetchServiceSites(): Promise<ApiResponse<ServiceSite[]>> {
  try {
    // Try "sites" table first
    let { data, error } = await supabase
      .from("sites")
      .select("*")
      .order("created_at", { ascending: false });

    // If sites table doesn't exist, try service_sites
    if (
      error &&
      error.message.includes("relation") &&
      error.message.includes("does not exist")
    ) {
      const result = await supabase
        .from("service_sites")
        .select("*")
        .order("created_at", { ascending: false });

      data = result.data;
      error = result.error;
    }

    if (error) {
      throw new Error(error.message || "Failed to fetch service sites");
    }

    return {
      success: true,
      data: (data || []) as ServiceSite[],
      message: "Service sites fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function fetchServiceSiteById(
  siteId: string
): Promise<ApiResponse<ServiceSite>> {
  try {
    // Try "sites" table first
    let { data, error } = await supabase
      .from("sites")
      .select("*")
      .eq("id", siteId)
      .single();

    // If sites table doesn't exist, try service_sites
    if (
      error &&
      error.message.includes("relation") &&
      error.message.includes("does not exist")
    ) {
      const result = await supabase
        .from("service_sites")
        .select("*")
        .eq("id", siteId)
        .single();

      data = result.data;
      error = result.error;
    }

    if (error) {
      throw new Error(error.message || "Failed to fetch service site");
    }

    return {
      success: true,
      data: data as ServiceSite,
      message: "Service site fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function updateServiceSite(
  siteId: string,
  formData: Partial<ServiceSiteFormData>
): Promise<ApiResponse<ServiceSite>> {
  try {
    const updateData: any = {};

    if (formData.siteName !== undefined)
      updateData.site_name = formData.siteName;
    if (formData.siteType !== undefined)
      updateData.site_type = formData.siteType;
    if (formData.parentCompany !== undefined)
      updateData.parent_company_id = formData.parentCompany;
    if (formData.primaryContact !== undefined)
      updateData.primary_contact_id = formData.primaryContact;
    if (formData.serviceAddress !== undefined)
      updateData.service_address = formData.serviceAddress;
    if (formData.manuallySetOwner !== undefined)
      updateData.manually_set_owner = formData.manuallySetOwner;
    if (formData.siteOwner !== undefined)
      updateData.site_owner_id = formData.siteOwner;

    updateData.updated_at = new Date().toISOString();

    // Try "sites" table first
    let { data, error } = await supabase
      .from("sites")
      .update(updateData)
      .eq("id", siteId)
      .select()
      .single();

    // If sites table doesn't exist, try service_sites
    if (
      error &&
      error.message.includes("relation") &&
      error.message.includes("does not exist")
    ) {
      const result = await supabase
        .from("service_sites")
        .update(updateData)
        .eq("id", siteId)
        .select()
        .single();

      data = result.data;
      error = result.error;
    }

    if (error) {
      throw new Error(error.message || "Failed to update service site");
    }

    return {
      success: true,
      data: data as ServiceSite,
      message: "Service site updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function deleteServiceSite(
  siteId: string
): Promise<ApiResponse<void>> {
  try {
    // Try "sites" table first
    let { error } = await supabase.from("sites").delete().eq("id", siteId);

    // If sites table doesn't exist, try service_sites
    if (
      error &&
      error.message.includes("relation") &&
      error.message.includes("does not exist")
    ) {
      const result = await supabase
        .from("service_sites")
        .delete()
        .eq("id", siteId);

      error = result.error;
    }

    if (error) {
      throw new Error(error.message || "Failed to delete service site");
    }

    return {
      success: true,
      message: "Service site deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
