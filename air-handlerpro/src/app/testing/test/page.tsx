"use client";

import { useState } from "react";
import {
  baseCreate,
  baseFetch,
  baseFetchById,
  baseUpdate,
  baseDelete,
} from "@/service/base";

export default function CompleteCRUDTestPage() {
  const [activeTab, setActiveTab] = useState<
    | "workorder"
    | "jobwalk"
    | "activity"
    | "company"
    | "contact"
    | "site"
    | "maintenanceEstimate"
  >("workorder");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mode for each form: create, update, fetchById, delete
  const [mode, setMode] = useState<
    "create" | "update" | "fetchById" | "delete"
  >("create");
  const [selectedId, setSelectedId] = useState("");

  // ============================================================================
  // WORK ORDER FORM STATE
  // ============================================================================
  const [woForm, setWoForm] = useState({
    customerCompanyId: "",
    customerSiteId: "",
    workOrderNumber: "",
    scheduledStart: "",
    scheduledEnd: "",
    assignedTechnician: "",
    description: "",
    equipmentInformation: "",
    serviceType: "",
    priority: "Medium",
    status: "Scheduled",
  });

  // ============================================================================
  // JOB WALK FORM STATE
  // ============================================================================
  const [jwForm, setJwForm] = useState({
    jobName: "",
    customerCompanyId: "",
    customerSiteId: "",
    dateOfWalk: "",
    timeOfWalk: "",
    walkConductedBy: "",
    customerRepresentative: "",
    jobNotes: "",
    equipmentNotes: "",
    followUpRequired: false,
    estimatedProjectValue: "",
  });

  // ============================================================================
  // ACTIVITY FORM STATE
  // ============================================================================
  const [actForm, setActForm] = useState({
    activityType: "",
    subject: "",
    relatedTo: "",
    relatedToId: "",
    dueDate: "",
    priority: "Medium",
    status: "Not Started",
    description: "",
    assignedTo: "",
  });

  // ============================================================================
  // COMPANY FORM STATE
  // ============================================================================
  const [compForm, setCompForm] = useState({
    companyName: "",
    companyType: "",
    parentCompany: "",
    website: "",
    industry: "",
    numberOfEmployees: "",
    annualRevenue: "",
    billingAddress: "",
    shippingAddress: "",
    phoneNumber: "",
    email: "",
    description: "",
  });

  // ============================================================================
  // CONTACT FORM STATE
  // ============================================================================
  const [contForm, setContForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    title: "",
    department: "",
    companyId: "",
    serviceSiteId: "",
    mailingAddress: "",
    description: "",
  });

  // ============================================================================
  // SITE FORM STATE
  // ============================================================================
  const [siteForm, setSiteForm] = useState({
    siteName: "",
    siteType: "",
    parentCompanyId: "",
    serviceAddress: "",
    primaryContactId: "",
    billingContactId: "",
    operatingHours: "",
    accessInstructions: "",
    siteNotes: "",
  });

  // ============================================================================
  // MAINTENANCE ESTIMATE FORM STATE
  // ============================================================================
  const [meForm, setMeForm] = useState({
    customerCompanyId: "",
    customerSiteId: "",
    serviceSiteOwner: "",
    estimateName: "",
    estimateNumber: "",
    contractLength: 12,
    contractStartDate: "",
    billingFrequency: "Monthly" as
      | "Monthly"
      | "Quarterly"
      | "Annual"
      | "Bi-Annual",
    milesToSite: 0,
    travelCharge: 0,
    parkingFees: 0,
    status: "draft" as "draft" | "pending" | "approved" | "rejected",
    totalAmount: 0,
  });

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let formData: any;
    switch (activeTab) {
      case "workorder":
        formData = woForm;
        break;
      case "jobwalk":
        formData = jwForm;
        break;
      case "activity":
        formData = actForm;
        break;
      case "company":
        formData = compForm;
        break;
      case "contact":
        formData = contForm;
        break;
      case "site":
        formData = siteForm;
        break;
      case "maintenanceEstimate":
        formData = meForm;
        break;
    }

    const result = await baseCreate(activeTab, formData);
    setResults(result);
    setLoading(false);
  };

  const handleFetch = async () => {
    setLoading(true);
    const result = await baseFetch(activeTab);
    setResults(result);
    setLoading(false);
  };

  const handleFetchById = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) {
      setResults({ success: false, error: "Please enter an ID" });
      return;
    }
    setLoading(true);
    const result = await baseFetchById(activeTab, selectedId);
    setResults(result);
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) {
      setResults({ success: false, error: "Please enter an ID" });
      return;
    }

    let formData: any;
    switch (activeTab) {
      case "workorder":
        formData = woForm;
        break;
      case "jobwalk":
        formData = jwForm;
        break;
      case "activity":
        formData = actForm;
        break;
      case "company":
        formData = compForm;
        break;
      case "contact":
        formData = contForm;
        break;
      case "site":
        formData = siteForm;
        break;
      case "maintenanceEstimate":
        formData = meForm;
        break;
    }

    setLoading(true);
    const result = await baseUpdate(activeTab, selectedId, formData);
    setResults(result);
    setLoading(false);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) {
      setResults({ success: false, error: "Please enter an ID" });
      return;
    }
    setLoading(true);
    const result = await baseDelete(activeTab, selectedId);
    setResults(result);
    setLoading(false);
  };

  const tabs = [
    { id: "workorder", label: "Work Orders" },
    { id: "jobwalk", label: "Job Walks" },
    { id: "activity", label: "Activities" },
    { id: "company", label: "Companies" },
    { id: "contact", label: "Contacts" },
    { id: "site", label: "Sites" },
    { id: "maintenanceEstimate", label: "Maintenance Estimates" },
  ];

  const modes = [
    { id: "create", label: "Create", icon: "➕" },
    { id: "update", label: "Update", icon: "✏️" },
    { id: "fetchById", label: "Fetch By ID", icon: "🔍" },
    { id: "delete", label: "Delete", icon: "🗑️" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto text-black">
      <h1 className="text-3xl font-bold text-charcoal mb-2">
        🧪 Complete CRUD Test Suite
      </h1>
      <p className="text-slate mb-6">
        Test ALL operations: Create, Read, Update, Delete for all 7 forms
        (including Maintenance Estimates)
      </p>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-silver pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 font-medium transition-colors rounded-t ${
              activeTab === tab.id
                ? "text-white bg-cerulean"
                : "text-slate hover:text-charcoal hover:bg-platinum"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MODE SELECTOR */}
      <div className="flex gap-2 mb-6 p-4 bg-platinum/20 rounded-lg">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as any)}
            className={`px-4 py-2 font-medium transition-colors rounded ${
              mode === m.id
                ? "text-white bg-cerulean"
                : "text-charcoal bg-white border border-silver hover:bg-platinum"
            }`}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* QUICK FETCH ALL BUTTON */}
      <div className="mb-6">
        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📋 Fetch All {tabs.find((t) => t.id === activeTab)?.label}
        </button>
      </div>

      {/* DYNAMIC FORM BASED ON MODE */}
      {mode !== "fetchById" && mode !== "delete" && (
        <div className="bg-white p-6 rounded-lg border-2 border-silver mb-6">
          <h2 className="text-xl font-bold text-charcoal mb-4">
            {mode === "create" ? "Create New" : "Update Existing"}{" "}
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>

          {mode === "update" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Record ID to Update
              </label>
              <input
                type="text"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                placeholder="Enter record ID"
                className="w-full px-3 py-2 border border-silver rounded focus:outline-none focus:ring-2 focus:ring-cerulean"
              />
            </div>
          )}

          <form onSubmit={mode === "create" ? handleCreate : handleUpdate}>
            {/* RENDER FORM FIELDS BASED ON ACTIVE TAB */}
            {activeTab === "maintenanceEstimate" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Customer Company ID
                  </label>
                  <input
                    type="text"
                    value={meForm.customerCompanyId}
                    onChange={(e) =>
                      setMeForm({
                        ...meForm,
                        customerCompanyId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Customer Site ID
                  </label>
                  <input
                    type="text"
                    value={meForm.customerSiteId}
                    onChange={(e) =>
                      setMeForm({ ...meForm, customerSiteId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Estimate Name
                  </label>
                  <input
                    type="text"
                    value={meForm.estimateName}
                    onChange={(e) =>
                      setMeForm({ ...meForm, estimateName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Estimate Number
                  </label>
                  <input
                    type="text"
                    value={meForm.estimateNumber}
                    onChange={(e) =>
                      setMeForm({ ...meForm, estimateNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Contract Length (months)
                  </label>
                  <input
                    type="number"
                    value={meForm.contractLength}
                    onChange={(e) =>
                      setMeForm({
                        ...meForm,
                        contractLength: parseInt(e.target.value) || 12,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Contract Start Date
                  </label>
                  <input
                    type="date"
                    value={meForm.contractStartDate}
                    onChange={(e) =>
                      setMeForm({
                        ...meForm,
                        contractStartDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Billing Frequency
                  </label>
                  <select
                    value={meForm.billingFrequency}
                    onChange={(e) =>
                      setMeForm({
                        ...meForm,
                        billingFrequency: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annual">Annual</option>
                    <option value="Bi-Annual">Bi-Annual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Miles to Site
                  </label>
                  <input
                    type="number"
                    value={meForm.milesToSite}
                    onChange={(e) =>
                      setMeForm({
                        ...meForm,
                        milesToSite: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Travel Charge
                  </label>
                  <input
                    type="number"
                    value={meForm.travelCharge}
                    onChange={(e) =>
                      setMeForm({
                        ...meForm,
                        travelCharge: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Parking/Other Fees
                  </label>
                  <input
                    type="number"
                    value={meForm.parkingFees}
                    onChange={(e) =>
                      setMeForm({
                        ...meForm,
                        parkingFees: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Status
                  </label>
                  <select
                    value={meForm.status}
                    onChange={(e) =>
                      setMeForm({ ...meForm, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  >
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    value={meForm.totalAmount}
                    onChange={(e) =>
                      setMeForm({
                        ...meForm,
                        totalAmount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-cerulean text-white font-medium rounded hover:bg-cerulean/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : mode === "create"
                  ? "➕ Create Record"
                  : "✏️ Update Record"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FETCH BY ID FORM */}
      {mode === "fetchById" && (
        <div className="bg-white p-6 rounded-lg border-2 border-silver mb-6">
          <h2 className="text-xl font-bold text-charcoal mb-4">
            🔍 Fetch {tabs.find((t) => t.id === activeTab)?.label} By ID
          </h2>
          <form onSubmit={handleFetchById}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Record ID
              </label>
              <input
                type="text"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                placeholder="Enter record ID"
                className="w-full px-3 py-2 border border-silver rounded focus:outline-none focus:ring-2 focus:ring-cerulean"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-cerulean text-white font-medium rounded hover:bg-cerulean/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Fetching..." : "🔍 Fetch Record"}
            </button>
          </form>
        </div>
      )}

      {/* DELETE FORM */}
      {mode === "delete" && (
        <div className="bg-white p-6 rounded-lg border-2 border-red-300 mb-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            🗑️ Delete {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
          <form onSubmit={handleDelete}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Record ID to Delete
              </label>
              <input
                type="text"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                placeholder="Enter record ID"
                className="w-full px-3 py-2 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Deleting..." : "🗑️ Delete Record"}
            </button>
          </form>
        </div>
      )}

      {/* RESULTS */}
      {results && (
        <div
          className={`p-6 rounded-lg border-2 ${
            results.success
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-xl font-bold ${
                results.success ? "text-green-800" : "text-red-800"
              }`}
            >
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
            <p className="text-sm text-red-600 mb-2 font-medium">
              {results.error}
            </p>
          )}
          <pre className="bg-white p-4 rounded border border-silver overflow-auto max-h-96 text-xs">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      {/* INFO BOX */}
      <div className="mt-6 p-4 bg-cerulean/10 border border-cerulean/20 rounded">
        <p className="text-sm text-charcoal mb-2">
          <strong>🧪 Complete CRUD Test Suite</strong>
        </p>
        <p className="text-sm text-charcoal mb-2">
          Test all operations through centralized base.ts handler including new
          Maintenance Estimates:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs">
          <div className="bg-white p-2 rounded border border-silver">
            ➕ <strong>Create</strong> - Insert new records
          </div>
          <div className="bg-white p-2 rounded border border-silver">
            📋 <strong>Fetch</strong> - Get all records
          </div>
          <div className="bg-white p-2 rounded border border-silver">
            🔍 <strong>Fetch By ID</strong> - Get single record
          </div>
          <div className="bg-white p-2 rounded border border-silver">
            ✏️ <strong>Update</strong> - Modify existing
          </div>
        </div>
        <div className="bg-white p-2 rounded border border-silver mt-2 text-xs">
          🗑️ <strong>Delete</strong> - Remove records
        </div>
      </div>
    </div>
  );
}
