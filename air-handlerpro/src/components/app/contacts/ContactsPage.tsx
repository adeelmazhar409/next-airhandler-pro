import { useState, useMemo } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactData, setContactData] = useState<any | null>(null);
  const [linkTableData, setLinkTableData] = useState<any[]>([]);
  const [editingContact, setEditingContact] = useState<any | null>(null);

  // Filter contacts based on search value
  const filteredContacts = useMemo(() => {
    if (!searchValue.trim()) {
      return contacts;
    }

    const searchLower = searchValue.toLowerCase().trim();

    return contacts.filter((contact) => {
      // Search in first name
      const firstName = contact.first_name?.toLowerCase() || "";
      // Search in last name
      const lastName = contact.last_name?.toLowerCase() || "";
      // Search in full name
      const fullName = `${firstName} ${lastName}`.trim();
      // Search in email
      const email = contact.email?.toLowerCase() || "";
      // Search in phone
      const phone = contact.phone?.toLowerCase() || "";
      // Search in company name
      const companyName = contact.company_name?.toLowerCase() || "";

      return (
        firstName.includes(searchLower) ||
        lastName.includes(searchLower) ||
        fullName.includes(searchLower) ||
        email.includes(searchLower) ||
        phone.includes(searchLower) ||
        companyName.includes(searchLower)
      );
    });
  }, [contacts, searchValue]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const contactsResponse = await fetchContacts();

      if (!contactsResponse.success) {
        setError(contactsResponse.error || "Failed to load contacts");
      } else {
        setContactData(contactsResponse.data);
      }

      const promises = contactLinkTable.map(async (table: any) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] };
        }
        return { [table]: data };
      });
      const results = await Promise.all(promises);

      const viewData = buildFinalContactObject(
        contactsResponse.data || [],
        results
      );

      setContacts(viewData || []);
      setLinkTableData(results);
    } catch (err: any) {
      console.error("Error loading data:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleCreateContact = () => {
    setEditingContact(null);
    setContactFormToggle(true);
  };

  const handleCancel = () => {
    setContactFormToggle(false);
    setEditingContact(null);
  };

  const handleSubmit = async (formData: any) => {
    const result = formData.id
      ? await updateContact(formData.id, formData)
      : await createContact(formData);
    console.log(formData);
    setContactFormToggle(false);
    setEditingContact(null);
    triggerRefresh();
  };

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
      placeholder: "Search by name, email, phone, or company...",
      disable: false,
      show: true,
      onChange: (value) => setSearchValue(value),
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

      <StatsCardsRow stats={topStats} />

      <SearchAndFilters
        fields={inputFields}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {data ? (
        <ContactsExample
          key={refreshKey}
          loading={loading}
          error={error}
          contacts={filteredContacts} // Use filtered contacts here
        />
      ) : (
        <Actbox {...value} />
      )}
    </div>
  );
}
