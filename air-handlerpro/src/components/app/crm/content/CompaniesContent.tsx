import React, { useState } from "react";
import Actbox from "../UI-components/Actbox";
import { BuildingIcon } from "../../../icons/icons";
import { SiteIcon } from "../../../icons/icons";

export default function CompaniesContent() {
  const [view, setView] = useState<"Companies" | "sites">("Companies");
  const companyValue = {
    header: false,
    value: "Companies",
    icon: <BuildingIcon />,
    description:
      "Companies help you organize your contacts and deals by grouping them under a single entity.",
  };

  const siteValue = {
    header: false,
    value: "Sites",
    icon: <SiteIcon />,
    description:
      "Sites help you manage locations associated with your companies and streamline service operations.",
  };
  return (
    <div className="">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView("Companies")}
          className={`flex items-center gap-2 px-4 py-2 border border-black font-medium transition-colors rounded-md ${
            view === "Companies"
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
          Companies
        </button>

        <button
          onClick={() => setView("sites")}
          className={`flex items-center gap-2 px-4 py-2 border border-black font-medium transition-colors rounded-md ${
            view === "sites"
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
          sites
        </button>
      </div>

      {view === "Companies" && <Actbox {...companyValue} />}

      {view === "sites" && <Actbox {...siteValue} />}
    </div>
  );
}
