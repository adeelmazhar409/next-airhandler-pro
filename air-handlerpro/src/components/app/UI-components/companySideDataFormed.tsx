"use client";

import { useEffect, useState } from "react";
import {
  fetchCompanies,
  deleteCompany,
  type Company,
} from "@/service/api/companies";
import CustomerAccountCard from "./companySideData";

interface CustomerAccountsGridProps {
  onEditCompany?: (company: Company) => void;
}

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
}: CustomerAccountsGridProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetchCompanies();

      console.log("Companies response:", response);

      if (!response.success) {
        setError(response.error || "Failed to load companies");
        return;
      }

      setCompanies(response.data || []);

      if (response.data && response.data.length > 0) {
        console.log("First company:", response.data[0]);
      }
    } catch (err) {
      console.error("Error loading companies:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleDeleteCompany = async (
    companyId: string,
    companyName: string
  ) => {
    // Confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${companyName}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(companyId);
      const response = await deleteCompany(companyId);

      if (!response.success) {
        alert(response.error || "Failed to delete company");
        return;
      }

      // Remove the company from the list
      setCompanies((prev) => prev.filter((c) => c.id !== companyId));
      console.log("Company deleted successfully:", companyId);
    } catch (err) {
      console.error("Error deleting company:", err);
      alert("An unexpected error occurred while deleting the company");
    } finally {
      setDeletingId(null);
    }
  };

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

      {!loading && !error && companies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No companies found.</p>
        </div>
      )}

      {!loading && !error && companies.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {companies.map((company) => {
            console.log("Mapping company:", company);

            return (
              <CustomerAccountCard
                key={company.id}
                accountName={company.business_name || "No Name"}
                badgeLabel={company.company_type || "Company"}
                sitesCount={0}
                billingContactName={
                  typeof company.primary_contact === "string"
                    ? company.primary_contact
                    : company.primary_contact &&
                      typeof company.primary_contact === "object"
                    ? company.primary_contact.first_name &&
                      company.primary_contact.last_name
                      ? `${company.primary_contact.first_name} ${company.primary_contact.last_name}`
                      : company.primary_contact.email || "N/A"
                    : "N/A"
                }
                billingAddress={company.billing_address || "No address"}
                billingPhone={
                  typeof company.primary_contact === "object" &&
                  company.primary_contact
                    ? company.primary_contact.phone || "N/A"
                    : "N/A"
                }
                billingEmail={
                  typeof company.primary_contact === "object" &&
                  company.primary_contact
                    ? company.primary_contact.email || "N/A"
                    : "N/A"
                }
                ownerEmail={company.owner?.email || company.created_by || "N/A"}
                isDeleting={deletingId === company.id}
                onEdit={() => {
                  if (onEditCompany) {
                    onEditCompany(company);
                  }
                }}
                onDelete={() =>
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
