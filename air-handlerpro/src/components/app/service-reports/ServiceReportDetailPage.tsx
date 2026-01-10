"use client";

import { useState } from "react";
import { Camera, Clock, Edit, FileText, PenTool } from "lucide-react";
import { formatDateTime } from "@/components/utility/HelperFunctions";

interface ServiceReportDetailPageProps {
  data: any;
  onBack: () => void;
  onEditServiceReport: (serviceReportId: string) => void;
  onViewReport: (serviceReportId: string) => void;
  onArchiveServiceReport: () => void;
}

export default function ServiceReportDetailPage({
  data,
  onBack,
  onEditServiceReport,
  onViewReport,
  onArchiveServiceReport,
}: ServiceReportDetailPageProps) {
  const [activeTab, setActiveTab] = useState<
    "report" | "photos" | "time" | "signature"
  >("report");

  const statusStyles = {
    draft: "bg-gray-200 text-gray-700",
    signed: "bg-green-100 text-green-800",
  };

  const tabs = [
    { id: "report", label: "Report", icon: <FileText className="w-4 h-4" /> },
    { id: "photos", label: "Photos", icon: <Camera className="w-4 h-4" /> },
    {
      id: "time",
      label: "Time Tracking",
      icon: <Clock className="w-4 h-4" />,
    },
    // {
    //   id: "signature",
    //   label: "Signature",
    //   icon: <PenTool className="w-4 h-4" />,
    // },
  ];

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
              Service Report - {data.site_name}
            </h1>
            <p className="text-slate text-sm mt-1">
              Created {formatDateTime(data.created_at)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                statusStyles[data.status as keyof typeof statusStyles]
              }`}
            >
              {data.status}
            </span>
            <button
              onClick={() => onArchiveServiceReport()}
              className="px-4 py-2 border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors cursor-pointer"
            >
              Archive Report
            </button>
            <button
              onClick={() => onEditServiceReport(data.id)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-charcoal transition-colors cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => onViewReport(data.id)}
              className="flex items-center gap-2 px-4 py-2 border border-black rounded-lg text-charcoal hover:bg-platinum transition-colors cursor-pointer"
            >
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Save & Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Work Order Details */}
      <div className="bg-white border-2 border-black rounded-lg p-6 mb-6">
        <h2 className="text-lg font-bold text-charcoal mb-4">
          Work Order Details
        </h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm text-slate mb-1">Work Order #</p>
            <p className="text-charcoal font-medium">{data.work_order}</p>
          </div>

          <div>
            <p className="text-sm text-slate mb-1">Customer</p>
            <p className="text-charcoal font-medium">{data.site_name}</p>
          </div>

          <div>
            <p className="text-sm text-slate mb-1">Contact</p>
            <p className="text-charcoal font-medium">{data.contact_name}</p>
          </div>

          <div>
            <p className="text-sm text-slate mb-1">Service Address</p>
            <p className="text-charcoal font-medium">{data.service_address}</p>
          </div>

          <div>
            <p className="text-sm text-slate mb-1">Total Hours</p>
            <p className="text-charcoal font-medium">
              {data.total_hours || 0} hours
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "bg-black text-white"
                : "bg-white text-charcoal border border-silver hover:bg-platinum"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "report" && (
        <div className="space-y-6">
          {/* Findings & Repairs */}
          <div className="bg-white border-2 border-black rounded-lg p-6">
            <h3 className="text-base font-bold text-charcoal mb-2">
              Findings & Repairs
            </h3>
            <p className="text-sm text-slate mb-3">Visible to customer</p>
            <div className="min-h-[120px] p-4 border border-silver rounded-lg bg-platinum">
              <p className="text-charcoal">
                {data.findings_repairs ||
                  "This is the findings and repair section"}
              </p>
            </div>
          </div>

          {/* Recommendations to Customer */}
          <div className="bg-white border-2 border-black rounded-lg p-6">
            <h3 className="text-base font-bold text-charcoal mb-2">
              Recommendations to Customer
            </h3>
            <p className="text-sm text-slate mb-3">Visible to customer</p>
            <div className="min-h-[120px] p-4 border border-silver rounded-lg bg-platinum">
              <p className="text-charcoal">
                {data.recommendations ||
                  "This is the recommendations to customer section"}
              </p>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white border-2 border-black rounded-lg p-6">
            <h3 className="text-base font-bold text-charcoal mb-2">
              Internal Notes
            </h3>
            <p className="text-sm text-orange-600 mb-3">
              Office Only - Not visible to customer
            </p>
            <div className="min-h-[120px] p-4 border border-silver rounded-lg bg-platinum">
              <p className="text-charcoal">
                {data.internal_note ||
                  "This is the internal note section and should not be visible on the PDF report."}
              </p>
            </div>
          </div>

          {/* Status at bottom */}
          <div className="bg-white border-2 border-black rounded-lg p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate">Status:</p>
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  statusStyles[data.status as keyof typeof statusStyles]
                }`}
              >
                {data.status}
              </span>
            </div>
          </div>
        </div>
      )}
      {activeTab === "photos" && (
        <div className="bg-white border-2 border-black rounded-lg p-6">
          {data.photo && (
            <div className="text-center py-12">
              <img
                src={data.photo}
                alt="Service Report Photo"
                className="w-20 h-20 mx-auto mb-4"
              />
            </div>
          )}
          {!data.photo && (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-slate mx-auto mb-4" />
              <p className="text-charcoal font-medium">
                No photos uploaded yet
              </p>
              <p className="text-slate text-sm mt-2">
                Photos will appear here once uploaded
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "time" && (
        <div className="bg-white border-2 border-black rounded-lg p-6">
          {data.total_hours && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <Clock className="w-6 h-6 text-slate" />
                  <p className="text-charcoal font-medium text-xl">
                    Time Tracking
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  <p>
                    <span className="text-slate text-sm font-medium">
                      Total Hours:
                    </span>
                  </p>
                  <p className="text-charcoal font-medium text-xl">
                    {data.total_hours || 0}
                  </p>
                </div>
              </div>
              <div className=" p-4 border border-silver rounded-lg py-4">
                <p className="text-slate text-md font-medium">
                  {data.total_hours || 0} hours (Manually Entry)
                </p>
                <p className="text-slate text-sm mt-2">
                  {data.created_at
                    ? formatDateTime(data.created_at)
                    : "No time tracking information"}
                </p>
              </div>
            </div>
          )}
          {!data.total_hours && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-slate mx-auto mb-4" />
              <p className="text-charcoal font-medium">
                No time tracking information
              </p>
              <p className="text-slate text-sm mt-2">
                Time tracking information will appear here once logged
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "signature" && (
        <div className="bg-white border-2 border-black rounded-lg p-6">
          <div className="text-center py-12">
            <PenTool className="w-16 h-16 text-slate mx-auto mb-4" />
            <p className="text-charcoal font-medium">No signature captured</p>
            <p className="text-slate text-sm mt-2">
              Customer signature will appear here once collected
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
