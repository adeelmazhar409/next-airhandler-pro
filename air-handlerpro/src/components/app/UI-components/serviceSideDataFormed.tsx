"use client";

import ServiceSiteCard from "@/components/app/UI-components/serviceSideCardData";

function LoadingSkeleton({ viewMode }: { viewMode: "list" | "grid" }) {
  return (
    <div className={viewMode === "grid" ? "flex gap-3 flex-wrap" : "space-y-4"}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={
            viewMode === "grid"
              ? "w-full max-w-sm h-96 bg-gray-200 animate-pulse rounded-xl"
              : "w-full h-32 bg-gray-200 animate-pulse rounded-lg"
          }
        />
      ))}
    </div>
  );
}

interface ServiceSitesGridProps {
  loading?: boolean;
  error?: string | null;
  serviceSites?: any[];
  handleDeleteSite?: (siteId: string, siteName: string) => void;
  onEditSite?: (siteId: string) => void;
  viewMode?: "list" | "grid";
}

export default function ServiceSitesGrid({
  loading,
  error,
  serviceSites,
  handleDeleteSite,
  onEditSite,
  viewMode = "grid",
}: ServiceSitesGridProps) {
  return (
    <div className="px-4">
      {loading && <LoadingSkeleton viewMode={viewMode} />}

      {error && (
        <div className="text-center py-12">
          <p className="text-gray-500">{error}</p>
        </div>
      )}

      {!loading && !error && serviceSites?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No service sites found.</p>
        </div>
      )}

      {!loading && !error && serviceSites && serviceSites.length > 0 && (
        <div
          className={viewMode === "grid" ? "flex gap-3 flex-wrap" : "space-y-4"}
        >
          {serviceSites.map((site) => (
            <ServiceSiteCard
              key={site.id}
              siteData={site}
              viewMode={viewMode}
              onEdit={() => onEditSite?.(site.id)}
              onDelete={() =>
                handleDeleteSite?.(site.id, site.site_name || "this site")
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
