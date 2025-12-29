"use client";
import { ReactNode, useState } from "react";
import Sidebar from "@/components/app/Sidebar-comp/Sidebar";
import CRMDashboard from "@/components/app/crm/CRMPage";
import ContactsPage from "@/components/app/contacts/ContactsPage";
import AIEstimateBuilderPage from "@/components/app/ai-astimate-builder/AIEstimateBuilderPage";
import ServiceEstimateProPage from "@/components/app/service-estimate-pro/ServiceEstimateProPage";
import MaintenanceEstimateProPage from "@/components/app/maintenance-astimate-pro/MaintenanceEstimateProPage";
import ServiceReportsPage from "@/components/app/service-reports/ServiceReportsPage";
import JobWalksPage from "@/components/app/job-walks/JobWalksPage";
import Administration from "@/components/admin/admin-administration/admistration";
import SystemAdministration from "@/components/admin/company-administration/system-admistration";
import AdminStaff from "@/components/admin/admin-staff/adminStaff";
import Header from "@/components/app/UI-components/Header";

export default function MainApplication() {
  const [activePage, setActivePage] = useState("CRM");

  // Handle page changes - reset all special views
  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const renderPage = (page: string) => {
    const pages: Record<string, ReactNode> = {
      CRM: <CRMDashboard />,
      Contacts: <ContactsPage />,
      AIEstimateBuilder: <AIEstimateBuilderPage />,
      ServiceEstimatePro: <ServiceEstimateProPage />,
      MaintenanceEstimatePro: <MaintenanceEstimateProPage />,
      ServiceReports: <ServiceReportsPage />,
      JobWalks: <JobWalksPage />,
      SystemAdministration: <Administration />,
      StaffPanel: <AdminStaff />,
      CompanyAdministration: <SystemAdministration />,
    };

    return pages[page] || pages.CRM;
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage={activePage} onPageChange={handlePageChange} />
      <main className="flex-1 overflow-y-auto">
        <Header value={activePage} />
        <div>{renderPage(activePage)}</div>
      </main>
    </div>
  );
}
