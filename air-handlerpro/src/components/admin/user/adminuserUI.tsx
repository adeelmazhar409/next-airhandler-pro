import React from "react";

// Tab Navigation
export const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { name: string; value: string }[];
  activeTab: string;
  onTabChange: (value: string) => void;
}) => (
  <div className="mb-6">
    <div className="border-b border-charcoal    relative">
      <nav className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`pb-4 px-1 text-[15px] font-medium relative transition-colors ${
              activeTab === tab.value
                ? "text-white font-semibold"
                : "text-white/70 hover:text-charcoal"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>

      <div
        className="absolute bottom-0 h-0.5 bg-cerulean transition-all duration-300 ease-in-out"
        style={{
          left: `${tabs.findIndex((tab) => tab.value === activeTab) * 112}px`,
          width: "100px",
        }}
      />
    </div>
  </div>
);

// Search Bar
export const SearchBar = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <div className="px-6 py-4 border-b border-silver">
    <div className="relative">
      <svg
        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-2 border border-silver rounded-lg text-[15px] text-charcoal placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
      />
    </div>
  </div>
);

// Card Container
export const CardContainer = ({
  children,
  noPadding = false,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
}) => (
  <div
    className={`bg-white border-2 border-charcoal rounded-3xl shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)] ${
      noPadding ? "" : "p-6"
    }`}
  >
    {children}
  </div>
);

// Card Header
export const CardHeader = ({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) => (
  <div className="px-6 py-4 border-b border-silver">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold text-charcoal">{title}</h2>
      {action}
    </div>
  </div>
);

// Quick Action Button
export const QuickActionButton = ({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 p-4 border-2 border-silver rounded-xl hover:border-cerulean hover:bg-cerulean/5 transition-colors"
  >
    <div className="w-10 h-10 rounded-lg bg-cerulean/10 flex items-center justify-center">
      {icon}
    </div>
    <div className="text-left">
      <div className="font-semibold text-charcoal text-sm">{title}</div>
      <div className="text-xs text-slate">{subtitle}</div>
    </div>
  </button>
);

// Status Badge
export const StatusBadge = ({
  status,
  activeLabel = "active",
  inactiveLabel = "suspended",
}: {
  status: "active" | "suspended";
  activeLabel?: string;
  inactiveLabel?: string;
}) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      status === "active"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {status === "active" ? activeLabel : inactiveLabel}
  </span>
);

// User Avatar
export const UserAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="w-10 h-10 rounded-full bg-cerulean/10 flex items-center justify-center">
      <span className="text-cerulean font-semibold text-sm">{initials}</span>
    </div>
  );
};
