import { useState } from "react";
import SearchAndFilters from "./UI-components/SearchAndFilter";
import StatsCardsRow from "./UI-components/StatCardRow";
import TabNavigation from "./UI-components/TopNavigation";
import { ActiveCustomersIcon, ContactsIcon, CRMIcon, ServiceSitesIcon } from "@/components/icons/icons";
import DashboardContent from "./content/DashboardContent";
import PipelineContent from "./content/PipelineContent";
import ActivitiesContent from "./content/ActivitiesContent";
import ContactsContent from "./content/ContactsContent";
import CompaniesContent from "./content/CompaniesContent";

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

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

  const InputData = {
    value1: "All Types",
    value2: "Filter",
    value3: "Sort",
  }

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
    <div className="p-8">
      <SearchAndFilters  {...InputData}  />
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
