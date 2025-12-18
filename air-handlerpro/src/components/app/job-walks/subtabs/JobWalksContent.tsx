import Button from "../../UI-components/button";

export function JobWalksContent({ onClick }: { onClick: () => void }) {
  const jobWalks = [
    {
      id: 1,
      date: "2024-12-10",
      jobName: "HVAC System Inspection - Building A",
      type: "Inspection",
      user: "John Smith",
      nextStep: "Create Estimate",
      photos: 12,
    },
    {
      id: 2,
      date: "2024-12-09",
      jobName: "Compressor Replacement - Retail Store",
      type: "Repair",
      user: "Sarah Johnson",
      nextStep: "Schedule Work",
      photos: 8,
    },
    {
      id: 3,
      date: "2024-12-08",
      jobName: "Preventive Maintenance - Office Complex",
      type: "Maintenance",
      user: "Mike Davis",
      nextStep: "Pending Review",
      photos: 15,
    },
    {
      id: 4,
      date: "2024-12-07",
      jobName: "Refrigeration Unit Check - Restaurant",
      type: "Inspection",
      user: "Emily Brown",
      nextStep: "Generate Report",
      photos: 6,
    },
    {
      id: 5,
      date: "2024-12-06",
      jobName: "AC Installation Assessment - New Construction",
      type: "Assessment",
      user: "John Smith",
      nextStep: "Create Estimate",
      photos: 20,
    },
  ];

  return (
    <>
      {/* Search and Action Bar */}
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

      {/* Recent Job Walks Table */}
      <div className="bg-white border border-silver rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-silver">
          <h2 className="text-base font-semibold text-charcoal">
            Recent Job Walks
          </h2>
        </div>

        {/* Table Header */}
        <div className="bg-platinum/30 border-b border-silver">
          <div className="grid grid-cols-12 gap-3 px-6 py-3">
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              Date
            </div>
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              Job Name
            </div>
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              Type
            </div>
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              User
            </div>
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              Next Step
            </div>
            <div className=" text-xs font-medium text-slate uppercase tracking-wider">
              Photos
            </div>
            <div className="col-span-1 text-xs font-medium text-slate uppercase tracking-wider text-right">
              Actions
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-silver">
          {jobWalks.map((job) => (
            <div
              key={job.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-platinum/20 transition-colors"
            >
              <div className="col-span-2 text-sm text-charcoal">{job.date}</div>
              <div className="col-span-2 text-sm font-medium text-charcoal">
                {job.jobName}
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cerulean/20 text-cerulean">
                  {job.type}
                </span>
              </div>
              <div className="col-span-2 text-sm text-slate">{job.user}</div>
              <div className="col-span-2 text-sm text-slate">
                {job.nextStep}
              </div>
              <div className=" text-sm text-slate">{job.photos}</div>
              <div className="col-span-1 flex items-center justify-end gap-2">
                <button className="text-slate hover:text-cerulean transition-colors">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <button className="text-slate hover:text-cerulean transition-colors">
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
