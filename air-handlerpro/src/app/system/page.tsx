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
import Administration from "@/components/admin/company-administration/admistration";
import SystemAdministration from "@/components/admin/system-administration/system-admistration";
import ServiceEstimateBuilder from "@/components/app/createestimate/createestimate";
import AdminStaff from "@/components/admin/admin-staff/adminStaff";

export default function MainApplication() {
  const [activePage, setActivePage] = useState("CRM");
  const [showServiceEstimateBuilder, setShowServiceEstimateBuilder] =
    useState(false);

  // Fixed: Reset builder state when changing pages
  const handlePageChange = (page: string) => {
    setShowServiceEstimateBuilder(false); // Close the builder
    setActivePage(page); // Change the page
  };

  const renderPage = () => {
    // If building a service estimate, show the builder
    if (showServiceEstimateBuilder) {
      return (
        <ServiceEstimateBuilder
          onBack={() => setShowServiceEstimateBuilder(false)}
        />
      );
    }

    const pages: Record<string, React.ReactElement> = {
      CRM: <CRMDashboard />,
      Contacts: <ContactsPage />,
      "AI Estimate Builder": <AIEstimateBuilderPage />,
      "Service Estimate Pro": (
        <ServiceEstimateProPage
          onNewEstimate={() => setShowServiceEstimateBuilder(true)}
        />
      ),
      "Maintenance Estimate Pro": <MaintenanceEstimateProPage />,
      "Service Reports": <ServiceReportsPage />,
      "Job Walks": <JobWalksPage />,
      "System Administration": <Administration />,
      "Staff Panel": <AdminStaff />,
      "Company Administration": <SystemAdministration />,
    };

    return pages[activePage] || <CRMDashboard />;
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage={activePage} onPageChange={handlePageChange} />
      <main className="flex-1 overflow-y-auto">
        <Header
          value={
            showServiceEstimateBuilder ? "New Service Estimate" : activePage
          }
        />
        <div>{renderPage()}</div>
      </main>
    </div>
  );
}
