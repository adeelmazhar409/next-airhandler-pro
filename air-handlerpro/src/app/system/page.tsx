"use client";
import { useState } from "react";
import Sidebar from "@/components/app/Sidebar";
import Header from "@/components/app/crm/UI-components/Header";
import CRMDashboard from "@/components/app/crm/CRMPage";
import ContactsPage from "@/components/app/contacts/ContactsPage";
import AIEstimateBuilderPage from "@/components/app/ai-astimate-builder/AIEstimateBuilderPage";
import ServiceEstimateProPage from "@/components/app/service-estimate-pro/ServiceEstimateProPage";
import MaintenanceEstimateProPage from "@/components/app/maintenance-astimate-pro/MaintenanceEstimateProPage";
import ServiceReportsPage from "@/components/app/service-reports/ServiceReportsPage";
import JobWalksPage from "@/components/app/job-walks/JobWalksPage";


export default function MainApplication() {
  const [activePage, setActivePage] = useState("CRM");

  const renderPage = () => {
    const pages: Record<string, React.ReactElement> = {
      CRM: <CRMDashboard />,
      contacts: <ContactsPage />,
      "ai-estimate": <AIEstimateBuilderPage />,
      "service-estimate": <ServiceEstimateProPage />,
      "maintenance-estimate": <MaintenanceEstimateProPage />,
      "service-reports": <ServiceReportsPage />,
      "job-walks": <JobWalksPage />,
    };

    return pages[activePage] || <CRMDashboard/>;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        <Header value={activePage} />
        <div className="">{renderPage()}</div>
      </main>
    </div>
  );
}
