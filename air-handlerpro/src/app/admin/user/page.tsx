"use client";
import React, { useState } from "react";
import {
  UsersIcon,
  CompanyIcon,
  UserApprovalIcon,
  SettingsIcon,
} from "@/components/icons/icons";
import { TabNavigation } from "../../../components/admin/user/adminuserUI";
import {
  OverviewTab,
  UserApprovalsTab,
  CompaniesTab,
  SettingsTab,
} from "../../../components/admin/user/admintab";
import { User, Company, Stat, Activity } from "../../../components/admin/user/types";

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

  const stats: Stat[] = [
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

  const activities: Activity[] = [
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
  ];

  const tabs = [
    { name: "Overview", value: "overview" },
    { name: "User Approvals", value: "approvals" },
    { name: "Companies", value: "companies" },
    { name: "Settings", value: "settings" },
  ];

  const handleApprove = (userId: string) => {
    console.log("Approving user:", userId);
  };

  const handleReject = (userId: string) => {
    console.log("Rejecting user:", userId);
  };

  const handleSuspendCompany = (companyId: string) => {
    console.log("Suspending company:", companyId);
  };

  return (
    <div className="min-h-screen bg-cerulean/90 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold  mb-2">Admin Suite</h1>
        <p className="text-white/80 text-[15px]">
          Manage users, companies, and system settings
        </p>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      {activeTab === "overview" && (
        <OverviewTab
          stats={stats}
          pendingUsers={pendingUsers}
          companies={companies}
          activities={activities}
          onTabChange={setActiveTab}
        />
      )}

      {activeTab === "approvals" && (
        <UserApprovalsTab
          pendingUsers={pendingUsers}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {activeTab === "companies" && (
        <CompaniesTab
          companies={companies}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSuspend={handleSuspendCompany}
        />
      )}

      {activeTab === "settings" && <SettingsTab />}
    </div>
  );
}
