/**
 * Work Orders API - Simple version matching form fields
 */

import { supabase } from "@/lib/supabase";

export interface WorkOrderFormData {
  customerCompanyId: string;
  customerSiteId?: string | null;
  workOrderNumber?: string;
  scheduledStart?: string;
  scheduledEnd?: string;
  description?: string;
  equipmentInformation?: string;
}

export interface WorkOrder {
  id: string;
  customer_company_id: string;
  customer_site_id: string | null;
  work_order_number: string | null;
  scheduled_start: string | null;
  scheduled_end: string | null;
  description: string | null;
  equipment_information: string | null;
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
 * Create work order
 */
export async function createWorkOrder(
  formData: WorkOrderFormData
): Promise<ApiResponse<WorkOrder>> {
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
      customer_site_id: formData.customerSiteId || null,
      work_order_number: formData.workOrderNumber || null,
      scheduled_start: formData.scheduledStart || null,
      scheduled_end: formData.scheduledEnd || null,
      description: formData.description || null,
      equipment_information: formData.equipmentInformation || null,
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from("work_orders")
      .insert([insertData])
      .select(
        `
        *,
        customer_company:companies!work_orders_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!work_orders_customer_site_id_fkey(
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
      data: data as WorkOrder,
      message: "Work order created",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Fetch all work orders
 */
export async function fetchWorkOrders(): Promise<ApiResponse<WorkOrder[]>> {
  try {
    const { data, error } = await supabase
      .from("work_orders")
      .select(
        `
        *,
        customer_company:companies!work_orders_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!work_orders_customer_site_id_fkey(
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
      data: (data as WorkOrder[]) || [],
      message: "Work orders fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Fetch work order by ID
 */
export async function fetchWorkOrderById(
  id: string
): Promise<ApiResponse<WorkOrder>> {
  try {
    const { data, error } = await supabase
      .from("work_orders")
      .select(
        `
        *,
        customer_company:companies!work_orders_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!work_orders_customer_site_id_fkey(
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
      data: data as WorkOrder,
      message: "Work order fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Update work order
 */
export async function updateWorkOrder(
  id: string,
  formData: Partial<WorkOrderFormData>
): Promise<ApiResponse<WorkOrder>> {
  try {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (formData.customerCompanyId)
      updateData.customer_company_id = formData.customerCompanyId;
    if (formData.customerSiteId !== undefined)
      updateData.customer_site_id = formData.customerSiteId;
    if (formData.workOrderNumber !== undefined)
      updateData.work_order_number = formData.workOrderNumber;
    if (formData.scheduledStart !== undefined)
      updateData.scheduled_start = formData.scheduledStart;
    if (formData.scheduledEnd !== undefined)
      updateData.scheduled_end = formData.scheduledEnd;
    if (formData.description !== undefined)
      updateData.description = formData.description;
    if (formData.equipmentInformation !== undefined)
      updateData.equipment_information = formData.equipmentInformation;

    const { data, error } = await supabase
      .from("work_orders")
      .update(updateData)
      .eq("id", id)
      .select(
        `
        *,
        customer_company:companies!work_orders_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!work_orders_customer_site_id_fkey(
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
      data: data as WorkOrder,
      message: "Work order updated",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Delete work order
 */
export async function deleteWorkOrder(id: string): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase.from("work_orders").delete().eq("id", id);

    if (error) throw new Error(error.message);

    return {
      success: true,
      message: "Work order deleted",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}
