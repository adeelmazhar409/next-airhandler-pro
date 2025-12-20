// components/app/UI-components/DataTable.tsx
import React from "react";

export interface Column<T> {
  top?: boolean;
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  minWidth?: string;
  span?: number; // Number of "column units" to span (default is 1)
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

  // Calculate total span units
  const totalSpan = columns.reduce((sum, col) => sum + (col.span || 1), 0);



  return (
    <div className="bg-white border border-silver rounded-lg overflow-hidden">
      {/* Wrapper with horizontal scroll */}
      <div className="overflow-x-auto max-[1000px]:block">
        <div className="min-w-[700px]">
         <div className={` ${columns[0]?.top ? "" : "hidden"}  p-4 text-charcoal border-b border-silver font-semibold text-lg`}>
              Recent Job Walks
         </div>
         
          {/* Table Header */}
          <div className="bg-platinum/30 border-b border-silver">
            <div className="flex w-full">
              {columns.map((column, index) => {
                const columnWidth = `${((column.span || 1) / totalSpan) * 100}%`;
                return (
                  <div
                    key={`${column.key}-${index}`}
                    style={{ width: columnWidth }}
                    className={`px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider ${column.minWidth || ""} ${getAlignmentClass(column.align)}`}
                  >
                    {column.header}
                  </div>
                );
              })}
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
                    const columnWidth = `${((column.span || 1) / totalSpan) * 100}%`;
                    return (
                      <div
                        key={`${column.key}-${index}`}
                        style={{ width: columnWidth }}
                        className={`px-6 py-4 ${column.minWidth || ""} ${getAlignmentClass(column.align)}`}
                      >
                        {column.render
                          ? column.render(item)
                          : (item[column.key as keyof T] as React.ReactNode)}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}