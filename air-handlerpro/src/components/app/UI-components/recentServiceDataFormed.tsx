// app/page.tsx or any component

import TechnicianReportCard from "./recentServiceData";

// data/technicianReports.ts - Enhanced with complete data structure
export const technicianReportsData = [
  {
    id: "sr-001",
    siteName: "Test SH Network Site w/ parent",
    workOrderNumber: "123456",
    customerName: "Test SH Network Site w/ parent",
    contactName: "Mason Keith",
    serviceAddress: "65654 Street Lane orlando, FL 35654",
    status: "draft" as const,
    totalHours: 0,
    hours: 0,
    date: "Sep 16, 2025",
    createdDate: "Sep 16, 2025 5:36 AM",
    findings: "This is the findings and repair section",
    recommendations: "This is the recommendations to customer section",
    internalNotes:
      "This is the internal note section and should not be visible on the PDF report.",
  },
  {
    id: "sr-005",
    siteName: "Stan Lee's Service Site",
    workOrderNumber: "123457",
    customerName: "Stan Lee's Service Site",
    contactName: "Stan Lee",
    serviceAddress: "15488 Orange Dr Apopka, FL 32756",
    status: "draft" as const,
    totalHours: 0,
    hours: 0,
    date: "Aug 21, 2025",
    createdDate: "Aug 21, 2025 5:00 AM",
    findings: "",
    recommendations: "",
    internalNotes: "",
  },
  {
    id: "sr-002",
    siteName: "Test SH Network Site w/ parent",
    workOrderNumber: "123456",
    customerName: "Test SH Network Site w/ parent",
    contactName: "Mason Keith",
    serviceAddress: "65654 Street Lane orlando, FL 35654",
    status: "draft" as const,
    totalHours: 0,
    hours: 0,
    date: "Aug 21, 2025",
    createdDate: "Aug 21, 2025 5:00 AM",
    findings: "",
    recommendations: "",
    internalNotes: "",
  },
  {
    id: "sr-003",
    siteName: "Test SH Network Site w/ parent",
    workOrderNumber: "123456",
    customerName: "Test SH Network Site w/ parent",
    contactName: "Mason Keith",
    serviceAddress: "65654 Street Lane orlando, FL 35654",
    status: "signed" as const,
    totalHours: 6,
    hours: 6,
    date: "Aug 21, 2025",
    createdDate: "Aug 21, 2025 5:00 AM",
    findings: "Completed all repairs successfully",
    recommendations: "Schedule next maintenance in 6 months",
    internalNotes: "Customer was very satisfied with the service",
  },
  // Add as many as needed
];

interface TechnicianReportsGridProps {
  onViewReport?: (reportId: string) => void;
}

export default function TechnicianReportsGrid({
  onViewReport,
}: TechnicianReportsGridProps) {
  return (
    <div className="">
      <div className="flex flex-wrap gap-3">
        {technicianReportsData.map((report) => (
          <TechnicianReportCard
            key={report.id}
            id={report.id}
            siteName={report.siteName}
            status={report.status}
            hours={report.hours}
            date={report.date}
            onViewReport={onViewReport}
          />
        ))}
      </div>
    </div>
  );
}
