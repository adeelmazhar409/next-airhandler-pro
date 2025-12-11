import React from "react";
import {
  DropdownIcon,
  FilterIcon,
  SearchIcon,
  SortIcon,
} from "@/components/icons/icons";

export default function SearchAndFilters() {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-1 relative">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search companies and sites..."
          className="w-full pl-12 pr-4 py-2 border border-black text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="relative">
        <select className="appearance-none pl-4 pr-10 py-2 border border-black text-[15px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[140px]">
          <option>All Types</option>
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <DropdownIcon />
        </div>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 border border-black text-[15px] font-medium text-gray-700 hover:bg-gray-50">
        <FilterIcon />
        Filter
      </button>

      <button className="flex items-center gap-2 px-4 py-2 border border-black text-[15px] font-medium text-gray-700 hover:bg-gray-50">
        <SortIcon />
        Sort
      </button>
    </div>
  );
}
