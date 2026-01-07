// components/ActivityItem.tsx

import React from "react";
import { CheckCircle2, Calendar, Edit2, Trash2 } from "lucide-react";

type Priority = "low" | "medium" | "high";
type ActivityType = "note" | "meeting" | "task";

interface ActivityItemProps {
  icon2?: React.ReactNode;
  title: string;
  desc: string;
  relatedTo?: string;
  completedDate?: string;
  dueDate?: string;
  priority?: Priority;
  type?: ActivityType;
  viewMode?: "list" | "grid";
  onEdit?: () => void;
  onDelete?: () => void;
}

export type { ActivityItemProps, Priority, ActivityType };

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon2 = <CheckCircle2 className="w-5 h-5 text-green-500" />,
  title,
  desc,
  relatedTo,
  completedDate,
  dueDate,
  priority = "medium",
  type = "note",
  viewMode = "list",
  onEdit,
  onDelete,
}) => {
  // Priority color mapping
  const priorityColor =
    priority === "low"
      ? "bg-green-500"
      : priority === "high"
      ? "bg-orange-500"
      : "bg-blue-500";

  // Type label
  const typeLabel =
    type === "meeting" ? "Meeting" : type === "task" ? "Task" : "Note";

  // LIST VIEW LAYOUT
  if (viewMode === "list") {
    return (
      <div className="bg-white w-full border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                {icon2}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{title}</h4>
              <p className="text-sm text-gray-600 mt-1">{desc}</p>

              {relatedTo && (
                <p className="text-sm text-gray-500 mt-1">
                  Related to: <span className="font-medium">{relatedTo}</span>
                </p>
              )}

              {(completedDate || dueDate) && (
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                  {completedDate && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed {completedDate}</span>
                    </div>
                  )}
                  {dueDate && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {dueDate}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side: Priority & Type Badges + Action Buttons */}
          <div className="flex flex-col items-end gap-2 ml-4">
            {/* Badges */}
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-white text-xs font-medium ${priorityColor}`}
              >
                {priority}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-300">
                {typeLabel}
              </span>
            </div>

            {/* Action Buttons */}
            {(onEdit || onDelete) && (
              <div className="flex gap-2">
                {onEdit && (
                  <button
                    onClick={onEdit}
                    className="p-2 text-cerulean hover:bg-cerulean/10 rounded-md transition-colors"
                    title="Edit activity"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={onDelete}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete activity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW LAYOUT (Card Style)
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      {/* Header with Icon and Badges */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          {icon2}
        </div>
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 rounded-full text-white text-xs font-medium ${priorityColor}`}
          >
            {priority}
          </span>
        </div>
      </div>

      {/* Title and Type */}
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900 text-base line-clamp-2 flex-1">
          {title}
        </h4>
      </div>

      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-300 w-fit mb-3">
        {typeLabel}
      </span>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">{desc}</p>

      {/* Related To */}
      {relatedTo && (
        <p className="text-xs text-gray-500 mb-3">
          Related: <span className="font-medium">{relatedTo}</span>
        </p>
      )}

      {/* Dates */}
      {(completedDate || dueDate) && (
        <div className="space-y-2 mb-3 text-xs">
          {completedDate && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="w-3 h-3" />
              <span>Completed {completedDate}</span>
            </div>
          )}
          {dueDate && (
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>Due: {dueDate}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {(onEdit || onDelete) && (
        <div className="flex gap-2 pt-3 border-t border-gray-100 mt-auto">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-cerulean hover:bg-cerulean/10 rounded-md transition-colors text-sm font-medium"
              title="Edit activity"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors text-sm font-medium"
              title="Delete activity"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityItem;
