// components/app/UI-components/DataTable.tsx
import React from "react";

export interface Company {
  id: number;
  name: string;
  domain: string;
  users: number;
  customers: number;
  estimates: number;
  status: string;
  created: string;
}

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  minWidth?: string; // Optional minimum width like "min-w-[100px]"
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
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

  // Calculate equal width for all columns
  const columnWidth = `${100 / columns.length}%`;

  return (
    <div className="bg-white border border-silver rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-platinum/30 border-b border-silver">
        <div className="flex w-full">
          {columns.map((column, index) => (
            <div
              key={`${column.key}-${index}`}
              style={{ width: columnWidth }}
              className={`px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider ${column.minWidth || ""} ${getAlignmentClass(column.align)}`}
            >
              {column.header}
            </div>
          ))}
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
              {columns.map((column, index) => (
                <div
                  key={`${column.key}-${index}`}
                  style={{ width: columnWidth }}
                  className={`px-6 py-4 ${column.minWidth || ""} ${getAlignmentClass(column.align)}`}
                >
                  {column.render
                    ? column.render(item)
                    : (item[column.key as keyof T] as React.ReactNode)}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}