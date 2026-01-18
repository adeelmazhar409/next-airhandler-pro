import { supabase } from "@/lib/supabase";
import { JobWalksFormProps } from "@/components/forms/forms-instructions/JobWalksProp";
import { mapTitlesToLabels } from "@/components/utility/HelperFunctions";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create job walk
 */
export async function createJobWalk(formData: any): Promise<ApiResponse<any>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in");
    }

    const { photos, ...insertData } = mapTitlesToLabels(
      formData,
      JobWalksFormProps
    );

    for (const file of photos) {
      console.log("Uploading:", file.name);

      const filePath = `${user.id}/${crypto.randomUUID()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("media")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        console.error("Upload failed:", error);
        throw error;
      }

      insertData.photo = data.path;
    }
    insertData.created_by = user.id;

    const { data, error } = await supabase
      .from("job_walks")
      .insert([insertData])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as any,
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
export async function fetchJobWalks(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from("job_walks")
      .select("*")
      .order("date_of_walk", { ascending: false });

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: (data as any[]) || [],
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
export async function fetchJobWalkById(id: string): Promise<ApiResponse<any>> {
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
      data: data as any,
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
  formData: Partial<any>
): Promise<ApiResponse<any>> {
  try {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    const insertData = mapTitlesToLabels(formData, JobWalksFormProps);

    const { data, error } = await supabase
      .from("job_walks")
      .update(insertData)
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
      data: data as any,
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
