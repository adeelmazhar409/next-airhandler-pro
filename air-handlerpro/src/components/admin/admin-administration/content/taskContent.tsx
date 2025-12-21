// pages/users.tsx
import Button from "@/components/app/UI-components/button";
import DataTable, { Column } from "../UI-components/table";
import { Users as UsersIcon, Edit } from "lucide-react";

import SearchAndFilters from "@/components/app/UI-components/SearchAndFilter";
import { InputField } from "@/components/interface/DataTypes";
import { useState } from "react";


interface Task { 
  equipmentType: string;
  description: string;
  hours: string;
  laborType: string;
  frequency: string;
  size: string;
  bundle: string;
  advanced: string;
  heating: string;
  status: string;
  id: number;
}
export default function Tasks() {
  const tasks: Task[] = [
    {
      id: 1,
      equipmentType: "Air Compressor",
      description: "AIRC 5 Setup",
      hours: "0.05",
      laborType: "ST",
      frequency: "Annual",
      size: "5 hp",
      bundle: "S",
      advanced: "No",
      heating: "No",
      status: "Active",
    },
    {
      id: 2,
      equipmentType: "Air Compressor",
      description: "AIRC 5 Take Down",
      hours: "0.05",
      laborType: "ST",
      frequency: "Annual",
      size: "5 hp",
      bundle: "S",
      advanced: "No",
      heating: "No",
      status: "Active",
    },
    {
      id: 3,
      equipmentType: "Air Compressor",
      description: "AIRC 5 Operational Service",
      hours: "0.3",
      laborType: "ST",
      frequency: "Annual",
      size: "5 hp",
      bundle: "O",
      advanced: "No",
      heating: "No",
      status: "Active",
    },
    {
      id: 4,
      equipmentType: "Air Compressor",
      description: "AIRC 5 Annual Service",
      hours: "0.6833",
      laborType: "ST",
      frequency: "Annual",
      size: "5 hp",
      bundle: "A",
      advanced: "No",
      heating: "No",
      status: "Active",
    },
    {
      id: 5,
      equipmentType: "Air Compressor",
      description: "AIRC 5 Belt Service",
      hours: "0.0667",
      laborType: "ST",
      frequency: "Annual",
      size: "5 hp",
      bundle: "B",
      advanced: "No",
      heating: "No",
      status: "Active",
    },
  ];






    const taskColumns: Column<Task>[] = [
      {
        key: "equipmentType",
        header: "Equipment Type",
        span: 2, // Takes 2 units of space
        render: (task) => (
          <p className="text-sm font-medium text-charcoal">{task.equipmentType}</p>
        ),
      },
      {
        key: "description",
        header: "Description",
        span: 2, // Takes 2 units of space
        render: (task) => <p className="text-sm text-slate">{task.description}</p>,
      },
      {
        key: "hours",
        header: "Hours",
        span: 1, // Takes 1 unit of space
        render: (task) => <p className="text-sm text-slate">{task.hours}</p>,
      },
      {
        key: "laborType",
        header: "Labor Type",
        span: 1, // Takes 2 units of space
        render: (task) => (
          <span className="text-sm text-charcoal ml-3  p-1 rounded-2xl border border-charcoal/20">
            {task.laborType || "-"}
          </span>
        ),
      },
      {
        key: "frequency",
        header: "Frequency",
        span: 1, // Takes 1 unit of space
        render: (task) => (
          <span className="text-xs  bg-slate/10 rounded-2xl p-1.5 text-black">{task.frequency || "-"}</span>
        ),
      },
      {
        key: "size",
        header: "Size",
        span: 1, // Takes 1 unit of space
        align: "right",
        render: (task) => (
          <button className=" text-slate  hover:text-cerulean hover:bg-platinum rounded transition-colors">
            <span>{task.size || "-"}</span>
          </button>
        ),
      },

      {
        key: "bundle",
        header: "Bundle",
        span: 1, // Takes 1 unit of space
        align: "right",
        render: (task) => (
          <button className="p-1 text-white bg-black px-3  text-xs rounded-3xl transition-colors">
         <span>{task.bundle || "-"}</span>
          </button>
        ),
      },
      
      {
        key: "advanced ",
        header: "Advanced",
        span: 1, // Takes 1 unit of space
        align: "right",
        render: (task) => (
        <button className="p-1 text-black bg-slate/20 px-3 mr-2  text-xs rounded-3xl transition-colors">
         <span>{task.advanced || "-"}</span>
          </button>
        ),
      },
       {
        key: "heating",
        header: "Heating",
        span: 1, // Takes 1 unit of space
        align: "right",
        render: (task) => (
           <button className="p-1 text-black bg-slate/20 px-3 mr-2  text-xs rounded-3xl transition-colors">
         <span>{task.heating || "-"}</span>
          </button>
        ),
      },
       {
        key: "status",
        header: "Status",
        span: 1, // Takes 1 unit of space
        align: "right",
        render: (task) => (
            <button className="p-1 text-white bg-black px-3  text-xs rounded-3xl transition-colors">
         <span>{task.status || "-"}</span>
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
          <Edit className="w-4 h-4" />
        </button>
      ),
    },
    ];

    const handleRowClick = (task: Task) => {
      console.log("Clicked task:", task);
    };
  
  const [searchValue, setSearchValue] = useState("");
    const [selectedType, setSelectedType] = useState("");
  
const inputFields: InputField[] = [
  {
    type: "search",
    placeholder: "Search Task ...",
    disable: false,
    show: true,
    onChange: (value) => console.log("Search:", value),
  },
  {
    type: "dropdownButton",
    name: "All Eqipment Types",
    options: ["Type 1", "Type 2", "Type 3", "Type 4"],
    disable: false,
    show: true,
    onChange: (value) => setSelectedType(value),
  },
  {
    type: "dropdownbutton2",
    name: "All Frequencies",
    options: ["Type 1", "Type 2", "Type 3", "Type 4"],
    disable: false,
    show: true,
    onChange: (value) => setSelectedType(value),
  },
  {
    type: "Checkbox",
    name: "Show Inactive", // Add this
    disable: false, // Add this
    show: true, // Add this
    onChange: (value) => console.log("Checkbox:", value), // Add this
  },
];
  return (



     <div className="p-8 border border-slate/30 rounded-lg">
          <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
              
              Task Library Management
            </h1>
            <p className="text-charcoal text-sm m-2">Manage HVAC maintenance tasks with frequencies and equipment details</p>
            </div>
          
          </div>

           <div className=" flex justify-between">
        <SearchAndFilters
          fields={inputFields}
          searchValue={searchValue}
          onSearchChange={setSearchValue}

        />
        <Button value="Add new Task"/>
      </div>
    
          <DataTable
            columns={taskColumns}
            data={tasks}
            onRowClick={handleRowClick}
            emptyMessage="No tasks found"
          />
        </div>
    
  );
}
