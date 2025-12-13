import React from "react";
import {
  DropdownIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  SearchIcon,
  SortIcon,
} from "@/components/icons/icons";
import { InputField } from "@/components/interface/DataTypes";

interface SearchAndFiltersProps {
  fields: InputField[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function SearchAndFilters({
  fields,
  searchValue = "",
  onSearchChange,
}: SearchAndFiltersProps) {
  const renderField = (field: InputField, index: number) => {
    // Don't render if show is false
    if (field.show === false) return null;

    switch (field.type) {
      case "search":
        return (
          <div key={index} className="flex-1 relative">
            <SearchIcon />
            <input
              type="text"
              placeholder={field.placeholder || "Search..."}
              value={searchValue}
              onChange={(e) => {
                onSearchChange?.(e.target.value);
                field.onChange?.(e.target.value);
              }}
              disabled={field.disable}
              className="w-full pl-12 pr-4 py-2 border border-black text-[15px] text-black focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        );

      case "dropdownButton":
        return (
          <div key={index} className="relative">
            <select
              disabled={field.disable}
              onChange={(e) => field.onChange?.(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-black text-[15px] text-gray-700 font-medium hover:cursor-pointer bg-white min-w-[140px] disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">{field.name || "Select"}</option>
              {field.options?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <DropdownIcon />
            </div>
          </div>
        );

      case "filterButton":
        return (
          <button
            key={index}
            onClick={field.onClick}
            disabled={field.disable}
            className="flex items-center gap-2 px-4 py-2 text-black border border-black text-[15px] font-medium hover:cursor-pointer hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <FilterIcon />
            {field.name || "Filter"}
          </button>
        );

      case "sortButton":
        return (
          <button
            key={index}
            onClick={field.onClick}
            disabled={field.disable}
            className="flex items-center gap-2 px-4 py-2 border border-black text-[15px] font-medium text-black hover:cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <SortIcon />
            {field.name || "Sort"}
          </button>
        );

      case "gridButton":
        return (
          <button
            key={index}
            onClick={field.onClick}
            disabled={field.disable}
            className="p-3 border border-black hover:bg-gray-50 hover:cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
            aria-label="Grid view"
          >
           <GridIcon />
          </button>
        );

      case "listButton":
        return (
          <button
            key={index}
            onClick={field.onClick}
            disabled={field.disable}
            className="p-3 border border-black hover:bg-gray-50 hover:cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
            aria-label="List view"
          >
            <ListIcon />
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      {fields.map((field, index) => renderField(field, index))}
    </div>
  );
}
