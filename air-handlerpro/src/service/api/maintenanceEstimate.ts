/**
 * Maintenance Estimates API - Matching existing service structure
 */

import { supabase } from "@/lib/supabase";

export interface MaintenanceEstimateFormData {
  customerCompanyId: string;
  customerSiteId: string;
  serviceSiteOwner?: string | null;
  estimateName: string;
  estimateNumber: string;
  contractLength: number;
  contractStartDate: string;
  billingFrequency: string;
  milesToSite?: number;
  travelCharge?: number;
  parkingFees?: number;
  status?: string;
  totalAmount?: number;
}

export interface MaintenanceEstimate {
  id: string;
  customer_company_id: string;
  customer_site_id: string;
  service_site_owner: string | null;
  estimate_name: string;
  estimate_number: string;
  contract_length: number;
  contract_start_date: string;
  billing_frequency: string;
  miles_to_site: number;
  travel_charge: number;
  parking_fees: number;
  status: string;
  total_amount: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Joined data
  customer_company?: {
    id: string;
    business_name: string;
  };
  customer_site?: {
    id: string;
    site_name: string;
    service_address: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create maintenance estimate
 */
export async function createMaintenanceEstimate(
  formData: MaintenanceEstimateFormData
): Promise<ApiResponse<MaintenanceEstimate>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in");
    }

    const insertData = {
      customer_company_id: formData.customerCompanyId,
      customer_site_id: formData.customerSiteId,
      service_site_owner: formData.serviceSiteOwner || null,
      estimate_name: formData.estimateName,
      estimate_number: formData.estimateNumber,
      contract_length: formData.contractLength,
      contract_start_date: formData.contractStartDate,
      billing_frequency: formData.billingFrequency,
      miles_to_site: formData.milesToSite || 0,
      travel_charge: formData.travelCharge || 0,
      parking_fees: formData.parkingFees || 0,
      status: formData.status || "draft",
      total_amount: formData.totalAmount || 0,
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from("maintenance_estimates")
      .insert([insertData])
      .select(
        `
        *,
        customer_company:companies!maintenance_estimates_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!maintenance_estimates_customer_site_id_fkey(
          id,
          site_name,
          service_address
        )
      `
      )
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as MaintenanceEstimate,
      message: "Maintenance estimate created",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Fetch all maintenance estimates
 */
export async function fetchMaintenanceEstimates(): Promise<
  ApiResponse<MaintenanceEstimate[]>
> {
  try {
    const { data, error } = await supabase
      .from("maintenance_estimates")
      .select(
        `
        *,
        customer_company:companies!maintenance_estimates_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!maintenance_estimates_customer_site_id_fkey(
          id,
          site_name,
          service_address
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: (data as MaintenanceEstimate[]) || [],
      message: "Maintenance estimates fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Fetch maintenance estimate by ID
 */
export async function fetchMaintenanceEstimateById(
  id: string
): Promise<ApiResponse<MaintenanceEstimate>> {
  try {
    const { data, error } = await supabase
      .from("maintenance_estimates")
      .select(
        `
        *,
        customer_company:companies!maintenance_estimates_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!maintenance_estimates_customer_site_id_fkey(
          id,
          site_name,
          service_address
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as MaintenanceEstimate,
      message: "Maintenance estimate fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Update maintenance estimate
 */
export async function updateMaintenanceEstimate(
  id: string,
  formData: Partial<MaintenanceEstimateFormData>
): Promise<ApiResponse<MaintenanceEstimate>> {
  try {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (formData.customerCompanyId)
      updateData.customer_company_id = formData.customerCompanyId;
    if (formData.customerSiteId)
      updateData.customer_site_id = formData.customerSiteId;
    if (formData.serviceSiteOwner !== undefined)
      updateData.service_site_owner = formData.serviceSiteOwner;
    if (formData.estimateName) updateData.estimate_name = formData.estimateName;
    if (formData.estimateNumber)
      updateData.estimate_number = formData.estimateNumber;
    if (formData.contractLength)
      updateData.contract_length = formData.contractLength;
    if (formData.contractStartDate)
      updateData.contract_start_date = formData.contractStartDate;
    if (formData.billingFrequency)
      updateData.billing_frequency = formData.billingFrequency;
    if (formData.milesToSite !== undefined)
      updateData.miles_to_site = formData.milesToSite;
    if (formData.travelCharge !== undefined)
      updateData.travel_charge = formData.travelCharge;
    if (formData.parkingFees !== undefined)
      updateData.parking_fees = formData.parkingFees;
    if (formData.status !== undefined) updateData.status = formData.status;
    if (formData.totalAmount !== undefined)
      updateData.total_amount = formData.totalAmount;

    const { data, error } = await supabase
      .from("maintenance_estimates")
      .update(updateData)
      .eq("id", id)
      .select(
        `
        *,
        customer_company:companies!maintenance_estimates_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!maintenance_estimates_customer_site_id_fkey(
          id,
          site_name,
          service_address
        )
      `
      )
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as MaintenanceEstimate,
      message: "Maintenance estimate updated",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Delete maintenance estimate
 */
export async function deleteMaintenanceEstimate(
  id: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from("maintenance_estimates")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    return {
      success: true,
      message: "Maintenance estimate deleted",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}
