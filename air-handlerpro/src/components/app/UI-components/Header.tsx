import React from "react";
import { MenuIcon } from "@/components/icons/icons";

export default function Header({ value }: { value: string }) {
  return (
    <header className="bg-white border-b border-silver px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <MenuIcon />
        <div className="text-[20px] font-bold text-charcoal">{value}</div>
      </div>
      <div className="w-8 h-8 rounded-full bg-cerulean flex items-center justify-center text-white font-semibold">
        TE
      </div>
    </header>
  );
}
