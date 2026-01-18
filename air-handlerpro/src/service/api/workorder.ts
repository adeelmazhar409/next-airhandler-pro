import { supabase } from "@/lib/supabase";
import { WorkOrderFormProps } from "@/components/forms/forms-instructions/WorkOrderFormProp";
import { mapTitlesToLabels, toISOTimestamp } from "@/components/utility/HelperFunctions";


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function createWorkOrder(
  formData: any
): Promise<ApiResponse<any>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in");
    }

    let insertData = mapTitlesToLabels(formData, WorkOrderFormProps);
    insertData.created_by = user.id;
    insertData.scheduled_start = toISOTimestamp({ date: insertData.scheduled_start.date, hour: insertData.scheduled_start.hour, minute: insertData.scheduled_start.minute });
    insertData.scheduled_end = toISOTimestamp({ date: insertData.scheduled_end.date, hour: insertData.scheduled_end.hour, minute: insertData.scheduled_end.minute });

    const { data, error } = await supabase
      .from("work_orders")
      .insert([insertData])
      .select()
      .single();


    console.log(insertData, error)

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as any,
      message: "Work order created",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

export async function fetchWorkOrders(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from("work_orders")
      .select('*')
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: (data as any[]) || [],
      message: "Work orders fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

export async function fetchWorkOrderById(
  id: string
): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from("work_orders")
      .select('*')
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as any,
      message: "Work order fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

export async function updateWorkOrder(
  id: string,
  formData: Partial<any>
): Promise<ApiResponse<any>> {
  try {
      const updateData = mapTitlesToLabels(formData, WorkOrderFormProps);

    const { data, error } = await supabase
      .from("work_orders")
      .update(updateData)
      .eq("id", id)
      .select('*')
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as any,
      message: "Work order updated",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

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
