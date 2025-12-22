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
  date: string;
  jobName: string;
  type: string;
  user: string;
  nextStep: string;
  photos: number;
  tech: string;
  notes: string;
  updates: Update[];
  tasks: Task[];
}

interface JobWalksContentProps {
  onClick: () => void;
  onViewDetails?: (jobWalkId: number) => void;
}

export function JobWalksContent({
  onClick,
  onViewDetails,
}: JobWalksContentProps) {
  const jobWalks: JobWalk[] = [
    {
      id: 1,
      date: "11/11/2025",
      jobName: "Evaporated Meeting Notes",
      type: "Other",
      user: "John Smith",
      nextStep: "perfection",
      photos: 12,
      tech: "hjhjh",
      notes: `Can have multiple room temps on one versa split. Heat reclaim option, 180,000but per unit.

Contacts in evap panel, Evap panel dry contact NH3 output. Can tie in horn/strobe into evap panel dry contacts.

Need SMTP access for email communication from front end.

SCADA panel is in maintenance office

Sun Orchard - Dawnell L, IT. Get VPN or VNC access.

SCADA training during start-up.`,
      updates: [
        {
          id: "u1",
          timestamp: "12/22/2025, 1:25:28 PM",
          content: "qsqsdsd",
        },
        {
          id: "u2",
          timestamp: "11/11/2025, 11:30:20 PM",
          content: "FAT32 format on SD card",
        },
      ],
      tasks: [],
    },
    {
      id: 2,
      date: "2024-12-09",
      jobName: "Compressor Replacement - Retail Store",
      type: "Repair",
      user: "Sarah Johnson",
      nextStep: "Schedule Work",
      photos: 8,
      tech: "Sarah Johnson",
      notes:
        "Customer reported compressor failure. Inspection confirmed need for replacement. Customer approved quote for new Copeland compressor unit. Parts ordered, estimated arrival 12/15.",
      updates: [
        {
          id: "u3",
          timestamp: "12/09/2025, 2:15 PM",
          content: "Parts order placed with distributor",
        },
        {
          id: "u4",
          timestamp: "12/09/2025, 10:30 AM",
          content: "Customer approved quote for compressor replacement",
        },
      ],
      tasks: [
        {
          id: "t1",
          title: "Schedule installation with customer",
          assignedTo: "Sarah Johnson",
          dueDate: "12/16/2025",
          status: "pending",
        },
        {
          id: "t2",
          title: "Arrange equipment rental for installation",
          assignedTo: "Mike Davis",
          dueDate: "12/15/2025",
          status: "in-progress",
        },
      ],
    },
    {
      id: 3,
      date: "2024-12-08",
      jobName: "Preventive Maintenance - Office Complex",
      type: "Maintenance",
      user: "Mike Davis",
      nextStep: "Pending Review",
      photos: 15,
      tech: "Mike Davis",
      notes:
        "Annual preventive maintenance walkthrough of all HVAC units. Inspected 12 RTUs, 3 chillers, and air handling units. All equipment operating within normal parameters. Noted minor filter replacements needed on Units 4, 7, and 9.",
      updates: [
        {
          id: "u5",
          timestamp: "12/08/2025, 4:45 PM",
          content:
            "Completed inspection of all units. Filter replacement quote sent to property manager.",
        },
      ],
      tasks: [
        {
          id: "t3",
          title: "Order replacement filters",
          assignedTo: "Emily Brown",
          dueDate: "12/12/2025",
          status: "completed",
        },
      ],
    },
    {
      id: 4,
      date: "2024-12-07",
      jobName: "Refrigeration Unit Check - Restaurant",
      type: "Inspection",
      user: "Emily Brown",
      nextStep: "Generate Report",
      photos: 6,
      tech: "Emily Brown",
      notes:
        "Walk-in cooler temperature readings inconsistent. Checked refrigerant levels, condenser coils, and door seals. Found faulty temperature sensor and dirty condenser coils. Recommended cleaning and sensor replacement.",
      updates: [
        {
          id: "u6",
          timestamp: "12/07/2025, 3:20 PM",
          content: "Temperature sensor ordered, ETA 2-3 business days",
        },
        {
          id: "u7",
          timestamp: "12/07/2025, 11:00 AM",
          content: "Initial inspection completed, issues identified",
        },
      ],
      tasks: [
        {
          id: "t4",
          title: "Schedule follow-up repair appointment",
          assignedTo: "Emily Brown",
          dueDate: "12/11/2025",
          status: "pending",
        },
      ],
    },
    {
      id: 5,
      date: "2024-12-06",
      jobName: "AC Installation Assessment - New Construction",
      type: "Assessment",
      user: "John Smith",
      nextStep: "Create Estimate",
      photos: 20,
      tech: "John Smith",
      notes:
        "Site visit for new commercial building HVAC installation. Building is 25,000 sq ft with mixed-use spaces (office and retail). Assessed electrical infrastructure, ductwork requirements, and equipment placement. Discussed zoning options with building manager.",
      updates: [
        {
          id: "u8",
          timestamp: "12/06/2025, 5:00 PM",
          content:
            "Met with architect and building manager. Reviewed mechanical room specs and confirmed load calculations.",
        },
        {
          id: "u9",
          timestamp: "12/06/2025, 1:30 PM",
          content: "Site measurements and photos completed",
        },
      ],
      tasks: [
        {
          id: "t5",
          title: "Prepare detailed equipment quote",
          assignedTo: "John Smith",
          dueDate: "12/13/2025",
          status: "in-progress",
        },
        {
          id: "t6",
          title: "Draft installation proposal",
          assignedTo: "John Smith",
          dueDate: "12/15/2025",
          status: "pending",
        },
        {
          id: "t7",
          title: "Schedule follow-up meeting with stakeholders",
          assignedTo: "Sarah Johnson",
          dueDate: "12/18/2025",
          status: "pending",
        },
      ],
    },
  ];

  const materialColumns: Column<JobWalk>[] = [
    {
      top: true,
      key: "date",
      header: "Date",
      span: 1,
      render: (material) => (
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-charcoal">{material.date}</p>
        </div>
      ),
    },
    {
      key: "jobName",
      header: "Job Name",
      span: 2,
      render: (material) => (
        <p className="text-sm text-charcoal w-fit p-1 px-2">
          {material.jobName}
        </p>
      ),
    },
    {
      key: "type",
      header: "Type",
      span: 1,
      render: (material) => (
        <p className="text-sm text-slate">{material.type}</p>
      ),
    },
    {
      key: "user",
      header: "User",
      span: 1,
      render: (material) => (
        <span className="text-xs text-black ml-3 p-1 rounded-2xl bg-charcoal/10">
          {material.user || "-"}
        </span>
      ),
    },
    {
      key: "nextStep",
      header: "Next Step",
      span: 1,
      render: (material) => (
        <span className="text-xs bg-cerulean text-white rounded-2xl p-1.5 px-3 whitespace-nowrap inline-block">
          {material.nextStep || "-"}
        </span>
      ),
    },
    {
      key: "photos",
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
            if (onViewDetails) {
              onViewDetails(material.id);
            }
          }}
          className="p-2 text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors"
        >
          View
        </button>
      ),
    },
  ];

  const handleRowClick = (material: JobWalk) => {
    if (onViewDetails) {
      onViewDetails(material.id);
    }
  };

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
      <DataTable
        columns={materialColumns}
        data={jobWalks}
        onRowClick={handleRowClick}
        emptyMessage="No job walks found"
      />
    </>
  );
}

