"use client";

import CustomerAccountCard from "./companySideData";

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

interface CustomerAccountsGridProps {
  loading?: boolean;
  error?: string | null;
  companies?: any[];
  handleDeleteCompany?: (companyId: string, companyName: string) => void;
  onEditCompany?: (companyId: string) => void;
  viewMode?: "list" | "grid";
}

export default function CustomerAccountsGrid({
  loading,
  error,
  companies,
  handleDeleteCompany,
  onEditCompany,
  viewMode = "grid",
}: CustomerAccountsGridProps) {
  return (
    <div className="px-4">
      {loading && <LoadingSkeleton viewMode={viewMode} />}

      {error && (
        <div className="text-center py-12">
          <p className="text-gray-500">{error}</p>
        </div>
      )}

      {!loading && !error && companies?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No companies found.</p>
        </div>
      )}

      {!loading && !error && companies && companies.length > 0 && (
        <div
          className={viewMode === "grid" ? "flex gap-3 flex-wrap" : "space-y-4"}
        >
          {companies.map((company) => (
            <CustomerAccountCard
              key={company.id}
              companyData={company}
              viewMode={viewMode}
              onEdit={() => onEditCompany?.(company.id)}
              onDelete={() =>
                handleDeleteCompany?.(
                  company.id,
                  company.business_name || "this company"
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
