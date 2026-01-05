import { useState } from "react";
import StatsCardsRow from "../UI-components/StatCardRow";
import Heading from "../Heading";
import Button from "../UI-components/button";
import SearchAndFilters from "../UI-components/SearchAndFilter";
import Actbox from "../UI-components/Actbox";
import ContactsExample from "../UI-components/ContactPageDataFormed";
import {
  ActiveCustomersIcon,
  ContactsIcon,
  CRMIcon,
  ServiceSitesIcon,
  NocontactIcon,
} from "@/components/icons/icons";
import { InputField } from "@/components/interface/DataTypes";
import { CreateContactForm } from "./CreateContactForm";
import React, { useCallback, useEffect } from "react";
import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "@/service/api/contact";
import { buildFinalContactObject } from "@/components/utility/HelperFunctions";
import { contactLinkTable } from "@/components/forms/forms-instructions/ContactProp";
import { supabase } from "@/lib/supabase";

export default function ContactsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("");
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

  const topStats = [
    {
      title: "Total Companies",
      value: "2",
      icon: <CRMIcon />,
      hoverable: false,
    },
    {
      title: "Service Sites",
      value: "1",
      icon: <ServiceSitesIcon />,
    },
    {
      title: "Active Customers",
      value: "0",
      icon: <ActiveCustomersIcon />,
    },
    {
      title: "Prospects",
      value: "1",
      icon: <ContactsIcon />,
    },
  ];

  const inputFields: InputField[] = [
    {
      type: "search",
      placeholder: "Enter name to search...",
      disable: false,
      show: true,
      onChange: (value) => console.log("Search:", value),
    },
    {
      type: "dropdownButton",
      name: "All Types",
      options: ["Type 1", "Type 2", "Type 3", "Type 4"],
      disable: false,
      show: true,
      onChange: (value) => setSelectedType(value),
    },
    {
      type: "filterButton",
      name: "Filter",
      disable: false,
      show: true,
      onClick: () => console.log("Filter clicked"),
    },
    {
      type: "sortButton",
      name: "Sort",
      disable: false,
      show: true,
      onClick: () => console.log("Sort clicked"),
    },
    {
      type: "gridButton",
      disable: false,
      show: true,
      onClick: () => console.log("Grid view"),
    },
    {
      type: "listButton",
      disable: false,
      show: true,
      onClick: () => console.log("List view"),
    },
  ];

  const data = true;
  const value = {
    header: false,
    value: "Contacts",
    icon: <NocontactIcon />,
    description: "Manage your customer and prospect relationships here.",
  };

  return (
    <div className="bg-platinum/10 p-8">
      <div className="flex justify-between items-center">
        <Heading
          title="Contact"
          description="Manage your customer and prospect relationships"
        />
        <Button onClick={handleCreateContact} value="New Contact" />
      </div>
      {/* Stats Cards Row */}
      <StatsCardsRow stats={topStats} />

      {/* Search and Filters Row */}
      <SearchAndFilters
        fields={inputFields}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

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
        <>
          <div className="mb-6">
            <p className="text-sm text-slate">Showing 0 of 0 contacts</p>
          </div>

          <Actbox {...value} />
        </>
      )}
    </div>
  );
}
