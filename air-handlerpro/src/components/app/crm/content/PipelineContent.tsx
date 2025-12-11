import React, { useState } from "react";

interface Deal {
  id: string;
  accountName: string;
  dealName: string;
  amount: number;
  stage: string;
  closingDate: string;
  serviceSite: string;
}

const stages = [
  { name: "Lead", color: "bg-gray-500" },
  { name: "Qualified", color: "bg-blue-500" },
  { name: "Proposal", color: "bg-yellow-500" },
  { name: "Negotiation", color: "bg-orange-500" },
  { name: "Closed Won", color: "bg-green-500" },
  { name: "Closed Lost", color: "bg-red-500" },
];

export default function PipelineContent() {
  const [view, setView] = useState<"cards" | "table">("cards");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with real data later
  const deals: Deal[] = [
    {
      id: "1",
      accountName: "Acme Corp",
      dealName: "Enterprise Software License",
      amount: 75000,
      stage: "Qualified",
      closingDate: "2025-01-20",
      serviceSite: "Headquarters",
    },
    {
      id: "2",
      accountName: "Beta Inc",
      dealName: "Cloud Migration Project",
      amount: 120000,
      stage: "Negotiation",
      closingDate: "2025-02-15",
      serviceSite: "Data Center East",
    },
  ];

  const filteredDeals = deals.filter(
    (deal) =>
      deal.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-h-screen bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* View Toggle Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setView("cards")}
            className={`flex items-center gap-1 px-3 py-1.5 border border-black font-medium transition-colors rounded-md ${
              view === "cards"
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
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
            className={`flex items-center gap-1 px-3 py-1.5 border border-black font-medium transition-colors rounded-md ${
              view === "table"
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
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
                  className="flex-shrink-0 w-60 bg-gray-100 rounded-lg border-2 border-gray-300"
                >
                  {/* Column Header */}
                  <div className="p-3 border-b-2 border-gray-300 bg-white rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${stage.color}`}
                      ></div>
                      <span className="font-semibold text-gray-800 text-sm">
                        {stage.name}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                      {stageDeals.length}
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="p-2 space-y-2 min-h-60">
                    {stageDeals.length === 0 ? (
                      <p className="text-center text-gray-400 text-sm py-8">
                        No deals in this stage
                      </p>
                    ) : (
                      stageDeals.map((deal) => (
                        <div
                          key={deal.id}
                          className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                            {deal.dealName}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {deal.accountName}
                          </p>
                          <p className="text-base font-bold text-gray-900">
                            ${deal.amount.toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {view === "table" && (
          <div className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden">
            {/* Search Bar */}
            <div className="p-3 border-b border-gray-300">
              <input
                type="text"
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Account Name",
                      "Deal Name",
                      "Amount",
                      "Stage",
                      "Closing Date",
                      "Service Site",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 text-left text-xs font-semibold text-gray-900"
                      >
                        <button className="flex items-center gap-1 hover:text-gray-600">
                          {header}
                          <svg
                            className="w-3 h-3"
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
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredDeals.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-12 text-center text-gray-500 text-sm"
                      >
                        {deals.length === 0
                          ? "No deals yet. Click 'New Deal' to add your first one."
                          : "No deals match your search."}
                      </td>
                    </tr>
                  ) : (
                    filteredDeals.map((deal) => (
                      <tr
                        key={deal.id}
                        className="border-t border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {deal.accountName}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {deal.dealName}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                          ${deal.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {deal.closingDate}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {deal.serviceSite}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Floating New Deal Button */}
        {view === "table" && (
          <button className="fixed bottom-8 right-8 bg-black text-white px-5 py-2.5 rounded-lg font-semibold shadow-xl hover:bg-gray-800 transition-all flex items-center gap-2 z-50">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Deal
          </button>
        )}
      </div>
    </div>
  );
}
