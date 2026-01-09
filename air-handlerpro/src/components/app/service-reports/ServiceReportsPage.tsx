"use client";

import Heading from "../Heading";
import Actbox from "../UI-components/Actbox";
import { WorkerOrderIcon } from "@/components/icons/icons";
import Button from "../UI-components/button";
import ServiceReportsGrid from "../UI-components/recentServiceDataFormed";
import { useCallback, useEffect, useState } from "react";
import { ServiceReportForm } from "./ServiceReportForm";
import { ServiceReportCreateForm } from "./ServiceReportCreateForm";
import WorkOrderDetailPage from "./WorkOrderDetailPage";
import ServiceReportDetailPage from "./ServiceReportDetailPage";
import {
  createWorkOrder,
  deleteWorkOrder,
  fetchWorkOrders,
  updateWorkOrder,
} from "@/service/api/workorder";
import { supabase } from "@/lib/supabase";
import { workOrderLinkTable } from "@/components/forms/forms-instructions/WorkOrderFormProp";
import { toast } from "@/components/toast";
import { WorkOrderForm } from "./WorkOrderForm";
import {
  createServiceReport,
  deleteServiceReport,
  fetchServiceReports,
  updateServiceReport,
} from "@/service/api/servicereport";
import {
  buildFinalServiceReportObject,
  buildFinalWorkOrderObject,
} from "@/components/utility/HelperFunctions";
import WorkOrderDataFormed from "../UI-components/workOrderDataFormed";

