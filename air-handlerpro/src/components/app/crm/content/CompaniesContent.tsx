"use client";

import React, { useEffect, useState, useCallback } from "react";
import Actbox from "../../UI-components/Actbox";
import { BuildingIcon } from "../../../icons/icons";
import { SiteIcon } from "../../../icons/icons";
import Button from "../../UI-components/button";
import ServiceSitesGrid from "../../UI-components/serviceSideDataFormed";
import CustomerAccountsGrid from "../../UI-components/companySideDataFormed";
import { CompanyForm } from "./forms/CompanyForm";
import { SiteForm } from "./forms/SiteForm";
import {
  deleteCompany,
  fetchCompanies,
} from "@/service/api/companies";
import { LinkTable } from "@/components/forms/forms-instructions/CompanyProp";
import { supabase } from "@/lib/supabase";

export default function CompaniesContent() {
  const [view, setView] = useState<"Companies" | "sites">("Companies");
  const [companyFormToggle, setCompanyFormToggle] = useState(false);
  const [siteFormToggle, setSiteFormToggle] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [companies, setCompanies] = useState<any[]>([]);
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
        setCompanies(companiesResponse.data || []);
      }

      // Fetch link table data in parallel
      const promises = LinkTable.map(async (table) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] }; // Return empty on error
        }
        return { [table]: data };
      });

      const results = await Promise.all(promises);
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
    setEditingCompany(company);
    setCompanyFormToggle(true);
  };

  const handleCreateSite = () => {
    setSiteFormToggle(true);
  };

  const handleCancel = () => {
    setCompanyFormToggle(false);
    setSiteFormToggle(false);
    setEditingCompany(null);
  };

  const handleSubmit = () => {
    setCompanyFormToggle(false);
    setSiteFormToggle(false);
    setEditingCompany(null);
    triggerRefresh(); // Refresh data after submit
  };

  // Load data on mount and refresh
  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

  // Early returns for forms
  if (companyFormToggle) {
    console.log('test render--------------', linkTableData, editingCompany)

    return (
      <CompanyForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        linkTableData={linkTableData}
        editingCompany={editingCompany}
      />
    );
  }

  if (siteFormToggle) {
    return <SiteForm onCancel={handleCancel} onSubmit={handleSubmit} />;
  }

  const companyValue = {
    header: false,
    value: "Companies",
    icon: <BuildingIcon />,
    description:
      "Companies help you organize your contacts and deals by grouping them under a single entity.",
  };

  const siteValue = {
    header: false,
    value: "Sites",
    icon: <SiteIcon />,
    description:
      "Sites help you manage locations associated with your companies and streamline service operations.",
  };

  const hasCompanyData = companies.length > 0;
  const hasServiceData = true; // Adjust based on actual data if needed

  return (
    <div className="">
      <div className="flex gap-2 mb-6 justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setView("Companies")}
            className={`flex items-center gap-2 px-4 py-2 border border-black font-medium transition-colors rounded-md ${
              view === "Companies"
                ? "bg-charcoal text-white"
                : "bg-white text-charcoal hover:bg-charcoal/30"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Companies
          </button>

          <button
            onClick={() => setView("sites")}
            className={`flex items-center gap-2 px-4 py-2 border border-black font-medium transition-colors rounded-md ${
              view === "sites"
                ? "bg-charcoal text-white"
                : "bg-white text-charcoal hover:bg-charcoal/30"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Sites
          </button>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCreateCompany} value="Add Companies" />
          <Button onClick={handleCreateSite} value="Add Sites" />
        </div>
      </div>

      {view === "Companies" &&
        (hasCompanyData ? (
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
        ))}

      {view === "sites" &&
        (hasServiceData ? <ServiceSitesGrid /> : <Actbox {...siteValue} />)}
    </div>
  );
}