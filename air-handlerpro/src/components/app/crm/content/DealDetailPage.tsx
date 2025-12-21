"use client";

import React, { useState } from "react";
import { Deal } from "@/components/app/UI-components/table";
import { ArrowLeft, Edit, Trash2, Plus } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  type: "note" | "meeting" | "task";
  completedDate?: string;
  dueDate?: string;
}

interface DealDetailPageProps {
  deal: Deal;
  onBack: () => void;
}

export default function DealDetailPage({ deal, onBack }: DealDetailPageProps) {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Deal created from maintenance estimate",
      description: `Deal automatically created from maintenance estimate ${deal.id}`,
      priority: "medium",
      type: "note",
      completedDate: deal.createdTime,
    },
  ]);

  // Get stage color based on deal stage
  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      "Lead": "bg-orange-300",
      "Qualified": "bg-cerulean",
      "Proposal": "bg-yellow-500",
      "Negotiation": "bg-purple-500",
      "Closed Won": "bg-green-500",
      "Closed Lost": "bg-red-500",
    };
    return colors[stage] || "bg-slate";
  };

  const getPriorityBadgeColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-slate/20 text-slate",
      medium: "bg-cerulean/20 text-cerulean",
      high: "bg-red-500/20 text-red-500",
    };
    return colors[priority] || "bg-slate/20 text-slate";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleEdit = () => {
    console.log("Edit deal:", deal);
    // TODO: Implement edit functionality
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this deal?")) {
      console.log("Delete deal:", deal);
      // TODO: Implement delete functionality
      onBack();
    }
  };

  const handleAddActivity = () => {
    console.log("Add activity");
    // TODO: Implement add activity functionality
  };

  return (
    <div className="min-h-screen bg-platinum/10 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-charcoal hover:text-cerulean transition-colors mb-4 border border-silver rounded-md hover:border-cerulean bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to CRM
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal">
                {deal.dealName} - {deal.id}
              </h1>
              <p className="text-slate mt-1">
                Created {formatDate(deal.createdTime)}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 border border-silver rounded-md text-charcoal hover:border-cerulean hover:text-cerulean transition-colors bg-white"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Deal Information (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Deal Overview */}
            <div className="bg-white rounded-lg border-2 border-silver p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-6">
                Deal Overview
              </h2>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {/* Deal Value */}
                <div>
                  <p className="text-sm text-slate mb-2">Deal Value</p>
                  <p className="text-3xl font-bold text-charcoal">
                    {formatCurrency(deal.amount)}
                  </p>
                </div>

                {/* Stage */}
                <div>
                  <p className="text-sm text-slate mb-2">Stage</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getStageColor(
                        deal.stage
                      )}`}
                    ></div>
                    <span className="text-lg font-semibold text-charcoal">
                      {deal.stage}
                    </span>
                  </div>
                </div>

                {/* Probability */}
                <div>
                  <p className="text-sm text-slate mb-2">Probability</p>
                  <p className="text-xl font-semibold text-charcoal">
                    {deal.barPercentage}%
                  </p>
                </div>

                {/* Expected Close */}
                <div>
                  <p className="text-sm text-slate mb-2">Expected Close</p>
                  <p className="text-lg font-semibold text-charcoal">
                    {formatDate(deal.closingDate)}
                  </p>
                </div>
              </div>

              {/* Source Type */}
              <div className="mt-6 pt-6 border-t border-silver">
                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-medium text-charcoal">
                    Source Type
                  </p>
                  <span className="text-sm font-medium text-charcoal">
                    estimate
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 pt-6 border-t border-silver">
                <p className="text-sm font-semibold text-charcoal mb-3">
                  Description
                </p>
                <p className="text-sm text-charcoal leading-relaxed">
                  Maintenance estimate for Monthly service over 12 months.
                  Estimate #{deal.id}
                </p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg border-2 border-silver p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-6">
                Customer Information
              </h2>

              <div className="space-y-4">
                {/* Service Site */}
                <div>
                  <p className="text-sm font-semibold text-charcoal mb-1">
                    Service Site
                  </p>
                  <p className="text-base font-medium text-charcoal mb-1">
                    {deal.serviceSite}
                  </p>
                  <p className="text-sm text-slate">
                    12548 SH Network Blvd Orlando, FL 32901
                  </p>
                </div>

                {/* Contact */}
                <div className="mt-4">
                  <p className="text-sm text-slate">
                    Contact: {deal.createdBy}
                  </p>
                  <p className="text-sm text-slate">
                    Email:{" "}
                    {deal.createdBy
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .split(" ")[0] || "contact"}
                    @gmail.com
                  </p>
                  <p className="text-sm text-slate">Phone: 407225-5214</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activities (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border-2 border-silver p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-charcoal">
                  Activities
                </h2>
                <button
                  onClick={handleAddActivity}
                  className="flex items-center gap-1 px-3 py-1.5 border border-charcoal rounded-md text-sm font-medium text-charcoal hover:bg-charcoal hover:text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Activity
                </button>
              </div>

              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border border-silver rounded-lg p-4"
                  >
                    <div className="flex items-start gap-2 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(
                              activity.priority
                            )}`}
                          >
                            {activity.priority}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              activity.type === "note"
                                ? "bg-cerulean/20 text-cerulean"
                                : activity.type === "meeting"
                                ? "bg-purple-500/20 text-purple-500"
                                : "bg-green-500/20 text-green-500"
                            }`}
                          >
                            {activity.type.charAt(0).toUpperCase() +
                              activity.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-charcoal mb-2">
                          {activity.title}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate mb-3">
                      {activity.description}
                    </p>

                    {activity.completedDate && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Completed {formatDate(activity.completedDate)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}