import { useState } from "react";
import SearchAndFilters from "../UI-components/SearchAndFilter";
import StatsCardsRow from "../UI-components/StatCardRow";
import TabNavigation from "../UI-components/TopNavigation";
import {
  ActiveCustomersIcon,
  ContactsIcon,
  CRMIcon,
  ServiceSitesIcon,
} from "@/components/icons/icons";
import DashboardContent from "./content/DashboardContent";
import PipelineContent from "./content/PipelineContent";
import ActivitiesContent from "./content/ActivitiesContent";
import ContactsContent from "./content/ContactsContent";
import CompaniesContent from "./content/CompaniesContent";
import { InputField } from "@/components/interface/DataTypes";

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const tabs = [
    { name: "Dashboard", value: "Dashboard" },
    { name: "Pipeline", value: "pipeline" },
    { name: "Activities", value: "activities" },
    { name: "Contacts", value: "contacts" },
    { name: "Companies", value: "companies" },
  ];

  const topStats = [
    {
      title: "Total Companies",
      value: "0",
      icon: <CRMIcon />,
      hoverable: false,
    },
    {
      title: "Service Sites",
      value: "0",
      icon: <ServiceSitesIcon />,
    },
    {
      title: "Active Customers",
      value: "0",
      icon: <ActiveCustomersIcon />,
    },
    {
      title: "Prospects",
      value: "0",
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
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardContent />;
      case "pipeline":
        return <PipelineContent />;
      case "activities":
        return <ActivitiesContent />;
      case "contacts":
        return <ContactsContent />;
      case "companies":
        return <CompaniesContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="p-8 bg-platinum/10">
      <SearchAndFilters
        fields={inputFields}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
      <StatsCardsRow stats={topStats} />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {renderTabContent()}
    </div>
  );
}
