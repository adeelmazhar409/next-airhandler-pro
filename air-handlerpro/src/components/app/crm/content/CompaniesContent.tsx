"use client";

import React, { useEffect, useState, useCallback } from "react";
import Actbox from "../../UI-components/Actbox";
import { BuildingIcon} from "../../../icons/icons";
import { LayoutGrid,List } from "lucide-react";
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
import { toast } from "@/components/toast";
import { confirm } from "@/components/confirm";

export default function CompaniesContent() {
  const [companyFormToggle, setCompanyFormToggle] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [companies, setCompanies] = useState<any[]>([]);
  const [companyData, setCompanyData] = useState<any | null>(null);
  const [linkTableData, setLinkTableData] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid"); // Default to grid

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const companiesResponse = await fetchCompanies();

      if (!companiesResponse.success) {
        setError(companiesResponse.error || "Failed to load companies");
      } else {
        setCompanyData(companiesResponse.data);
      }

      const promises = companyLinkTable.map(async (table) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] };
        }
        return { [table]: data };
      });
      const results = await Promise.all(promises);

      const viewData = buildFinalCompanyObject(
        companiesResponse.data || [],
        results
      );

      setCompanies(viewData || []);
      setLinkTableData(results);
    } catch (err: any) {
      console.error("Error loading data:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleDeleteCompany = (companyId: string, companyName: string) => {
    confirm(
      `Are you sure you want to delete company: "${companyName}"?`,
      async () => {
        try {
          const result = await deleteCompany(companyId);
          if (result.success) {
            toast("✅ Company deleted successfully!");
            triggerRefresh();
          } else {
            toast("❌ Failed to delete company");
          }
        } catch (err) {
          console.error("Error deleting company:", err);
          toast("❌ An unexpected error occurred");
        }
      }
    );
  };

  const handleCreateCompany = () => {
    setEditingCompany(null);
    setCompanyFormToggle(true);
  };

  const handleEditCompany = (companyId: string) => {
    const companyToEdit = companyData?.find((c: any) => c.id === companyId);
    if (companyToEdit) {
      setEditingCompany(companyToEdit);
      setCompanyFormToggle(true);
    }
  };

  const handleCancel = () => {
    setCompanyFormToggle(false);
    setEditingCompany(null);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (formData.id) {
        await updateCompany(formData.id, formData);
      } else {
        await createCompany(formData);
      }
      setCompanyFormToggle(false);
      setEditingCompany(null);
      triggerRefresh();
      toast("✅ Success! Record saved");
    } catch (error) {
      console.error("Error submitting company:", error);
      toast("❌ Failed to save company");
    }
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };

  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

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

  const hasData = companies.length > 0;

  return (
    <div className="">
      <div className="flex gap-2 mb-6 justify-between px-4">
        {/* View Toggle Button */}
        <button
          onClick={toggleViewMode}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors"
        >
          {viewMode === "list" ? (
            <>
              <LayoutGrid className="w-4 h-4" />
              <span>Grid View</span>
            </>
          ) : (
            <>
              <List className="w-4 h-4" />
              <span>List View</span>
            </>
          )}
        </button>

        <Button onClick={handleCreateCompany} value="Add Companies" />
      </div>

      {hasData ? (
        <CustomerAccountsGrid
          key={refreshKey}
          loading={loading}
          error={error}
          companies={companies}
          handleDeleteCompany={handleDeleteCompany}
          onEditCompany={handleEditCompany}
          viewMode={viewMode}
        />
      ) : (
        <Actbox {...companyValue} />
      )}
    </div>
  );
}
