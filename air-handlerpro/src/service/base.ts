/**
 * BASE SERVICE LAYER - FORM NAVIGATION BRAIN
 * Centralized handler for all CRUD operations across different forms
 *
 * Flow: Services (workorder.ts, jobwalks.ts, etc.) → base.ts → Components
 */

import {
  createWorkOrder,
  fetchWorkOrders,
  fetchWorkOrderById,
  updateWorkOrder,
  deleteWorkOrder,
  WorkOrderFormData,
  WorkOrder,
} from "./api/workorder";

import {
  createJobWalk,
  fetchJobWalks,
  fetchJobWalkById,
  updateJobWalk,
  deleteJobWalk,
  JobWalkFormData,
  JobWalk,
} from "./api/jobwalks";

// Types
export type FormName = "workorder" | "jobwalk";
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

/**
 * Work Order Operations Handler
 */
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

/**
 * Job Walk Operations Handler
 */
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
