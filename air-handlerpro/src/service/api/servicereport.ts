import { supabase } from "@/lib/supabase";
import { mapTitlesToLabels } from "@/components/utility/HelperFunctions";
import { ServiceReportFormProps } from "@/components/forms/forms-instructions/ServiceReportProp";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function createServiceReport(
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

    const { photos, ...insertData } = mapTitlesToLabels(
      formData,
      ServiceReportFormProps
    );

    
    console.log(insertData);
    const { data, error } = await supabase
    .from("service_reports")
    .insert([insertData])
    .select()
    .single();
    
    console.log(error);
    if (error) throw new Error(error.message);
   
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

      insertData.photos.push(data.path);
    }

    return {
      success: true,
      data: data as any,
      message: "Service report created",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

export async function fetchServiceReports(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from("service_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: (data as any[]) || [],
      message: "Service reports fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

export async function fetchServiceReportById(
  id: string
): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from("service_reports")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as any,
      message: "Service report fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

export async function updateServiceReport(
  id: string,
  formData: Partial<any>
): Promise<ApiResponse<any>> {
  try {
    const updateData = mapTitlesToLabels(formData, ServiceReportFormProps);

    const { data, error } = await supabase
      .from("service_reports")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data as any,
      message: "Service report updated",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

export async function deleteServiceReport(
  id: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from("service_reports")
      .delete()
      .eq("id", id);

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
