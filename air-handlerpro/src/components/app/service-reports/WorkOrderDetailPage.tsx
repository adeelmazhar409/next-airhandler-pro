"use client";

import { FileText } from "lucide-react";

interface ServiceReport {
  id: string;
  status: "draft" | "signed";
  createdDate: string;
  hours: number;
}

interface WorkOrderData {
  id: string;
  siteName: string;
  contactName: string;
  phone: string;
  email: string;
  workOrderNumber: string;
  serviceAddress: string;
  scheduledStart: string;
  scheduledEnd: string;
  description: string;
  equipmentInfo: string;
  status: "scheduled" | "in-progress" | "completed";
  createdDate: string;
  serviceReports: ServiceReport[];
}

interface WorkOrderDetailPageProps {
  data: WorkOrderData;
  onBack: () => void;
  onViewReport: (reportId: string) => void;
}

export default function WorkOrderDetailPage({
  data,
  onBack,
  onViewReport,
}: WorkOrderDetailPageProps) {
  const statusStyles = {
    scheduled: "bg-gray-200 text-gray-700",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const reportStatusStyles = {
    draft: "bg-gray-200 text-gray-700",
    signed: "bg-green-100 text-green-800",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-charcoal hover:bg-platinum rounded-lg transition-colors mb-4"
        >
          <span>←</span>
          <span className="font-medium">Back</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-charcoal">
              Work Order - {data.siteName}
            </h1>
            <p className="text-slate text-sm mt-1">
              Created {data.createdDate}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                statusStyles[data.status]
              }`}
            >
              {data.status}
            </span>
            <button className="flex items-center gap-2 px-4 py-2 border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Work Order
            </button>
            <button className="px-4 py-2 border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors">
              Archive
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Customer Information */}
        <div className="bg-white border-2 border-black rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-5 h-5 text-charcoal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <h2 className="text-lg font-bold text-charcoal">
              Customer Information
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate mb-1">Site Name</p>
              <p className="text-charcoal font-medium">{data.siteName}</p>
            </div>

            <div>
              <p className="text-sm text-slate mb-1">Contact Person</p>
              <p className="text-charcoal font-medium">{data.contactName}</p>
            </div>

            <div>
              <p className="text-sm text-slate mb-1">Phone</p>
              <p className="text-charcoal font-medium">{data.phone}</p>
            </div>

            <div>
              <p className="text-sm text-slate mb-1">Email</p>
              <p className="text-charcoal font-medium">{data.email}</p>
            </div>
          </div>
        </div>

        {/* Schedule & Location */}
        <div className="bg-white border-2 border-black rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-5 h-5 text-charcoal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h2 className="text-lg font-bold text-charcoal">
              Schedule & Location
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate mb-1">Work Order #</p>
              <p className="text-charcoal font-medium">
                {data.workOrderNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate mb-1">Service Address</p>
              <p className="text-charcoal font-medium">{data.serviceAddress}</p>
            </div>

            <div>
              <p className="text-sm text-slate mb-1">Scheduled Start</p>
              <p className="text-charcoal font-medium">{data.scheduledStart}</p>
            </div>

            <div>
              <p className="text-sm text-slate mb-1">Scheduled End</p>
              <p className="text-charcoal font-medium">{data.scheduledEnd}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Description */}
      <div className="bg-white border-2 border-black rounded-lg p-6 mb-6">
        <h2 className="text-lg font-bold text-charcoal mb-4">
          Work Description
        </h2>
        <p className="text-charcoal">{data.description}</p>
      </div>

      {/* Equipment Information */}
      {data.equipmentInfo && (
        <div className="bg-white border-2 border-black rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-charcoal mb-4">
            Equipment Information
          </h2>
          <p className="text-charcoal">{data.equipmentInfo}</p>
        </div>
      )}

      {/* Service Reports Section */}
      <div className="bg-white border-2 border-black rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-charcoal" />
          <h2 className="text-lg font-bold text-charcoal">
            Service Reports ({data.serviceReports.length})
          </h2>
        </div>

        <div className="space-y-3">
          {data.serviceReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-silver rounded-lg hover:bg-platinum transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-charcoal">
                    Service Report
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reportStatusStyles[report.status]
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-slate mt-1">
                  Created {report.createdDate}
                </p>
                <p className="text-sm text-slate">
                  {report.hours} hours logged
                </p>
              </div>
              <button
                onClick={() => onViewReport(report.id)}
                className="px-4 py-2 border border-silver rounded-lg text-sm font-medium text-charcoal hover:bg-platinum transition-colors"
              >
                View Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
