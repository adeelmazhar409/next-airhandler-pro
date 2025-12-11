import React from "react";
import { MenuIcon } from "@/components/icons/icons";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <MenuIcon />
        <div className="text-[20px] font-bold text-gray-900">
          CRM Management
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
        TE
      </div>
    </header>
  );
}
