// app/page.tsx or any component

import ServiceReportCard from "./recentServiceData";

function LoadingSkeleton({ viewMode }: { viewMode: "list" | "grid" }) {
  return (
    <div className={viewMode === "grid" ? "flex gap-3 flex-wrap" : "space-y-4"}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={
            viewMode === "grid"
              ? "w-full max-w-sm h-80 bg-gray-200 animate-pulse rounded-xl"
              : "w-full h-32 bg-gray-200 animate-pulse rounded-lg"
          }
        />
      ))}
    </div>
  );
}

interface ServiceReportsGridProps {
  loading?: boolean;
  error?: string | null;
  serviceReports?: any[];
  onEditServiceReport?: (reportId: string) => void;
  onViewReport?: (reportId: string) => void;
  viewMode?: "list" | "grid";
}

export default function ServiceReportsGrid({
  loading,
  error,
  serviceReports,
  onEditServiceReport,
  onViewReport,
  viewMode = "grid",
}: ServiceReportsGridProps) {

  return (
    <div>
      {loading && <LoadingSkeleton viewMode={viewMode} />}

      {error && (
        <div className="text-center py-12">
          <p className="text-gray-500">{error}</p>
        </div>
      )}

      {!loading && !error && serviceReports?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No service reports found.</p>
        </div>
      )}

      {!loading && !error && serviceReports && serviceReports.length > 0 && (
        <div
          className={viewMode === "grid" ? "flex gap-3 flex-wrap" : "space-y-4"}
        >
          {serviceReports?.map((report) => (
            <ServiceReportCard
              key={report.id}
              id={report.id}
              serviceReportData={report}
              onViewReport={onViewReport}
              onEditServiceReport={onEditServiceReport}
            />
          ))}
        </div>
      )}
    </div>
  );
}
