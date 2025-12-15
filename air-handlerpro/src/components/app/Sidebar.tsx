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
    value: "CRM",
  },
  {
    name: "Contacts",
    icon: <ContactsIcon />,
    value: "Contacts",
  },
  {
    name: "AI Estimate Builder",
    icon: <AIEstimateBuilderIcon />,
    value: "AI Estimate Builder",
  },
  {
    name: "Service Estimate Pro",
    icon: <ServiceEstimateProIcon />,
    value: "Service Estimate Pro",
  },
  {
    name: "Maintenance Estimate Pro",
    icon: <MaintenanceEstimateProIcon />,
    value: "Maintenance Estimate Pro",
  },
  {
    name: "Service Reports",
    icon: <ServiceReportsIcon />,
    value: "Service Reports",
  },
  {
    name: "Job Walks",
    icon: <JobWalksIcon />,
    value: "Job Walks",
  },
];

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-[250px] bg-white border-r border-silver flex flex-col">
      {/* Sidebar Header */}
      <div className="p-3 border-b border-silver">
        <button className="p-2 hover:bg-platinum rounded">
          <MenuIcon />
        </button>
      </div>

      {/* Main Application Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3">
          <div className="text-xs font-semibold text-slate uppercase tracking-wider mb-3">
            Main Application
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onPageChange(item.value)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded transition-colors ${
                  activePage === item.value
                    ? "text-cerulean bg-cerulean/10 font-medium"
                    : "text-charcoal hover:bg-platinum"
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
