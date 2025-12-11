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

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  {
    name: "CRM",
    icon: <CRMIcon />,
    value: "crm",
  },
  {
    name: "Contacts",
    icon: <ContactsIcon />,
    value: "contacts",
  },
  {
    name: "AI Estimate Builder",
    icon: <AIEstimateBuilderIcon />,
    value: "ai-estimate",
  },
  {
    name: "Service Estimate Pro",
    icon: <ServiceEstimateProIcon />,
    value: "service-estimate",
  },
  {
    name: "Maintenance Estimate Pro",
    icon: <MaintenanceEstimateProIcon />,
    value: "maintenance-estimate",
  },
  {
    name: "Service Reports",
    icon: <ServiceReportsIcon />,
    value: "service-reports",
  },
  {
    name: "Job Walks",
    icon: <JobWalksIcon />,
    value: "job-walks",
  },
];

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-[250px] bg-white border-r border-gray-200 flex flex-col">
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
              <button
                key={index}
                onClick={() => onPageChange(item.value)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left ${
                  activePage === item.value
                    ? "text-gray-900 bg-gray-100 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span className="text-[13px]">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
