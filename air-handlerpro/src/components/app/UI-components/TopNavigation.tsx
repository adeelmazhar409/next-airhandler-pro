import React from "react";
import {
  ActivitiesIcon,
  ContactsIcon,
  PipelineIcon,
} from "@/components/icons/icons";

interface Tab {
  name: string;
  value: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const tabWidths: Record<string, string> = {
  dashboard: "90px",
  pipeline: "78px",
  activities: "92px",
  contacts: "84px",
  companies: "80px",
};

const tabIcons: Record<string, React.ReactNode> = {
  pipeline: <PipelineIcon />,
  activities: <ActivitiesIcon />,
  contacts: <ContactsIcon />,
};

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="mb-6">
      <div className="border-b border-charcol relative">
        <nav className="flex gap-6">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabChange(tab.value)}
              className={`pb-4 px-1 text-[15px] font-medium flex items-center gap-2 relative transition-colors ${
                activeTab === tab.value
                  ? "text-charcoal/70 font-semibold"
                  : "text-charcoal hover:text-charcoal/80"
              }`}
            >
              {tabIcons[tab.value]}
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Animated Underline */}
        <div
          className="absolute bottom-0 h-0.5 bg-cerulean transition-all duration-300 ease-in-out"
          style={{
            left: `${tabs.findIndex((tab) => tab.value === activeTab) * 119}px`,
            width: tabWidths[activeTab] || "95px",
          }}
        />
      </div>
    </div>
  );
}