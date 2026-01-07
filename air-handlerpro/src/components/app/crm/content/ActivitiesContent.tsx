import React, { useCallback, useEffect, useState } from "react";
import { ActitivtyIcon, ClockIcon } from "../../../icons/icons";
import Button from "../../UI-components/button";
import { ActivityForm } from "./forms/ActivityForm";
import { supabase } from "@/lib/supabase";
import {
  createActivity,
  deleteActivity,
  fetchActivities,
  updateActivity,
} from "@/service/api/activites";
import { activityLinkTable } from "@/components/forms/forms-instructions/ActivityProp";
import { buildFinalActivityObject } from "@/components/utility/HelperFunctions";
import ActivityPageDataFormed from "../../UI-components/activitypagedataFormed";
import { toast } from "@/components/toast";
import { confirm } from "@/components/confirm";

export default function ActivitiesContent() {
  const [formToggle, setFormToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activities, setActivities] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]); // Raw activities from API
  const [linkTableData, setLinkTableData] = useState<any[]>([]);
  const [editingActivity, setEditingActivity] = useState<any | null>(null);

  // Memoized fetch function - includes link tables and builds enriched view
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch main activities
      const activitiesResponse = await fetchActivities();

      if (!activitiesResponse.success) {
        setError(activitiesResponse.error || "Failed to load activities");
        setActivities([]);
        setActivityData([]);
        return;
      }

      const rawActivities = activitiesResponse.data || [];
      setActivityData(rawActivities);

      // Fetch all related link tables in parallel
      const promises = activityLinkTable.map(async (table: any) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] };
        }
        return { [table]: data };
      });

      const results = await Promise.all(promises);

      // Build enriched activity objects for display
      const activitiesViewData = buildFinalActivityObject(
        rawActivities,
        results
      );
      setActivities(activitiesViewData || []);
      setLinkTableData(results);
    } catch (err: any) {
      console.error("Error loading data:", err);
      setError("An unexpected error occurred");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger refresh
  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
const handleDeleteActivity = async (
  activityId: string,
  activitySubject: string
) => {
  confirm(
    `Are you sure you want to delete activity: "${activitySubject}"?`,
    async () => {
      // This only runs if user clicks "Confirm"
      try {
        const result = await deleteActivity(activityId);

        if (result.success) {
          toast("✅ Activity deleted successfully!");
          triggerRefresh();
        } else {
          toast("❌ Failed to delete activity");
          console.error("Error deleting activity:", result.error);
        }
      } catch (err) {
        console.error("Error deleting activity:", err);
        toast("❌ An unexpected error occurred");
      }
    }
  );
};

  const handleEditActivity = (activityId: string) => {
    const activityToEdit = activityData.find((a: any) => a.id === activityId);
    if (activityToEdit) {
      setEditingActivity(activityToEdit);
      setFormToggle(true);
    } else {
      alert("Activity not found for editing.");
    }
  };

  const handleCreateActivity = () => {
    setEditingActivity(null);
    setFormToggle(true);
  };

  const handleCancel = () => {
    setFormToggle(false);
    setEditingActivity(null);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (formData.id) {
        await updateActivity(formData.id, formData);
      } else {
        await createActivity(formData);
      }
      setFormToggle(false);
      setEditingActivity(null);
      triggerRefresh();
  toast("✅ Success! Record saved");
    } catch (err) {
      console.error("Error submitting activity:", err);
      alert("Failed to save activity. Please try again.");
    }
  };

  // Load data on mount and on refresh
  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

  // Show form when toggled
  if (formToggle) {
    return (
      <ActivityForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        linkTableData={linkTableData}
        editingActivity={editingActivity}
      />
    );
  }

  const hasData = !loading && !error && activities.length > 0;

  return (
    <div className="mx-auto my-3 px-4">
      <div className="w-full flex justify-end py-2">
        <Button onClick={handleCreateActivity} value="New Activity" />
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg border border-silver shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-silver bg-cerulean">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ActitivtyIcon />
            Activity
          </h2>
        </div>

        {/* Content */}
        {hasData ? (
          <ActivityPageDataFormed
            loading={loading}
            error={error}
            activities={activities}
            handleDeleteActivity={handleDeleteActivity}
            onEditActivity={handleEditActivity}
          />
        ) : (
          <>
            {/* Loading State */}
            {loading && (
              <div className="p-12 text-center">
                <div className="mx-auto w-14 h-14 mb-4 text-silver flex justify-center items-center">
                  <ClockIcon />
                </div>
                <p className="text-sm font-medium text-slate">
                  Loading activities...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="p-12 text-center">
                <div className="mx-auto w-14 h-14 mb-4 text-red-400 flex justify-center items-center">
                  <ClockIcon />
                </div>
                <p className="text-sm font-medium text-red-600">{error}</p>
                <button
                  onClick={triggerRefresh}
                  className="mt-4 px-4 py-2 bg-cerulean text-white rounded-lg hover:bg-cerulean/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && activities.length === 0 && (
              <div className="p-12 text-center">
                <div className="mx-auto w-14 h-14 mb-4 text-silver flex justify-center items-center">
                  <ClockIcon />
                </div>
                <p className="text-sm font-medium text-slate">
                  No activities found
                </p>
                <p className="text-xs text-slate/70 mt-1.5 max-w-md mx-auto">
                  When you log calls, send emails, or create tasks, they'll
                  appear here.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating New Button */}
      <div className="mt-4 text-center">
        <Button onClick={handleCreateActivity} value="Activity" />
      </div>
    </div>
  );
}
