"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { toast } from "@/components/toast";
import { createUpdate, fetchUpdates } from "@/service/api/updates";
import {
  formatDateTime,
  fromISOTimestamp,
} from "@/components/utility/HelperFunctions";

export default function JobWalkDetailPage({ data, onBack }: any) {
  const [newUpdate, setNewUpdate] = useState("");
  const [updates, setUpdates] = useState<any[]>([]);
  const [tasksExpanded, setTasksExpanded] = useState(false);

  const fetchUpdatesService = async () => {
    const response = await fetchUpdates();
    if (response.success) {
      setUpdates(response.data || []);
    } else {
      toast(response.message || "Failed to fetch updates");
    }
    return response;
  };
  useEffect(() => {
    fetchUpdatesService();
    fetchUpdates().then((response: any) => {
      if (response.success) {
        setUpdates(response.data);
      } else {
        toast(response.message || "Failed to fetch updates");
        console.log(response.message);
      }
    });
  }, []);
  const handleAddUpdate = () => {
    createUpdate({
      job_walk_id: data.id,
      description: newUpdate,
    }).then((response: any) => {
      if (response.success) {
        setUpdates([response.data, ...updates]);
      }
    });
    if (newUpdate.trim()) {
      const now = new Date();
      const timestamp =
        now.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }) +
        ", " +
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

      const update: any = {
        id: Date.now().toString(),
        timestamp,
        content: newUpdate,
      };

      setUpdates([update, ...updates]);
      setNewUpdate("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddUpdate();
    }
  };

  // Type badge styling
  const getTypeBadge = (type: string) => {
    const badges: Record<string, string> = {
      Walk: "bg-gray-200 text-gray-700",
      Install: "bg-blue-100 text-blue-800",
      Assessment: "bg-purple-100 text-purple-800",
      Quote: "bg-green-100 text-green-800",
      Repair: "bg-red-100 text-red-800",
      Maintenance: "bg-yellow-100 text-yellow-800",
      Other: "bg-gray-200 text-gray-700",
    };
    return badges[type] || badges.Walk;
  };

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 mb-6 border border-charcoal rounded-lg text-charcoal hover:bg-platinum transition-colors font-medium"
      >
        <span>←</span>
        <span>Back to Job Walks</span>
      </button>

      {/* Main Content Card */}
      <div className="bg-white border-2 border-black rounded-lg p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-charcoal">
              {data.job_name}
            </h1>
            <span className="text-slate text-sm rounded-full px-2 py-1 bg-silver/20">
              {data.date_of_walk}
            </span>
            <span
              className={`px-3 py-1 rounded-full border-[0.2px] border-charcoal/20 text-sm font-medium ${getTypeBadge(
                data.task_type
              )}`}
            >
              {data.task_type}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>

        {/* Tech and Next Step */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-base font-bold text-charcoal mb-2">Tech</h3>
            <p className="text-charcoal">{data.created_by || "—"}</p>
          </div>

          <div>
            <h3 className="text-base font-bold text-charcoal mb-2">
              Next Step
            </h3>
            <p className="text-charcoal">{data.next_step || "—"}</p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-charcoal mb-3">Notes</h3>
          <div className="text-charcoal text-sm leading-relaxed whitespace-pre-wrap">
            {data.job_notes}
          </div>
        </div>

        {/* Updates Section */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-charcoal mb-3">Updates</h3>

          {/* Add Update Input */}
          <div className="flex gap-3 mb-4">
            <textarea
              value={newUpdate}
              onChange={(e) => setNewUpdate(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add an update..."
              className="flex-1 px-4 py-3 border border-silver rounded-lg text-sm text-charcoal placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors resize-none"
              rows={3}
            />
            <button
              onClick={handleAddUpdate}
              className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-colors h-fit cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Updates List */}
          <div className="space-y-3">
            {updates
              ?.filter((update) => update.job_walk_id === data.id)
              .map((update) => (
                <div
                  key={update.id}
                  className="p-4 border border-silver rounded-lg"
                >
                  <p className="text-xs text-slate mb-2">
                    {formatDateTime(update.created_at)}
                  </p>
                  <p className="text-sm text-charcoal">{update.description}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Tasks & Assignments Section */}
        <div className="border-t border-silver pt-6">
          <button
            onClick={() => setTasksExpanded(!tasksExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-charcoal">
                Tasks & Assignments
              </h3>
              <span className="text-sm text-slate">({data.tasks?.length})</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate transition-transform ${
                tasksExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {tasksExpanded && (
            <div className="mt-4 space-y-3">
              {data.tasks.length === 0 ? (
                <p className="text-sm text-slate py-4">No tasks assigned yet</p>
              ) : (
                data.tasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="p-4 border border-silver rounded-lg hover:bg-platinum/20 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-charcoal mb-1">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate">
                          <span>Assigned to: {task.assignedTo}</span>
                          <span>•</span>
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