// Export jobWalks data for use in parent component
export const jobWalksData: JobWalk[] = [
  {
    id: 1,
    date: "11/11/2025",
    jobName: "Evaporated Meeting Notes",
    type: "Other",
    user: "John Smith",
    nextStep: "—",
    photos: 12,
    tech: "—",
    notes: `Can have multiple room temps on one versa split. Heat reclaim option, 180,000but per unit.

Contacts in evap panel, Evap panel dry contact NH3 output. Can tie in horn/strobe into evap panel dry contacts.

Need SMTP access for email communication from front end.

SCADA panel is in maintenance office

Sun Orchard - Dawnell L, IT. Get VPN or VNC access.

SCADA training during start-up.`,
    updates: [
      {
        id: "u1",
        timestamp: "12/22/2025, 1:25:28 PM",
        content: "qsqsdsd",
      },
      {
        id: "u2",
        timestamp: "11/11/2025, 11:30:20 PM",
        content: "FAT32 format on SD card",
      },
    ],
    tasks: [],
  },
  {
    id: 2,
    date: "2024-12-09",
    jobName: "Compressor Replacement - Retail Store",
    type: "Repair",
    user: "Sarah Johnson",
    nextStep: "Schedule Work",
    photos: 8,
    tech: "Sarah Johnson",
    notes:
      "Customer reported compressor failure. Inspection confirmed need for replacement. Customer approved quote for new Copeland compressor unit. Parts ordered, estimated arrival 12/15.",
    updates: [
      {
        id: "u3",
        timestamp: "12/09/2025, 2:15 PM",
        content: "Parts order placed with distributor",
      },
      {
        id: "u4",
        timestamp: "12/09/2025, 10:30 AM",
        content: "Customer approved quote for compressor replacement",
      },
    ],
    tasks: [
      {
        id: "t1",
        title: "Schedule installation with customer",
        assignedTo: "Sarah Johnson",
        dueDate: "12/16/2025",
        status: "pending",
      },
      {
        id: "t2",
        title: "Arrange equipment rental for installation",
        assignedTo: "Mike Davis",
        dueDate: "12/15/2025",
        status: "in-progress",
      },
    ],
  },
  {
    id: 3,
    date: "2024-12-08",
    jobName: "Preventive Maintenance - Office Complex",
    type: "Maintenance",
    user: "Mike Davis",
    nextStep: "Pending Review",
    photos: 15,
    tech: "Mike Davis",
    notes:
      "Annual preventive maintenance walkthrough of all HVAC units. Inspected 12 RTUs, 3 chillers, and air handling units. All equipment operating within normal parameters. Noted minor filter replacements needed on Units 4, 7, and 9.",
    updates: [
      {
        id: "u5",
        timestamp: "12/08/2025, 4:45 PM",
        content:
          "Completed inspection of all units. Filter replacement quote sent to property manager.",
      },
    ],
    tasks: [
      {
        id: "t3",
        title: "Order replacement filters",
        assignedTo: "Emily Brown",
        dueDate: "12/12/2025",
        status: "completed",
      },
    ],
  },
  {
    id: 4,
    date: "2024-12-07",
    jobName: "Refrigeration Unit Check - Restaurant",
    type: "Inspection",
    user: "Emily Brown",
    nextStep: "Generate Report",
    photos: 6,
    tech: "Emily Brown",
    notes:
      "Walk-in cooler temperature readings inconsistent. Checked refrigerant levels, condenser coils, and door seals. Found faulty temperature sensor and dirty condenser coils. Recommended cleaning and sensor replacement.",
    updates: [
      {
        id: "u6",
        timestamp: "12/07/2025, 3:20 PM",
        content: "Temperature sensor ordered, ETA 2-3 business days",
      },
      {
        id: "u7",
        timestamp: "12/07/2025, 11:00 AM",
        content: "Initial inspection completed, issues identified",
      },
    ],
    tasks: [
      {
        id: "t4",
        title: "Schedule follow-up repair appointment",
        assignedTo: "Emily Brown",
        dueDate: "12/11/2025",
        status: "pending",
      },
    ],
  },
  {
    id: 5,
    date: "2024-12-06",
    jobName: "AC Installation Assessment - New Construction",
    type: "Assessment",
    user: "John Smith",
    nextStep: "Create Estimate",
    photos: 20,
    tech: "John Smith",
    notes:
      "Site visit for new commercial building HVAC installation. Building is 25,000 sq ft with mixed-use spaces (office and retail). Assessed electrical infrastructure, ductwork requirements, and equipment placement. Discussed zoning options with building manager.",
    updates: [
      {
        id: "u8",
        timestamp: "12/06/2025, 5:00 PM",
        content:
          "Met with architect and building manager. Reviewed mechanical room specs and confirmed load calculations.",
      },
      {
        id: "u9",
        timestamp: "12/06/2025, 1:30 PM",
        content: "Site measurements and photos completed",
      },
    ],
    tasks: [
      {
        id: "t5",
        title: "Prepare detailed equipment quote",
        assignedTo: "John Smith",
        dueDate: "12/13/2025",
        status: "in-progress",
      },
      {
        id: "t6",
        title: "Draft installation proposal",
        assignedTo: "John Smith",
        dueDate: "12/15/2025",
        status: "pending",
      },
      {
        id: "t7",
        title: "Schedule follow-up meeting with stakeholders",
        assignedTo: "Sarah Johnson",
        dueDate: "12/18/2025",
        status: "pending",
      },
    ],
  },
];
