/**
 * Service Site Service
 * Handles CRUD operations for service sites
 */

import { supabase } from '../lib/supabase';
import { createResponse, ServiceResponse, ListResponse } from '../lib/base.service';

/**
 * Service Site Data Interface
 * Matches the Site form fields from SiteProp.tsx
 */
export interface ServiceSite {
  id?: string;
  created_at?: string;
  updated_at?: string;

  // Basic Information
  site_name: string;
  parent_company_id?: string;
  service_address?: string;

  // Contact Information
  primary_contact_id?: string;

  // Owner Settings
  manually_set_owner?: boolean;
  site_owner?: string;
}

/**
 * Service Site with Related Data
 * Includes joined data from parent company and primary contact
 */
export interface ServiceSiteWithRelations extends ServiceSite {
  parent_company?: {
    id: string;
    business_name: string;
  };
  primary_contact?: {
    id: string;
    first_name: string;
    last_name: string;
    email?: string;
  };
}

/**
 * GET - Fetch all service sites with optional filters
 *
 * @param filters - Optional filters to apply
 * @returns Promise with array of service sites including related data
 *
 * @example
 * const response = await getSites({ parent_company_id: '123' });
 * if (response.success) {
 *   console.log(response.data);
 * }
 */
export const getSites = async (
  filters?: {
    parent_company_id?: string;
    site_owner?: string;
  }
): Promise<ListResponse<ServiceSiteWithRelations>> => {
  let query = supabase
    .from('service_sites')
    .select(`
      *,
      parent_company:companies!parent_company_id(id, business_name),
      primary_contact:contacts!primary_contact_id(id, first_name, last_name, email)
    `)
    .order('created_at', { ascending: false });

  // Apply filters if provided
  if (filters?.parent_company_id) {
    query = query.eq('parent_company_id', filters.parent_company_id);
  }
  if (filters?.site_owner) {
    query = query.eq('site_owner', filters.site_owner);
  }

  const { data, error } = await query;
  return createResponse(data || [], error);
};

/**
 * GET - Fetch a single service site by ID
 *
 * @param id - The service site ID
 * @returns Promise with service site data including relationships
 *
 * @example
 * const response = await getSite('abc-123');
 * if (response.success && response.data) {
 *   console.log(response.data.site_name);
 * }
 */
export const getSite = async (
  id: string
): Promise<ServiceResponse<ServiceSiteWithRelations>> => {
  const { data, error } = await supabase
    .from('service_sites')
    .select(`
      *,
      parent_company:companies!parent_company_id(id, business_name),
      primary_contact:contacts!primary_contact_id(id, first_name, last_name, email)
    `)
    .eq('id', id)
    .single();

  return createResponse(data, error);
};

/**
 * ADD - Create a new service site
 *
 * @param site - Service site data (without id, created_at, updated_at)
 * @returns Promise with newly created service site
 *
 * @example
 * const response = await addSite({
 *   site_name: 'Main Office',
 *   service_address: '123 Main St, City, ST 12345',
 *   parent_company_id: 'company-123',
 *   primary_contact_id: 'contact-456'
 * });
 *
 * if (response.success) {
 *   console.log('Site created:', response.data?.id);
 * } else {
 *   console.error('Error:', response.error?.message);
 * }
 */
export const addSite = async (
  site: Omit<ServiceSite, 'id' | 'created_at' | 'updated_at'>
): Promise<ServiceResponse<ServiceSite>> => {
  const { data, error } = await supabase
    .from('service_sites')
    .insert([site])
    .select()
    .single();

  return createResponse(data, error);
};

/**
 * UPDATE - Update an existing service site
 *
 * @param id - The service site ID to update
 * @param updates - Partial service site data to update
 * @returns Promise with updated service site
 *
 * @example
 * const response = await updateSite('site-123', {
 *   site_name: 'Updated Name',
 *   service_address: 'New Address'
 * });
 *
 * if (response.success) {
 *   console.log('Updated successfully');
 * }
 */
export const updateSite = async (
  id: string,
  updates: Partial<Omit<ServiceSite, 'id' | 'created_at'>>
): Promise<ServiceResponse<ServiceSite>> => {
  const { data, error } = await supabase
    .from('service_sites')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  return createResponse(data, error);
};

/**
 * DELETE - Delete a service site
 *
 * @param id - The service site ID to delete
 * @returns Promise with success/error status
 *
 * @example
 * const response = await deleteSite('site-123');
 * if (response.success) {
 *   console.log('Site deleted successfully');
 * } else {
 *   console.error('Failed to delete:', response.error?.message);
 * }
 */
export const deleteSite = async (
  id: string
): Promise<ServiceResponse<null>> => {
  const { error } = await supabase
    .from('service_sites')
    .delete()
    .eq('id', id);

  return createResponse(null, error);
};

/**
 * SEARCH - Search service sites by name or address
 *
 * @param searchTerm - The search term to match against site_name or service_address
 * @returns Promise with matching service sites
 *
 * @example
 * const response = await searchSites('main office');
 * if (response.success) {
 *   console.log(`Found ${response.data?.length} sites`);
 * }
 */
export const searchSites = async (
  searchTerm: string
): Promise<ListResponse<ServiceSiteWithRelations>> => {
  const { data, error } = await supabase
    .from('service_sites')
    .select(`
      *,
      parent_company:companies!parent_company_id(id, business_name),
      primary_contact:contacts!primary_contact_id(id, first_name, last_name, email)
    `)
    .or(`site_name.ilike.%${searchTerm}%,service_address.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  return createResponse(data || [], error);
};
