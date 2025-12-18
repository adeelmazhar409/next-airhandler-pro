// components/TechnicianReportCard.tsx

import React from "react";
import { User, Clock } from "lucide-react";

type ReportStatus = "draft" | "signed";

interface TechnicianReportCardProps {
  siteName: string;
  status: ReportStatus;
  hours: number; // e.g., 0 or 6
  date: string; // e.g., "Sep 16, 2025"
}

const TechnicianReportCard: React.FC<TechnicianReportCardProps> = ({
  siteName,
  status,
  hours,
  date,
}) => {
  const statusStyles = {
    draft: "bg-gray-200 text-gray-700",
    signed: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{siteName}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
        >
          {status}
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
          {hours} {hours === 1 ? "hour" : "hours"}
        </span>
      </div>

      {/* Date & Button */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{date}</span>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
          View Report
        </button>
      </div>
    </div>
  );
};

export default TechnicianReportCard;
