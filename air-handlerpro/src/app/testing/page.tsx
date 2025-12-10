"use client";

import { useState } from "react";
import Sidebar from "@/components/crm/Sidebar";
import Header from "@/components/crm/Header";
import SearchAndFilters from "@/components/crm/SearchAndFilter";
import StatsCardsRow from "@/components/crm/StatCardRow";
import TabNavigation from "@/components/crm/TopNavigation";
import DashboardContent from "@/components/crm/DashboardContent";
import PipelineContent from "@/components/crm/PipelineContent";
import ActivitiesContent from "@/components/crm/ActivitiesContent";
import ContactsContent from "@/components/crm/ContactsContent";
import CompaniesContent from "@/components/crm/CompaniesContent";
import {
  ContactsIcon,
  CRMIcon,
  ServiceSitesIcon,
  ActiveCustomersIcon,
} from "@/components/icons/icons";

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { name: "Dashboard", value: "dashboard" },
    { name: "Pipeline", value: "pipeline" },
    { name: "Activities", value: "activities" },
    { name: "Contacts", value: "contacts" },
    { name: "Companies", value: "companies" },
  ];

  const topStatsData = [
    {
      title: "Total Companies",
      value: "0",
      icon: <CRMIcon />,
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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <Header />

        <div className="p-8">
          <SearchAndFilters />
          <StatsCardsRow stats={topStatsData} />
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
