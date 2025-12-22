"use client";

import Heading from "../Heading";
import Actbox from "../UI-components/Actbox";
import { WorkerOrderIcon } from "@/components/icons/icons";
import Button from "../UI-components/button";
import ScheduledVisitsGrid, {
  scheduledVisitsData,
} from "../UI-components/workOrderDataFormed";
import TechnicianReportsGrid, {
  technicianReportsData,
} from "../UI-components/recentServiceDataFormed";
import { useState } from "react";
import { ServiceReportForm } from "./ServiceReportForm";
import WorkOrderDetailPage from "./WorkOrderDetailPage";
import ServiceReportDetailPage from "./ServiceReportDetailPage";

export default function ServiceReports() {
  const [formToggle, setFormToggle] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<string | null>(
    null
  );
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Define data availability flags
  const hasWorkOrders = true; // Change to false to show empty state
  const hasServiceReports = true; // Change to false to show empty state

  const handleCreateWorkOrder = () => {
    setFormToggle(true);
  };

  const handleCancel = () => {
    setFormToggle(false);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission logic
    // After successful submission, you might want to close the form:
    // setFormToggle(false);
  };

  const handleViewWorkOrderDetails = (workOrderId: string) => {
    setSelectedWorkOrderId(workOrderId);
    setSelectedReportId(null);
  };

  const handleViewServiceReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setSelectedWorkOrderId(null);
  };

  const handleBackToList = () => {
    setSelectedWorkOrderId(null);
    setSelectedReportId(null);
  };

  // Show Work Order Detail Page
  if (selectedWorkOrderId) {
    const workOrderData = scheduledVisitsData.find(
      (wo) => wo.id === selectedWorkOrderId
    );
    if (workOrderData) {
      return (
        <WorkOrderDetailPage
          data={workOrderData}
          onBack={handleBackToList}
          onViewReport={handleViewServiceReport}
        />
      );
    }
  }

  // Show Service Report Detail Page
  if (selectedReportId) {
    const reportData = technicianReportsData.find(
      (report) => report.id === selectedReportId
    );
    if (reportData) {
      return (
        <ServiceReportDetailPage data={reportData} onBack={handleBackToList} />
      );
    }
  }

  // Show Create Work Order Form
  if (formToggle) {
    return (
      <ServiceReportForm onCancel={handleCancel} onSubmit={handleSubmit} />
    );
  }

  // Define all sections in an array
  const sections = [
    {
      id: 1,
      title: "Work Orders",
      hasData: hasWorkOrders,
      component: (
        <ScheduledVisitsGrid onViewDetails={handleViewWorkOrderDetails} />
      ),
      boxData: {
        header: false,
        value: "No work orders yet",
        icon: <WorkerOrderIcon />,
        description: "Create your first work order to get started",
      },
    },
    {
      id: 2,
      title: "Recent Service Reports",
      hasData: hasServiceReports,
      component: (
        <TechnicianReportsGrid onViewReport={handleViewServiceReport} />
      ),
      boxData: {
        header: false,
        value: "No service reports yet",
        icon: <WorkerOrderIcon />,
        description:
          "Service reports will appear here once technicians start documenting their work",
      },
    },
  ];

  return (
    <div className=" p-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Heading
          title="Service Reports"
          description="Manage work orders and service reports"
        />
        <Button onClick={handleCreateWorkOrder} value="Create Work Order" />
      </div>

      {/* Map through sections */}
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={index < sections.length - 1 ? "mb-8" : ""}
        >
          <h2 className="text-lg font-bold text-charcoal mb-4">
            {section.title}
          </h2>

          {/* Conditional rendering: Show component if data exists, otherwise show Actbox */}
          {section.hasData ? (
            section.component
          ) : (
            <Actbox {...section.boxData} />
          )}
        </div>
      ))}
    </div>
  );
}
