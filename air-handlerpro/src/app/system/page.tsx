"use client";
import { useState } from "react";
import Sidebar from "@/components/app/Sidebar-comp/Sidebar";
import Header from "@/components/app/UI-components/Header";
import CRMDashboard from "@/components/app/crm/CRMPage";
import ContactsPage from "@/components/app/contacts/ContactsPage";
import AIEstimateBuilderPage from "@/components/app/ai-astimate-builder/AIEstimateBuilderPage";
import ServiceEstimateProPage from "@/components/app/service-estimate-pro/ServiceEstimateProPage";
import MaintenanceEstimateProPage from "@/components/app/maintenance-astimate-pro/MaintenanceEstimateProPage";
import ServiceReportsPage from "@/components/app/service-reports/ServiceReportsPage";
import JobWalksPage from "@/components/app/job-walks/JobWalksPage";
import ScheduledVisitsGrid from "@/components/app/UI-components/workOrderDataFormed";
import Administration from "@/components/app/company-administration/admistration";
import SystemAdministration from "@/components/app/system-administration/system-admistration";
export default function MainApplication() {
  const [activePage, setActivePage] = useState("CRM");

  const renderPage = () => {
    const pages: Record<string, React.ReactElement> = {
      CRM: <CRMDashboard />,
      Contacts: <ContactsPage />,
      "AI Estimate Builder": <AIEstimateBuilderPage />,
      "Service Estimate Pro": <ServiceEstimateProPage />,
      "Maintenance Estimate Pro": <MaintenanceEstimateProPage />,
      "Service Reports": <ServiceReportsPage />,
      "Job Walks": <JobWalksPage />,
      "System Administration": <Administration/>,
      "Company Administration":<SystemAdministration/>,

    };

    return pages[activePage] || <CRMDashboard />;
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        <Header value={activePage} />
        <div className="">{renderPage()}</div>
      </main>
    </div>
  );
}