export default function ServiceReports() {
  const [workOrderFormToggle, setWorkOrderFormToggle] = useState(false);
  const [serviceReportFormToggle, setServiceReportFormToggle] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<string | null>(
    null
  );
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [workOrders, setWorkOrders] = useState<any[]>([]);
  const [serviceReports, setServiceReports] = useState<any[]>([]);
  const [workOrderData, setWorkOrderData] = useState<any[]>([]); // Raw work orders from API
  const [serviceReportData, setServiceReportData] = useState<any[]>([]); // Raw service reports from API
  const [linkTableData, setLinkTableData] = useState<any[]>([]);
  const [editingWorkOrder, setEditingWorkOrder] = useState<any | null>(null);
  const [editingServiceReport, setEditingServiceReport] = useState<any | null>(
    null
  );

  // Memoized fetch function - includes link tables and builds enriched view
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch main activities
      const workOrdersResponse = await fetchWorkOrders();
      const serviceReportsResponse = await fetchServiceReports();

      if (!workOrdersResponse.success) {
        setError(workOrdersResponse.error || "Failed to load work orders");
        setWorkOrders([]);
        return;
      }

      if (!serviceReportsResponse.success) {
        setError(
          serviceReportsResponse.error || "Failed to load service reports"
        );
        setServiceReports([]);
        return;
      }

      const rawWorkOrders = workOrdersResponse.data || [];
      const rawServiceReports = serviceReportsResponse.data || [];
      setWorkOrderData(rawWorkOrders);
      setServiceReportData(rawServiceReports);

      // Fetch all related link tables in parallel
      const promises = workOrderLinkTable.map(async (table: any) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] };
        }
        return { [table]: data };
      });

      const results = await Promise.all(promises);

      // Build enriched activity objects for display
      const workOrdersViewData = buildFinalWorkOrderObject(
        rawWorkOrders,
        results
      );
      // console.log("workOrdersViewData", workOrdersViewData);
      const serviceReportsViewData = buildFinalServiceReportObject(
        rawServiceReports,
        results
      );

      setWorkOrders(workOrdersViewData || []);
      setServiceReports(serviceReportsViewData || []);
      setLinkTableData(results);
    } catch (err: any) {
      console.error("Error loading data:", err);
      setError("An unexpected error occurred");
      setWorkOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger refresh
  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Work Orders Functions
  const handleCreateWorkOrder = () => {
    setEditingWorkOrder(null);
    setWorkOrderFormToggle(true);
  };

  // const handleDeleteWorkOrder = async (
  //   workOrderId: string,
  //   workOrderNumber: string
  // ) => {
  //   confirm(
  //     `Are you sure you want to delete work order: "${workOrderNumber}"?`,
  //     async () => {
  //       try {
  //         const result = await deleteWorkOrder(workOrderId);

  //         if (result.success) {
  //           toast("✅ Work order deleted successfully!");
  //           triggerRefresh();
  //         } else {
  //           toast("❌ Failed to delete work order");
  //           console.error("Error deleting work order:", result.error);
  //         }
  //       } catch (err) {
  //         console.error("Error deleting work order:", err);
  //         toast("❌ An unexpected error occurred");
  //       }
  //     }
  //   );
  // };

  const handleEditWorkOrder = (workOrderId: string) => {
    const workOrderToEdit = workOrderData.find(
      (wo: any) => wo.id === workOrderId
    );
    if (workOrderToEdit) {
      setEditingWorkOrder(workOrderToEdit);
      setWorkOrderFormToggle(true);
    } else {
      alert("Work order not found for editing.");
    }
  };

  const handleWorkOrderSubmit = async (formData: any) => {
    try {
      if (editingWorkOrder?.id) {
        // UPDATE - pass the ID from editingWorkOrder
        await updateWorkOrder(editingWorkOrder.id, formData);
      } else {
        // CREATE
        await createWorkOrder(formData);
      }
      setWorkOrderFormToggle(false);
      setEditingWorkOrder(null);
      triggerRefresh();
      toast("✅ Success! Record saved");
    } catch (err) {
      console.error("Error submitting work order:", err);
      alert("Failed to save work order. Please try again.");
    }
  };

  // Service Reports Functions
  const handleCreateServiceReport = () => {
    setEditingServiceReport(null);
    setServiceReportFormToggle(true);
  };

  // const handleDeleteServiceReport = async (
  //   serviceReportId: string,
  //   serviceReportNumber: string
  // ) => {
  //   confirm(
  //     `Are you sure you want to delete service report: "${serviceReportNumber}"?`,
  //     async () => {
  //       try {
  //         const result = await deleteServiceReport(serviceReportId);

  //         if (result.success) {
  //           toast("✅ Service report deleted successfully!");
  //           triggerRefresh();
  //         } else {
  //           toast("❌ Failed to delete service report");
  //           console.error("Error deleting service report:", result.error);
  //         }
  //       } catch (err) {
  //         console.error("Error deleting service report:", err);
  //         toast("❌ An unexpected error occurred");
  //       }
  //     }
  //   );
  // };

  const handleEditServiceReport = (serviceReportId: string) => {
    const serviceReportToEdit = serviceReportData.find(
      (sr: any) => sr.id === serviceReportId
    );
    if (serviceReportToEdit) {
      setEditingServiceReport(serviceReportToEdit);
      setServiceReportFormToggle(true);
    } else {
      alert("Service report not found for editing.");
    }
  };

  const handleServiceReportSubmit = async (formData: any) => {
    console.log("Service Report submitted:", formData);
    try {
      if (editingServiceReport?.id) {
        await updateServiceReport(editingServiceReport.id, formData);
      } else {
        await createServiceReport(formData);
      }
      setServiceReportFormToggle(false);
      setEditingServiceReport(null);
      triggerRefresh();
      toast("✅ Success! Record saved");
    } catch (err) {
      console.error("Error submitting service report:", err);
      alert("Failed to save service report. Please try again.");
    }
  };

  // View Work Order and Service Report Details
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

  const handleAllFormsCancel = () => {
    setWorkOrderFormToggle(false);
    setServiceReportFormToggle(false);
    setEditingWorkOrder(null);
    setEditingServiceReport(null);
  };

  // Define data availability flags
  const hasWorkOrders = true; // Change to false to show empty state
  const hasServiceReports = true; // Change to false to show empty state

  // Load data on mount and on refresh
  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

  // Show Create Work Order Form
  if (workOrderFormToggle) {
    return (
      <WorkOrderForm
        onCancel={handleAllFormsCancel}
        onSubmit={handleWorkOrderSubmit}
        linkTableData={linkTableData}
        editingWorkOrder={editingWorkOrder}
      />
    );
  }

  // Show Create Service Report Form
  if (serviceReportFormToggle) {
    return (
      <ServiceReportForm
        onCancel={handleAllFormsCancel}
        onSubmit={handleServiceReportSubmit}
        linkTableData={linkTableData}
        editingServiceReport={editingServiceReport}
      />
    );
  }

  // Show Work Order Detail Page
  if (selectedWorkOrderId) {
    const workOrderData = workOrders.find(
      (wo) => wo.id === selectedWorkOrderId
    );
    if (workOrderData) {
      return (
        <WorkOrderDetailPage
          data={workOrderData}
          onBack={handleBackToList}
          onViewReport={handleViewServiceReport}
          onEditWorkOrder={() => handleEditWorkOrder(selectedWorkOrderId)}
          onArchiveWorkOrder={() => ""}
        />
      );
    }
  }

  // Show Service Report Detail Page
  if (selectedReportId) {
    const reportData = serviceReports.find(
      (report: any) => report.id === selectedReportId
    );
    if (reportData) {
      return (
        <ServiceReportDetailPage
          data={reportData}
          onBack={handleBackToList}
          onEditServiceReport={() => handleEditServiceReport(selectedReportId)}
          onViewReport={handleViewServiceReport}
          onArchiveServiceReport={() => ""}
        />
      );
    }
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
          <WorkOrderDataFormed
            key={refreshKey}
            loading={loading}
            error={error}
            workOrders={workOrders}
            // handleDeleteWorkOrder={handleDeleteWorkOrder}
            onEditWorkOrder={handleEditWorkOrder}
            onViewDetails={handleViewWorkOrderDetails}
          />
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
          <ServiceReportsGrid
            key={refreshKey}
            loading={loading}
            error={error}
            serviceReports={serviceReports}
            // handleDeleteWorkOrder={handleDeleteWorkOrder}
            onEditServiceReport={handleEditServiceReport}
            onViewReport={handleViewServiceReport}
          />
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
