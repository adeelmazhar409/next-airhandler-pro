import React from "react";
import { ChartIcon } from "../../icons/icons";

interface ChartPlaceholderProps {
  title: string;
}

export default function ChartPlaceholder({ title }: ChartPlaceholderProps) {
  return (
    <div
      className="bg-white border border-silver transition-transform hover:scale-105 p-6"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
      }}
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
