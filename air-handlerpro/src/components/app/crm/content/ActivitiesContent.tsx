import React, { useCallback, useEffect, useState } from "react";
import { ActitivtyIcon, ClockIcon } from "../../../icons/icons";
import Button from "../../UI-components/button";
import { ActivityForm } from "./forms/ActivityForm";
import { deleteActivity, fetchActivities } from "@/service/api/activites";
import ActivityPageDataFormed from "../../UI-components/activitypagedataFormed";

export default function ActivitiesContent() {
  const [formToggle, setFormToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activities, setActivities] = useState<any[]>([]);

  // Memoized fetch function
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const activitiesResponse = await fetchActivities();

      if (!activitiesResponse.success) {
        setError(activitiesResponse.error || "Failed to load activities");
      } else {
        setActivities(activitiesResponse.data || []);
      }
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

  const handleDeleteActivity = async (
    activityId: string,
    activitySubject: string
  ) => {
    if (
      !confirm(`Are you sure you want to delete activity: ${activitySubject}?`)
    ) {
      return;
    }

    try {
      const result = await deleteActivity(activityId);
      if (result.success) {
        triggerRefresh();
      } else {
        console.error("Error deleting activity:", result.error);
        alert("Failed to delete activity");
      }
    } catch (err) {
      console.error("Error deleting activity:", err);
      alert("An unexpected error occurred");
    }
  };

  const handleEditActivity = (activityId: string) => {
    // TODO: Implement edit functionality
    // For now, just log the activity ID
    console.log("Edit activity:", activityId);
    alert("Edit functionality coming soon!");
  };

  const handleCreateEstimate = () => {
    setFormToggle(true);
  };

  const handleCancel = () => {
    setFormToggle(false);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Close the form and refresh data
    setFormToggle(false);
    triggerRefresh();
  };

  // Load data on mount and refresh
  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

  // Show form if toggle is on
  if (formToggle) {
    return (
      <ActivityForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        linkTableData={[]}
        editingActivity={null}
      />
    );
  }

  // Check if we have data
  const hasData = !loading && !error && activities.length > 0;

  return (
    <div className="mx-auto my-3 px-4">
      <div className="w-full flex justify-end py-2">
        <Button onClick={handleCreateEstimate} value="New Activity" />
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

        {/* Content - Show ActivityPageDataFormed if has data, otherwise show empty state */}
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
        <Button onClick={handleCreateEstimate} value="Activity" />
      </div>
    </div>
  );
}
