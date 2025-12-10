"use client";

import {
  ActivitiesIcon,
  ContactsIcon,
  PipelineIcon,
} from "@/components/icons/icons";
import { useState } from "react";

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { name: "Dashboard", value: "dashboard", icon: null },
    {
      name: "Pipeline",
      value: "pipeline",
      icon: <PipelineIcon />,
    },
    {
      name: "Activities",
      value: "activities",
      icon: <ActivitiesIcon />,
    },
    {
      name: "Contacts",
      value: "contacts",
      icon: <ContactsIcon />,
    },
    { name: "Companies", value: "companies", icon: null },
  ];

  // Dashboard Component
  const DashboardContent = () => (
    <>
      {/* Stats Cards Row 1 */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Total Companies
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
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
          </div>
          <p className="text-4xl font-bold text-gray-900">0</p>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Service Sites
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900">0</p>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Active Customers
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900">0</p>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Prospects
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
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
          </div>
          <p className="text-4xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Stats Cards Row 2 */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Total Pipeline
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900">$0</p>
          <p className="text-sm text-gray-500 mt-1">0 deals</p>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Won Deals
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900">$0</p>
          <p className="text-sm text-gray-500 mt-1">0 deals closed</p>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Conversion Rate
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900">0.0%</p>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Avg Deal Size
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900">$0</p>
          <p className="text-sm text-gray-500 mt-1">Per closed deal</p>
        </div>
      </div>

      {/* Activity Cards Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900 flex items-center gap-2">
              Overdue Tasks
              <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-4xl font-bold text-red-600 mb-1">0</p>
          <p className="text-sm text-gray-500">Need attention</p>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Upcoming
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
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
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">0</p>
          <p className="text-sm text-gray-500">Next 7 days</p>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">Calls</div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">0</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-semibold text-gray-900">
              Emails
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">0</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="text-lg font-semibold text-gray-900 mb-6">
            Pipeline by Stage
          </div>
          <div className="flex items-center justify-center h-[320px]">
            <div className="w-[280px] h-[280px] border-2 border-dashed border-black flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-sm">No data available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
          <div className="text-lg font-semibold text-gray-900 mb-6">
            Activities by Type
          </div>
          <div className="flex items-center justify-center h-[320px]">
            <div className="text-center text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-sm">No data available</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Pipeline Component
  const PipelineContent = () => (
    <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Pipeline Management
      </h2>
      <p className="text-gray-600">
        This is the Pipeline view. Add your pipeline stages and deals here.
      </p>
    </div>
  );

  // Activities Component
  const ActivitiesContent = () => (
    <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Activities</h2>
      <p className="text-gray-600">
        This is the Activities view. Track your tasks, calls, and emails here.
      </p>
    </div>
  );

  // Contacts Component
  const ContactsContent = () => (
    <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Contacts</h2>
      <p className="text-gray-600">
        This is the Contacts view. Manage all your contacts here.
      </p>
    </div>
  );

  // Companies Component
  const CompaniesContent = () => (
    <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Companies</h2>
      <p className="text-gray-600">
        This is the Companies view. Manage your company accounts here.
      </p>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "pipeline":
        return <PipelineContent />;
      case "activities":
        return <ActivitiesContent />;
      case "contacts":
        return <ContactsContent />;
      case "companies":
        return <CompaniesContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[290px] bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <button className="p-2 hover:bg-gray-100 rounded">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Main Application Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Main Application
            </div>

            <nav className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-gray-900 bg-gray-100 font-medium"
              >
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
                <span className="text-[15px]">CRM</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50"
              >
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
                <span className="text-[15px]">Contacts</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50"
              >
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
                <span className="text-[15px]">AI Estimate Builder</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50"
              >
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[15px]">Service Estimate Pro</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50"
              >
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[15px]">Maintenance Estimate Pro</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50"
              >
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-[15px]">Service Reports</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50"
              >
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
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-[15px]">Job Walks</span>
              </a>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <div className="text-[24px] font-bold text-gray-900">
              CRM Management
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            TE
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Search and Filters */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
                placeholder="Search companies and sites..."
                className="w-full pl-12 pr-4 py-3 border border-black text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-3 border border-black text-[15px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[140px]">
                <option>All Types</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
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
              </div>
            </div>

            <button className="flex items-center gap-2 px-5 py-3 border border-black text-[15px] font-medium text-gray-700 hover:bg-gray-50">
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
              Filter
            </button>

            <button className="flex items-center gap-2 px-5 py-3 border border-black text-[15px] font-medium text-gray-700 hover:bg-gray-50">
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
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              Sort
            </button>
          </div>

          {/* Stats Cards Row 1 - Above Tabs */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)]  p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[15px] font-semibold text-gray-900">
                  Total Companies
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
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
              </div>
              <p className="text-4xl font-bold text-gray-900">0</p>
            </div>

            <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[15px] font-semibold text-gray-900">
                  Service Sites
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-4xl font-bold text-gray-900">0</p>
            </div>

            <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[15px] font-semibold text-gray-900">
                  Active Customers
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-4xl font-bold text-gray-900">0</p>
            </div>

            <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[15px] font-semibold text-gray-900">
                  Prospects
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
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
              </div>
              <p className="text-4xl font-bold text-gray-900">0</p>
            </div>
          </div>

          {/* Tabs with Animated Underline */}
          <div className="mb-6">
            <div className="border-b border-gray-200 relative">
              <nav className="flex gap-8">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(tab.value)}
                    className={`pb-4 px-1 text-[15px] font-medium flex items-center gap-2 relative transition-colors ${
                      activeTab === tab.value
                        ? "text-gray-900 font-semibold"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </nav>

              {/* Animated Underline */}
              <div
                className="absolute bottom-0 h-0.5 bg-gray-900 transition-all duration-300 ease-in-out"
                style={{
                  left: `${
                    tabs.findIndex((tab) => tab.value === activeTab) * 128
                  }px`,
                  width:
                    activeTab === "dashboard"
                      ? "95px"
                      : activeTab === "pipeline"
                      ? "78px"
                      : activeTab === "activities"
                      ? "92px"
                      : activeTab === "contacts"
                      ? "84px"
                      : "100px",
                }}
              />
            </div>
          </div>

          {/* Dynamic Content Based on Active Tab */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
