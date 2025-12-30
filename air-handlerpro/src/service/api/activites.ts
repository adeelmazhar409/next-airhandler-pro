/**
 * Activities Service Layer - FIXED
 * Removed problematic joins
 */

import { supabase } from "@/lib/supabase";

export interface ActivityFormData {
  subject: string;
  activityType: string;
  priority?: string;
  relatedTo: string;
  relatedItem: string;
  dueDate?: string;
  dueTime?: string;
  contact?: string | null;
  assignTo?: string | null;
  description?: string;
}

export interface Activity {
  id: string;
  subject: string;
  description: string | null;
  activity_type: string;
  priority: string;
  related_to_type: string;
  related_to_id?: string;
  contact_id: string | null;
  assigned_to: string | null;
  due_date: string | null;
  due_time: string | null;
  completed_at: string | null;
  status: string;
  owner_id: string;
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

export async function createActivity(
  formData: ActivityFormData
): Promise<ApiResponse<Activity>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create an activity");
    }

    const insertData = {
      subject: formData.subject,
      description: formData.description || null,
      activity_type: formData.activityType,
      priority: formData.priority || "Medium",
      related_to_type: formData.relatedTo,
      related_to_id: formData.relatedItem,
      contact_id: formData.contact || null,
      assigned_to: formData.assignTo || user.id,
      due_date: formData.dueDate || null,
      due_time: formData.dueTime || null,
      status: "Pending",
      owner_id: user.id,
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from("activities")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create activity");
    }

    return {
      success: true,
      data: data as Activity,
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

export async function fetchActivities(): Promise<ApiResponse<Activity[]>> {
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
      data: (data || []) as Activity[],
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
): Promise<ApiResponse<Activity>> {
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
      data: data as Activity,
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
  formData: Partial<ActivityFormData>
): Promise<ApiResponse<Activity>> {
  try {
    const updateData: any = {};

    if (formData.subject !== undefined) updateData.subject = formData.subject;
    if (formData.description !== undefined)
      updateData.description = formData.description;
    if (formData.activityType !== undefined)
      updateData.activity_type = formData.activityType;
    if (formData.priority !== undefined)
      updateData.priority = formData.priority;
    if (formData.relatedTo !== undefined)
      updateData.related_to_type = formData.relatedTo;
    if (formData.relatedItem !== undefined)
      updateData.related_to_id = formData.relatedItem;
    if (formData.contact !== undefined)
      updateData.contact_id = formData.contact;
    if (formData.assignTo !== undefined)
      updateData.assigned_to = formData.assignTo;
    if (formData.dueDate !== undefined) updateData.due_date = formData.dueDate;
    if (formData.dueTime !== undefined) updateData.due_time = formData.dueTime;

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("activities")
      .update(updateData)
      .eq("id", activityId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update activity");
    }

    return {
      success: true,
      data: data as Activity,
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
