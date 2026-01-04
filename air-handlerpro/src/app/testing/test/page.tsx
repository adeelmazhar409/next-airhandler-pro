"use client";

import { useState } from "react";
import { base } from "@/service/base";

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
  // WORK ORDER FORM STATE (Matches work_orders table)
  // ============================================================================
  const [woForm, setWoForm] = useState({
    customerCompanyId: "",
    customerSiteId: "",
    workOrderNumber: "",
    scheduledStart: "",
    scheduledEnd: "",
    description: "",
    equipmentInformation: "",
  });

  // ============================================================================
  // JOB WALK FORM STATE (Matches job_walks table)
  // ============================================================================
  const [jwForm, setJwForm] = useState({
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
  // ACTIVITY FORM STATE (Matches activities table)
  // ============================================================================
  const [actForm, setActForm] = useState({
    subject: "",
    description: "",
    activityType: "Call",
    priority: "Medium",
    relatedToType: "Deal",
    relatedToId: "",
    contactId: "",
    assignedToId: "",
    dueDate: "",
    dueTime: "",
    status: "Pending",
  });

  // ============================================================================
  // COMPANY FORM STATE (Matches companies table)
  // ============================================================================
  const [compForm, setCompForm] = useState({
    businessName: "",
    billingAddress: "",
    primaryContactId: "",
    companyTypeId: "",
    notes: "",
  });

  // ============================================================================
  // CONTACT FORM STATE (Matches contacts table)
  // ============================================================================
  const [contForm, setContForm] = useState({
    firstName: "",
    lastName: "",
    title: "",
    department: "",
    parentCompanyId: "",
    serviceSiteId: "",
    email: "",
    phone: "",
    mobilePhone: "",
    workPhone: "",
    contactType: "Primary Contact",
    contactStatus: "Active",
  });

  // ============================================================================
  // SITE FORM STATE (Matches sites table)
  // ============================================================================
  const [siteForm, setSiteForm] = useState({
    siteName: "",
    siteType: "standalone",
    serviceAddress: "",
    primaryContactId: "",
    parentCompanyId: "",
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
    billingFrequency: "Monthly",
    milesToSite: 0,
    travelCharge: 0,
    parkingFees: 0,
    status: "draft",
    totalAmount: 0,
  });

  // ============================================================================
  // HANDLERS - UPDATED TO USE UNIVERSAL BASE FUNCTION
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

    // USING NEW UNIVERSAL BASE FUNCTION!
    const result = await base("create", activeTab, formData);
    setResults(result);
    setLoading(false);
  };

  const handleFetch = async () => {
    setLoading(true);
    // USING NEW UNIVERSAL BASE FUNCTION!
    const result = await base("fetch", activeTab);
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
    // USING NEW UNIVERSAL BASE FUNCTION!
    const result = await base("fetchById", activeTab, selectedId);
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
    // USING NEW UNIVERSAL BASE FUNCTION!
    const result = await base("update", activeTab, selectedId, formData);
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
    // USING NEW UNIVERSAL BASE FUNCTION!
    const result = await base("delete", activeTab, selectedId);
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
      <p className="text-slate mb-2">
        Test ALL operations using the new universal base() function!
      </p>
      <div className="bg-green-50 border border-green-200 rounded p-3 mb-6">
        <p className="text-sm text-green-800">
          ✨ <strong>Now using universal base() function!</strong> One function
          does it all:
          <code className="bg-white px-2 py-1 rounded ml-2">
            base("create", table, data)
          </code>
        </p>
      </div>

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

            {/* WORK ORDER FORM */}
            {activeTab === "workorder" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Customer Company ID *
                  </label>
                  <input
                    type="text"
                    value={woForm.customerCompanyId}
                    onChange={(e) =>
                      setWoForm({
                        ...woForm,
                        customerCompanyId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Company UUID from companies table"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Customer Site ID *
                  </label>
                  <input
                    type="text"
                    value={woForm.customerSiteId}
                    onChange={(e) =>
                      setWoForm({ ...woForm, customerSiteId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Site UUID from sites table"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Work Order Number
                  </label>
                  <input
                    type="text"
                    value={woForm.workOrderNumber}
                    onChange={(e) =>
                      setWoForm({ ...woForm, workOrderNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="WO-2024-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Scheduled Start
                  </label>
                  <input
                    type="datetime-local"
                    value={woForm.scheduledStart}
                    onChange={(e) =>
                      setWoForm({ ...woForm, scheduledStart: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Scheduled End
                  </label>
                  <input
                    type="datetime-local"
                    value={woForm.scheduledEnd}
                    onChange={(e) =>
                      setWoForm({ ...woForm, scheduledEnd: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Equipment Information
                  </label>
                  <input
                    type="text"
                    value={woForm.equipmentInformation}
                    onChange={(e) =>
                      setWoForm({
                        ...woForm,
                        equipmentInformation: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Trane RTU-5"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Description
                  </label>
                  <textarea
                    value={woForm.description}
                    onChange={(e) =>
                      setWoForm({ ...woForm, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    rows={3}
                    placeholder="Work order description..."
                  />
                </div>
              </div>
            )}

            {/* JOB WALK FORM */}
            {activeTab === "jobwalk" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Customer Company ID
                  </label>
                  <input
                    type="text"
                    value={jwForm.customerCompanyId}
                    onChange={(e) =>
                      setJwForm({
                        ...jwForm,
                        customerCompanyId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Company UUID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Customer Site ID
                  </label>
                  <input
                    type="text"
                    value={jwForm.customerSiteId}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, customerSiteId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Site UUID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Job Name *
                  </label>
                  <input
                    type="text"
                    value={jwForm.jobName}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, jobName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="HVAC Installation Project"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Date of Walk *
                  </label>
                  <input
                    type="date"
                    value={jwForm.dateOfWalk}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, dateOfWalk: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Task Type
                  </label>
                  <input
                    type="text"
                    value={jwForm.taskType}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, taskType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Installation, Inspection, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Assigned To (User ID)
                  </label>
                  <input
                    type="text"
                    value={jwForm.assignedTo}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, assignedTo: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="User UUID"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Job Notes
                  </label>
                  <textarea
                    value={jwForm.jobNotes}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, jobNotes: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    rows={2}
                    placeholder="Notes about the job walk..."
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Next Step
                  </label>
                  <textarea
                    value={jwForm.nextStep}
                    onChange={(e) =>
                      setJwForm({ ...jwForm, nextStep: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    rows={2}
                    placeholder="What needs to happen next..."
                  />
                </div>
              </div>
            )}

            {/* ACTIVITY FORM */}
            {activeTab === "activity" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={actForm.subject}
                    onChange={(e) =>
                      setActForm({ ...actForm, subject: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Follow up call"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Activity Type *
                  </label>
                  <select
                    value={actForm.activityType}
                    onChange={(e) =>
                      setActForm({ ...actForm, activityType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  >
                    <option value="Call">Call</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Task">Task</option>
                    <option value="Email">Email</option>
                    <option value="Note">Note</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Priority
                  </label>
                  <select
                    value={actForm.priority}
                    onChange={(e) =>
                      setActForm({ ...actForm, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Related To Type *
                  </label>
                  <select
                    value={actForm.relatedToType}
                    onChange={(e) =>
                      setActForm({ ...actForm, relatedToType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  >
                    <option value="Deal">Deal</option>
                    <option value="Service Site">Service Site</option>
                    <option value="Parent Company">Parent Company</option>
                    <option value="Contact">Contact</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Related To ID
                  </label>
                  <input
                    type="text"
                    value={actForm.relatedToId}
                    onChange={(e) =>
                      setActForm({ ...actForm, relatedToId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="UUID of related record"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Status
                  </label>
                  <select
                    value={actForm.status}
                    onChange={(e) =>
                      setActForm({ ...actForm, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={actForm.dueDate}
                    onChange={(e) =>
                      setActForm({ ...actForm, dueDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Due Time
                  </label>
                  <input
                    type="time"
                    value={actForm.dueTime}
                    onChange={(e) =>
                      setActForm({ ...actForm, dueTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Description
                  </label>
                  <textarea
                    value={actForm.description}
                    onChange={(e) =>
                      setActForm({ ...actForm, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    rows={3}
                    placeholder="Activity description..."
                  />
                </div>
              </div>
            )}

            {/* COMPANY FORM */}
            {activeTab === "company" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Business Name * (Required)
                  </label>
                  <input
                    type="text"
                    value={compForm.businessName}
                    onChange={(e) =>
                      setCompForm({ ...compForm, businessName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="ABC Company Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Primary Contact ID
                  </label>
                  <input
                    type="text"
                    value={compForm.primaryContactId}
                    onChange={(e) =>
                      setCompForm({
                        ...compForm,
                        primaryContactId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Contact UUID from contacts table"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Billing Address * (Required)
                  </label>
                  <input
                    type="text"
                    value={compForm.billingAddress}
                    onChange={(e) =>
                      setCompForm({
                        ...compForm,
                        billingAddress: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Company Type ID
                  </label>
                  <input
                    type="text"
                    value={compForm.companyTypeId}
                    onChange={(e) =>
                      setCompForm({
                        ...compForm,
                        companyTypeId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="UUID from company_types table"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Notes
                  </label>
                  <textarea
                    value={compForm.notes}
                    onChange={(e) =>
                      setCompForm({ ...compForm, notes: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    rows={3}
                    placeholder="Additional company notes..."
                  />
                </div>
              </div>
            )}

            {/* CONTACT FORM */}
            {activeTab === "contact" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    First Name * (Required)
                  </label>
                  <input
                    type="text"
                    value={contForm.firstName}
                    onChange={(e) =>
                      setContForm({ ...contForm, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Last Name * (Required)
                  </label>
                  <input
                    type="text"
                    value={contForm.lastName}
                    onChange={(e) =>
                      setContForm({ ...contForm, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contForm.email}
                    onChange={(e) =>
                      setContForm({ ...contForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={contForm.phone}
                    onChange={(e) =>
                      setContForm({ ...contForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={contForm.title}
                    onChange={(e) =>
                      setContForm({ ...contForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Facilities Manager"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={contForm.department}
                    onChange={(e) =>
                      setContForm({ ...contForm, department: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Operations"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Parent Company ID
                  </label>
                  <input
                    type="text"
                    value={contForm.parentCompanyId}
                    onChange={(e) =>
                      setContForm({
                        ...contForm,
                        parentCompanyId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Company UUID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Service Site ID
                  </label>
                  <input
                    type="text"
                    value={contForm.serviceSiteId}
                    onChange={(e) =>
                      setContForm({
                        ...contForm,
                        serviceSiteId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Site UUID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Contact Type
                  </label>
                  <select
                    value={contForm.contactType}
                    onChange={(e) =>
                      setContForm({ ...contForm, contactType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  >
                    <option value="Primary Contact">Primary Contact</option>
                    <option value="Secondary Contact">Secondary Contact</option>
                    <option value="Decision Maker">Decision Maker</option>
                    <option value="Influencer">Influencer</option>
                    <option value="Technical Contact">Technical Contact</option>
                    <option value="Financial Contact">Financial Contact</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Contact Status
                  </label>
                  <select
                    value={contForm.contactStatus}
                    onChange={(e) =>
                      setContForm({
                        ...contForm,
                        contactStatus: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Do Not Contact">Do Not Contact</option>
                  </select>
                </div>
              </div>
            )}

            {/* SITE FORM */}
            {activeTab === "site" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Site Name * (Required)
                  </label>
                  <input
                    type="text"
                    value={siteForm.siteName}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, siteName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Main Office"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Site Type
                  </label>
                  <select
                    value={siteForm.siteType}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, siteType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                  >
                    <option value="standalone">Standalone</option>
                    <option value="hq">HQ</option>
                    <option value="global">Global</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Service Address * (Required)
                  </label>
                  <input
                    type="text"
                    value={siteForm.serviceAddress}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        serviceAddress: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Parent Company ID
                  </label>
                  <input
                    type="text"
                    value={siteForm.parentCompanyId}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        parentCompanyId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Company UUID from companies table"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Primary Contact ID
                  </label>
                  <input
                    type="text"
                    value={siteForm.primaryContactId}
                    onChange={(e) =>
                      setSiteForm({
                        ...siteForm,
                        primaryContactId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-silver rounded"
                    placeholder="Contact UUID from contacts table"
                  />
                </div>
              </div>
            )}

            {/* MAINTENANCE ESTIMATE FORM */}
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
          <strong>✨ Now using universal base() function!</strong>
        </p>
        <p className="text-sm text-charcoal mb-3">
          One simple function replaces 5 separate functions. All operations use:
        </p>
        <div className="bg-white p-3 rounded border border-cerulean/30">
          <code className="text-xs text-charcoal">
            <span className="text-green-600">// Create</span>
            <br />
            await base("create", "maintenanceEstimate", data);
            <br />
            <br />
            <span className="text-green-600">// Fetch All</span>
            <br />
            await base("fetch", "company");
            <br />
            <br />
            <span className="text-green-600">// Fetch By ID</span>
            <br />
            await base("fetchById", "workorder", id);
            <br />
            <br />
            <span className="text-green-600">// Update</span>
            <br />
            await base("update", "contact", id, data);
            <br />
            <br />
            <span className="text-green-600">// Delete</span>
            <br />
            await base("delete", "jobwalk", id);
          </code>
        </div>
      </div>
    </div>
  );
}
