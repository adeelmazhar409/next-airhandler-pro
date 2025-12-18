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

import { Shield,ChartLine,Building2,Menu } from "lucide-react";
interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const AdminNavigationItems = [
  {
    HeaderName: "System Admin",
    HeaderIcon: <Shield className="h-4" />,
    TitleName: "Admin Panel",
    TitleIcon: <ChartLine className="h-4" />,
    value: "System Administration",
  },
  {
    HeaderName: "Company Admin",
    HeaderIcon: <Building2 className="h-4" />,
    TitleName: "Company Dashboard",
    TitleIcon: <ChartLine className="h-4" />,
    value: "Company Administration",
  },
];

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
    <aside className="w-[250px] bg-cerulean border-r border-silver flex flex-col">
      {/* Sidebar Header */}
      <div className="p-3  border-silver">
        <button className="p-2 hover:bg-platinum rounded">
          <Menu className="h-5 text-black"/>
        </button>
      </div>
      <nav>
        {AdminNavigationItems.map((item, index) => (
          <div className="flex  flex-col  px-4" key={index}>
            <div className="flex m-1 my-1">
              {" "}
              <div className="text-charcoal ">{item.HeaderIcon}</div>
              <p className="text-charcoal text-xs px-2" key={index}>
                {item.HeaderName}
              </p>
            </div>

            <button
              key={index}
              onClick={() => onPageChange(item.value)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors cursor-pointer ${
                activePage === item.value
                  ? " bg-white text-charcoal  font-medium"
                  : " hover:bg-platinum hover:text-charcoal"
              }`}
            >
              {item.TitleIcon}
              <span className="text-[13px]">{item.TitleName}</span>
            </button>
          </div>
        ))}
      </nav>

      {/* Main Application Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3">
          <div className="text-xs font-semibold text-black uppercase tracking-wider mb-3">
            Main Application
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onPageChange(item.value)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors cursor-pointer ${
                  activePage === item.value
                    ? " bg-white text-charcoal  font-medium"
                    : " hover:bg-platinum hover:text-charcoal"
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
