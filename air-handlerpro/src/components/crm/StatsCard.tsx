import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  alert?: boolean;
  hoverable?: boolean;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  alert = false,
  hoverable = true,
}: StatsCardProps) {
  return (
    <div
      className={`bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] p-6 ${
        hoverable
          ? "transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)]"
          : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-[15px] font-semibold text-gray-900 flex items-center gap-2">
          {title}
          {alert && (
            <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {icon}
      </div>
      <p
        className={`text-4xl font-bold mb-1 ${
          alert ? "text-red-600" : "text-gray-900"
        }`}
      >
        {value}
      </p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
