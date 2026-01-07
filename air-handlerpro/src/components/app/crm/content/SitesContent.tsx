"use client";

import React, { useEffect, useState, useCallback } from "react";
import Actbox from "../../UI-components/Actbox";
import { SiteIcon, } from "../../../icons/icons";
import { List,LayoutGrid } from "lucide-react";
import Button from "../../UI-components/button";
import ServiceSitesGrid from "../../UI-components/serviceSideDataFormed";
import { SiteForm } from "./forms/SiteForm";
import { supabase } from "@/lib/supabase";
import { buildFinalSiteObject } from "@/components/utility/HelperFunctions";
import {
  createServiceSite,
  deleteServiceSite,
  fetchServiceSites,
  updateServiceSite,
} from "@/service/api/site";
import { siteLinkTable } from "@/components/forms/forms-instructions/SiteProp";
import { toast } from "@/components/toast";
import { confirm } from "@/components/confirm";

export default function SitesContent() {
  const [siteFormToggle, setSiteFormToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sites, setSites] = useState<any[]>([]);
  const [siteData, setSiteData] = useState<any | null>(null);
  const [linkTableData, setLinkTableData] = useState<any[]>([]);
  const [editingSite, setEditingSite] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid"); // Default to grid like your card design

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const serviceSitesResponse = await fetchServiceSites();
      console.log(serviceSitesResponse);

      if (!serviceSitesResponse.success) {
        setError(serviceSitesResponse.error || "Failed to load service sites");
      } else {
        setSiteData(serviceSitesResponse.data);
      }

      const promises = siteLinkTable.map(async (table) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] };
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

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleDeleteSite = (siteId: string, siteName: string) => {
    confirm(
      `Are you sure you want to delete site: "${siteName}"?`,
      async () => {
        try {
          const result = await deleteServiceSite(siteId);
          if (result.success) {
            toast("✅ Site deleted successfully!");
            triggerRefresh();
          } else {
            toast("❌ Failed to delete site");
          }
        } catch (err) {
          console.error("Error deleting site:", err);
          toast("❌ An unexpected error occurred");
        }
      }
    );
  };

  const handleEditSite = (siteId: string) => {
    const siteToEdit = siteData?.find((s: any) => s.id === siteId);
    if (siteToEdit) {
      setEditingSite(siteToEdit);
      setSiteFormToggle(true);
    }
  };

  const handleCreateSite = () => {
    setEditingSite(null);
    setSiteFormToggle(true);
  };

  const handleCancel = () => {
    setSiteFormToggle(false);
    setEditingSite(null);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (formData.id) {
        await updateServiceSite(formData.id, formData);
      } else {
        await createServiceSite(formData);
      }
      setSiteFormToggle(false);
      setEditingSite(null);
      triggerRefresh();
      toast("✅ Success! Record saved");
    } catch (err) {
      console.error("Error submitting site:", err);
      toast("❌ Failed to save site");
    }
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };

  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

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

  const hasServiceData = sites.length > 0;

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

        <Button onClick={handleCreateSite} value="Add Sites" />
      </div>

      {hasServiceData ? (
        <ServiceSitesGrid
          key={refreshKey}
          loading={loading}
          error={error}
          serviceSites={sites}
          handleDeleteSite={handleDeleteSite}
          onEditSite={handleEditSite}
          viewMode={viewMode}
        />
      ) : (
        <Actbox {...siteValue} />
      )}
    </div>
  );
}
