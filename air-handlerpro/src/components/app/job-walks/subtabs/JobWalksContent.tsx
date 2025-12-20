// pages/users.tsx
import Button from "@/components/app/UI-components/button";
import DataTable, { Column } from "../../../admin/company-administration/UI-components/table";
import { Users as UsersIcon, Edit, Edit2, Star } from "lucide-react";
export function  JobWalksContent({ onClick }: { onClick: () => void }) {

  interface Material {

  id: number;
  date: string;
  jobName: string;
  type: string;
  user: string;
  nextStep: string;
  photos: number;
}
  const jobWalks: Material[] = [
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


  
       const materialColumns: Column<Material>[] = [
         {
          top: true,
           key: "date",
           header: "Date",
           span: 1, // Takes 2 units of space
           render: (material) => (
           <div className="flex items-center gap-2">
          
             <p className="text-sm font-medium text-charcoal">{material.date}</p>
           </div>
           ),
         },
         {
           key: "jobName",
           header: "Job Name",
           span: 2, // Takes 2 units of space
           render: (material) => <p className="text-sm text-charcoal w-fit p-1 px-2">{material.jobName}</p>,
         },
         {
           key: "type",
           header: "Type",
           span: 1, // Takes 1 unit of space
           render: (material) => <p className="text-sm text-slate">{material.type}</p>,
         },
         {
           key: "user",
           header: "User",
           span: 1, // Takes 2 units of space
           render: (material) => (
             <span className="text-xs text-black ml-3  p-1 rounded-2xl  bg-charcoal/10">
               {material.user || "-"}
             </span>
           ),
         },
         {
           key: "nextStep",
           header: "Next Step",
           span: 1, // Takes 1 unit of space
           render: (material) => (
             <span className="text-xs  bg-cerulean text-white rounded-2xl p-1.5 text-black">{material.nextStep || "-"}</span>
           ),
         },
         {
           key: "photos",
           header: "Photos",
           span: 1, // Takes 1 unit of space
           align: "right",
           render: (material) => (
             <button className=" text-slate  hover:text-cerulean hover:bg-platinum rounded transition-colors">
               <span>{material.photos || "-"}</span>
             </button>
           ),
         },
   
   
       
          {
         key: "actions",
         header: "Actions",
         span: 1, // Takes 1 unit of space
         align: "right",
         render: () => (
           <button className="p-2 text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors">
             View
           </button>
         ),
       },
       ];

           const handleRowClick = (material: Material) => {
      console.log("Clicked material:", material);
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
    

        {/* Table Header */}
      
                       <DataTable
                         columns={materialColumns}
                         data={jobWalks}
                         onRowClick={handleRowClick}
                         emptyMessage="No materials found"
                       />
 
    </>
  );
}
