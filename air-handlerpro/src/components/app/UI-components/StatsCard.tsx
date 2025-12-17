import React from "react";

interface StatsCardProps {
  title: string;
  value?: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
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
      className="bg-white rounded-small-block px-5 py-3 
        transition-transform duration-300 hover:scale-102 ease-in-out
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_8px_rgba(76,92,104,0.3),0_1px_2px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-[13px] font-semibold text-charcoal flex items-center gap-2">
          {title}
        </div>
        {icon}
      </div>
      <p
        className={`text-3xl font-bold mb-1 ${
          alert ? "text-red-600" : "text-charcoal"
        }`}
      >
        {value}
      </p>
      {subtitle && <p className="text-sm text-slate">{subtitle}</p>}
    </div>
  );
}
