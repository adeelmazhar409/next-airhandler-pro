import React from "react";
import { ChartIcon } from "../../../icons/icons";

interface ChartPlaceholderProps {
  title: string;
}

export default function ChartPlaceholder({ title }: ChartPlaceholderProps) {
  return (
    <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)] p-6">
      <div className="text-lg font-semibold text-gray-900 mb-6">{title}</div>
      <div className="flex items-center justify-center h-[320px]">
        <div className="text-center text-gray-400">
          <ChartIcon />
          <p className="text-sm">No data available</p>
        </div>
      </div>
    </div>
  );
}
