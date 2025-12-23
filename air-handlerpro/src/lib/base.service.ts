/**
 * Base Service Types and Utilities
 * Shared across all service files for consistency
 */

import { PostgrestError } from '@supabase/supabase-js';

/**
 * Standard response format for all service operations
 */
export type ServiceResponse<T> = {
  data: T | null;
  error: PostgrestError | Error | null;
  success: boolean;
};

/**
 * Response type for list/array operations
 */
export type ListResponse<T> = ServiceResponse<T[]>;

/**
 * Helper to create consistent service responses
 */
export const createResponse = <T>(
  data: T | null,
  error: PostgrestError | Error | null = null
): ServiceResponse<T> => ({
  data,
  error,
  success: !error && data !== null,
});
