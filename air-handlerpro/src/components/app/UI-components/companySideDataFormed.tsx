"use client";

import CustomerAccountCard from "./companySideData";

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

export default function CustomerAccountsGrid({
  onEditCompany,
  loading,
  error,
  companies,
  handleDeleteCompany,
}: {
  onEditCompany?: (company: any) => void;
  loading?: boolean;
  error?: string | null;
  companies?: any[];
  handleDeleteCompany?: (companyId: string, companyName: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Customer Accounts
      </h2>

      {loading && <LoadingSkeleton />}

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
        <div className="flex gap-3 flex-wrap">
          {companies?.map((company) => {

            return (
              <CustomerAccountCard
                companyData={company}
                onEdit={() => {
                  if (onEditCompany) {
                    onEditCompany(company);
                  }
                }}
                onDelete={() =>
                  handleDeleteCompany &&
                  handleDeleteCompany(
                    company.id,
                    company.business_name || "this company"
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
