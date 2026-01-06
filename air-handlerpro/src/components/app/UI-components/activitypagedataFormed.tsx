"use client";
import ActivityItem from "@/components/app/UI-components/activitypagedata";

function LoadingSkeleton() {
  return (
    <div className="space-y-4 mx-auto p-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-full h-32 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}

interface ActivityPageDataFormedProps {
  loading?: boolean;
  error?: string | null;
  activities?: any[];
  handleDeleteActivity?: (activityId: string, activitySubject: string) => void;
  onEditActivity?: (activityId: string) => void;
}

export default function ActivityPageDataFormed({
  loading,
  error,
  activities,
  handleDeleteActivity,
  onEditActivity,
}: ActivityPageDataFormedProps) {
  return (
    <div className="mx-auto p-6 space-y-4">
      {loading && <LoadingSkeleton />}

      {error && (
        <div className="text-center py-12">
          <p className="text-gray-500">{error}</p>
        </div>
      )}

      {!loading && !error && activities?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No activities found.</p>
        </div>
      )}

      {!loading && !error && activities && activities.length > 0 && (
        <>
          {activities?.map((activity) => {
            // Determine priority and type from activity data
            const priority = (activity.priority?.toLowerCase() || "medium") as
              | "low"
              | "medium"
              | "high";
            const type = (activity.activity_type?.toLowerCase() || "note") as
              | "note"
              | "meeting"
              | "task";

            // Format dates
            const completedDate = activity.completed_at
              ? new Date(activity.completed_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : undefined;

            const dueDateTime =
              activity.due_date && activity.due_time
                ? `${new Date(activity.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })} ${activity.due_time}`
                : undefined;

            // Build related to string
            const relatedTo =
              activity.related_to_type && activity.related_to_id
                ? `${activity.related_to_type} · ${activity.related_to_id}`
                : undefined;

            return (
              <ActivityItem
                key={activity.id}
                title={activity.subject}
                desc={activity.description || "No description provided"}
                relatedTo={relatedTo}
                completedDate={completedDate}
                dueDate={dueDateTime}
                priority={priority}
                type={type}
                onEdit={() => {
                  if (onEditActivity) {
                    onEditActivity(activity.id);
                  }
                }}
                onDelete={() => {
                  if (handleDeleteActivity) {
                    handleDeleteActivity(activity.id, activity.subject);
                  }
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
