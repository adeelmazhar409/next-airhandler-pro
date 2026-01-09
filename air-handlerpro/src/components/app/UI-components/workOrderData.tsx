// components/ScheduledVisitCard.tsx

import React from "react";
import { Calendar, FileText } from "lucide-react";
import { confirm } from "@/components/confirm";
import { formatDateTime } from "@/components/utility/HelperFunctions";

  interface WorkOrderCardProps {
  workOrderData: any;
  viewMode?: "list" | "grid";
  onEdit?: () => void;
  onDelete?: () => void;
  onViewDetails?: () => void;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({
  workOrderData,
  viewMode = "grid",
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const statusStyles = {
    scheduled: "bg-gray-200 text-gray-700",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit?.();
    }
  };

  const handleDeleteConfirm = () => {
    confirm("Are you sure you want to delete this work order?", () => {
      onDelete?.();
    });
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails?.();
    }
  };

  return (
    <div className="bg-white rounded-xl flex flex-col justify-between shadow-sm border border-gray-200 p-6 w-full max-w-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{workOrderData.site_name}</h3>
          <p className="text-sm text-gray-600 mt-1">{workOrderData.contact_name}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles?.['scheduled']}`}
        >
          {workOrderData.scheduled_start && workOrderData.scheduled_end ? "Scheduled" : "Not Scheduled"}
        </span>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-2 text-gray-700 mb-4">
        <Calendar className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium">{workOrderData.scheduled_start ? formatDateTime(workOrderData.scheduled_start) : "Not Scheduled"}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-5 leading-relaxed">
        {workOrderData.equipment_information}
      </p>

      {/* Footer: Reports + Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-600">
          <FileText className="w-4 h-4" />
          <span className="text-sm">
            {workOrderData.service_reports?.length || 0} report{workOrderData.service_reports?.length > 1 ? "s" : ""}
          </span>
        </div>
        <button
          onClick={handleViewDetails}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default WorkOrderCard;
