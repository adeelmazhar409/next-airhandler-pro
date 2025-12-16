import React from "react";
import { ChartIcon } from "../../icons/icons";

interface ChartPlaceholderProps {
  title: string;
}

export default function ChartPlaceholder({ title }: ChartPlaceholderProps) {
  return (
    <div
      className="rounded-2xl bg-white border-2  border-charcoal p-6
        transition-all duration-300
        shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]
        hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
        hover:-translate-y-1"
    >
      <div className="text-lg font-semibold text-charcoal mb-6">{title}</div>
      <div className="flex items-center justify-center h-[320px]">
        <div className="text-center text-silver">
          <ChartIcon />
          <p className="text-sm">No data available</p>
        </div>
      </div>
    </div>
  );
}
