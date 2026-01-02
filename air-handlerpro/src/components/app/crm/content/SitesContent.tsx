"use client";

import React, { useEffect, useState, useCallback } from "react";
import Actbox from "../../UI-components/Actbox";
import { SiteIcon } from "../../../icons/icons";
import Button from "../../UI-components/button";
import ServiceSitesGrid from "../../UI-components/serviceSideDataFormed";
import { SiteForm } from "./forms/SiteForm";
import { supabase } from "@/lib/supabase";
import {
  buildFinalSiteObject,
} from "@/components/utility/HelperFunctions";
import { createServiceSite, deleteServiceSite, fetchServiceSites, updateServiceSite } from "@/service/api/site";
import { siteLinkTable } from "@/components/forms/forms-instructions/SiteProp";

export default function SitesContent() {
  const [view, setView] = useState<"companies" | "sites">("companies");
  const [siteFormToggle, setSiteFormToggle] = useState(false);
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sites, setSites] = useState<any[]>([]);
  const [siteData, setSiteData] = useState<any | null>(null);
  const [linkTableData, setLinkTableData] = useState<any[]>([]);
  const [editingSite, setEditingSite] = useState<any | null>(null);

  // Memoized fetch functions to avoid recreating on every render
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch companies
      const serviceSitesResponse = await fetchServiceSites();

      if (!serviceSitesResponse.success) {
        setError(serviceSitesResponse.error || "Failed to load service sites");
      } else {
        setSiteData(serviceSitesResponse.data);
      }

      // Fetch link table data in parallel
      const promises = siteLinkTable.map(async (table) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] }; // Return empty on error
        }
        return { [table]: data };
      });
      const results = await Promise.all(promises);

      const sitesViewData = buildFinalSiteObject(
        serviceSitesResponse.data || [],
        results
      );

      setSites(sitesViewData || []);
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

  const handleDeleteSite = async (siteId: string) => {
    try {
      await deleteServiceSite(siteId);
      triggerRefresh();
    } catch (err) {
      console.error("Error deleting site:", err);
    }
  };

  const handleEditSite = (site: any) => {
    setEditingSite(siteData.find((s: any) => s.id === site));
    setSiteFormToggle(true);
  };

  const handleCreateSite = () => {
    setSiteFormToggle(true);
  };

  const handleCancel = () => {
    setSiteFormToggle(false);
    setEditingSite(null);
  };

  const handleSubmit = (formData: any) => {
    formData.id
      ? updateServiceSite(formData.id, formData)
      : createServiceSite(formData);
    console.log(formData);
    setSiteFormToggle(false);
    setEditingSite(null);
    triggerRefresh(); // Refresh data after submit
  };

  // Load data on mount and refresh
  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

  // Early returns for forms
  if (siteFormToggle) {
    return (
      <SiteForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        linkTableData={linkTableData}
        editingSite={editingSite}
      />
    );
  }

  const siteValue = {
    header: false,
    value: "Sites",
    icon: <SiteIcon />,
    description:
      "Sites help you manage locations associated with your companies and streamline service operations.",
  };

  const hasServiceData = true; // Adjust based on actual data if needed

  return (
    <div className="">
      <div className="flex gap-2 mb-6 justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setView("sites")}
            className={`flex items-center gap-2 px-4 py-2 border border-black font-medium transition-colors rounded-md cursor-pointer ${
              view === "sites"
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
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Sites
          </button>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCreateSite} value="Add Sites" />
        </div>
      </div>

      {hasServiceData ? (
        <ServiceSitesGrid
          key={refreshKey}
          loading={loading}
          error={error}
          serviceSites={sites}
          handleDeleteSite={handleDeleteSite}
          onEditSite={handleEditSite}
        />
      ) : (
        <Actbox {...siteValue} />
      )}
    </div>
  );
}
