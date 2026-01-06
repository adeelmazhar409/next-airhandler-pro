import React, { useCallback, useEffect, useState } from "react";
import { ActitivtyIcon } from "../../../icons/icons";
import Actbox from "../../UI-components/Actbox";
import { ClockIcon } from "../../../icons/icons";
import { ActivityForm } from "./forms/ActivityForm";
import { supabase } from "@/lib/supabase";
import { createActivity, deleteActivity, fetchActivities, updateActivity } from "@/service/api/activites";
import { activityLinkTable } from "@/components/forms/forms-instructions/ActivityProp";
import { buildFinalActivityObject } from "@/components/utility/HelperFunctions";

export default function ActivitiesContent() {
  const [activityFormToggle, setActivityFormToggle] = useState(false);
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activities, setActivities] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any | null>(null);
  const [linkTableData, setLinkTableData] = useState<any[]>([]);
  const [editingActivity, setEditingActivity] = useState<any | null>(null);

  // Memoized fetch functions to avoid recreating on every render
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch companies
      const activitiesResponse = await fetchActivities();

      if (!activitiesResponse.success) {
        setError(activitiesResponse.error || "Failed to load activities");
      } else {
        setActivityData(activitiesResponse.data);
      }

      // Fetch link table data in parallel
      const promises = activityLinkTable.map(async (table: any) => {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          console.error(`Error fetching ${table}:`, error);
          return { [table]: [] }; // Return empty on error
        }
        return { [table]: data };
      });
      const results = await Promise.all(promises);
      const activitiesViewData = buildFinalActivityObject(
        activitiesResponse.data || [],
        results
      );
      
      setActivities(activitiesViewData || []);
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

  const handleDeleteActivity = async (activityId: string) => {
    try {
      await deleteActivity(activityId);
      triggerRefresh();
    } catch (err) {
      console.error("Error deleting activity:", err);
    }
  };

    const handleEditActivity = (activity: any) => {
    setEditingActivity(activityData.find((a: any) => a.id === activity));
    setActivityFormToggle(true);
  };

  const handleCreateActivity = () => {
    setActivityFormToggle(true);
  };

  const handleCancelActivity = () => {
    setActivityFormToggle(false);
    setEditingActivity(null);
  };

  const handleSubmitActivity = (formData: any) => {
    formData.id
      ? updateActivity(formData.id, formData)
      : createActivity(formData);
    setActivityFormToggle(false);
    setEditingActivity(null);
    triggerRefresh(); // Refresh data after submit
  };

  // Load data on mount and refresh
  useEffect(() => {
    fetchAllData();
  }, [refreshKey, fetchAllData]);

  if (activityFormToggle) {
    return (
      <ActivityForm
        onCancel={handleCancelActivity}
        onSubmit={handleSubmitActivity}
        linkTableData={linkTableData}
        editingActivity={editingActivity}
      />
    );
  }
  const ActBoxData = {
    data:true,
    header: true,
    value: "Activity",
    formOpen: handleCreateActivity,
    headerIcon: <ActitivtyIcon />,
    icon: <ClockIcon />,
    description:
      "When you log calls, send emails, or create tasks, they'll appear here.",
  };

  return <Actbox {...ActBoxData} />;
}
