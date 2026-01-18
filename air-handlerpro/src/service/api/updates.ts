import { supabase } from "@/lib/supabase";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function fetchUpdates(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from("updates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: (data as any[]) || [],
      message: "Updates fetched",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}

export async function createUpdate(update: any): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from("updates")
      .insert(update)
      .select()
      .single();

      console.log(data, error, "update");

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
}
