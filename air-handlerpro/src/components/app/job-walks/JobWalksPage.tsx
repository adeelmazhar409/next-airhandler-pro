"use client";

import { useCallback, useEffect, useState } from "react";
import { JobWalksForm } from "./JobWalksForm";
import { JobWalksContent } from "./subtabs/JobWalksContent";
import { MyTasksContent } from "./subtabs/MyTaskContent";
import { Admin } from "./subtabs/Admin";
import JobWalkDetailPage from "./JobWalkDetailPage";
import {
  createJobWalk,
  deleteJobWalk,
  fetchJobWalks,
  updateJobWalk,
} from "@/service/api/jobwalks";
import { JobWalksLinkTable } from "@/components/forms/forms-instructions/JobWalksProp";
import { supabase } from "@/lib/supabase";
import { buildFinalJobWalksObject } from "@/components/utility/HelperFunctions";

export default function JobWalksAndTasks() {
  const [activeTab, setActiveTab] = useState<"jobWalks" | "myTasks" | "admin">(
    "jobWalks"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobWalkFormToggle, setJobWalkFormToggle] = useState(false);
  const [jobWalksData, setJobWalksData] = useState<any[]>([]);
  const [jobWalksLinkTableData, setJobWalksLinkTableData] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [jobWalks, setJobWalks] = useState<any[]>([]);
  const [editingJobWalk, setEditingJobWalk] = useState<any | null>(null);
  const [selectedJobWalkId, setSelectedJobWalkId] = useState<number | null>(
    null
  );

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const jobWalksResponse = await fetchJobWalks();

      if (!jobWalksResponse.success) {
        setError(jobWalksResponse.error || "Failed to load job walks");
      } else {
        setJobWalksData(jobWalksResponse.data || []);
      }

      const promises = JobWalksLinkTable.map(async (table: any) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] };
        }
        return { [table]: data };
      });
      const results = await Promise.all(promises);

      const viewData = buildFinalJobWalksObject(
        jobWalksResponse.data || [],
        results
      );

      setJobWalks(viewData || []);
      setJobWalksLinkTableData(results);
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

  const handleCreateJobWalk = () => {
    setEditingJobWalk(null);
    setJobWalkFormToggle(true);
  };

  const handleEditJobWalk = (jobWalk: any) => {
    setEditingJobWalk(jobWalk);
    setJobWalkFormToggle(true);
  };

  const handleDeleteJobWalk = async (
    jobWalkId: string,
    jobWalkName: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${jobWalkName}"?`
    );
    if (confirmed) {
      const result = await deleteJobWalk(jobWalkId);
      if (result.success) {
        triggerRefresh();
      }
    }
  };

  const handleCancel = () => {
    setJobWalkFormToggle(false);
    setEditingJobWalk(null);
  };

  const handleSubmit = async (formData: any) => {
    const result = formData.id
      ? await updateJobWalk(formData.id, formData)
      : await createJobWalk(formData);
    console.log(formData);
    setJobWalkFormToggle(false);
    setEditingJobWalk(null);
    triggerRefresh();
  };

  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

  const handleViewJobWalkDetails = (jobWalkId: number) => {
    setSelectedJobWalkId(jobWalkId);
  };

  const handleBackToList = () => {
    setSelectedJobWalkId(null);
  };

  // Show Job Walk Detail Page
  if (selectedJobWalkId !== null) {
    const jobWalkData = jobWalks.find((jw) => jw.id === selectedJobWalkId);
    if (jobWalkData) {
      return <JobWalkDetailPage data={jobWalkData} onBack={handleBackToList} />;
    }
  }

  // Show Create Job Walk Form
  if (jobWalkFormToggle) {
    return (
      <JobWalksForm
        linkTableData={jobWalksLinkTableData}
        editingJobWalk={editingJobWalk}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="">
      {/* Tabs Navigation */}
      <div className="bg-white border-b border-silver">
        <div className="flex px-6">
          <button
            onClick={() => setActiveTab("jobWalks")}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === "jobWalks"
                ? "border-cerulean text-charcoal"
                : "border-transparent text-slate hover:text-charcoal"
            }`}
          >
            Job Walks
          </button>
          <button
            onClick={() => setActiveTab("myTasks")}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === "myTasks"
                ? "border-cerulean text-charcoal"
                : "border-transparent text-slate hover:text-charcoal"
            }`}
          >
            My Tasks
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "admin"
                ? "border-cerulean text-charcoal"
                : "border-transparent text-slate hover:text-charcoal"
            }`}
          >
            Admin View
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === "jobWalks" && (
          <JobWalksContent
            key={refreshKey}
            jobWalks={jobWalks}
            loading={loading}
            error={error}
            onClick={handleCreateJobWalk}
            onViewDetails={handleViewJobWalkDetails}
          />
        )}
        {activeTab === "myTasks" && <MyTasksContent />}
        {activeTab === "admin" && <Admin />}
      </div>
    </div>
  );
}
