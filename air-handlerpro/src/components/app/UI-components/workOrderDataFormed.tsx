// app/page.tsx or any component

import WorkOrderCard from "./workOrderData";

function LoadingSkeleton({ viewMode }: { viewMode: "list" | "grid" }) {
  return (
    <div className={viewMode === "grid" ? "flex gap-3 flex-wrap" : "space-y-4"}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={
            viewMode === "grid"
              ? "w-full max-w-sm h-80 bg-gray-200 animate-pulse rounded-xl"
              : "w-full h-32 bg-gray-200 animate-pulse rounded-lg"
          }
        />
      ))}
    </div>
  );
}


interface WorkOrderDataFormedProps {
  loading?: boolean;
  error?: string | null;
  workOrders?: any[];
  handleDeleteWorkOrder?: (workOrderId: string, workOrderNumber: string) => void;
  onEditWorkOrder?: (workOrderId: string) => void;
  onViewDetails?: (workOrderId: string) => void;
  viewMode?: "list" | "grid";
}

export default function WorkOrderDataFormed({
  loading,
  error,
  workOrders,
  handleDeleteWorkOrder,
  onEditWorkOrder,
  onViewDetails,
  viewMode = "grid",
}: WorkOrderDataFormedProps) {
  return (
    <div>
      {loading && <LoadingSkeleton viewMode={viewMode} />}

      {error && (
        <div className="text-center py-12">
          <p className="text-gray-500">{error}</p>
        </div>
      )}

      {!loading && !error && workOrders?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No work orders found.</p>
        </div>
      )}

      {!loading && !error && workOrders && workOrders.length > 0 && (
        <div
          className={viewMode === "grid" ? "flex gap-3 flex-wrap" : "space-y-4"}
        >
          {workOrders.map((workOrder) => (
            <WorkOrderCard     
              key={workOrder.id}
              workOrderData={workOrder}
              viewMode={viewMode}
              onEdit={() => onEditWorkOrder?.(workOrder.id)}
              onViewDetails={() => onViewDetails?.(workOrder.id)}
              onDelete={() =>
                handleDeleteWorkOrder?.(
                  workOrder.id,
                  `${workOrder.workOrderNumber}`
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
