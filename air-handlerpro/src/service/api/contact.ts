import { supabase } from "@/lib/supabase";
import { mapTitlesToLabels } from "@/components/utility/HelperFunctions";
import { ContactProp } from "@/components/forms/forms-instructions/ContactProp";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function createContact(formData: any): Promise<ApiResponse<any>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create a contact");
    }

    const insertData = mapTitlesToLabels(formData, ContactProp);

    console.log(insertData);
    const { data, error } = await supabase
      .from("contacts")
      .insert([{ ...insertData, created_by: user.id }])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create contact");
    }

    return {
      success: true,
      data: data as any,
      message: "Contact created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function fetchContacts(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message || "Failed to fetch contacts");
    }

    return {
      success: true,
      data: (data || []) as any[],
      message: "Contacts fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpect ed error occurred",
    };
  }
}

export async function fetchContactById(
  contactId: string
): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", contactId)
      .single();

    if (error) {
      throw new Error(error.message || "Failed to fetch contact");
    }

    return {
      success: true,
      data: data as any,
      message: "Contact fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function updateContact(
  contactId: string,
  formData: Partial<any>
): Promise<ApiResponse<any>> {
  try {
    const updateData = mapTitlesToLabels(formData, ContactProp);

    const { data, error } = await supabase
      .from("contacts")
      .update(updateData)
      .eq("id", contactId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update contact");
    }

    return {
      success: true,
      data: data as any,
      message: "Contact updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function deleteContact(
  contactId: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", contactId);

    if (error) {
      throw new Error(error.message || "Failed to delete contact");
    }

    return {
      success: true,
      message: "Contact deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
