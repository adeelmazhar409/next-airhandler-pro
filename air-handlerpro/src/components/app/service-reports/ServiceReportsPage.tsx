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
import { ServiceReportCreateForm } from "./ServiceReportCreateForm";
import WorkOrderDetailPage from "./WorkOrderDetailPage";
import ServiceReportDetailPage from "./ServiceReportDetailPage";

export default function ServiceReports() {
  const [workOrderFormToggle, setWorkOrderFormToggle] = useState(false);
  const [serviceReportFormToggle, setServiceReportFormToggle] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<string | null>(
    null
  );
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Define data availability flags
  const hasWorkOrders = true; // Change to false to show empty state
  const hasServiceReports = true; // Change to false to show empty state

  const handleCreateWorkOrder = () => {
    setWorkOrderFormToggle(true);
    setServiceReportFormToggle(false);
  };

  const handleCreateServiceReport = () => {
    setServiceReportFormToggle(true);
    setWorkOrderFormToggle(false);
  };

  const handleCancel = () => {
    setWorkOrderFormToggle(false);
    setServiceReportFormToggle(false);
  };

  const handleWorkOrderSubmit = (formData: any) => {
    console.log("Work Order submitted:", formData);
    // Handle form submission logic
    setWorkOrderFormToggle(false);
  };

  const handleServiceReportSubmit = (formData: any) => {
    console.log("Service Report submitted:", formData);
    // Handle form submission logic
    setServiceReportFormToggle(false);
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
  if (workOrderFormToggle) {
    return (
      <ServiceReportForm
        onCancel={handleCancel}
        onSubmit={handleWorkOrderSubmit}
      />
    );
  }

  // Show Create Service Report Form
  if (serviceReportFormToggle) {
    return (
      <ServiceReportCreateForm
        onCancel={handleCancel}
        onSubmit={handleServiceReportSubmit}
      />
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Heading
          title="Service Reports"
          description="Manage work orders and service reports"
        />
      </div>

      {/* Work Orders Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-charcoal">Work Orders</h2>
          <Button onClick={handleCreateWorkOrder} value="Create Work Order" />
        </div>

        {/* Conditional rendering: Show component if data exists, otherwise show Actbox */}
        {hasWorkOrders ? (
          <ScheduledVisitsGrid onViewDetails={handleViewWorkOrderDetails} />
        ) : (
          <Actbox
            header={false}
            value="No work orders yet"
            icon={<WorkerOrderIcon />}
            description="Create your first work order to get started"
          />
        )}
      </div>

      {/* Service Reports Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-charcoal">
            Recent Service Reports
          </h2>
          <Button
            onClick={handleCreateServiceReport}
            value="Create Service Report"
          />
        </div>

        {/* Conditional rendering: Show component if data exists, otherwise show Actbox */}
        {hasServiceReports ? (
          <TechnicianReportsGrid onViewReport={handleViewServiceReport} />
        ) : (
          <Actbox
            header={false}
            value="No service reports yet"
            icon={<WorkerOrderIcon />}
            description="Service reports will appear here once technicians start documenting their work"
          />
        )}
      </div>
    </div>
  );
}
  