/**
 * Job Walks API - Simple version matching form fields
 */

import { supabase } from "@/lib/supabase";

export interface JobWalkFormData {
  customerCompanyId?: string | null;
  customerSiteId?: string | null;
  jobName: string;
  dateOfWalk: string;
  taskType?: string;
  jobNotes?: string;
  nextStep?: string;
  assignedTo?: string | null;
  photosCount?: number;
}

export interface JobWalk {
  id: string;
  customer_company_id: string | null;
  customer_site_id: string | null;
  job_name: string;
  date_of_walk: string;
  task_type: string | null;
  job_notes: string | null;
  next_step: string | null;
  assigned_to: string | null;
  photos_count: number;
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
  assigned_user?: {
    id: string;
    email: string;
    full_name: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create job walk
 */
export async function createJobWalk(
  formData: JobWalkFormData
): Promise<ApiResponse<JobWalk>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in");
    }

    const insertData = {
      customer_company_id: formData.customerCompanyId || null,
      customer_site_id: formData.customerSiteId || null,
      job_name: formData.jobName,
      date_of_walk: formData.dateOfWalk,
      task_type: formData.taskType || null,
      job_notes: formData.jobNotes || null,
      next_step: formData.nextStep || null,
      assigned_to: formData.assignedTo || null,
      photos_count: formData.photosCount || 0,
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from("job_walks")
      .insert([insertData])
      .select(
        `
        *,
        customer_company:companies!job_walks_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!job_walks_customer_site_id_fkey(
          id,
          site_name,
          service_address
        ),
        assigned_user:users!job_walks_assigned_to_fkey(
          id,
          email,
          full_name
        )
      `
      )
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as JobWalk,
      message: "Job walk created",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Fetch all job walks
 */
export async function fetchJobWalks(): Promise<ApiResponse<JobWalk[]>> {
  try {
    const { data, error } = await supabase
      .from("job_walks")
      .select(
        `
        *,
        customer_company:companies!job_walks_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!job_walks_customer_site_id_fkey(
          id,
          site_name,
          service_address
        ),
        assigned_user:users!job_walks_assigned_to_fkey(
          id,
          email,
          full_name
        )
      `
      )
      .order("date_of_walk", { ascending: false });

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: (data as JobWalk[]) || [],
      message: "Job walks fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Fetch job walk by ID
 */
export async function fetchJobWalkById(
  id: string
): Promise<ApiResponse<JobWalk>> {
  try {
    const { data, error } = await supabase
      .from("job_walks")
      .select(
        `
        *,
        customer_company:companies!job_walks_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!job_walks_customer_site_id_fkey(
          id,
          site_name,
          service_address
        ),
        assigned_user:users!job_walks_assigned_to_fkey(
          id,
          email,
          full_name
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as JobWalk,
      message: "Job walk fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Update job walk
 */
export async function updateJobWalk(
  id: string,
  formData: Partial<JobWalkFormData>
): Promise<ApiResponse<JobWalk>> {
  try {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (formData.customerCompanyId !== undefined)
      updateData.customer_company_id = formData.customerCompanyId;
    if (formData.customerSiteId !== undefined)
      updateData.customer_site_id = formData.customerSiteId;
    if (formData.jobName) updateData.job_name = formData.jobName;
    if (formData.dateOfWalk) updateData.date_of_walk = formData.dateOfWalk;
    if (formData.taskType !== undefined)
      updateData.task_type = formData.taskType;
    if (formData.jobNotes !== undefined)
      updateData.job_notes = formData.jobNotes;
    if (formData.nextStep !== undefined)
      updateData.next_step = formData.nextStep;
    if (formData.assignedTo !== undefined)
      updateData.assigned_to = formData.assignedTo;
    if (formData.photosCount !== undefined)
      updateData.photos_count = formData.photosCount;

    const { data, error } = await supabase
      .from("job_walks")
      .update(updateData)
      .eq("id", id)
      .select(
        `
        *,
        customer_company:companies!job_walks_customer_company_id_fkey(
          id,
          business_name
        ),
        customer_site:sites!job_walks_customer_site_id_fkey(
          id,
          site_name,
          service_address
        ),
        assigned_user:users!job_walks_assigned_to_fkey(
          id,
          email,
          full_name
        )
      `
      )
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as JobWalk,
      message: "Job walk updated",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

/**
 * Delete job walk
 */
export async function deleteJobWalk(id: string): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase.from("job_walks").delete().eq("id", id);

    if (error) throw new Error(error.message);

    return {
      success: true,
      message: "Job walk deleted",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}
