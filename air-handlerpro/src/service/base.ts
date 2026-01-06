/**
 * UNIVERSAL BASE FUNCTION - ONE FUNCTION TO RULE THEM ALL
 * Single function call for all CRUD operations
 */

// Work Orders
import {
  createWorkOrder,
  fetchWorkOrders,
  fetchWorkOrderById,
  updateWorkOrder,
  deleteWorkOrder,
  WorkOrderFormData,
  WorkOrder,
} from "./api/workorder";

// Job Walks
import {
  createJobWalk,
  fetchJobWalks,
  fetchJobWalkById,
  updateJobWalk,
  deleteJobWalk,
  JobWalkFormData,
  JobWalk,
} from "./api/jobwalks";

// Activities
import {
  createActivity,
  fetchActivities,
  fetchActivityById,
  updateActivity,
  deleteActivity,

} from "./api/activites";

// Companies
import {
  createCompany,
  fetchCompanies,
  fetchCompanyById,
  updateCompany,
  deleteCompany,

} from "./api/companies";

// Contacts
import {
  createContact,
  fetchContacts,
  fetchContactById,
  updateContact,
  deleteContact,
 
} from "./api/contact";

// Service Sites
import {
  createServiceSite,
  fetchServiceSites,
  fetchServiceSiteById,
  updateServiceSite,
  deleteServiceSite,

} from "./api/site";

// Maintenance Estimates
import {
  createMaintenanceEstimate,
  fetchMaintenanceEstimates,
  fetchMaintenanceEstimateById,
  updateMaintenanceEstimate,
  deleteMaintenanceEstimate,
  MaintenanceEstimateFormData,
  MaintenanceEstimate,
} from "./api/maintenanceEstimate";

// ============================================================================
// TYPES
// ============================================================================

export type TableName =
  | "workorder"
  | "jobwalk"
  | "activity"
  | "company"
  | "contact"
  | "site"
  | "maintenanceEstimate";

export type Action = "create" | "fetch" | "fetchById" | "update" | "delete";

export interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================================================
// UNIVERSAL BASE FUNCTION - METHOD 1: Simple Parameters
// ============================================================================

/**
 * Universal base function - handles ALL operations with one call
 *
 * @param action - What to do: "create", "fetch", "fetchById", "update", "delete"
 * @param table - Which table: "workorder", "company", etc.
 * @param dataOrId - Data for create/update, or ID for fetchById/delete
 * @param updateData - (Optional) For update operation only
 *
 * @example
 * // Create
 * await base("create", "maintenanceEstimate", formData);
 *
 * // Fetch all
 * await base("fetch", "company");
 *
 * // Fetch by ID
 * await base("fetchById", "workorder", "uuid-123");
 *
 * // Update
 * await base("update", "contact", "uuid-123", updateData);
 *
 * // Delete
 * await base("delete", "jobwalk", "uuid-123");
 */
