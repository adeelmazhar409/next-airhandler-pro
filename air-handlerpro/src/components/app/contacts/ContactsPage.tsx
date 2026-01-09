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
import { LayoutGrid, List } from "lucide-react";

export default function ContactsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortBy, setSortBy] = useState("Name");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [contactFormToggle, setContactFormToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactData, setContactData] = useState<any | null>(null);
  const [linkTableData, setLinkTableData] = useState<any[]>([]);
  const [editingContact, setEditingContact] = useState<any | null>(null);

  // Get unique statuses and types from contacts
  const contactStatuses = useMemo(() => {
    const statuses = new Set(
      contacts.map((c) => c.contact_status).filter(Boolean)
    );
    return ["All Statuses", ...Array.from(statuses)];
  }, [contacts]);

  const contactTypes = useMemo(() => {
    const types = new Set(contacts.map((c) => c.contact_type).filter(Boolean));
    return ["All Types", ...Array.from(types)];
  }, [contacts]);

  // Filter and sort contacts
  const filteredAndSortedContacts = useMemo(() => {
    let result = [...contacts];

    // Apply search filter
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase().trim();
      result = result.filter((contact) => {
        const firstName = contact.first_name?.toLowerCase() || "";
        const lastName = contact.last_name?.toLowerCase() || "";
        const fullName = `${firstName} ${lastName}`.trim();
        const email = contact.email?.toLowerCase() || "";
        const phone = contact.phone?.toLowerCase() || "";
        const title = contact.title?.toLowerCase() || "";
        const department = contact.department?.toLowerCase() || "";
        const companyName = contact.company_name?.toLowerCase() || "";

        return (
          firstName.includes(searchLower) ||
          lastName.includes(searchLower) ||
          fullName.includes(searchLower) ||
          email.includes(searchLower) ||
          phone.includes(searchLower) ||
          title.includes(searchLower) ||
          department.includes(searchLower) ||
          companyName.includes(searchLower)
        );
      });
    }

    // Apply status filter
    if (selectedStatus !== "All Statuses") {
      result = result.filter(
        (contact) => contact.contact_status === selectedStatus
      );
    }

    // Apply type filter
    if (selectedType !== "All Types") {
      result = result.filter(
        (contact) => contact.contact_type === selectedType
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "Name":
          const nameA = `${a.first_name || ""} ${a.last_name || ""}`.trim();
          const nameB = `${b.first_name || ""} ${b.last_name || ""}`.trim();
          return nameA.localeCompare(nameB);

        case "Recent Activity":
          const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
          const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
          return dateB - dateA; // Most recent first

        case "Contact Score":
          // Placeholder - you can add score logic later
          return 0;

        case "Company":
          const companyA = a.company_name || "";
          const companyB = b.company_name || "";
          return companyA.localeCompare(companyB);

        default:
          return 0;
      }
    });

    return result;
  }, [contacts, searchValue, selectedStatus, selectedType, sortBy]);

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

  const handleEditContact = (contact: any) => {
    setEditingContact(contact);
    setContactFormToggle(true);
  };

  const handleDeleteContact = async (
    contactId: string,
    contactName: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${contactName}"?`
    );
    if (confirmed) {
      const result = await deleteContact(contactId);
      if (result.success) {
        triggerRefresh();
      }
    }
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

  // Calculate stats dynamically
  const activeCount = contacts.filter(
    (c) => c.contact_status === "Active"
  ).length;
  const prospectCount = contacts.filter(
    (c) => c.contact_status === "Prospect"
  ).length;
  const customerCount = contacts.filter(
    (c) => c.contact_status === "Customer"
  ).length;

  const topStats = [
    {
      title: "Total Contacts",
      value: contacts.length.toString(),
      icon: <ContactsIcon />,
      hoverable: false,
    },
    {
      title: "Active",
      value: activeCount.toString(),
      icon: <ActiveCustomersIcon />,
    },
    {
      title: "Customers",
      value: customerCount.toString(),
      icon: <CRMIcon />,
    },
    {
      title: "Prospects",
      value: prospectCount.toString(),
      icon: <ServiceSitesIcon />,
    },
  ];

  const inputFields: InputField[] = [
    {
      type: "search",
      placeholder: "Search contacts by name, email, title, or department...",
      disable: false,
      show: true,
      onChange: (value) => setSearchValue(value),
    },
    {
      type: "dropdownButton",
      name: selectedStatus,
      options: contactStatuses,
      disable: false,
      show: true,
      onChange: (value) => setSelectedStatus(value),
    },
    {
      type: "dropdownButton",
      name: selectedType,
      options: contactTypes,
      disable: false,
      show: true,
      onChange: (value) => setSelectedType(value),
    },
    {
      type: "dropdownButton",
      name: sortBy,
      options: ["Name", "Recent Activity", "Contact Score", "Company"],
      disable: false,
      show: true,
      onChange: (value) => setSortBy(value),
    },
    {
      type: "gridButton",
      disable: false,
      show: true,
      onClick: () => setViewMode("grid"),
    },
    {
      type: "listButton",
      disable: false,
      show: true,
      onClick: () => setViewMode("list"),
    },
  ];

  const data = contacts.length > 0;
  const value = {
    header: false,
    value: "Contacts",
    icon: <NocontactIcon />,
    description: "Manage your customer and prospect relationships here.",
  };

  return (
    <div className="bg-platinum/10 p-8">
      <div className="flex justify-between items-center mb-6">
        <Heading
          title="Contacts"
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

      {/* Results count */}
      {data && (
        <div className="mb-4 text-sm text-slate">
          Showing {filteredAndSortedContacts.length} of {contacts.length}{" "}
          contacts
        </div>
      )}

      {data ? (
        <ContactsExample
          key={refreshKey}
          loading={loading}
          error={error}
          contacts={filteredAndSortedContacts}
          handleDeleteContact={handleDeleteContact}
          onEditContact={handleEditContact}
          viewMode={viewMode}
        />
      ) : (
        <Actbox {...value} />
      )}
    </div>
  );
}
