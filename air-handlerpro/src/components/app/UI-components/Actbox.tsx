import React from "react";
import Button from "./button";
import ActivityFeed from "./activitypagedataFormed";

interface ActboxProps {
  data?: boolean;
  header?: boolean; // Optional: whether to show the header
  value: string; // e.g., "activities", "contacts", "deals"
  headerIcon?: React.ReactNode; // Icon next to header title
  icon: React.ReactNode; // Large icon in empty state
  description: string; // Helper text below "No {value} found"
  formOpen?: () => void;
}

export default function Actbox({
  data,
  header = true,
  value,
  headerIcon,
  icon,
  description,
  formOpen,
}: ActboxProps) {
  return (
    <div className="mx-auto my-3 px-4">
      <div className="w-full flex justify-end py-2">
        <Button onClick={formOpen} value="New Activity" />
      </div>
      {/* Main Card */}
      <div className="bg-white rounded-lg border border-silver shadow-sm overflow-hidden">
        {/* Optional Header */}
        {header && (
          <div className="px-4 py-3 border-b border-silver bg-cerulean">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              {headerIcon}
              {value}
            </h2>
          </div>
        )}

        {data && <ActivityFeed />}

        {/* Empty State Content */}
        <div className={`p-12 text-center ${!data ? "m-1" : "hidden"}`}>
          <div className="mx-auto w-14 h-14 mb-4 text-silver flex justify-center items-center">
            {icon}
          </div>
          <p className="text-sm font-medium text-slate">
            No {value.toLowerCase()} found
          </p>
          <p className="text-xs text-slate/70 mt-1.5 max-w-md mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Floating New Button */}
      <div className="mt-4 text-center">
        <Button onClick={formOpen} value={value} />
      </div>
    </div>
  );
}
