import React from "react";

export interface Deal {
  id: string;
  accountName: string;
  dealName: string;
  amount: number;
  stage: string;
  closingDate: string;
  serviceSite: string;
  createdBy: string;
  createdTime: string;
  barPercentage: number;
  owner?: boolean;
}

interface DealsTableProps {
  deals: Deal[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDealClick?: (deal: Deal) => void;
  showNewDealButton?: boolean;
  onNewDeal?: () => void;
}

export default function DealsTable({
  deals,
  searchQuery,
  onSearchChange,
  onDealClick,
  showNewDealButton = true,
  onNewDeal,
}: DealsTableProps) {
  const filteredDeals = deals.filter(
    (deal) =>
      deal.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="bg-white rounded-lg border-2 border-silver w-full">
        {/* Search Bar */}
        <div className="p-3 border-b border-silver">
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-silver rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean text-sm text-charcoal placeholder:text-slate/60"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-platinum/30">
              <tr>
                {[
                  "Account Name",
                  "Deal Name",
                  "Amount",
                  "Stage",
                  "Closing Date",
                  "Service Site",
                  "Created By",
                  "Create time"
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-xs font-semibold text-charcoal"
                  >
                    <button className="flex items-center gap-1 hover:text-cerulean transition-colors">
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
                    className="px-4 py-12 text-center text-slate text-sm"
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
                    onClick={() => onDealClick?.(deal)}
                    className="border-t border-silver hover:bg-platinum/20 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-sm text-charcoal">
                      {deal.accountName}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-charcoal">
                      {deal.dealName}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-cerulean">
                      ${deal.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cerulean/20 text-cerulean">
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate">
                      {deal.closingDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate">
                      {deal.serviceSite}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate">
                      {deal.createdBy}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate">
                      {deal.createdTime}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating New Deal Button */}
      {showNewDealButton && (
        <button
          onClick={onNewDeal}
          className="fixed bottom-8 right-8 bg-cerulean text-white px-5 py-2.5 rounded-lg font-semibold shadow-xl hover:bg-slate transition-all flex items-center gap-2 z-50"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Deal
        </button>
      )}
    </>
  );
}
