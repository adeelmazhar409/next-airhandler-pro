// components/TechnicianReportCard.tsx

import React from "react";
import { User, Clock } from "lucide-react";
import { formatDateTime } from "@/components/utility/HelperFunctions";

type ReportStatus = "draft" | "signed";

interface ServiceReportCardProps { 
  id: string;
  serviceReportData: any;
  onViewReport?: (reportId: string) => void;
  onEditServiceReport?: (reportId: string) => void;
}

const ServiceReportCard: React.FC<ServiceReportCardProps> = ({
  id,
  serviceReportData,
  onViewReport,
  onEditServiceReport,
}) => {
  const statusStyles = {
    draft: "bg-gray-200 text-gray-700",
    signed: "bg-green-100 text-green-800",
  };

  const handleViewReport = (reportId: string) => {
    if (onViewReport) {
      onViewReport(reportId);
    }
  };

  const handleEditServiceReport = (reportId: string) => {
    if (onEditServiceReport) {
      onEditServiceReport(reportId);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{serviceReportData.site_name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[serviceReportData.status as keyof typeof statusStyles]}`}
        >
          {serviceReportData.status}
        </span>
      </div>

      {/* Report Type & Hours */}
      <div className="flex items-center gap-3 text-gray-700 mb-4">
        <User className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium">Technician Report</span>
      </div>

      <div className="flex items-center gap-3 text-gray-700 mb-5">
        <Clock className="w-5 h-5 text-gray-500" />
        <span className="text-sm">
          {serviceReportData.total_hours} {serviceReportData.total_hours === 1 ? "hour" : "hours"}
        </span>
      </div>

      {/* Date & Button */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{formatDateTime(serviceReportData.created_at)}</span>
        <button
          onClick={() => handleViewReport(serviceReportData.id)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
        >
          View Report
        </button>
      </div>
    </div>
  );
};

export default ServiceReportCard;
