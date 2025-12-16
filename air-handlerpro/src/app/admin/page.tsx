"use client";
import StatsCardsRow from "@/components/app/UI-components/StatCardRow";
import React, { useState } from "react";
import {
  CRMIcon,
  ContactsIcon,
  ServiceSitesIcon,
  ActiveCustomersIcon,
} from "@/components/icons/icons";

// Icons for admin suite
const UserApprovalIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CompanyIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  requestedDate: string;
  status: "pending" | "approved" | "rejected";
}

interface Company {
  id: string;
  name: string;
  adminName: string;
  email: string;
  users: number;
  createdDate: string;
  status: "active" | "suspended";
}

export default function AdminSuitePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchValue, setSearchValue] = useState("");

  // Sample data - replace with real data from your API
  const pendingUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      company: "ACME HVAC Services",
      requestedDate: "2024-12-15",
      status: "pending",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@coolairpro.com",
      company: "Cool Air Pro",
      requestedDate: "2024-12-14",
      status: "pending",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mjohnson@climatecontrol.com",
      company: "Climate Control Systems",
      requestedDate: "2024-12-13",
      status: "pending",
    },
  ];

  const companies: Company[] = [
    {
      id: "1",
      name: "ACME HVAC Services",
      adminName: "Robert Davis",
      email: "robert@acmehvac.com",
      users: 12,
      createdDate: "2024-11-01",
      status: "active",
    },
    {
      id: "2",
      name: "Cool Air Pro",
      adminName: "Sarah Wilson",
      email: "sarah@coolairpro.com",
      users: 8,
      createdDate: "2024-10-15",
      status: "active",
    },
    {
      id: "3",
      name: "Climate Control Systems",
      adminName: "Michael Brown",
      email: "michael@climatecontrol.com",
      users: 15,
      createdDate: "2024-09-20",
      status: "active",
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "127",
      subtitle: "15 pending approval",
      icon: <UsersIcon />,
    },
    {
      title: "Active Companies",
      value: "28",
      subtitle: "3 new this month",
      icon: <CompanyIcon />,
    },
    {
      title: "Pending Requests",
      value: "15",
      subtitle: "Need attention",
      icon: <UserApprovalIcon />,
      alert: true,
    },
    {
      title: "System Health",
      value: "100%",
      subtitle: "All systems operational",
      icon: <SettingsIcon />,
    },
  ];

  const tabs = [
    { name: "Overview", value: "overview" },
    { name: "User Approvals", value: "approvals" },
    { name: "Companies", value: "companies" },
    { name: "Settings", value: "settings" },
  ];

  const handleApprove = (userId: string) => {
    console.log("Approving user:", userId);
    // Add your approval logic here
  };

  const handleReject = (userId: string) => {
    console.log("Rejecting user:", userId);
    // Add your rejection logic here
  };

  const handleSuspendCompany = (companyId: string) => {
    console.log("Suspending company:", companyId);
    // Add your suspension logic here
  };

  return (
    <div className="min-h-screen bg-cerulean/70 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal mb-2">Admin Suite</h1>
        <p className="text-slate text-[15px]">
          Manage users, companies, and system settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-silver relative">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`pb-4 px-1 text-[15px] font-medium relative transition-colors ${
                  activeTab === tab.value
                    ? "text-charcoal font-semibold"
                    : "text-slate hover:text-charcoal"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Animated Underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-cerulean transition-all duration-300 ease-in-out"
            style={{
              left: `${
                tabs.findIndex((tab) => tab.value === activeTab) * 112
              }px`,
              width: "100px",
            }}
          />
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Stats Cards */}
                  <StatsCardsRow stats={stats} />

          {/* Quick Actions */}
          <div className="bg-white border-2 border-charcoal rounded-3xl p-6 mb-8 shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]">
            <h2 className="text-lg font-bold text-charcoal mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab("approvals")}
                className="flex items-center gap-3 p-4 border-2 border-silver rounded-xl hover:border-cerulean hover:bg-cerulean/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-cerulean/10 flex items-center justify-center">
                  <UserApprovalIcon />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-charcoal text-sm">
                    Review Approvals
                  </div>
                  <div className="text-xs text-slate">
                    {pendingUsers.length} pending
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("companies")}
                className="flex items-center gap-3 p-4 border-2 border-silver rounded-xl hover:border-cerulean hover:bg-cerulean/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-cerulean/10 flex items-center justify-center">
                  <CompanyIcon />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-charcoal text-sm">
                    Manage Companies
                  </div>
                  <div className="text-xs text-slate">
                    {companies.length} active
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className="flex items-center gap-3 p-4 border-2 border-silver rounded-xl hover:border-cerulean hover:bg-cerulean/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-cerulean/10 flex items-center justify-center">
                  <SettingsIcon />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-charcoal text-sm">
                    System Settings
                  </div>
                  <div className="text-xs text-slate">Configure platform</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border-2 border-charcoal rounded-3xl p-6 shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]">
            <h2 className="text-lg font-bold text-charcoal mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {[
                {
                  action: "New user registration",
                  detail: "John Doe from ACME HVAC Services",
                  time: "2 hours ago",
                },
                {
                  action: "Company activated",
                  detail: "Cool Air Pro is now live",
                  time: "5 hours ago",
                },
                {
                  action: "User approved",
                  detail: "Jane Smith granted access",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-silver last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium text-charcoal">
                      {activity.action}
                    </div>
                    <div className="text-xs text-slate">{activity.detail}</div>
                  </div>
                  <div className="text-xs text-slate">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* User Approvals Tab */}
      {activeTab === "approvals" && (
        <div className="bg-white border-2 border-charcoal rounded-3xl shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-silver">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal">
                Pending User Approvals
              </h2>
              <div className="text-sm text-slate">
                {pendingUsers.length} requests
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="px-6 py-4 border-b border-silver">
            <div className="relative">
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate"
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
                placeholder="Search by name, email, or company..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-silver rounded-lg text-[15px] text-charcoal placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>
          </div>

          {/* User List */}
          <div className="divide-y divide-silver">
            {pendingUsers.map((user) => (
              <div
                key={user.id}
                className="px-6 py-4 hover:bg-platinum/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-cerulean/10 flex items-center justify-center">
                        <span className="text-cerulean font-semibold text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal">
                          {user.name}
                        </div>
                        <div className="text-sm text-slate">{user.email}</div>
                      </div>
                    </div>
                    <div className="ml-13 space-y-1">
                      <div className="text-sm text-slate">
                        <span className="font-medium">Company:</span>{" "}
                        {user.company}
                      </div>
                      <div className="text-sm text-slate">
                        <span className="font-medium">Requested:</span>{" "}
                        {new Date(user.requestedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReject(user.id)}
                      className="px-4 py-2 border-2 border-silver rounded-lg text-sm font-medium text-charcoal hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="px-4 py-2 bg-cerulean border-2 border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Companies Tab */}
      {activeTab === "companies" && (
        <div className="bg-white border-2 border-charcoal rounded-3xl shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-silver">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal">
                Company Management
              </h2>
              <button className="px-4 py-2 bg-cerulean border-2 border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors">
                Add New Company
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="px-6 py-4 border-b border-silver">
            <div className="relative">
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate"
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
                placeholder="Search companies..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-silver rounded-lg text-[15px] text-charcoal placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>
          </div>

          {/* Company List */}
          <div className="divide-y divide-silver">
            {companies.map((company) => (
              <div
                key={company.id}
                className="px-6 py-4 hover:bg-platinum/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-cerulean/10 flex items-center justify-center">
                        <CompanyIcon />
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal text-lg">
                          {company.name}
                        </div>
                        <div className="text-sm text-slate">
                          Admin: {company.adminName}
                        </div>
                      </div>
                    </div>
                    <div className="ml-15 grid grid-cols-3 gap-4">
                      <div className="text-sm">
                        <span className="text-slate">Users:</span>{" "}
                        <span className="font-medium text-charcoal">
                          {company.users}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-slate">Created:</span>{" "}
                        <span className="font-medium text-charcoal">
                          {new Date(company.createdDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-slate">Status:</span>{" "}
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            company.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {company.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border-2 border-silver rounded-lg text-sm font-medium text-charcoal hover:border-cerulean hover:bg-cerulean/5 transition-colors">
                      View Details
                    </button>
                    <button
                      onClick={() => handleSuspendCompany(company.id)}
                      className="px-4 py-2 border-2 border-silver rounded-lg text-sm font-medium text-charcoal hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      {company.status === "active" ? "Suspend" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-white border-2 border-charcoal rounded-3xl p-6 shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]">
          <h2 className="text-lg font-bold text-charcoal mb-4">
            System Settings
          </h2>
          <div className="space-y-6">
            {/* Registration Settings */}
            <div className="border-2 border-silver rounded-xl p-4">
              <h3 className="font-semibold text-charcoal mb-3">
                Registration Settings
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-cerulean border-silver rounded focus:ring-cerulean"
                    defaultChecked
                  />
                  <span className="text-sm text-charcoal">
                    Require admin approval for new users
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-cerulean border-silver rounded focus:ring-cerulean"
                  />
                  <span className="text-sm text-charcoal">
                    Auto-approve users from verified companies
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-cerulean border-silver rounded focus:ring-cerulean"
                    defaultChecked
                  />
                  <span className="text-sm text-charcoal">
                    Send email notifications for new registrations
                  </span>
                </label>
              </div>
            </div>

            {/* Company Settings */}
            <div className="border-2 border-silver rounded-xl p-4">
              <h3 className="font-semibold text-charcoal mb-3">
                Company Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Maximum Users Per Company
                  </label>
                  <input
                    type="number"
                    defaultValue="50"
                    className="w-full px-3 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Trial Period (days)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full px-3 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button className="w-full px-4 py-3 bg-cerulean border-2 border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
