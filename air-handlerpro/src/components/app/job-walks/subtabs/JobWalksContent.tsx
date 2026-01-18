// pages/users.tsx
import Button from "@/components/app/UI-components/button";
import DataTable, {
  Column,
} from "../../../admin/admin-administration/UI-components/table";

interface Update {
  id: string;
  timestamp: string;
  content: string;
}

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
}

export interface JobWalk {
  id: number;
  date_of_walk: string;
  job_name: string;
  task_type: string;
  created_by: string;
  next_step: string;
  photos: number;
  tech: string;
  notes: string;
  updates: Update[];
  tasks: Task[];
}

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

interface JobWalksContentProps {
  jobWalks: any[];
  onClick: () => void;
  onViewDetails?: (jobWalkId: number) => void;
  loading: boolean;
  error: string | null;
  viewMode?: "list" | "grid";
}

export function JobWalksContent({
  jobWalks,
  onClick,
  onViewDetails,
  loading,
  error,
  viewMode = "list",
}: JobWalksContentProps) {


  const materialColumns: Column<JobWalk>[] = [
    {
      top: true,
      key: "date_of_walk",
      header: "Date",
      span: 1,
      render: (material) => (
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-charcoal">
            {material.date_of_walk}
          </p>
        </div>
      ),
    },
    {
      key: "job_name",
      header: "Job Name",
      span: 2,
      render: (material) => (
        <p className="text-sm text-charcoal w-fit p-1 px-2">
          {material.job_name}
        </p>
      ),
    },
    {
      key: "task_type",
      header: "Type",
      span: 1,
      render: (material) => (
        <p className="text-sm text-slate">{material.task_type}</p>
      ),
    },
    {
      key: "created_by",
      header: "User",
      span: 1,
      render: (material) => (
        <span className="text-xs text-black ml-3 p-1 rounded-2xl bg-charcoal/10">
          {material.created_by || "-"}
        </span>
      ),
    },
    {
      key: "next_step",
      header: "Next Step",
      span: 1,
      render: (material) => (
        <span className="text-xs bg-cerulean text-white rounded-2xl p-1.5 px-3 whitespace-nowrap inline-block">
          {material.next_step || "-"}
        </span>
      ),
    },
    {
      key: "photos_count",
      header: "Photos",
      span: 1,
      align: "right",
      render: (material) => (
        <button className="text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors">
          <span>{material.photos || "-"}</span>
        </button>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      span: 1,
      align: "right",
      render: (material) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.(material.id);
          }}
          className="p-2 text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors cursor-pointer"
        >
          View
        </button>
      ),
    },
  ];

  const handleRowClick = (material: JobWalk) => {
    onViewDetails?.(material.id);
  };

  return (
    <div>
      {loading && <LoadingSkeleton viewMode={viewMode} />}

      {error && (
        <div className="text-center py-12">
          <p className="text-gray-500">{error}</p>
        </div>
      )}

      {!loading && !error && jobWalks?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No job walks found.</p>
        </div>
      )}

      {!loading && !error && jobWalks && jobWalks.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search job name, tech, type..."
                className="w-full pl-10 pr-4 py-2 border border-silver rounded-lg text-sm text-charcoal placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors"
              />
            </div>

            <button className="flex text-charcoal items-center gap-2 px-4 py-2 border border-silver rounded-lg hover:bg-platinum hover:border-cerulean transition-colors text-sm font-medium">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>

            <Button onClick={onClick} value="New Job Walk" />
          </div>

          <DataTable
            columns={materialColumns}
            data={jobWalks}
            onRowClick={handleRowClick}
            emptyMessage="No job walks found"
          />
        </>
      )}
    </div>
  );
}
