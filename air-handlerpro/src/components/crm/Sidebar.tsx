import React from "react";
import {
  CRMIcon,
  ContactsIcon,
  AIEstimateBuilderIcon,
  ServiceEstimateProIcon,
  MaintenanceEstimateProIcon,
  ServiceReportsIcon,
  JobWalksIcon,
  MenuIcon,
} from "@/components/icons/icons";

const navigationItems = [
  {
    name: "CRM",
    icon: <CRMIcon />,
    active: true,
  },
  {
    name: "Contacts",
    icon: <ContactsIcon />,
    active: false,
  },
  {
    name: "AI Estimate Builder",
    icon: <AIEstimateBuilderIcon />,
    active: false,
  },
  {
    name: "Service Estimate Pro",
    icon: <ServiceEstimateProIcon />,
    active: false,
  },
  {
    name: "Maintenance Estimate Pro",
    icon: <MaintenanceEstimateProIcon />,
    active: false,
  },
  {
    name: "Service Reports",
    icon: <ServiceReportsIcon />,
    active: false,
  },
  {
    name: "Job Walks",
    icon: <JobWalksIcon />,
    active: false,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-[290px] bg-white border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <button className="p-2 hover:bg-gray-100 rounded">
          <MenuIcon />
        </button>
      </div>

      {/* Main Application Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main Application
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 ${
                  item.active
                    ? "text-gray-900 bg-gray-100 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span className="text-[15px]">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
