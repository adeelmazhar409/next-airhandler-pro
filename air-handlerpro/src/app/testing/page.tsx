// "use client";

// import { fetchCompanies } from "@/service/api/companies";
// import { fetchJobWalks } from "@/service/api/jobwalks";
// import { fetchUsers } from "@/service/api/user";
// import { fetchWorkOrders } from "@/service/api/workorder";

// // const response = await fetchCompanies();
// const response = await fetchJobWalks();
// const response2 = await fetchWorkOrders();
// const res = await fetchUsers();

// export default function First() {
//   // console.log("Jobwalks fetched:", response);
//   //   console.log("Work Orders fetched:", response2);
//   console.log("fetch users", res);
// }

"use client";

import { useState, useEffect } from "react";
import {
  createWorkOrder,
  fetchWorkOrders,
} from "@/service/api/workorder"
import {
  createJobWalk,
  fetchJobWalks,
} from "@/service/api/jobwalks";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const [activeTab, setActiveTab] = useState<"workorders" | "jobwalks">(
    "workorders"
  );
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Work Order Form State
  const [woForm, setWoForm] = useState({
    customerCompanyId: "",
    customerSiteId: "",
    workOrderNumber: "",
    scheduledStart: "",
    scheduledEnd: "",
    description: "",
    equipmentInformation: "",
  });

  // Job Walk Form State
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

  // Load dropdown data
  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadDropdownData = async () => {
    // Load companies
    const { data: companiesData } = await supabase
      .from("companies")
      .select("id, business_name")
      .order("business_name");
    setCompanies(companiesData || []);

    // Load sites
    const { data: sitesData } = await supabase
      .from("sites")
      .select("id, site_name, service_address")
      .order("site_name");
    setSites(sitesData || []);

    // Load users
    const { data: usersData } = await supabase
      .from("users")
      .select("id, email, full_name")
      .order("email");
    setUsers(usersData || []);
  };

  // ============================================================================
  // WORK ORDER FUNCTIONS
  // ============================================================================

  const handleCreateWorkOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await createWorkOrder(woForm);
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
    const result = await fetchWorkOrders();
    setResults(result);
    setLoading(false);
  };

  // ============================================================================
  // JOB WALK FUNCTIONS
  // ============================================================================

  const handleCreateJobWalk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await createJobWalk(jwForm);
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
    const result = await fetchJobWalks();
    setResults(result);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold text-charcoal mb-2">
        Endpoint Test Page
      </h1>
      <p className="text-slate mb-6">Test Work Orders & Job Walks APIs</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-silver">
        <button
          onClick={() => setActiveTab("workorders")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "workorders"
              ? "text-cerulean border-b-2 border-cerulean"
              : "text-slate hover:text-charcoal"
          }`}
        >
          Work Orders
        </button>
        <button
          onClick={() => setActiveTab("jobwalks")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "jobwalks"
              ? "text-cerulean border-b-2 border-cerulean"
              : "text-slate hover:text-charcoal"
          }`}
        >
          Job Walks
        </button>
      </div>

      {/* Work Orders Tab */}
      {activeTab === "workorders" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Create Form */}
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Create Work Order</h2>
            <form onSubmit={handleCreateWorkOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Customer Company *
                </label>
                <select
                  required
                  value={woForm.customerCompanyId}
                  onChange={(e) =>
                    setWoForm({ ...woForm, customerCompanyId: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                >
                  <option value="">Select Company</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.business_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Service Site (Optional)
                </label>
                <select
                  value={woForm.customerSiteId}
                  onChange={(e) =>
                    setWoForm({ ...woForm, customerSiteId: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                >
                  <option value="">None</option>
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.site_name} - {s.service_address}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Work Order Number
                </label>
                <input
                  type="text"
                  value={woForm.workOrderNumber}
                  onChange={(e) =>
                    setWoForm({ ...woForm, workOrderNumber: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  placeholder="WO-2025-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Scheduled Start
                </label>
                <input
                  type="datetime-local"
                  value={woForm.scheduledStart}
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
                  value={woForm.scheduledEnd}
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
                  value={woForm.description}
                  onChange={(e) =>
                    setWoForm({ ...woForm, description: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  rows={3}
                  placeholder="AC unit not cooling properly..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Equipment Information
                </label>
                <textarea
                  value={woForm.equipmentInformation}
                  onChange={(e) =>
                    setWoForm({
                      ...woForm,
                      equipmentInformation: e.target.value,
                    })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  rows={2}
                  placeholder="Carrier 5-ton rooftop unit..."
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
      {activeTab === "jobwalks" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Create Form */}
          <div className="border border-silver rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Create Job Walk</h2>
            <form onSubmit={handleCreateJobWalk} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Link to Customer (Optional)
                </label>
                <select
                  value={jwForm.customerCompanyId}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, customerCompanyId: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                >
                  <option value="">None</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.business_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Service Site (Optional)
                </label>
                <select
                  value={jwForm.customerSiteId}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, customerSiteId: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                >
                  <option value="">None</option>
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.site_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Name / Site Address *
                </label>
                <input
                  type="text"
                  required
                  value={jwForm.jobName}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, jobName: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  placeholder="HVAC Assessment - 123 Main St"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Walk *
                </label>
                <input
                  type="date"
                  required
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
                <select
                  value={jwForm.taskType}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, taskType: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                >
                  <option value="">Select Type</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Repair">Repair</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Installation">Installation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Notes / Observations
                </label>
                <textarea
                  value={jwForm.jobNotes}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, jobNotes: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  rows={3}
                  placeholder="Detailed notes from site visit..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Next Step / Action Needed
                </label>
                <input
                  type="text"
                  value={jwForm.nextStep}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, nextStep: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                  placeholder="Schedule follow-up meeting..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Assign To
                </label>
                <select
                  value={jwForm.assignedTo}
                  onChange={(e) =>
                    setJwForm({ ...jwForm, assignedTo: e.target.value })
                  }
                  className="w-full border border-silver rounded px-3 py-2"
                >
                  <option value="">Unassigned</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      { u.email || u.full_name }
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Photos</label>
                <input
                  type="number"
                  value={jwForm.photosCount}
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
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-charcoal">
          <strong>Instructions:</strong> First run the SQL migration, then make
          sure you have companies, sites, and users in your database. Test
          creating and fetching both work orders and job walks.
        </p>
      </div>
    </div>
  );
}
