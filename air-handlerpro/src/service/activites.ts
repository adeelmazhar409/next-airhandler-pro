/**
 * Activities Service Layer - COMPLETE VERSION
 * Handles all business logic and Supabase calls for activities
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
  assigned_to_id: string | null;
  due_date: string | null;
  due_time: string | null;
  completed_at: string | null;
  status: string;
  owner_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Joined data
  contact?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  assigned_user?: {
    id: string;
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
 * Create a new activity
 */
export async function createActivity(
  formData: ActivityFormData
): Promise<ApiResponse<Activity>> {
  try {
    // Get the current authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create an activity");
    }

    // Prepare the data to insert
    const insertData = {
      subject: formData.subject,
      description: formData.description || null,
      activity_type: formData.activityType,
      priority: formData.priority || "Medium",
      related_to_type: formData.relatedTo,
 // This is the UUID of the related entity
      contact: formData.contact || null,
      assigned_to: formData.assignTo || user.id, // Default to current user
      due_date: formData.dueDate || null,
      due_time: formData.dueTime || null,
      status: "Pending",
      owner_id: user.id,
      created_by: user.id, // CRITICAL: Required for RLS
    };

    console.log("Inserting activity data:", insertData);

    // Insert data directly into Supabase
    const { data, error } = await supabase
      .from("activities")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(error.message || "Failed to create activity");
    }

    return {
      success: true,
      data: data as Activity,
      message: "Activity created successfully",
    };
  } catch (error) {
    console.error("Create activity error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Fetch all activities with related data
 */
export async function fetchActivities(
  status?: string
): Promise<ApiResponse<Activity[]>> {
  try {
    let query = supabase
      .from("activities")
      .select(
        `
        *,
        contact:contact_id (
          id,
          first_name,
          last_name,
          email
        ),
        assigned_user:assigned_to (
          id,
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

    const { data, error } = await query;

    if (error) {
      console.error("Supabase fetch error:", error);
      throw new Error(error.message || "Failed to fetch activities");
    }

    return {
      success: true,
      data: (data || []) as Activity[],
      message: "Activities fetched successfully",
    };
  } catch (error) {
    console.error("Fetch activities error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Fetch a single activity by ID with related data
 */
export async function fetchActivityById(
  activityId: string
): Promise<ApiResponse<Activity>> {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select(
        `
        *,
        contact:contact_id (
          id,
          first_name,
          last_name,
          email
        ),
        assigned_user:assigned_to (
          id,
          email
        ),
        owner:owner_id (
          id,
          email
        )
      `
      )
      .eq("id", activityId)
      .single();

    if (error) {
      console.error("Supabase fetch single error:", error);
      throw new Error(error.message || "Failed to fetch activity");
    }

    return {
      success: true,
      data: data as Activity,
      message: "Activity fetched successfully",
    };
  } catch (error) {
    console.error("Fetch activity error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Update an existing activity
 */
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
      console.error("Supabase update error:", error);
      throw new Error(error.message || "Failed to update activity");
    }

    return {
      success: true,
      data: data as Activity,
      message: "Activity updated successfully",
    };
  } catch (error) {
    console.error("Update activity error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Mark activity as completed
 */
export async function completeActivity(
  activityId: string
): Promise<ApiResponse<Activity>> {
  try {
    const { data, error } = await supabase
      .from("activities")
      .update({
        status: "Completed",
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", activityId)
      .select()
      .single();

    if (error) {
      console.error("Supabase complete error:", error);
      throw new Error(error.message || "Failed to complete activity");
    }

    return {
      success: true,
      data: data as Activity,
      message: "Activity marked as completed",
    };
  } catch (error) {
    console.error("Complete activity error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Delete an activity
 */
export async function deleteActivity(
  activityId: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", activityId);

    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error(error.message || "Failed to delete activity");
    }

    return {
      success: true,
      message: "Activity deleted successfully",
    };
  } catch (error) {
    console.error("Delete activity error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
