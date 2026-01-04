/**
 * Service Sites Service Layer - FIXED
 * Changed table name from service_sites to sites
 */

import { supabase } from "@/lib/supabase";
import { mapTitlesToLabels } from "@/components/utility/HelperFunctions";
import { SiteFormProps } from "@/components/forms/forms-instructions/SiteProp";


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function createServiceSite(
  formData: any
): Promise<ApiResponse<any>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create a service site");
    }

    const insertData = mapTitlesToLabels(formData, SiteFormProps);

    // Try "sites" table first, fallback to "service_sites"
    let { data, error } = await supabase
      .from("sites")
      .insert([insertData])
      .select()
      .single();


    if (error) {
      throw new Error(error.message || "Failed to create service site");
    }

    return {
      success: true,
      data: data as any,
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

export async function fetchServiceSites(): Promise<ApiResponse<any[]>> {
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
      data: (data || []) as any[],
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
): Promise<ApiResponse<any>> {
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
      data: data as any,
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
  formData: Partial<any>
): Promise<ApiResponse<any>> {
  try {

    const updateData = mapTitlesToLabels(formData, SiteFormProps);

    // Try "sites" table first
    let { data, error } = await supabase
      .from("sites")
      .update(updateData)
      .eq("id", siteId)
      .select()
      .single();


    if (error) {
      throw new Error(error.message || "Failed to update service site");
    }

    return {
      success: true,
      data: data as any,
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
