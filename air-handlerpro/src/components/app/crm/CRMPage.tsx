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
import { Deal } from "@/components/app/UI-components/table";

interface CRMDashboardProps {
  onShowDealDetail?: (deal: Deal) => void;
}

export default function CRMDashboard({ onShowDealDetail }: CRMDashboardProps) {
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
      value: "2",
      icon: <CRMIcon color="text-gray-400" />,
    },
    {
      title: "Service Sites",
      value: "6",
      icon: <ServiceSitesIcon />,
    },
    {
      title: "Active Customers",
      value: "2",
      icon: <ActiveCustomersIcon />,
    },
    {
      title: "Prospects",
      value: "0",
      icon: <ContactsIcon color="text-gray-400" />,
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

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardContent />;
      case "pipeline":
        return <PipelineContent onDealClick={onShowDealDetail} />;
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
    <div className="flex flex-col p-8">
      <StatsCardsRow stats={topStats} />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {/* <SearchAndFilters
        fields={inputFields}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      /> */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}