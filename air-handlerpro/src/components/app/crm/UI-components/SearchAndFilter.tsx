import React from "react";
import {
  DropdownIcon,
  FilterIcon,
  SearchIcon,
  SortIcon,
} from "@/components/icons/icons";


interface SearchAndFiltersProps {
  value1: string,
  value2: string,
  value3: string,
  Buttons?: boolean

}

export default function SearchAndFilters(
  {value1, value2, value3, Buttons}: SearchAndFiltersProps
) {
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
          <option>{value1}</option>
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <DropdownIcon />
        </div>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 border border-black text-[15px] font-medium text-gray-700 hover:bg-gray-50">
        <FilterIcon />
        {value2}
      </button>

      <button className="flex items-center gap-2 px-4 py-2 border border-black text-[15px] font-medium text-gray-700 hover:bg-gray-50">
        <SortIcon />
        {value3}
      </button>
      <button className={`p-3 border border-black hover:bg-gray-50 transition-colors ${Buttons ? '' : 'hidden'}`}>
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>

      <button className={`p-3 border border-black hover:bg-gray-50 transition-colors ${Buttons ? '' : 'hidden'}`}>
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}
