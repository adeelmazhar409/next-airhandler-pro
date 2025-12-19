import Button from "@/components/app/UI-components/button";
import SearchAndFilters from "@/components/app/UI-components/SearchAndFilter";
import { InputField } from "@/components/interface/DataTypes";
import { useState } from "react";
export default function Tasks() {
  const tasks = [
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">
          Task Library Management
        </h1>
        <p className="text-sm text-slate">
          Manage HVAC maintenance tasks with frequencies and equipment details
        </p>
      </div>

      {/* Filters and Actions */}
      <div className=" flex justify-between">
        <SearchAndFilters
          fields={inputFields}
          searchValue={searchValue}
          onSearchChange={setSearchValue}

        />
        <Button value="Add new Task"/>
      </div>
      {/* Task Table */}
      <div className="bg-white border border-silver rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-platinum/30 border-b border-silver">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider">
            <div className="col-span-1">Equipment Type</div>
            <div className="col-span-2">Task Description</div>
            <div className="col-span-1">Hours</div>
            <div className="col-span-1">Labor Type</div>
            <div className="col-span-1">Frequency</div>
            <div className="col-span-1">Size</div>
            <div className="col-span-1">Bundle</div>
            <div className="col-span-1">Advanced</div>
            <div className="col-span-1">Heating</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-silver">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-platinum/20 transition-colors items-center"
            >
              {/* Equipment Type */}
              <div className="col-span-1 text-sm text-charcoal font-medium">
                {task.equipmentType}
              </div>

              {/* Task Description */}
              <div className="col-span-2 text-sm text-charcoal">
                {task.description}
              </div>

              {/* Hours */}
              <div className="col-span-1 text-sm text-charcoal">
                {task.hours}
              </div>

              {/* Labor Type */}
              <div className="col-span-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                  {task.laborType}
                </span>
              </div>

              {/* Frequency */}
              <div className="col-span-1 text-sm text-charcoal">
                {task.frequency}
              </div>

              {/* Size */}
              <div className="col-span-1 text-sm text-charcoal">
                {task.size}
              </div>

              {/* Bundle */}
              <div className="col-span-1">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white bg-black">
                  {task.bundle}
                </span>
              </div>

              {/* Advanced */}
              <div className="col-span-1 text-sm text-charcoal">
                {task.advanced}
              </div>

              {/* Heating */}
              <div className="col-span-1 text-sm text-charcoal">
                {task.heating}
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {task.status}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end gap-2">
                <button className="p-2 text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button className="p-2 text-slate hover:text-red-600 hover:bg-platinum rounded transition-colors">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
