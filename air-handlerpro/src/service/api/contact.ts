/**
 * Contacts Service Layer - FIXED
 * Removed problematic joins
 */

import { supabase } from "@/lib/supabase";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  title?: string;
  department?: string;
  parentCompany?: string | null;
  serviceSite?: string | null;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  workPhone?: string;
  contactType?: string;
  contactStatus?: string;
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  title: string | null;
  department: string | null;
  parent_company_id?: string | null;
  service_site_id?: string | null;
  email: string | null;
  phone: string | null;
  mobile_phone: string | null;
  work_phone: string | null;
  contact_type: string;
  contact_status: string;
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

export async function createContact(
  formData: ContactFormData
): Promise<ApiResponse<Contact>> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to create a contact");
    }

    const insertData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      title: formData.title || null,
      department: formData.department || null,
      parent_company_id: formData.parentCompany || null,
      service_site_id: formData.serviceSite || null,
      email: formData.email || null,
      phone: formData.phone || null,
      mobile_phone: formData.mobilePhone || null,
      work_phone: formData.workPhone || null,
      contact_type: formData.contactType || "Primary Contact",
      contact_status: formData.contactStatus || "Active",
      owner_id: user.id,
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from("contacts")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create contact");
    }

    return {
      success: true,
      data: data as Contact,
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

export async function fetchContacts(): Promise<ApiResponse<Contact[]>> {
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
      data: (data || []) as Contact[],
      message: "Contacts fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpect ed error occurred",
    };
  }
}

export async function fetchContactById(
  contactId: string
): Promise<ApiResponse<Contact>> {
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
      data: data as Contact,
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
  formData: Partial<ContactFormData>
): Promise<ApiResponse<Contact>> {
  try {
    const updateData: any = {};

    if (formData.firstName !== undefined)
      updateData.first_name = formData.firstName;
    if (formData.lastName !== undefined)
      updateData.last_name = formData.lastName;
    if (formData.title !== undefined) updateData.title = formData.title;
    if (formData.department !== undefined)
      updateData.department = formData.department;
    if (formData.parentCompany !== undefined)
      updateData.parent_company_id = formData.parentCompany;
    if (formData.serviceSite !== undefined)
      updateData.service_site_id = formData.serviceSite;
    if (formData.email !== undefined) updateData.email = formData.email;
    if (formData.phone !== undefined) updateData.phone = formData.phone;
    if (formData.mobilePhone !== undefined)
      updateData.mobile_phone = formData.mobilePhone;
    if (formData.workPhone !== undefined)
      updateData.work_phone = formData.workPhone;
    if (formData.contactType !== undefined)
      updateData.contact_type = formData.contactType;
    if (formData.contactStatus !== undefined)
      updateData.contact_status = formData.contactStatus;

    updateData.updated_at = new Date().toISOString();

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
      data: data as Contact,
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
