"use client";

import { useState } from "react";

export default function JobWalksAndTasks() {
  const [activeTab, setActiveTab] = useState<"jobWalks" | "myTasks">(
    "jobWalks"
  );

  return (
    <div className="bg-platinum/10">
      {/* Tabs Navigation */}
      <div className="bg-white border-b border-silver">
        <div className="flex px-6">
          <button
            onClick={() => setActiveTab("jobWalks")}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "jobWalks"
                ? "border-cerulean text-charcoal"
                : "border-transparent text-slate hover:text-charcoal"
            }`}
          >
            Job Walks
          </button>
          <button
            onClick={() => setActiveTab("myTasks")}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "myTasks"
                ? "border-cerulean text-charcoal"
                : "border-transparent text-slate hover:text-charcoal"
            }`}
          >
            My Tasks
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === "jobWalks" ? <JobWalksContent /> : <MyTasksContent />}
      </div>
    </div>
  );
}

// Job Walks Content Component
function JobWalksContent() {
  const jobWalks = [
    {
      id: 1,
      date: "2024-12-10",
      jobName: "HVAC System Inspection - Building A",
      type: "Inspection",
      user: "John Smith",
      nextStep: "Create Estimate",
      photos: 12,
    },
    {
      id: 2,
      date: "2024-12-09",
      jobName: "Compressor Replacement - Retail Store",
      type: "Repair",
      user: "Sarah Johnson",
      nextStep: "Schedule Work",
      photos: 8,
    },
    {
      id: 3,
      date: "2024-12-08",
      jobName: "Preventive Maintenance - Office Complex",
      type: "Maintenance",
      user: "Mike Davis",
      nextStep: "Pending Review",
      photos: 15,
    },
    {
      id: 4,
      date: "2024-12-07",
      jobName: "Refrigeration Unit Check - Restaurant",
      type: "Inspection",
      user: "Emily Brown",
      nextStep: "Generate Report",
      photos: 6,
    },
    {
      id: 5,
      date: "2024-12-06",
      jobName: "AC Installation Assessment - New Construction",
      type: "Assessment",
      user: "John Smith",
      nextStep: "Create Estimate",
      photos: 20,
    },
  ];

  return (
    <>
      {/* Search and Action Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search job name, tech, type..."
            className="w-full pl-10 pr-4 py-2 border border-silver rounded-lg text-sm text-charcoal placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors"
          />
        </div>
        <button className="flex text-charcoal items-center gap-2 px-4 py-2 border border-silver rounded-lg hover:bg-platinum hover:border-cerulean transition-colors text-sm font-medium">
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-cerulean text-white rounded-lg hover:bg-slate transition-colors text-sm font-medium">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Job Walk
        </button>
      </div>

      {/* Recent Job Walks Table */}
      <div className="bg-white border border-silver rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-silver">
          <h2 className="text-base font-semibold text-charcoal">
            Recent Job Walks
          </h2>
        </div>

        {/* Table Header */}
        <div className="bg-platinum/30 border-b border-silver">
          <div className="grid grid-cols-12 gap-4 px-6 py-3">
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              Date
            </div>
            <div className="col-span-3 text-xs font-medium text-slate uppercase tracking-wider">
              Job Name
            </div>
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              Type
            </div>
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              User
            </div>
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              Next Step
            </div>
            <div className="col-span-1 text-xs font-medium text-slate uppercase tracking-wider text-right">
              Actions
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-silver">
          {jobWalks.map((job) => (
            <div
              key={job.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-platinum/20 transition-colors"
            >
              <div className="col-span-2 text-sm text-charcoal">{job.date}</div>
              <div className="col-span-3 text-sm font-medium text-charcoal">
                {job.jobName}
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cerulean/20 text-cerulean">
                  {job.type}
                </span>
              </div>
              <div className="col-span-2 text-sm text-slate">{job.user}</div>
              <div className="col-span-2 text-sm text-slate">
                {job.nextStep}
              </div>
              <div className="col-span-1 flex items-center justify-end gap-2">
                <button className="text-slate hover:text-cerulean transition-colors">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <button className="text-slate hover:text-cerulean transition-colors">
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// My Tasks Content Component
function MyTasksContent() {
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
