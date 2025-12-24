/**
 * Deals Service Layer - COMPLETE VERSION
 * Handles all business logic and Supabase calls for deals/pipeline
 */

import { supabase } from "@/lib/supabase";

export interface DealFormData {
  dealName: string;
  dealValue?: number;
  probability?: number;
  stage?: string;
  expectedCloseDate?: string;
  source?: string;
  parentCompany?: string | null;
  serviceSite: string;
  description?: string;
}

export interface Deal {
  id: string;
  deal_name: string;
  deal_value: number;
  probability: number;
  stage: string;
  status: string;
  expected_close_date: string | null;
  actual_close_date: string | null;
  parent_company_id?: string | null;
    service_site_id?: string;
    
  primary_contact_id: string | null;
  source: string | null;
  description: string | null;
  owner_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Joined data
  parent_company?: {
    id: string;
    business_name?: string;
  };
  service_site?: {
    id: string;
    site_name?: string;
    service_address?: string;
  };
  primary_contact?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  owner?: {
    id: string;
    email?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create a new deal
 */
export async function createDeal(
  formData: DealFormData
): Promise<ApiResponse<Deal>> {
  try {
    // Get the current authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create a deal");
    }

    // Prepare the data to insert
    const insertData = {
      deal_name: formData.dealName,
      deal_value: formData.dealValue || 0,
      probability: formData.probability || 0,
      stage: formData.stage || "Lead (10%)",
      expected_close_date: formData.expectedCloseDate || null,
      source: formData.source || null,
      parent_company: formData.parentCompany || null,
      service_site: formData.serviceSite,
      description: formData.description || null,
      owner_id: user.id,
      created_by: user.id, // CRITICAL: Required for RLS
    };

    console.log("Inserting deal data:", insertData);

    // Insert data directly into Supabase
    const { data, error } = await supabase
      .from("deals")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(error.message || "Failed to create deal");
    }

    return {
      success: true,
      data: data as Deal,
      message: "Deal created successfully",
    };
  } catch (error) {
    console.error("Create deal error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Fetch all deals with related data
 */
export async function fetchDeals(
  status?: string,
  stage?: string
): Promise<ApiResponse<Deal[]>> {
  try {
    let query = supabase
      .from("deals")
      .select(
        `
        *,
        parent_company:parent_company_id (
          id,
          business_name
        ),
        service_site:service_site_id (
          id,
          site_name,
          service_address
        ),
        primary_contact:primary_contact_id (
          id,
          first_name,
          last_name,
          email
        ),
        owner:owner_id (
          id,
          email
        )
      `
      )
      .order("created_at", { ascending: false });

    // Filter by status if provided
    if (status) {
      query = query.eq("status", status);
    }

    // Filter by stage if provided
    if (stage) {
      query = query.eq("stage", stage);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase fetch error:", error);
      throw new Error(error.message || "Failed to fetch deals");
    }

    return {
      success: true,
      data: (data || []) as Deal[],
      message: "Deals fetched successfully",
    };
  } catch (error) {
    console.error("Fetch deals error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Fetch a single deal by ID with related data
 */
export async function fetchDealById(
  dealId: string
): Promise<ApiResponse<Deal>> {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select(
        `
        *,
        parent_company:parent_company_id (
          id,
          business_name
        ),
        service_site:service_site_id (
          id,
          site_name,
          service_address
        ),
        primary_contact:primary_contact_id (
          id,
          first_name,
          last_name,
          email
        ),
        owner:owner_id (
          id,
          email
        )
      `
      )
      .eq("id", dealId)
      .single();

    if (error) {
      console.error("Supabase fetch single error:", error);
      throw new Error(error.message || "Failed to fetch deal");
    }

    return {
      success: true,
      data: data as Deal,
      message: "Deal fetched successfully",
    };
  } catch (error) {
    console.error("Fetch deal error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Update an existing deal
 */
export async function updateDeal(
  dealId: string,
  formData: Partial<DealFormData>
): Promise<ApiResponse<Deal>> {
  try {
    const updateData: any = {};

    if (formData.dealName !== undefined)
      updateData.deal_name = formData.dealName;
    if (formData.dealValue !== undefined)
      updateData.deal_value = formData.dealValue;
    if (formData.probability !== undefined)
      updateData.probability = formData.probability;
    if (formData.stage !== undefined) updateData.stage = formData.stage;
    if (formData.expectedCloseDate !== undefined)
      updateData.expected_close_date = formData.expectedCloseDate;
    if (formData.source !== undefined) updateData.source = formData.source;
    if (formData.parentCompany !== undefined)
      updateData.parent_company_id = formData.parentCompany;
    if (formData.serviceSite !== undefined)
      updateData.service_site_id = formData.serviceSite;
    if (formData.description !== undefined)
      updateData.description = formData.description;

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("deals")
      .update(updateData)
      .eq("id", dealId)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      throw new Error(error.message || "Failed to update deal");
    }

    return {
      success: true,
      data: data as Deal,
      message: "Deal updated successfully",
    };
  } catch (error) {
    console.error("Update deal error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Update deal stage (for pipeline drag-and-drop)
 */
export async function updateDealStage(
  dealId: string,
  newStage: string
): Promise<ApiResponse<Deal>> {
  try {
    const { data, error } = await supabase
      .from("deals")
      .update({
        stage: newStage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", dealId)
      .select()
      .single();

    if (error) {
      console.error("Supabase update stage error:", error);
      throw new Error(error.message || "Failed to update deal stage");
    }

    return {
      success: true,
      data: data as Deal,
      message: "Deal stage updated successfully",
    };
  } catch (error) {
    console.error("Update deal stage error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Delete a deal
 */
export async function deleteDeal(dealId: string): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase.from("deals").delete().eq("id", dealId);

    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error(error.message || "Failed to delete deal");
    }

    return {
      success: true,
      message: "Deal deleted successfully",
    };
  } catch (error) {
    console.error("Delete deal error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Get pipeline statistics
 */
export async function getPipelineStats(): Promise<
  ApiResponse<{
    totalValue: number;
    dealCount: number;
    wonValue: number;
    wonCount: number;
    avgDealSize: number;
    conversionRate: number;
  }>
> {
  try {
    const { data: allDeals, error: allError } = await supabase
      .from("deals")
      .select("deal_value, status");

    if (allError) throw allError;

    const totalValue =
      allDeals?.reduce((sum, deal) => sum + (deal.deal_value || 0), 0) || 0;
    const dealCount = allDeals?.length || 0;

    const wonDeals = allDeals?.filter((d) => d.status === "Won") || [];
    const wonValue = wonDeals.reduce(
      (sum, deal) => sum + (deal.deal_value || 0),
      0
    );
    const wonCount = wonDeals.length;

    const avgDealSize = wonCount > 0 ? wonValue / wonCount : 0;
    const conversionRate = dealCount > 0 ? (wonCount / dealCount) * 100 : 0;

    return {
      success: true,
      data: {
        totalValue,
        dealCount,
        wonValue,
        wonCount,
        avgDealSize,
        conversionRate,
      },
      message: "Pipeline stats calculated successfully",
    };
  } catch (error) {
    console.error("Get pipeline stats error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
