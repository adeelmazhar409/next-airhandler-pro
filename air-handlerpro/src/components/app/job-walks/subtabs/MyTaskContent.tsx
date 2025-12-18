import { useState } from "react";

// My Tasks Content Component
export function MyTasksContent() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [completedOpen, setCompletedOpen] = useState(false);

  const activeTasks = [
    {
      id: 1,
      title: "Complete HVAC inspection report for Building A",
      priority: "High",
      dueDate: "2024-12-15",
      assignedTo: "John Smith",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Schedule follow-up visit for compressor replacement",
      priority: "Medium",
      dueDate: "2024-12-16",
      assignedTo: "Sarah Johnson",
      status: "Pending",
    },
    {
      id: 3,
      title: "Review and approve estimate for retail store project",
      priority: "High",
      dueDate: "2024-12-14",
      assignedTo: "Mike Davis",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Order replacement parts for refrigeration unit",
      priority: "Low",
      dueDate: "2024-12-18",
      assignedTo: "Emily Brown",
      status: "Pending",
    },
  ];

  const completedTasks = [
    {
      id: 5,
      title: "Submit maintenance checklist for office complex",
      completedDate: "2024-12-10",
      assignedTo: "John Smith",
    },
    {
      id: 6,
      title: "Update customer on AC installation timeline",
      completedDate: "2024-12-09",
      assignedTo: "Sarah Johnson",
    },
    {
      id: 7,
      title: "Process invoice for last week's service calls",
      completedDate: "2024-12-08",
      assignedTo: "Mike Davis",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-platinum text-charcoal";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-cerulean/20 text-cerulean";
      case "Pending":
        return "bg-platinum text-slate";
      default:
        return "bg-platinum text-charcoal";
    }
  };

  return (
    <div className="bg-white border border-silver rounded-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-silver">
        <h2 className="text-base font-semibold text-charcoal">My Tasks</h2>
      </div>

      {/* Filters & Sorting */}
      <div className="border-b border-silver">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="w-full px-6 py-3 flex items-center justify-between hover:bg-platinum/30 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-charcoal">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters & Sorting
          </div>
          <svg
            className={`w-4 h-4 text-slate transition-transform ${
              filtersOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {filtersOpen && (
          <div className="px-6 py-4 bg-platinum/30 border-t border-silver">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-charcoal mb-1">
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-silver rounded-lg text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-cerulean transition-colors">
                  <option>All</option>
                  <option>Active</option>
                  <option>Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal mb-1">
                  Priority
                </label>
                <select className="w-full px-3 py-2 border border-silver rounded-lg text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-cerulean transition-colors">
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal mb-1">
                  Sort By
                </label>
                <select className="w-full px-3 py-2 border border-silver rounded-lg text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-cerulean transition-colors">
                  <option>Due Date</option>
                  <option>Priority</option>
                  <option>Name</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Tasks */}
      <div className="divide-y divide-silver">
        {activeTasks.map((task) => (
          <div
            key={task.id}
            className="px-6 py-4 hover:bg-platinum/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-cerulean border-silver rounded focus:ring-cerulean"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-charcoal mb-1">
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Due: {task.dueDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {task.assignedTo}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Tasks Section */}
      <div className="border-t border-silver">
        <button
          onClick={() => setCompletedOpen(!completedOpen)}
          className="w-full px-6 py-3 flex items-center justify-between hover:bg-platinum/30 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-charcoal">
            <svg
              className={`w-4 h-4 text-slate transition-transform ${
                completedOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            Completed Tasks ({completedTasks.length})
          </div>
        </button>

        {completedOpen && (
          <div className="divide-y divide-silver bg-platinum/30">
            {completedTasks.map((task) => (
              <div key={task.id} className="px-6 py-3">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-green-600 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm text-slate line-through">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate mt-1">
                      <span>Completed: {task.completedDate}</span>
                      <span>•</span>
                      <span>{task.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
