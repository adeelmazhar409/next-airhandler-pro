/**
 * BASE SERVICE LAYER - COMPLETE FORM NAVIGATION BRAIN
 * Centralized handler for all CRUD operations across different forms
 *
 * Flow: Components → base.ts → service APIs → Supabase
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
  ActivityFormData,
  Activity,
} from "./api/activites";

// Companies
import {
  createCompany,
  fetchCompanies,
  fetchCompanyById,
  updateCompany,
  deleteCompany,
  CompanyFormData,
} from "./api/companies";

// Contacts
import {
  createContact,
  fetchContacts,
  fetchContactById,
  updateContact,
  deleteContact,
  ContactFormData,
  Contact,
} from "./api/contact";

// Service Sites
import {
  createServiceSite,
  fetchServiceSites,
  fetchServiceSiteById,
  updateServiceSite,
  deleteServiceSite,
  ServiceSiteFormData,
  ServiceSite,
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

export type FormName =
  | "workorder"
  | "jobwalk"
  | "activity"
  | "company"
  | "contact"
  | "site"
  | "maintenanceEstimate";

export type OperationType =
  | "create"
  | "fetch"
  | "fetchById"
  | "update"
  | "delete";

export interface BaseRequest<T = any> {
  name: FormName;
  type: OperationType;
  createData?: T;
  editData?: { id: string; data: T };
  deleteData?: string; // ID to delete
  fetchId?: string; // ID to fetch single record
}

export interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================================================
// MAIN HANDLER FUNCTION
// ============================================================================

/**
 * Main handler function - routes requests to appropriate service
 */
