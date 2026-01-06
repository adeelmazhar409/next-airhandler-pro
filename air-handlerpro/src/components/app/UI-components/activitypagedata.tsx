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
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon2 = <CheckCircle2 className="w-5 h-5 text-green-500" />,
  title,
  desc,
  relatedTo,
  completedDate,
  dueDate,
  priority = "medium",
  type = "note",
  onEdit,
  onDelete,
}) => {
  // Priority color mapping (without clsx)
  const priorityColor =
    priority === "low"
      ? "bg-green-500"
      : priority === "high"
      ? "bg-orange-500"
      : "bg-blue-500";

  // Type label
  const typeLabel =
    type === "meeting" ? "Meeting" : type === "task" ? "Task" : "Note";

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
};

export default ActivityItem;
