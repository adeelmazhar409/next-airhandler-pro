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

export default function ContactsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("");

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
        <Button value="Contact" />
      </div>
      {/* Stats Cards Row */}
      <StatsCardsRow stats={topStats} />

      {/* Search and Filters Row */}
      <SearchAndFilters
        fields={inputFields}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {/* Results Count */}
    
      {/* Empty State */}
     {
           data ? (
             <ContactsExample/>
        ) : (
            <>
            <div className="mb-6">
        <p className="text-sm text-slate">Showing 0 of 0 contacts</p>
      </div>

            <Actbox {...value} /></>)
           }
        
    </div>
  );
}
