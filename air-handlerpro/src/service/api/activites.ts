/**
 * Activities Service Layer - FIXED
 * Removed problematic joins
 */

import { supabase } from "@/lib/supabase";
import { ActivityFormProps } from "@/components/forms/forms-instructions/ActivityProp";
import { mapTitlesToLabels } from "@/components/utility/HelperFunctions";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function createActivity(
  formData: any
): Promise<ApiResponse<any>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create an activity");
    }

    const insertData = mapTitlesToLabels(formData, ActivityFormProps);

    // extract assigned_to from insertData and remove it from the record to avoid duplicate fields
    let assigned_to: any = insertData.assigned_to;
    // remove assigned_to from insertData for insert
    const { assigned_to: _removed, ...selectedData } = insertData;

    console.log(insertData);

    const { data, error } = await supabase
      .from("activities")
      .insert([{
        ...selectedData,
        created_by: user.id,
        assigned_to_id: assigned_to ? assigned_to : user.id
      }])
      .select()
      .single();

    console.log(error);
    if (error) {
      throw new Error(error.message || "Failed to create activity");
    }

    return {
      success: true,
      data: data as any,
      message: "Activity created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function fetchActivities(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message || "Failed to fetch activities");
    }

    return {
      success: true,
      data: (data || []) as any[],
      message: "Activities fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function fetchActivityById(
  activityId: string
): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("id", activityId)
      .single();

    if (error) {
      throw new Error(error.message || "Failed to fetch activity");
    }

    return {
      success: true,
      data: data as any,
      message: "Activity fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function updateActivity(
  activityId: string,
  formData: Partial<any>
): Promise<ApiResponse<any>> {
  try {
    // Use the same mapping function as createActivity
    const updateData = mapTitlesToLabels(formData, ActivityFormProps);

    // Handle assigned_to field same as create
    let assigned_to: any = updateData.assigned_to;
    const { assigned_to: _removed, ...selectedData } = updateData;

    const finalUpdateData = {
      ...selectedData,
      ...(assigned_to && { assigned_to_id: assigned_to }),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("activities")
      .update(finalUpdateData)
      .eq("id", activityId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update activity");
    }

    return {
      success: true,
      data: data as any,
      message: "Activity updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function deleteActivity(
  activityId: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", activityId);

    if (error) {
      throw new Error(error.message || "Failed to delete activity");
    }

    return {
      success: true,
      message: "Activity deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
