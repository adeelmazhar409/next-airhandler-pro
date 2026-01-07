"use client";

import React, { useEffect, useState, useCallback } from "react";
import Actbox from "../../UI-components/Actbox";
import { BuildingIcon } from "../../../icons/icons";
import Button from "../../UI-components/button";
import CustomerAccountsGrid from "../../UI-components/companySideDataFormed";
import { CompanyForm } from "./forms/CompanyForm";
import {
  createCompany,
  deleteCompany,
  fetchCompanies,
  updateCompany,
} from "@/service/api/companies";
import { companyLinkTable } from "@/components/forms/forms-instructions/CompanyProp";
import { supabase } from "@/lib/supabase";
import { buildFinalCompanyObject } from "@/components/utility/HelperFunctions";

export default function CompaniesContent() {
  const [view, setView] = useState<"companies" | "sites">("companies");
  const [companyFormToggle, setCompanyFormToggle] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [companies, setCompanies] = useState<any[]>([]);
  const [companyData, setCompanyData] = useState<any | null>(null);
  const [linkTableData, setLinkTableData] = useState<any[]>([]);

  // Memoized fetch functions to avoid recreating on every render
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch companies
      const companiesResponse = await fetchCompanies();

      if (!companiesResponse.success) {
        setError(companiesResponse.error || "Failed to load companies");
      } else {
        setCompanyData(companiesResponse.data);
      }

      // Fetch link table data in parallel
      const promises = companyLinkTable.map(async (table) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] }; // Return empty on error
        }
        return { [table]: data };
      });
      const results = await Promise.all(promises);

      const viewData = buildFinalCompanyObject(companiesResponse.data, results);

      setCompanies(viewData || []);
      setLinkTableData(results);
    } catch (err: any) {
      console.error("Error loading data:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger refresh
  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Delete company
  const handleDeleteCompany = async (companyId: string) => {
    try {
      await deleteCompany(companyId);
      triggerRefresh();
    } catch (err) {
      console.error("Error deleting company:", err);
    }
  };

  // Form handlers
  const handleCreateCompany = () => {
    setEditingCompany(null);
    setCompanyFormToggle(true);
  };

  const handleEditCompany = (company: any) => {
    setEditingCompany(companyData.find((c: any) => c.id === company));
    setCompanyFormToggle(true);
  };

  const handleCancel = () => {
    setCompanyFormToggle(false);
    setEditingCompany(null);
  };

  const handleSubmit = async (formData: any) => {
    formData.id
      ? updateCompany(formData.id, formData)
      : createCompany(formData);
    setCompanyFormToggle(false);
    setEditingCompany(null);
    triggerRefresh(); // Refresh data after submit
  };

  // Load data on mount and refresh
  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

  // Early returns for forms
  if (companyFormToggle) {
    return (
      <CompanyForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        linkTableData={linkTableData}
        editingCompany={editingCompany}
      />
    );
  }

  const companyValue = {
    header: false,
    value: "Companies",
    icon: <BuildingIcon />,
    description:
      "Companies help you organize your contacts and deals by grouping them under a single entity.",
  };

  return (
    <div className="">
      <div className="flex gap-2 mb-6 justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setView("companies")}
            className={`flex items-center gap-2 px-4 py-2 border border-black font-medium transition-colors rounded-md cursor-pointer ${
              view === "companies"
                ? "bg-charcoal text-white"
                : "bg-white text-charcoal hover:bg-charcoal/30"
            }`}
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Companies
          </button>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCreateCompany} value="Add Companies" />
        </div>
      </div>

      {companies.length > 0 ? (
        <CustomerAccountsGrid
          key={refreshKey}
          loading={loading}
          error={error}
          companies={companies}
          handleDeleteCompany={handleDeleteCompany}
          onEditCompany={handleEditCompany}
        />
      ) : (
        <Actbox {...companyValue} />
      )}
    </div>
  );
}
