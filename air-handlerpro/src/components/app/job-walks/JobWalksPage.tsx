"use client";

import { useState } from "react";
import { JobWalksForm } from "./JobWalksForm";
import { JobWalksContent, jobWalksData } from "./subtabs/JobWalksContent";
import { MyTasksContent } from "./subtabs/MyTaskContent";
import { Admin } from "./subtabs/Admin";
import JobWalkDetailPage from "./JobWalkDetailPage";

export default function JobWalksAndTasks() {
  const [activeTab, setActiveTab] = useState<"jobWalks" | "myTasks" | "admin">(
    "jobWalks"
  );
  const [formToggle, setFormToggle] = useState(false);
  const [selectedJobWalkId, setSelectedJobWalkId] = useState<number | null>(
    null
  );

  const handleCreateJob = () => {
    setFormToggle(true);
  };

  const handleCancel = () => {
    setFormToggle(false);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission logic
    // After successful submission, you might want to close the form:
    // setFormToggle(false);
  };

  const handleViewJobWalkDetails = (jobWalkId: number) => {
    setSelectedJobWalkId(jobWalkId);
  };

  const handleBackToList = () => {
    setSelectedJobWalkId(null);
  };

  // Show Job Walk Detail Page
  if (selectedJobWalkId !== null) {
    const jobWalkData = jobWalksData.find((jw) => jw.id === selectedJobWalkId);
    if (jobWalkData) {
      return <JobWalkDetailPage data={jobWalkData} onBack={handleBackToList} />;
    }
  }

  // Show Create Job Walk Form
  if (formToggle) {
    return <JobWalksForm onCancel={handleCancel} onSubmit={handleSubmit} />;
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
            onClick={handleCreateJob}
            onViewDetails={handleViewJobWalkDetails}
          />
        )}
        {activeTab === "myTasks" && <MyTasksContent />}
        {activeTab === "admin" && <Admin />}
      </div>
    </div>
  );
}
