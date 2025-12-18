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

export default function ContactsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [formToggle, setFormToggle] = useState(false);

  const handleCreateContact = () => {
    setFormToggle(true);
  };

  const handleCancel = () => {
    setFormToggle(false);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission logic
    // After successful submission, you might want to close the form:
    // setFormToggle(false);
  };

  if (formToggle) {
    return (
      <CreateContactForm onCancel={handleCancel} onSubmit={handleSubmit} />
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
        <ContactsExample />
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
