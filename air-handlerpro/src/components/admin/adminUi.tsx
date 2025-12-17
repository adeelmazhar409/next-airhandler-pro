import React from "react";
import { Info } from "lucide-react";

// Page Header
export const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="border-b border-silver px-8 py-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-white/90 text-[15px]">{description}</p>
    </div>
  </div>
);

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
  <div className="border-b border-silver bg-white px-8">
    <div className="max-w-7xl mx-auto">
      <nav className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`py-4 text-[15px] font-medium relative transition-colors ${
              activeTab === tab.value
                ? "text-charcoal font-semibold"
                : "text-slate hover:text-charcoal"
            }`}
          >
            {tab.name}
            {activeTab === tab.value && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cerulean" />
            )}
          </button>
        ))}
      </nav>
    </div>
  </div>
);

// Section Header
export const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
}) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-10 h-10 rounded-lg bg-cerulean/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-cerulean" />
    </div>
    <div>
      <h2 className="text-xl font-bold text-charcoal">{title}</h2>
      {description && <p className="text-sm text-slate">{description}</p>}
    </div>
  </div>
);

// Form Input
export const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  type?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <div className="mb-6">
    <label className="block text-sm font-semibold text-charcoal mb-2">
      {label}
    </label>
    {rows ? (
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-silver rounded-lg text-[15px] text-charcoal focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors resize-none"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-silver rounded-lg text-[15px] text-charcoal focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors"
        placeholder={placeholder}
      />
    )}
  </div>
);

// Info Box
export const InfoBox = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-cerulean/5 border border-cerulean/20 rounded-lg p-4 mb-8">
    <div className="flex gap-3">
      <Info className="w-5 h-5 text-cerulean flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm text-charcoal font-medium mb-1">{title}</p>
        <p className="text-sm text-slate">{description}</p>
      </div>
    </div>
  </div>
);

// Save Button
export const SaveButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <div className="pt-6 border-t border-silver flex justify-end">
    <button
      onClick={onClick}
      className="px-8 py-3 bg-cerulean border border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors"
    >
      {children}
    </button>
  </div>
);
