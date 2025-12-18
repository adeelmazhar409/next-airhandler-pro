// app/page.tsx or any component

import TechnicianReportCard from "./recentServiceData";


// data/technicianReports.ts

export const technicianReportsData = [
  {
    siteName: "Test SH Network Site w/ parent",
    status: "draft" as const,
    hours: 0,
    date: "Sep 16, 2025",
  },
  {
    siteName: "Stan Lee's Service Site",
    status: "draft" as const,
    hours: 0,
    date: "Aug 21, 2025",
  },
  {
    siteName: "Test SH Network Site w/ parent",
    status: "draft" as const,
    hours: 0,
    date: "Aug 21, 2025",
  },
  {
    siteName: "Test SH Network Site w/ parent",
    status: "signed" as const,
    hours: 6,
    date: "Aug 21, 2025",
  },
  // Add as many as needed
];

export default function TechnicianReportsGrid() {
  return (
    <div className="">
     

      <div className="flex flex-wrap gap-3">
        {technicianReportsData.map((report, index) => (
          <TechnicianReportCard
            key={index} // Use unique ID in production
            siteName={report.siteName}
            status={report.status}
            hours={report.hours}
            date={report.date}
          />
        ))}
      </div>
    </div>
  );
}
