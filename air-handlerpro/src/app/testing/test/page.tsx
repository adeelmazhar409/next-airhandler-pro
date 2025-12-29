"use client";

import { useState } from "react";
import {
  handleFormOperation,
  baseCreate,
  baseFetch,
  baseFetchById,
  baseUpdate,
  baseDelete,
} from "@/service/base";
import { WorkOrderFormData } from "@/service/api/workorder";
import { JobWalkFormData } from "@/service/api/jobwalks";

export default function TestingPage() {
  const [activeTab, setActiveTab] = useState<"workorder" | "jobwalk">(
    "workorder"
  );
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Work Order Form State
  const [woForm, setWoForm] = useState<WorkOrderFormData>({
    customerCompanyId: "",
    customerSiteId: "",
    workOrderNumber: "",
    scheduledStart: "",
    scheduledEnd: "",
    description: "",
    equipmentInformation: "",
  });

  // Job Walk Form State
  const [jwForm, setJwForm] = useState<JobWalkFormData>({
    customerCompanyId: "",
    customerSiteId: "",
    jobName: "",
    dateOfWalk: "",
    taskType: "",
    jobNotes: "",
    nextStep: "",
    assignedTo: "",
    photosCount: 0,
  });

  // ============================================================================
  // WORK ORDER OPERATIONS - Using Base Handler
  // ============================================================================

  const handleCreateWorkOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await baseCreate("workorder", woForm);
    setResults(result);
    setLoading(false);
    if (result.success) {
      setWoForm({
        customerCompanyId: "",
        customerSiteId: "",
        workOrderNumber: "",
        scheduledStart: "",
        scheduledEnd: "",
        description: "",
        equipmentInformation: "",
      });
    }
  };

  const handleFetchWorkOrders = async () => {
    setLoading(true);
    const result = await baseFetch("workorder");
    setResults(result);
    setLoading(false);
  };

  // ============================================================================
  // JOB WALK OPERATIONS - Using Base Handler
  // ============================================================================

  const handleCreateJobWalk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await baseCreate("jobwalk", jwForm);
    setResults(result);
    setLoading(false);
    if (result.success) {
      setJwForm({
        customerCompanyId: "",
        customerSiteId: "",
        jobName: "",
        dateOfWalk: "",
        taskType: "",
        jobNotes: "",
        nextStep: "",
        assignedTo: "",
        photosCount: 0,
      });
    }
  };

  const handleFetchJobWalks = async () => {
    setLoading(true);
    const result = await baseFetch("jobwalk");
    setResults(result);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold text-charcoal mb-2">
        Base API Test Page
      </h1>
      <p className="text-slate mb-6">
        Testing centralized base handler for Work Orders & Job Walks
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-silver">
        <button
          onClick={() => setActiveTab("workorder")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "workorder"
              ? "text-cerulean border-b-2 border-cerulean"
              : "text-slate hover:text-charcoal"
          }`}
        >
          Work Orders
        </button>
        <button
          onClick={() => setActiveTab("jobwalk")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "jobwalk"
              ? "text-cerulean border-b-2 border-cerulean"
              : "text-slate hover:text-charcoal"
          }`}
        >
          Job Walks
        </button>
      </div>

      {/* Work Orders Tab */}
      {activeTab === "workorder" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Create Form */}
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Create Work Order</h2>
            <form onSubmit={handleCreateWorkOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Customer Company ID *
                </label>
                <input
                  required
                  type="text"
                  value={woForm.customerCompanyId}
                  onChange={(e) =>
                    setWoForm({ ...woForm, customerCompanyId: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  placeholder="Enter company UUID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Service Site ID (Optional)
                </label>
                <input
                  type="text"
                  value={woForm.customerSiteId || ""}
                  onChange={(e) =>
                    setWoForm({ ...woForm, customerSiteId: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  placeholder="Enter site UUID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Work Order Number
                </label>
                <input
                  type="text"
                  value={woForm.workOrderNumber || ""}
                  onChange={(e) =>
                    setWoForm({ ...woForm, workOrderNumber: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  placeholder="WO-2024-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Scheduled Start
                </label>
                <input
                  type="datetime-local"
                  value={woForm.scheduledStart || ""}
                  onChange={(e) =>
                    setWoForm({ ...woForm, scheduledStart: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Scheduled End
                </label>
                <input
                  type="datetime-local"
                  value={woForm.scheduledEnd || ""}
                  onChange={(e) =>
                    setWoForm({ ...woForm, scheduledEnd: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={woForm.description || ""}
                  onChange={(e) =>
                    setWoForm({ ...woForm, description: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  rows={3}
                  placeholder="AC unit not cooling properly..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Work Order"}
              </button>
            </form>
          </div>

          {/* Fetch Button */}
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Fetch Work Orders</h2>
            <button
              onClick={handleFetchWorkOrders}
              disabled={loading}
              className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Fetch All Work Orders"}
            </button>
          </div>
        </div>
      )}

      {/* Job Walks Tab */}
      {activeTab === "jobwalk" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Create Form */}
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Create Job Walk</h2>
            <form onSubmit={handleCreateJobWalk} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Name *
                </label>
                <input
                  required
                  type="text"
                  value={jwForm.jobName}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, jobName: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  placeholder="HVAC Installation Site Walk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Walk *
                </label>
                <input
                  required
                  type="date"
                  value={jwForm.dateOfWalk}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, dateOfWalk: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Task Type
                </label>
                <input
                  type="text"
                  value={jwForm.taskType || ""}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, taskType: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  placeholder="Installation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Notes
                </label>
                <textarea
                  value={jwForm.jobNotes || ""}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, jobNotes: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  rows={3}
                  placeholder="Detailed notes about the job walk..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Photos Count
                </label>
                <input
                  type="number"
                  value={jwForm.photosCount || 0}
                  onChange={(e) =>
                    setJwForm({
                      ...jwForm,
                      photosCount: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  min="0"
                  placeholder="0"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Job Walk"}
              </button>
            </form>
          </div>

          {/* Fetch Button */}
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Fetch Job Walks</h2>
            <button
              onClick={handleFetchJobWalks}
              disabled={loading}
              className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Fetch All Job Walks"}
            </button>
          </div>
        </div>
      )}

      {/* Results Display */}
      {results && (
        <div className="mt-6 border border-silver rounded-lg p-6 bg-platinum/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {results.success ? "✅ Success" : "❌ Error"}
            </h3>
            <button
              onClick={() => setResults(null)}
              className="text-slate hover:text-charcoal"
            >
              Clear
            </button>
          </div>

          {results.message && (
            <p className="text-sm text-slate mb-2">{results.message}</p>
          )}

          {results.error && (
            <p className="text-sm text-red-600 mb-2">{results.error}</p>
          )}

          <pre className="bg-white p-4 rounded border border-silver overflow-auto max-h-96 text-xs">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-cerulean/10 border border-cerulean/20 rounded">
        <p className="text-sm text-charcoal mb-2">
          <strong>🧠 Base Handler Test</strong>
        </p>
        <p className="text-sm text-charcoal">
          This page uses the centralized base.ts handler. All operations flow
          through:
        </p>
        <code className="bg-white px-3 py-2 rounded text-xs mt-2 inline-block border border-silver">
          Component → base.ts → workorder.ts/jobwalks.ts → Supabase
        </code>
      </div>
    </div>
  );
}
