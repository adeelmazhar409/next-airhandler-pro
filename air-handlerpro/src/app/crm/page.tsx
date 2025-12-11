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
import ContactsPage from "@/components/crm/Sidebar-comp/ContactsPage";
import AIEstimateBuilderPage from "@/components/crm/Sidebar-comp/AIEstimateBuilderPage";
import ServiceEstimateProPage from "@/components/crm/Sidebar-comp/ServiceEstimateProPage";
import MaintenanceEstimateProPage from "@/components/crm/Sidebar-comp/MaintenanceEstimateProPage";
import ServiceReportsPage from "@/components/crm/Sidebar-comp/ServiceReportsPage";
import JobWalksPage from "@/components/crm/Sidebar-comp/JobWalksPage";
import {
  CRMIcon,
  ServiceSitesIcon,
  ActiveCustomersIcon,
  ContactsIcon,
} from "@/components/icons/icons";

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activePage, setActivePage] = useState("crm");

  const tabs = [
    { name: "Dashboard", value: "dashboard" },
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

  const renderTabContent = () => {
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

  const renderCRMPage = () => (
    <>
      <SearchAndFilters />
      <StatsCardsRow stats={topStats} />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {renderTabContent()}
    </>
  );

const renderPage = () => {
  const pages: Record<string, React.ReactElement> = {
    crm: renderCRMPage(),
    contacts: <ContactsPage />,
    "ai-estimate": <AIEstimateBuilderPage />,
    "service-estimate": <ServiceEstimateProPage />,
    "maintenance-estimate": <MaintenanceEstimateProPage />,
    "service-reports": <ServiceReportsPage />,
    "job-walks": <JobWalksPage />,
  };

  return pages[activePage] || renderCRMPage();
};

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-8">{renderPage()}</div>
      </main>
    </div>
  );
}
