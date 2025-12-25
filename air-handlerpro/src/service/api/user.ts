// fetch all users

import { supabase } from "@/lib/supabase";

export async function fetchUsers(): Promise<any> {
  try {
    const { data: Users, error } = await supabase.from("users").select("*");
    console.log("testing---", Users);

    if (error) {
      throw new Error(error.message || "Failed to fetch Users");
    }

    return {
      success: true,
      data: Users,
      message: "Companies fetched successfully",
    };
  } catch (error) {
    console.error("Fetch Users error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
