import React from "react";
import { ChartIcon } from "../../icons/icons";

interface ChartPlaceholderProps {
  title: string;
}

export default function ChartPlaceholder({ title }: ChartPlaceholderProps) {
  return (
    <div className="bg-white rounded-normal p-6 transition-transform duration-300 hover:scale-101 ease-in-out
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_8px_rgba(76,92,104,0.3),0_1px_2px_rgba(0,0,0,0.2)]">
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