export async function base(
  action: Action,
  table: TableName,
  dataOrId?: any,
  updateData?: any
): Promise<BaseResponse> {
  try {
    switch (action) {
      case "create":
        if (!dataOrId) {
          return { success: false, error: "Data is required for create" };
        }
        return await handleCreate(table, dataOrId);

      case "fetch":
        return await handleFetch(table);

      case "fetchById":
        if (!dataOrId) {
          return { success: false, error: "ID is required for fetchById" };
        }
        return await handleFetchById(table, dataOrId);

      case "update":
        if (!dataOrId || !updateData) {
          return {
            success: false,
            error: "ID and data are required for update",
          };
        }
        return await handleUpdate(table, dataOrId, updateData);

      case "delete":
        if (!dataOrId) {
          return { success: false, error: "ID is required for delete" };
        }
        return await handleDelete(table, dataOrId);

      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  } catch (error) {
    console.error("Base function error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// ============================================================================
// UNIVERSAL BASE FUNCTION - METHOD 2: Object Parameter (Even Cleaner!)
// ============================================================================

interface BaseRequest {
  action: Action;
  table: TableName;
  data?: any;
  id?: string;
}

/**
 * Universal base function - object parameter version
 *
 * @example
 * // Create
 * await baseCall({ action: "create", table: "maintenanceEstimate", data: formData });
 *
 * // Fetch all
 * await baseCall({ action: "fetch", table: "company" });
 *
 * // Fetch by ID
 * await baseCall({ action: "fetchById", table: "workorder", id: "uuid-123" });
 *
 * // Update
 * await baseCall({ action: "update", table: "contact", id: "uuid-123", data: updateData });
 *
 * // Delete
 * await baseCall({ action: "delete", table: "jobwalk", id: "uuid-123" });
 */
export async function baseCall(request: BaseRequest): Promise<BaseResponse> {
  const { action, table, data, id } = request;

  try {
    switch (action) {
      case "create":
        if (!data) {
          return { success: false, error: "Data is required for create" };
        }
        return await handleCreate(table, data);

      case "fetch":
        return await handleFetch(table);

      case "fetchById":
        if (!id) {
          return { success: false, error: "ID is required for fetchById" };
        }
        return await handleFetchById(table, id);

      case "update":
        if (!id || !data) {
          return {
            success: false,
            error: "ID and data are required for update",
          };
        }
        return await handleUpdate(table, id, data);

      case "delete":
        if (!id) {
          return { success: false, error: "ID is required for delete" };
        }
        return await handleDelete(table, id);

      default:
        return { success: false, error: `Unknown action: ${action}` };
    }
  } catch (error) {
    console.error("BaseCall function error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// ============================================================================
// HELPER FUNCTIONS - ROUTE TO CORRECT API
// ============================================================================

async function handleCreate(
  table: TableName,
  data: any
): Promise<BaseResponse> {
  switch (table) {
    case "workorder":
      return await createWorkOrder(data as WorkOrderFormData);
    case "jobwalk":
      return await createJobWalk(data as JobWalkFormData);
    case "activity":
      return await createActivity(data as any);
    case "company":
      return await createCompany(data as any);
    case "contact":
      return await createContact(data as any);
    case "site":
      return await createServiceSite(data as any);
    case "maintenanceEstimate":
      return await createMaintenanceEstimate(
        data as MaintenanceEstimateFormData
      );
    default:
      return { success: false, error: `Unknown table: ${table}` };
  }
}

async function handleFetch(table: TableName): Promise<BaseResponse> {
  switch (table) {
    case "workorder":
      return await fetchWorkOrders();
    case "jobwalk":
      return await fetchJobWalks();
    case "activity":
      return await fetchActivities();
    case "company":
      return await fetchCompanies();
    case "contact":
      return await fetchContacts();
    case "site":
      return await fetchServiceSites();
    case "maintenanceEstimate":
      return await fetchMaintenanceEstimates();
    default:
      return { success: false, error: `Unknown table: ${table}` };
  }
}

async function handleFetchById(
  table: TableName,
  id: string
): Promise<BaseResponse> {
  switch (table) {
    case "workorder":
      return await fetchWorkOrderById(id);
    case "jobwalk":
      return await fetchJobWalkById(id);
    case "activity":
      return await fetchActivityById(id);
    case "company":
      return await fetchCompanyById(id);
    case "contact":
      return await fetchContactById(id);
    case "site":
      return await fetchServiceSiteById(id);
    case "maintenanceEstimate":
      return await fetchMaintenanceEstimateById(id);
    default:
      return { success: false, error: `Unknown table: ${table}` };
  }
}

async function handleUpdate(
  table: TableName,
  id: string,
  data: any
): Promise<BaseResponse> {
  switch (table) {
    case "workorder":
      return await updateWorkOrder(id, data as Partial<WorkOrderFormData>);
    case "jobwalk":
      return await updateJobWalk(id, data as Partial<JobWalkFormData>);
    case "activity":
      return await updateActivity(id, data as Partial<any>);
    case "company":
      return await updateCompany(id, data as Partial<any>);
    case "contact":
      return await updateContact(id, data as Partial<any>);
    case "site":
      return await updateServiceSite(id, data as Partial<any>);
    case "maintenanceEstimate":
      return await updateMaintenanceEstimate(
        id,
        data as Partial<MaintenanceEstimateFormData>
      );
    default:
      return { success: false, error: `Unknown table: ${table}` };
  }
}

async function handleDelete(
  table: TableName,
  id: string
): Promise<BaseResponse> {
  switch (table) {
    case "workorder":
      return await deleteWorkOrder(id);
    case "jobwalk":
      return await deleteJobWalk(id);
    case "activity":
      return await deleteActivity(id);
    case "company":
      return await deleteCompany(id);
    case "contact":
      return await deleteContact(id);
    case "site":
      return await deleteServiceSite(id);
    case "maintenanceEstimate":
      return await deleteMaintenanceEstimate(id);
    default:
      return { success: false, error: `Unknown table: ${table}` };
  }
}

// ============================================================================
// KEEP OLD FUNCTIONS FOR BACKWARD COMPATIBILITY (Optional)
// ============================================================================

export async function baseCreate<T>(
  name: TableName,
  data: T
): Promise<BaseResponse> {
  return base("create", name, data);
}

export async function baseFetch(name: TableName): Promise<BaseResponse> {
  return base("fetch", name);
}

export async function baseFetchById(
  name: TableName,
  id: string
): Promise<BaseResponse> {
  return base("fetchById", name, id);
}

export async function baseUpdate<T>(
  name: TableName,
  id: string,
  data: T
): Promise<BaseResponse> {
  return base("update", name, id, data);
}

export async function baseDelete(
  name: TableName,
  id: string
): Promise<BaseResponse> {
  return base("delete", name, id);
}
