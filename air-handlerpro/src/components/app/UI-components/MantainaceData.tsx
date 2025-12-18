// components/EstimateCard.tsx

import React from "react";
import { MoreVertical } from "lucide-react";

interface EstimateCardProps {
  title: string; // Main title (e.g., "Testing", "Maintenance Estimate - SH Network")
  estimateNumber: string; // e.g., "#123456" or "#EST-13375476"
  customerName: string; // e.g., "SH Network"
  address: string; // Full address
  contractTerm: string; // e.g., "12 months"
  billingFrequency: string; // "Monthly" or "Annual"
  startDate: string; // e.g., "Jan 01, 2026"
  totalAmount: string; // e.g., "$0"
  createdDate: string; // e.g., "Created Dec 03, 2025"
  status?: "draft" | "sent" | "approved"; // Optional status badge
}

const EstimateCard: React.FC<EstimateCardProps> = ({
  title,
  estimateNumber,
  customerName,
  address,
  contractTerm,
  billingFrequency,
  startDate,
  totalAmount,
  createdDate,
  status = "draft",
}) => {
  const statusBadge =
    status === "draft"
      ? "bg-gray-200 text-gray-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div
      className="bg-white rounded-xl  border border-gray-200 p-6 w-full max-w-sm  transition-all duration-300
        shadow-[2px_2px_0_0_rgba(76,92,104,1),4px_4px_0_0_rgba(70,73,76,1),6px_6px_0_0_rgba(25,133,161,1)]
        hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
        hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{estimateNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge}`}
          >
            {status}
          </span>
          <button className="text-gray-400 hover:text-gray-600 transition">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Customer & Address */}
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-900">{customerName}</p>
        <p className="text-sm text-gray-600 mt-1">{address}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm mb-5">
        <div>
          <span className="text-gray-600">Contract:</span>
          <span className="ml-2 font-medium text-gray-900">{contractTerm}</span>
        </div>
        <div>
          <span className="text-gray-600">Billing:</span>
          <span className="ml-2 font-medium text-gray-900">
            {billingFrequency}
          </span>
        </div>
        <div>
          <span className="text-gray-600">Start Date:</span>
          <span className="ml-2 font-medium text-gray-900">{startDate}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 -mx-6 my-5" />

      {/* Total & Created */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs text-gray-600">Total:</p>
          <p className="text-2xl font-semibold text-gray-900">{totalAmount}</p>
        </div>
        <p className="text-xs text-gray-500">{createdDate}</p>
      </div>
    </div>
  );
};

export default EstimateCard;
