"use client";

import { useState } from "react";
import { Camera, Clock, FileText, PenTool } from "lucide-react";

interface ServiceReportData {
  id: string;
  siteName: string;
  workOrderNumber: string;
  customerName: string;
  contactName: string;
  serviceAddress: string;
  totalHours: number;
  status: "draft" | "signed";
  createdDate: string;
  findings: string;
  recommendations: string;
  internalNotes: string;
}

interface ServiceReportDetailPageProps {
  data: ServiceReportData;
  onBack: () => void;
}

export default function ServiceReportDetailPage({
  data,
  onBack,
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
    {
      id: "signature",
      label: "Signature",
      icon: <PenTool className="w-4 h-4" />,
    },
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
              Service Report - {data.siteName}
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
            <button className="px-4 py-2 border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors">
              Archive Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-charcoal transition-colors">
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
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-black rounded-lg text-charcoal hover:bg-platinum transition-colors">
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
            <p className="text-charcoal font-medium">{data.workOrderNumber}</p>
          </div>

          <div>
            <p className="text-sm text-slate mb-1">Customer</p>
            <p className="text-charcoal font-medium">{data.customerName}</p>
          </div>

          <div>
            <p className="text-sm text-slate mb-1">Contact</p>
            <p className="text-charcoal font-medium">{data.contactName}</p>
          </div>

          <div>
            <p className="text-sm text-slate mb-1">Service Address</p>
            <p className="text-charcoal font-medium">{data.serviceAddress}</p>
          </div>

          <div>
            <p className="text-sm text-slate mb-1">Total Hours</p>
            <p className="text-charcoal font-medium">{data.totalHours} hours</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
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
                {data.findings || "This is the findings and repair section"}
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
                {data.internalNotes ||
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
                  statusStyles[data.status]
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
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-slate mx-auto mb-4" />
            <p className="text-charcoal font-medium">No photos uploaded yet</p>
            <p className="text-slate text-sm mt-2">
              Photos will appear here once uploaded
            </p>
          </div>
        </div>
      )}

      {activeTab === "time" && (
        <div className="bg-white border-2 border-black rounded-lg p-6">
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-slate mx-auto mb-4" />
            <p className="text-charcoal font-medium">
              Time tracking information
            </p>
            <p className="text-slate text-sm mt-2">
              Total hours logged: {data.totalHours} hours
            </p>
          </div>
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
