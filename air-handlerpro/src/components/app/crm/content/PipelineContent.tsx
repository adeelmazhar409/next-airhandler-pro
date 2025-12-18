import React, { useState } from "react";
import DealsTable from "../../UI-components/table";
import { Deal } from "../../UI-components/table";
import { Calendar, Contact, ContactIcon } from "lucide-react";
import { BadgeMinusIcon } from "lucide-react";
import { ActitivtyIcon } from "@/components/icons/icons";

const stages = [
  { name: "Lead", color: "bg-orange-300", textColor: "text-orange-300" },
  { name: "Qualified", color: "bg-cerulean", textColor: "text-cerulean" },
  { name: "Proposal", color: "bg-yellow-500", textColor: "text-yellow-500" },
  { name: "Negotiation", color: "bg-purple-500", textColor: "text-purple-500" },
  { name: "Closed Won", color: "bg-green-500", textColor: "text-green-500" },
  { name: "Closed Lost", color: "bg-red-500", textColor: "text-red-500" },
];

export default function PipelineContent() {
  const [view, setView] = useState<"cards" | "table">("cards");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with real data later
  const deals: Deal[] = [
    {
      id: "1",
      accountName: "Acme Corp",
      dealName: "Enterprise Software License Renewal",
      amount: 75000,
      stage: "Qualified",
      closingDate: "2025-01-20",
      serviceSite: "Main Headquarters - New York",
      createdBy: "Tim Wallick",
      createdTime: "2024-11-15",
      barPercentage: 50,
      owner: true,
    },
    {
      id: "2",
      accountName: "Vertex Solutions",
      dealName: "Cloud Migration & Infrastructure Upgrade",
      amount: 148500,
      stage: "Negotiation",
      closingDate: "2025-02-28",
      serviceSite: "Data Center East - Virginia",
      createdBy: "Sarah Chen",
      createdTime: "2024-10-22",
      barPercentage: 85,
    },
    {
      id: "3",
      accountName: "Nexlify Technologies",
      dealName: "Custom CRM Integration",
      amount: 92000,
      stage: "Lead",
      closingDate: "2025-03-10",
      serviceSite: "Regional Office - Chicago",
      createdBy: "Michael Torres",
      createdTime: "2024-12-05",
      barPercentage: 20,
    },
    {
      id: "4",
      accountName: "Pinnacle Health Systems",
      dealName: "Patient Portal Modernization",
      amount: 210000,
      stage: "Negotiation",
      closingDate: "2025-01-31",
      serviceSite: "Central Hospital Campus",
      createdBy: "Tim Wallick",
      createdTime: "2024-09-18",
      barPercentage: 95,
    },
    {
      id: "5",
      accountName: "Summit Retail Group",
      dealName: "POS System Rollout (Phase 2)",
      amount: 63500,
      stage: "Negotiation",
      closingDate: "2025-04-05",
      serviceSite: "Distribution Center - Atlanta",
      createdBy: "Emma Rodriguez",
      createdTime: "2024-11-28",
      barPercentage: 70,
    },
    {
      id: "6",
      accountName: "Horizon Manufacturing",
      dealName: "Factory Automation Upgrade",
      amount: 189000,
      stage: "Closed Lost",
      closingDate: "2025-02-15",
      serviceSite: "Plant #3 - Detroit",
      createdBy: "Tim Wallick",
      createdTime: "2024-08-10",
      barPercentage: 100, // Even lost deals can be "complete" in progress
    },
  ];
  const handleDealClick = (deal: Deal) => {
    console.log("Deal clicked:", deal);
    // Navigate to deal details or open modal
  };

  const handleNewDeal = () => {
    console.log("New deal clicked");
    // Open new deal form/modal
  };

  return (
    <div className="max-h-screen bg-platinum/10">
      <div className="max-w-full mx-auto">
        {/* View Toggle Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setView("cards")}
            className={`flex items-center gap-1 px-3 py-1.5 border font-medium transition-colors rounded-md ${
              view === "cards"
                ? "bg-cerulean text-white border-cerulean"
                : "bg-white text-charcoal border-silver hover:bg-platinum"
            }`}
          >
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Cards
          </button>

          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1 px-3 py-1.5 border font-medium transition-colors rounded-md ${
              view === "table"
                ? "bg-cerulean text-white border-cerulean"
                : "bg-white text-charcoal border-silver hover:bg-platinum"
            }`}
          >
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
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Table
          </button>
        </div>

        {/* Cards View (Kanban) */}
        {view === "cards" && (
          <div className="flex gap-3 overflow-x-auto p-1">
            {stages.map((stage) => {
              const stageDeals = deals.filter(
                (deal) => deal.stage === stage.name
              );
              return (
                <div
                  key={stage.name}
                  className="flex-shrink-0 w-60 bg-platinum/30 rounded-lg border-2 border-silver"
                >
                  {/* Column Header */}
                  <div className="p-3 border-b-2 border-silver bg-white rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${stage.color}`}
                      ></div>
                      <span className="font-semibold text-charcoal text-sm">
                        {stage.name}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-platinum flex items-center justify-center text-xs font-bold text-charcoal">
                      {stageDeals.length}
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="p-2 space-y-2 min-h-60">
                    {stageDeals.length === 0 ? (
                      <p className="text-center text-slate text-sm py-8">
                        No deals in this stage
                      </p>
                    ) : (
                      stageDeals.map((deal) => (
                        <div
                          key={deal.id}
                          onClick={() => handleDealClick(deal)}
                          className="bg-white p-3 rounded-lg border border-silver shadow-sm hover:shadow-md hover:border-cerulean transition-all cursor-pointer"
                        >
                          <h4 className="font-semibold text-charcoal mb-1 text-sm">
                            {deal.dealName}
                          </h4>
                          <p className={`text-base font-bold ${stage.textColor}`}>
                            ${deal.amount.toLocaleString()}
                          </p>
                          <div className="flex justify-between mt-2">
                            <p className="text-black text-xs">Probability</p>
                            <p className="text-black text-xs my-auto">
                              {deal.barPercentage}%
                            </p>
                          </div>
                          <div className="w-full bg-gray-300 my-1 rounded-full h-1 overflow-hidden">
                            <div
                              className={` ${stage.color} h-full   rounded-full transition-all duration-500 ease-out`}
                              style={{ width: `${deal.barPercentage}%` }}
                            />
                          </div>
                          <div className="flex items-center gap-1  w-full my-3">
                            <Calendar className="text-slate h-4" />
                            <p className="text-slate text-sm">
                              Close Date: {deal.closingDate}
                            </p>
                          </div>

                          <div className={`flex items-center gap-1 ${deal.owner ? "block" : "hidden" }`}>
                            <ContactIcon className="text-slate h-4" />
                            <p className="text-slate text-sm">
                              Owner
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View - Now using modular component */}
        {view === "table" && (
          <DealsTable
            deals={deals}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onDealClick={handleDealClick}
            showNewDealButton={true}
            onNewDeal={handleNewDeal}
          />
        )}
      </div>
    </div>
  );
}