export async function handleFormOperation(
  request: BaseRequest
): Promise<BaseResponse> {
  const { name, type, createData, editData, deleteData, fetchId } = request;

  try {
    // Route based on form name
    switch (name) {
      case "workorder":
        return await handleWorkOrderOperation(type, {
          createData,
          editData,
          deleteData,
          fetchId,
        });

      case "jobwalk":
        return await handleJobWalkOperation(type, {
          createData,
          editData,
          deleteData,
          fetchId,
        });

      case "activity":
        return await handleActivityOperation(type, {
          createData,
          editData,
          deleteData,
          fetchId,
        });

      case "company":
        return await handleCompanyOperation(type, {
          createData,
          editData,
          deleteData,
          fetchId,
        });

      case "contact":
        return await handleContactOperation(type, {
          createData,
          editData,
          deleteData,
          fetchId,
        });

      case "site":
        return await handleSiteOperation(type, {
          createData,
          editData,
          deleteData,
          fetchId,
        });

      case "maintenanceEstimate":
        return await handleMaintenanceEstimateOperation(type, {
          createData,
          editData,
          deleteData,
          fetchId,
        });

      default:
        return {
          success: false,
          error: `Unknown form name: ${name}`,
        };
    }
  } catch (error) {
    console.error("Base handler error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// ============================================================================
// WORK ORDER OPERATIONS HANDLER
// ============================================================================

async function handleWorkOrderOperation(
  type: OperationType,
  data: {
    createData?: any;
    editData?: any;
    deleteData?: any;
    fetchId?: string;
  }
): Promise<BaseResponse> {
  switch (type) {
    case "create":
      if (!data.createData) {
        return { success: false, error: "Create data is required" };
      }
      return await createWorkOrder(data.createData as WorkOrderFormData);

    case "fetch":
      return await fetchWorkOrders();

    case "fetchById":
      if (!data.fetchId) {
        return { success: false, error: "ID is required for fetchById" };
      }
      return await fetchWorkOrderById(data.fetchId);

    case "update":
      if (!data.editData || !data.editData.id) {
        return { success: false, error: "Edit data with ID is required" };
      }
      return await updateWorkOrder(
        data.editData.id,
        data.editData.data as Partial<WorkOrderFormData>
      );

    case "delete":
      if (!data.deleteData) {
        return { success: false, error: "Delete ID is required" };
      }
      return await deleteWorkOrder(data.deleteData);

    default:
      return { success: false, error: `Unknown operation type: ${type}` };
  }
}

// ============================================================================
// JOB WALK OPERATIONS HANDLER
// ============================================================================

async function handleJobWalkOperation(
  type: OperationType,
  data: {
    createData?: any;
    editData?: any;
    deleteData?: any;
    fetchId?: string;
  }
): Promise<BaseResponse> {
  switch (type) {
    case "create":
      if (!data.createData) {
        return { success: false, error: "Create data is required" };
      }
      return await createJobWalk(data.createData as JobWalkFormData);

    case "fetch":
      return await fetchJobWalks();

    case "fetchById":
      if (!data.fetchId) {
        return { success: false, error: "ID is required for fetchById" };
      }
      return await fetchJobWalkById(data.fetchId);

    case "update":
      if (!data.editData || !data.editData.id) {
        return { success: false, error: "Edit data with ID is required" };
      }
      return await updateJobWalk(
        data.editData.id,
        data.editData.data as Partial<JobWalkFormData>
      );

    case "delete":
      if (!data.deleteData) {
        return { success: false, error: "Delete ID is required" };
      }
      return await deleteJobWalk(data.deleteData);

    default:
      return { success: false, error: `Unknown operation type: ${type}` };
  }
}

// ============================================================================
// ACTIVITY OPERATIONS HANDLER
// ============================================================================

async function handleActivityOperation(
  type: OperationType,
  data: {
    createData?: any;
    editData?: any;
    deleteData?: any;
    fetchId?: string;
  }
): Promise<BaseResponse> {
  switch (type) {
    case "create":
      if (!data.createData) {
        return { success: false, error: "Create data is required" };
      }
      return await createActivity(data.createData as ActivityFormData);

    case "fetch":
      return await fetchActivities();

    case "fetchById":
      if (!data.fetchId) {
        return { success: false, error: "ID is required for fetchById" };
      }
      return await fetchActivityById(data.fetchId);

    case "update":
      if (!data.editData || !data.editData.id) {
        return { success: false, error: "Edit data with ID is required" };
      }
      return await updateActivity(
        data.editData.id,
        data.editData.data as Partial<ActivityFormData>
      );

    case "delete":
      if (!data.deleteData) {
        return { success: false, error: "Delete ID is required" };
      }
      return await deleteActivity(data.deleteData);

    default:
      return { success: false, error: `Unknown operation type: ${type}` };
  }
}

// ============================================================================
// COMPANY OPERATIONS HANDLER
// ============================================================================

async function handleCompanyOperation(
  type: OperationType,
  data: {
    createData?: any;
    editData?: any;
    deleteData?: any;
    fetchId?: string;
  }
): Promise<BaseResponse> {
  switch (type) {
    case "create":
      if (!data.createData) {
        return { success: false, error: "Create data is required" };
      }
      return await createCompany(data.createData as CompanyFormData);

    case "fetch":
      return await fetchCompanies();

    case "fetchById":
      if (!data.fetchId) {
        return { success: false, error: "ID is required for fetchById" };
      }
      return await fetchCompanyById(data.fetchId);

    case "update":
      if (!data.editData || !data.editData.id) {
        return { success: false, error: "Edit data with ID is required" };
      }
      return await updateCompany(
        data.editData.id,
        data.editData.data as Partial<CompanyFormData>
      );

    case "delete":
      if (!data.deleteData) {
        return { success: false, error: "Delete ID is required" };
      }
      return await deleteCompany(data.deleteData);

    default:
      return { success: false, error: `Unknown operation type: ${type}` };
  }
}

// ============================================================================
// CONTACT OPERATIONS HANDLER
// ============================================================================

async function handleContactOperation(
  type: OperationType,
  data: {
    createData?: any;
    editData?: any;
    deleteData?: any;
    fetchId?: string;
  }
): Promise<BaseResponse> {
  switch (type) {
    case "create":
      if (!data.createData) {
        return { success: false, error: "Create data is required" };
      }
      return await createContact(data.createData as ContactFormData);

    case "fetch":
      return await fetchContacts();

    case "fetchById":
      if (!data.fetchId) {
        return { success: false, error: "ID is required for fetchById" };
      }
      return await fetchContactById(data.fetchId);

    case "update":
      if (!data.editData || !data.editData.id) {
        return { success: false, error: "Edit data with ID is required" };
      }
      return await updateContact(
        data.editData.id,
        data.editData.data as Partial<ContactFormData>
      );

    case "delete":
      if (!data.deleteData) {
        return { success: false, error: "Delete ID is required" };
      }
      return await deleteContact(data.deleteData);

    default:
      return { success: false, error: `Unknown operation type: ${type}` };
  }
}

// ============================================================================
// SERVICE SITE OPERATIONS HANDLER
// ============================================================================

async function handleSiteOperation(
  type: OperationType,
  data: {
    createData?: any;
    editData?: any;
    deleteData?: any;
    fetchId?: string;
  }
): Promise<BaseResponse> {
  switch (type) {
    case "create":
      if (!data.createData) {
        return { success: false, error: "Create data is required" };
      }
      return await createServiceSite(data.createData as ServiceSiteFormData);

    case "fetch":
      return await fetchServiceSites();

    case "fetchById":
      if (!data.fetchId) {
        return { success: false, error: "ID is required for fetchById" };
      }
      return await fetchServiceSiteById(data.fetchId);

    case "update":
      if (!data.editData || !data.editData.id) {
        return { success: false, error: "Edit data with ID is required" };
      }
      return await updateServiceSite(
        data.editData.id,
        data.editData.data as Partial<ServiceSiteFormData>
      );

    case "delete":
      if (!data.deleteData) {
        return { success: false, error: "Delete ID is required" };
      }
      return await deleteServiceSite(data.deleteData);

    default:
      return { success: false, error: `Unknown operation type: ${type}` };
  }
}

// ============================================================================
// MAINTENANCE ESTIMATE OPERATIONS HANDLER
// ============================================================================

async function handleMaintenanceEstimateOperation(
  type: OperationType,
  data: {
    createData?: any;
    editData?: any;
    deleteData?: any;
    fetchId?: string;
  }
): Promise<BaseResponse> {
  switch (type) {
    case "create":
      if (!data.createData) {
        return { success: false, error: "Create data is required" };
      }
      return await createMaintenanceEstimate(
        data.createData as MaintenanceEstimateFormData
      );

    case "fetch":
      return await fetchMaintenanceEstimates();

    case "fetchById":
      if (!data.fetchId) {
        return { success: false, error: "ID is required for fetchById" };
      }
      return await fetchMaintenanceEstimateById(data.fetchId);

    case "update":
      if (!data.editData || !data.editData.id) {
        return { success: false, error: "Edit data with ID is required" };
      }
      return await updateMaintenanceEstimate(
        data.editData.id,
        data.editData.data as Partial<MaintenanceEstimateFormData>
      );

    case "delete":
      if (!data.deleteData) {
        return { success: false, error: "Delete ID is required" };
      }
      return await deleteMaintenanceEstimate(data.deleteData);

    default:
      return { success: false, error: `Unknown operation type: ${type}` };
  }
}

// ============================================================================
// CONVENIENCE WRAPPERS - Simplified API for common operations
// ============================================================================

/**
 * Quick create wrapper
 */
export async function baseCreate<T>(
  name: FormName,
  data: T
): Promise<BaseResponse> {
  return handleFormOperation({ name, type: "create", createData: data });
}

/**
 * Quick fetch all wrapper
 */
export async function baseFetch(name: FormName): Promise<BaseResponse> {
  return handleFormOperation({ name, type: "fetch" });
}

/**
 * Quick fetch by ID wrapper
 */
export async function baseFetchById(
  name: FormName,
  id: string
): Promise<BaseResponse> {
  return handleFormOperation({ name, type: "fetchById", fetchId: id });
}

/**
 * Quick update wrapper
 */
export async function baseUpdate<T>(
  name: FormName,
  id: string,
  data: T
): Promise<BaseResponse> {
  return handleFormOperation({
    name,
    type: "update",
    editData: { id, data },
  });
}

/**
 * Quick delete wrapper
 */
export async function baseDelete(
  name: FormName,
  id: string
): Promise<BaseResponse> {
  return handleFormOperation({ name, type: "delete", deleteData: id });
}
