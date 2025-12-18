// components/TopDeals.tsx

import React from "react";

interface Deal {
  name: string;
  stage: string;
  amount: number;
  progress: number; // 0-100
}

interface TopDealsProps {
  deals: Deal[];
  title?: string;
}

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};



const TopDeals: React.FC<TopDealsProps> = ({ deals, title = "Top Deals" }) => {
  return (
    <div className="w-full  mx-auto border rounded-lg border-black/10 m-4 shadow-2xl p-6">
      <h2 className="text-xl text-cerulean font-semibold mb-4">{title}</h2>
      <div className="gap-3 flex flex-col">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md p-4 flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{deal.name}</h3>
                <p className="text-sm text-gray-500">Stage: {deal.stage}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {formatAmount(deal.amount)}
                </p>
                <p className="text-sm text-gray-600">{deal.progress}%</p>
              </div>
            </div>

            {/* Progress Bar */}
                     </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
