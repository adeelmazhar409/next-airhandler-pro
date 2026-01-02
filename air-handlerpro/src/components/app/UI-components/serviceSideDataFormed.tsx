"use client";

import ServiceSiteCard from "@/components/app/UI-components/serviceSideCardData";

function LoadingSkeleton() {
  return (
    <div className="flex gap-3 flex-wrap">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-full max-w-sm h-64 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}

export default function ServiceSitesGrid({
  onEditSite,
  loading,
  error,
  serviceSites,
  handleDeleteSite,
}: {
  onEditSite?: (site: any) => void;
  loading?: boolean;
  error?: string | null;
  serviceSites?: any[];
  handleDeleteSite?: (siteId: string, siteName: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Service Sites
      </h2>

      {loading && <LoadingSkeleton />}

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
        <div className="flex gap-3 flex-wrap">
          {serviceSites?.map((site) => {

            return (
              <ServiceSiteCard
                key={site.id}
                siteData={site}
                onEdit={() => {
                  if (onEditSite) {
                    onEditSite(site.id);
                  }
                }}
                onDelete={() =>
                  handleDeleteSite &&
                  handleDeleteSite(
                    site.id,
                    site.site_name || "this site"
                  )
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
