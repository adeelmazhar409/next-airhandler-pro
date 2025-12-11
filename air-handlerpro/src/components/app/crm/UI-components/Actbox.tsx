import React from "react";

interface ActboxProps {
  header?: boolean; // Optional: whether to show the header
  value: string; // e.g., "activities", "contacts", "deals"
  headerIcon?: React.ReactNode; // Icon next to header title
  icon: React.ReactNode; // Large icon in empty state
  description: string; // Helper text below "No {value} found"
}

export default function Actbox({
  header = true,
  value,
  headerIcon,
  icon,
  description,
}: ActboxProps) {
  return (
    <div className="mx-auto my-3 px-4">
      {/* Main Card */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
        {/* Optional Header */}
        {header && (
          <div className="px-4 py-3 border-b border-gray-300">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              {headerIcon}
              {value}
            </h2>
          </div>
        )}

        {/* Empty State Content */}
        <div className="p-12 text-center">
          <div className="mx-auto w-14 h-14 mb-4 text-gray-300">{icon}</div>
          <p className="text-sm font-medium text-gray-500">
            No {value.toLowerCase()} found
          </p>
          <p className="text-xs text-gray-400 mt-1.5 max-w-md mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Floating New Button */}
      <div className="mt-4 text-center">
        <button className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xl hover:bg-gray-800 transition-all">
          <svg
            className="w-3.5 h-3.5"
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
          New {value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()}
        </button>
      </div>
    </div>
  );
}
