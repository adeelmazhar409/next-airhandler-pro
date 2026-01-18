// components/app/UI-components/DataTable.tsx
import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

export interface Column<T> {
  top?: boolean;
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  minWidth?: string;
  span?: number; // Number of "column units" to span (default is 1)
}

export interface ActionOption<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  className?: string; // Optional custom styling for specific actions (e.g., danger actions)
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  actions?: ActionOption<T>[]; // Optional actions dropdown
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data available",
  actions,
}: DataTableProps<T>) {
  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  // Calculate total span units
  const totalSpan = columns.reduce((sum, col) => sum + (col.span || 1), 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  const toggleDropdown = (itemId: string | number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click event
    setOpenDropdownId(openDropdownId === itemId ? null : itemId);
  };

  const handleActionClick = (
    action: ActionOption<T>,
    item: T,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // Prevent row click event
    action.onClick(item);
    setOpenDropdownId(null); // Close dropdown after action
  };

  return (
    <div className="bg-white border border-silver rounded-lg overflow-hidden">
      {/* Wrapper with horizontal scroll */}
      <div className="overflow-x-auto max-[1000px]:block">
        <div className="min-w-[700px]">
          <div
            className={`${
              columns[0]?.top ? "" : "hidden"
            } p-4 text-charcoal border-b border-silver font-semibold text-lg`}
          >
            Recent Job Walks
          </div>

          {/* Table Header */}
          <div className="bg-platinum/30 border-b border-silver">
            <div className="flex w-full">
              {columns.map((column, index) => {
                const columnWidth = `${
                  ((column.span || 1) / totalSpan) * 100
                }%`;
                return (
                  <div
                    key={`${column.key}-${index}`}
                    style={{ width: columnWidth }}
                    className={`px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider ${
                      column.minWidth || ""
                    } ${getAlignmentClass(column.align)}`}
                  >
                    {column.header}
                  </div>
                );
              })}
              {/* Add Actions header if actions are provided */}
              {actions && actions.length > 0 && (
                <div className="px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider text-right w-20">
                  Actions
                </div>
              )}
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-silver">
            {data.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate">
                {emptyMessage}
              </div>
            ) : (
              data.map((item) => (
                <div
                  key={item.id}
                  className={`flex w-full hover:bg-platinum/20 transition-colors items-center ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column, index) => {
                    const columnWidth = `${
                      ((column.span || 1) / totalSpan) * 100
                    }%`;
                    return (
                      <div
                        key={`${column.key}-${index}`}
                        style={{ width: columnWidth }}
                        className={`px-6 py-4 ${
                          column.minWidth || ""
                        } ${getAlignmentClass(column.align)}`}
                      >
                        {/* {console.log(
                          item,
                          column.key,
                          item[column.key as keyof T],
                          "item[column.key as keyof T]"
                        )} */}
                        {column.render
                          ? column.render(item)
                          : (item[column.key as keyof T] as React.ReactNode)}
                      </div>
                    );
                  })}

                  {/* Actions Dropdown */}
                  {actions && actions.length > 0 && (
                    <div
                      className="px-6 py-4 w-20 text-right relative"
                      ref={dropdownRef}
                    >
                      <button
                        onClick={(e) => toggleDropdown(item.id, e)}
                        className="p-2 text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdownId === item.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-silver rounded-lg shadow-lg z-10 overflow-hidden">
                          {actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={(e) =>
                                handleActionClick(action, item, e)
                              }
                              className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-platinum transition-colors ${
                                action.className || "text-charcoal"
                              }`}
                            >
                              {action.icon && (
                                <span className="w-4 h-4">{action.icon}</span>
                              )}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
