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
    "workorder" | "jobwalk" | "activity" | "company" | "contact" | "site"
  >("workorder");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mode for each form: create, update, fetchById, delete
  const [mode, setMode] = useState<
    "create" | "update" | "fetchById" | "delete"
  >("create");
  const [selectedId, setSelectedId] = useState("");

  // ============================================================================
  // WORK ORDER FORM STATE (ALL FIELDS)
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
  // JOB WALK FORM STATE (ALL FIELDS)
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
  // ACTIVITY FORM STATE (ALL FIELDS)
  // ============================================================================
  const [actForm, setActForm] = useState({
    subject: "",
    activityType: "",
    priority: "Medium",
    relatedTo: "",
    relatedItem: "",
    dueDate: "",
    dueTime: "",
    contact: "",
    assignTo: "",
    description: "",
  });

  // ============================================================================
  // COMPANY FORM STATE (ALL FIELDS)
  // ============================================================================
  const [compForm, setCompForm] = useState({
    businessName: "",
    companyType: "",
    primaryContact: "",
    billingAddress: "",
    serviceSites: "",
  });

  // ============================================================================
  // CONTACT FORM STATE (ALL FIELDS)
  // ============================================================================
  const [contForm, setContForm] = useState({
    firstName: "",
    lastName: "",
    title: "",
    department: "",
    parentCompany: "",
    serviceSite: "",
    email: "",
    phone: "",
    mobilePhone: "",
    workPhone: "",
    contactType: "Primary Contact",
    contactStatus: "Active",
  });

  // ============================================================================
  // SITE FORM STATE (ALL FIELDS)
  // ============================================================================
  const [siteForm, setSiteForm] = useState({
    siteName: "",
    siteType: "standalone",
    parentCompany: "",
    primaryContact: "",
    serviceAddress: "",
    manuallySetOwner: false,
    siteOwner: "",
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
        Test ALL operations: Create, Read, Update, Delete for all 6 forms
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
                ? "bg-cerulean text-white"
                : "bg-white text-charcoal border border-silver hover:border-cerulean"
            }`}
          >
            {m.icon} {m.label}
          </button>
        ))}
        <button
          onClick={handleFetch}
          disabled={loading}
          className="ml-auto px-4 py-2 bg-slate text-white rounded hover:bg-charcoal transition-colors"
        >
          📋 Fetch All
        </button>
      </div>

      {/* ====================================================================== */}
      {/* WORK ORDERS */}
      {/* ====================================================================== */}
      {activeTab === "workorder" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "create" && "Create Work Order"}
              {mode === "update" && "Update Work Order"}
              {mode === "fetchById" && "Fetch Work Order By ID"}
              {mode === "delete" && "Delete Work Order"}
            </h2>

            <form
              onSubmit={
                mode === "create"
                  ? handleCreate
                  : mode === "update"
                  ? handleUpdate
                  : mode === "fetchById"
                  ? handleFetchById
                  : handleDelete
              }
              className="space-y-3"
            >
              {(mode === "update" ||
                mode === "fetchById" ||
                mode === "delete") && (
                <input
                  required
                  type="text"
                  placeholder="Enter Work Order ID *"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full border border-cerulean rounded px-3 py-2 bg-cerulean/5"
                />
              )}

              {(mode === "create" || mode === "update") && (
                <>
                  <input
                    required
                    type="text"
                    placeholder="Customer Company ID *"
                    value={woForm.customerCompanyId}
                    onChange={(e) =>
                      setWoForm({
                        ...woForm,
                        customerCompanyId: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Customer Site ID"
                    value={woForm.customerSiteId}
                    onChange={(e) =>
                      setWoForm({ ...woForm, customerSiteId: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Work Order Number"
                    value={woForm.workOrderNumber}
                    onChange={(e) =>
                      setWoForm({ ...woForm, workOrderNumber: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="datetime-local"
                      placeholder="Scheduled Start"
                      value={woForm.scheduledStart}
                      onChange={(e) =>
                        setWoForm({ ...woForm, scheduledStart: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                    <input
                      type="datetime-local"
                      placeholder="Scheduled End"
                      value={woForm.scheduledEnd}
                      onChange={(e) =>
                        setWoForm({ ...woForm, scheduledEnd: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Assigned Technician ID"
                    value={woForm.assignedTechnician}
                    onChange={(e) =>
                      setWoForm({
                        ...woForm,
                        assignedTechnician: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Service Type"
                    value={woForm.serviceType}
                    onChange={(e) =>
                      setWoForm({ ...woForm, serviceType: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <select
                    value={woForm.priority}
                    onChange={(e) =>
                      setWoForm({ ...woForm, priority: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Urgent">Urgent Priority</option>
                  </select>
                  <select
                    value={woForm.status}
                    onChange={(e) =>
                      setWoForm({ ...woForm, status: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <textarea
                    placeholder="Description"
                    value={woForm.description}
                    onChange={(e) =>
                      setWoForm({ ...woForm, description: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                    rows={2}
                  />
                  <textarea
                    placeholder="Equipment Information"
                    value={woForm.equipmentInformation}
                    onChange={(e) =>
                      setWoForm({
                        ...woForm,
                        equipmentInformation: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                    rows={2}
                  />
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors"
              >
                {loading
                  ? "Processing..."
                  : mode === "create"
                  ? "Create"
                  : mode === "update"
                  ? "Update"
                  : mode === "fetchById"
                  ? "Fetch"
                  : "Delete"}
              </button>
            </form>
          </div>

          {/* Info Panel */}
          <div className="border border-silver rounded-lg p-6 bg-platinum/10">
            <h3 className="font-semibold mb-3">Work Order Fields:</h3>
            <ul className="text-sm space-y-1 text-slate">
              <li>✅ customerCompanyId (required)</li>
              <li>• customerSiteId</li>
              <li>• workOrderNumber</li>
              <li>• scheduledStart</li>
              <li>• scheduledEnd</li>
              <li>• assignedTechnician</li>
              <li>• serviceType</li>
              <li>• priority</li>
              <li>• status</li>
              <li>• description</li>
              <li>• equipmentInformation</li>
            </ul>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* JOB WALKS */}
      {/* ====================================================================== */}
      {activeTab === "jobwalk" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "create" && "Create Job Walk"}
              {mode === "update" && "Update Job Walk"}
              {mode === "fetchById" && "Fetch Job Walk By ID"}
              {mode === "delete" && "Delete Job Walk"}
            </h2>

            <form
              onSubmit={
                mode === "create"
                  ? handleCreate
                  : mode === "update"
                  ? handleUpdate
                  : mode === "fetchById"
                  ? handleFetchById
                  : handleDelete
              }
              className="space-y-3"
            >
              {(mode === "update" ||
                mode === "fetchById" ||
                mode === "delete") && (
                <input
                  required
                  type="text"
                  placeholder="Enter Job Walk ID *"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full border border-cerulean rounded px-3 py-2 bg-cerulean/5"
                />
              )}

              {(mode === "create" || mode === "update") && (
                <>
                  <input
                    required
                    type="text"
                    placeholder="Job Name *"
                    value={jwForm.jobName}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, jobName: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Customer Company ID"
                    value={jwForm.customerCompanyId}
                    onChange={(e) =>
                      setJwForm({
                        ...jwForm,
                        customerCompanyId: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Customer Site ID"
                    value={jwForm.customerSiteId}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, customerSiteId: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      type="date"
                      placeholder="Date of Walk *"
                      value={jwForm.dateOfWalk}
                      onChange={(e) =>
                        setJwForm({ ...jwForm, dateOfWalk: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                    <input
                      type="time"
                      placeholder="Time of Walk"
                      value={jwForm.timeOfWalk}
                      onChange={(e) =>
                        setJwForm({ ...jwForm, timeOfWalk: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Walk Conducted By"
                    value={jwForm.walkConductedBy}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, walkConductedBy: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Customer Representative"
                    value={jwForm.customerRepresentative}
                    onChange={(e) =>
                      setJwForm({
                        ...jwForm,
                        customerRepresentative: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Estimated Project Value"
                    value={jwForm.estimatedProjectValue}
                    onChange={(e) =>
                      setJwForm({
                        ...jwForm,
                        estimatedProjectValue: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={jwForm.followUpRequired}
                      onChange={(e) =>
                        setJwForm({
                          ...jwForm,
                          followUpRequired: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-sm">Follow-up Required</span>
                  </label>
                  <textarea
                    placeholder="Job Notes"
                    value={jwForm.jobNotes}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, jobNotes: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                    rows={2}
                  />
                  <textarea
                    placeholder="Equipment Notes"
                    value={jwForm.equipmentNotes}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, equipmentNotes: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                    rows={2}
                  />
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors"
              >
                {loading
                  ? "Processing..."
                  : mode === "create"
                  ? "Create"
                  : mode === "update"
                  ? "Update"
                  : mode === "fetchById"
                  ? "Fetch"
                  : "Delete"}
              </button>
            </form>
          </div>

          <div className="border border-silver rounded-lg p-6 bg-platinum/10">
            <h3 className="font-semibold mb-3">Job Walk Fields:</h3>
            <ul className="text-sm space-y-1 text-slate">
              <li>✅ jobName (required)</li>
              <li>✅ dateOfWalk (required)</li>
              <li>• customerCompanyId</li>
              <li>• customerSiteId</li>
              <li>• timeOfWalk</li>
              <li>• walkConductedBy</li>
              <li>• customerRepresentative</li>
              <li>• estimatedProjectValue</li>
              <li>• followUpRequired</li>
              <li>• jobNotes</li>
              <li>• equipmentNotes</li>
            </ul>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* ACTIVITIES */}
      {/* ====================================================================== */}
      {activeTab === "activity" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "create" && "Create Activity"}
              {mode === "update" && "Update Activity"}
              {mode === "fetchById" && "Fetch Activity By ID"}
              {mode === "delete" && "Delete Activity"}
            </h2>

            <form
              onSubmit={
                mode === "create"
                  ? handleCreate
                  : mode === "update"
                  ? handleUpdate
                  : mode === "fetchById"
                  ? handleFetchById
                  : handleDelete
              }
              className="space-y-3"
            >
              {(mode === "update" ||
                mode === "fetchById" ||
                mode === "delete") && (
                <input
                  required
                  type="text"
                  placeholder="Enter Activity ID *"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full border border-cerulean rounded px-3 py-2 bg-cerulean/5"
                />
              )}

              {(mode === "create" || mode === "update") && (
                <>
                  <input
                    required
                    type="text"
                    placeholder="Subject *"
                    value={actForm.subject}
                    onChange={(e) =>
                      setActForm({ ...actForm, subject: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <select
                    required
                    value={actForm.activityType}
                    onChange={(e) =>
                      setActForm({ ...actForm, activityType: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  >
                    <option value="">Activity Type *</option>
                    <option value="Call">Call</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Task">Task</option>
                    <option value="Email">Email</option>
                    <option value="Note">Note</option>
                  </select>
                  <select
                    value={actForm.priority}
                    onChange={(e) =>
                      setActForm({ ...actForm, priority: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Urgent">Urgent Priority</option>
                  </select>
                  <select
                    required
                    value={actForm.relatedTo}
                    onChange={(e) =>
                      setActForm({ ...actForm, relatedTo: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  >
                    <option value="">Related To *</option>
                    <option value="Deal">Deal</option>
                    <option value="Service Site">Service Site</option>
                    <option value="Parent Company">Parent Company</option>
                  </select>
                  <input
                    required
                    type="text"
                    placeholder="Related Item UUID *"
                    value={actForm.relatedItem}
                    onChange={(e) =>
                      setActForm({ ...actForm, relatedItem: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      placeholder="Due Date"
                      value={actForm.dueDate}
                      onChange={(e) =>
                        setActForm({ ...actForm, dueDate: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                    <input
                      type="time"
                      placeholder="Due Time"
                      value={actForm.dueTime}
                      onChange={(e) =>
                        setActForm({ ...actForm, dueTime: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Contact ID"
                    value={actForm.contact}
                    onChange={(e) =>
                      setActForm({ ...actForm, contact: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Assign To (User ID)"
                    value={actForm.assignTo}
                    onChange={(e) =>
                      setActForm({ ...actForm, assignTo: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={actForm.description}
                    onChange={(e) =>
                      setActForm({ ...actForm, description: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                    rows={3}
                  />
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors"
              >
                {loading
                  ? "Processing..."
                  : mode === "create"
                  ? "Create"
                  : mode === "update"
                  ? "Update"
                  : mode === "fetchById"
                  ? "Fetch"
                  : "Delete"}
              </button>
            </form>
          </div>

          <div className="border border-silver rounded-lg p-6 bg-platinum/10">
            <h3 className="font-semibold mb-3">Activity Fields:</h3>
            <ul className="text-sm space-y-1 text-slate">
              <li>✅ subject (required)</li>
              <li>✅ activityType (required)</li>
              <li>✅ relatedTo (required)</li>
              <li>✅ relatedItem (required)</li>
              <li>• priority</li>
              <li>• dueDate</li>
              <li>• dueTime</li>
              <li>• contact</li>
              <li>• assignTo</li>
              <li>• description</li>
            </ul>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* COMPANIES */}
      {/* ====================================================================== */}
      {activeTab === "company" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "create" && "Create Company"}
              {mode === "update" && "Update Company"}
              {mode === "fetchById" && "Fetch Company By ID"}
              {mode === "delete" && "Delete Company"}
            </h2>

            <form
              onSubmit={
                mode === "create"
                  ? handleCreate
                  : mode === "update"
                  ? handleUpdate
                  : mode === "fetchById"
                  ? handleFetchById
                  : handleDelete
              }
              className="space-y-3"
            >
              {(mode === "update" ||
                mode === "fetchById" ||
                mode === "delete") && (
                <input
                  required
                  type="text"
                  placeholder="Enter Company ID *"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full border border-cerulean rounded px-3 py-2 bg-cerulean/5"
                />
              )}

              {(mode === "create" || mode === "update") && (
                <>
                  <input
                    required
                    type="text"
                    placeholder="Business Name *"
                    value={compForm.businessName}
                    onChange={(e) =>
                      setCompForm({ ...compForm, businessName: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Company Type *"
                    value={compForm.companyType}
                    onChange={(e) =>
                      setCompForm({ ...compForm, companyType: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Primary Contact *"
                    value={compForm.primaryContact}
                    onChange={(e) =>
                      setCompForm({
                        ...compForm,
                        primaryContact: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <textarea
                    placeholder="Billing Address"
                    value={compForm.billingAddress}
                    onChange={(e) =>
                      setCompForm({
                        ...compForm,
                        billingAddress: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                    rows={2}
                  />
                  <input
                    type="text"
                    placeholder="Service Sites (comma-separated IDs)"
                    value={compForm.serviceSites}
                    onChange={(e) =>
                      setCompForm({ ...compForm, serviceSites: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors"
              >
                {loading
                  ? "Processing..."
                  : mode === "create"
                  ? "Create"
                  : mode === "update"
                  ? "Update"
                  : mode === "fetchById"
                  ? "Fetch"
                  : "Delete"}
              </button>
            </form>
          </div>

          <div className="border border-silver rounded-lg p-6 bg-platinum/10">
            <h3 className="font-semibold mb-3">Company Fields:</h3>
            <ul className="text-sm space-y-1 text-slate">
              <li>✅ businessName (required)</li>
              <li>✅ companyType (required)</li>
              <li>✅ primaryContact (required)</li>
              <li>• billingAddress</li>
              <li>• serviceSites</li>
            </ul>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* CONTACTS */}
      {/* ====================================================================== */}
      {activeTab === "contact" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "create" && "Create Contact"}
              {mode === "update" && "Update Contact"}
              {mode === "fetchById" && "Fetch Contact By ID"}
              {mode === "delete" && "Delete Contact"}
            </h2>

            <form
              onSubmit={
                mode === "create"
                  ? handleCreate
                  : mode === "update"
                  ? handleUpdate
                  : mode === "fetchById"
                  ? handleFetchById
                  : handleDelete
              }
              className="space-y-3"
            >
              {(mode === "update" ||
                mode === "fetchById" ||
                mode === "delete") && (
                <input
                  required
                  type="text"
                  placeholder="Enter Contact ID *"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full border border-cerulean rounded px-3 py-2 bg-cerulean/5"
                />
              )}

              {(mode === "create" || mode === "update") && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder="First Name *"
                      value={contForm.firstName}
                      onChange={(e) =>
                        setContForm({ ...contForm, firstName: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Last Name *"
                      value={contForm.lastName}
                      onChange={(e) =>
                        setContForm({ ...contForm, lastName: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={contForm.title}
                      onChange={(e) =>
                        setContForm({ ...contForm, title: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Department"
                      value={contForm.department}
                      onChange={(e) =>
                        setContForm({ ...contForm, department: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Parent Company ID"
                    value={contForm.parentCompany}
                    onChange={(e) =>
                      setContForm({
                        ...contForm,
                        parentCompany: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Service Site ID"
                    value={contForm.serviceSite}
                    onChange={(e) =>
                      setContForm({ ...contForm, serviceSite: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contForm.email}
                    onChange={(e) =>
                      setContForm({ ...contForm, email: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={contForm.phone}
                      onChange={(e) =>
                        setContForm({ ...contForm, phone: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile"
                      value={contForm.mobilePhone}
                      onChange={(e) =>
                        setContForm({
                          ...contForm,
                          mobilePhone: e.target.value,
                        })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                    <input
                      type="tel"
                      placeholder="Work Phone"
                      value={contForm.workPhone}
                      onChange={(e) =>
                        setContForm({ ...contForm, workPhone: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={contForm.contactType}
                      onChange={(e) =>
                        setContForm({
                          ...contForm,
                          contactType: e.target.value,
                        })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    >
                      <option value="Primary Contact">Primary Contact</option>
                      <option value="Secondary Contact">
                        Secondary Contact
                      </option>
                      <option value="Billing Contact">Billing Contact</option>
                      <option value="Technical Contact">
                        Technical Contact
                      </option>
                    </select>
                    <select
                      value={contForm.contactStatus}
                      onChange={(e) =>
                        setContForm({
                          ...contForm,
                          contactStatus: e.target.value,
                        })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors"
              >
                {loading
                  ? "Processing..."
                  : mode === "create"
                  ? "Create"
                  : mode === "update"
                  ? "Update"
                  : mode === "fetchById"
                  ? "Fetch"
                  : "Delete"}
              </button>
            </form>
          </div>

          <div className="border border-silver rounded-lg p-6 bg-platinum/10">
            <h3 className="font-semibold mb-3">Contact Fields:</h3>
            <ul className="text-sm space-y-1 text-slate">
              <li>✅ firstName (required)</li>
              <li>✅ lastName (required)</li>
              <li>• title</li>
              <li>• department</li>
              <li>• parentCompany</li>
              <li>• serviceSite</li>
              <li>• email</li>
              <li>• phone</li>
              <li>• mobilePhone</li>
              <li>• workPhone</li>
              <li>• contactType</li>
              <li>• contactStatus</li>
            </ul>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* SITES */}
      {/* ====================================================================== */}
      {activeTab === "site" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "create" && "Create Service Site"}
              {mode === "update" && "Update Service Site"}
              {mode === "fetchById" && "Fetch Service Site By ID"}
              {mode === "delete" && "Delete Service Site"}
            </h2>

            <form
              onSubmit={
                mode === "create"
                  ? handleCreate
                  : mode === "update"
                  ? handleUpdate
                  : mode === "fetchById"
                  ? handleFetchById
                  : handleDelete
              }
              className="space-y-3"
            >
              {(mode === "update" ||
                mode === "fetchById" ||
                mode === "delete") && (
                <input
                  required
                  type="text"
                  placeholder="Enter Site ID *"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full border border-cerulean rounded px-3 py-2 bg-cerulean/5"
                />
              )}

              {(mode === "create" || mode === "update") && (
                <>
                  <input
                    required
                    type="text"
                    placeholder="Site Name *"
                    value={siteForm.siteName}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, siteName: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Site Type"
                    value={siteForm.siteType}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, siteType: e.target.value })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Parent Company ID"
                    value={siteForm.parentCompany}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        parentCompany: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Primary Contact ID *"
                    value={siteForm.primaryContact}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        primaryContact: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                  />
                  <textarea
                    placeholder="Service Address"
                    value={siteForm.serviceAddress}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        serviceAddress: e.target.value,
                      })
                    }
                    className="w-full border border-silver rounded px-3 py-2"
                    rows={2}
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={siteForm.manuallySetOwner}
                      onChange={(e) =>
                        setSiteForm({
                          ...siteForm,
                          manuallySetOwner: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-sm">Manually Set Owner</span>
                  </label>
                  {siteForm.manuallySetOwner && (
                    <input
                      type="text"
                      placeholder="Site Owner ID"
                      value={siteForm.siteOwner}
                      onChange={(e) =>
                        setSiteForm({ ...siteForm, siteOwner: e.target.value })
                      }
                      className="w-full border border-silver rounded px-3 py-2"
                    />
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cerulean text-white py-2 rounded hover:bg-slate transition-colors"
              >
                {loading
                  ? "Processing..."
                  : mode === "create"
                  ? "Create"
                  : mode === "update"
                  ? "Update"
                  : mode === "fetchById"
                  ? "Fetch"
                  : "Delete"}
              </button>
            </form>
          </div>

          <div className="border border-silver rounded-lg p-6 bg-platinum/10">
            <h3 className="font-semibold mb-3">Service Site Fields:</h3>
            <ul className="text-sm space-y-1 text-slate">
              <li>✅ siteName (required)</li>
              <li>✅ primaryContact (required)</li>
              <li>• siteType</li>
              <li>• parentCompany</li>
              <li>• serviceAddress</li>
              <li>• manuallySetOwner</li>
              <li>• siteOwner</li>
            </ul>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* RESULTS DISPLAY */}
      {/* ====================================================================== */}
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
            <p className="text-sm text-red-600 mb-2 font-medium">
              {results.error}
            </p>
          )}
          <pre className="bg-white p-4 rounded border border-silver overflow-auto max-h-96 text-xs">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      {/* ====================================================================== */}
      {/* INFO BOX */}
      {/* ====================================================================== */}
      <div className="mt-6 p-4 bg-cerulean/10 border border-cerulean/20 rounded">
        <p className="text-sm text-charcoal mb-2">
          <strong>🧪 Complete CRUD Test Suite</strong>
        </p>
        <p className="text-sm text-charcoal mb-2">
          Test all operations through centralized base.ts handler:
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
