import React, { useCallback, useEffect } from "react";
import StatsCard from "../../UI-components/StatsCard";
import { ContactsIcon, NocontactIcon } from "../../../icons/icons";
import Actbox from "../../UI-components/Actbox";
import { useState } from "react";
import ContactsExample from "../../UI-components/ContactPageDataFormed";
import Button from "../../UI-components/button";
import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "@/service/api/contact";
import { buildFinalContactObject } from "@/components/utility/HelperFunctions";
import { contactLinkTable } from "@/components/forms/forms-instructions/ContactProp";
import { supabase } from "@/lib/supabase";
import { CreateContactForm } from "../../contacts/CreateContactForm";

export default function ContactsContent() {
  const [contactFormToggle, setContactFormToggle] = useState(false);
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactData, setContactData] = useState<any | null>(null);
  const [linkTableData, setLinkTableData] = useState<any[]>([]);
  const [editingContact, setEditingContact] = useState<any | null>(null);

  // Memoized fetch functions to avoid recreating on every render
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch companies
      const contactsResponse = await fetchContacts();

      if (!contactsResponse.success) {
        setError(contactsResponse.error || "Failed to load contacts");
      } else {
        setContactData(contactsResponse.data);
      }

      // Fetch link table data in parallel
      const promises = contactLinkTable.map(async (table: any) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] }; // Return empty on error
        }
        return { [table]: data };
      });
      const results = await Promise.all(promises);
      const contactsViewData = buildFinalContactObject(
        contactsResponse.data || [],
        results
      );
      
      setContacts(contactsViewData || []);
      setLinkTableData(results);
    } catch (err: any) {
      console.error("Error loading data:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger refresh
  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      await deleteContact(contactId);
      triggerRefresh();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  const handleEditContact = (contact: any) => {
    setEditingContact(contactData.find((c: any) => c.id === contact));
    setContactFormToggle(true);
  };

  const handleCreateContact = () => {
    setContactFormToggle(true);
  };

  const handleCancel = () => {
    setContactFormToggle(false);
    setEditingContact(null);
  };

  const handleSubmit = (formData: any) => {
    formData.id
      ? updateContact(formData.id, formData)
      : createContact(formData);
    console.log(formData);
    setContactFormToggle(false);
    setEditingContact(null);
    triggerRefresh(); // Refresh data after submit
  };

  // Load data on mount and refresh
  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

  // Early returns for forms
  if (contactFormToggle) {
    return (
      <CreateContactForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        linkTableData={linkTableData}
        editingContact={editingContact}
      />
    );
  }
  const data = true;

  return (
    <div className=" ">
      {/* Main Content */}

      {/* Section Title Below */}
      <div className="flex  w-full justify-end">
        <Button onClick={handleCreateContact} value="Create contact" />
      </div>
      <div className="mx-auto mt-6 px-4">
        {/* Stats Overview Card */}
        <div className="bg-white rounded-lg border border-silver shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-4 h-4 text-cerulean"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-sm font-bold text-charcoal">
              Contact Management
            </h2>
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">{contacts.length}</div>
              <div className="text-[11px] text-slate mt-0.5">
                Total Contacts
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">{contacts.filter((contact: any) => contact.contact_status === "Active").length || 0}</div>
              <div className="text-[11px] text-slate mt-0.5">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">{contacts.filter((contact: any) => contact.contact_status === "Prospect").length || 0}</div>
              <div className="text-[11px] text-slate mt-0.5">Prospects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">{contacts.filter((contact: any) => contact.contact_status === "Customer").length || 0}</div>
              <div className="text-[11px] text-slate mt-0.5">Customers</div>
            </div>
          </div>

          {/* Empty State */}

          {data ? (
            <ContactsExample
              key={refreshKey}
              loading={loading}
              error={error}
              contacts={contacts}
              handleDeleteContact={handleDeleteContact}
              onEditContact={handleEditContact}
            />
          ) : (
            <div><Actbox value="Contacts" icon={<ContactsIcon />} description="No contacts found" /></div>
          )}
        </div>
      </div>
    </div>
  );
}
