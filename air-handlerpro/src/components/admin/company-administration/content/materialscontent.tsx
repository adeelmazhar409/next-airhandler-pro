import Button from "@/components/app/UI-components/button";
import { InputField } from "@/components/interface/DataTypes";
import SearchAndFilters from "@/components/app/UI-components/SearchAndFilter";
import { useState } from "react";
export default function Materials() {

  const materials = [
    {
      id: 1, 
      description: "Ice Machine Annual Service Kit",
      equipmentType: "Ice Machine",
      size: "400 lb",
      bundle: "Annual",
      quantity: 1,
      cost: "$107.82",
    },
    {
      id: 2,
      description: "Ice Machine Annual Service Kit",
      equipmentType: "Ice Machine",
      size: "500 lb",
      bundle: "Annual",
      quantity: 1,
      cost: "$107.82",
    },
    {
      id: 3,
      description: "Ice Machine Annual Service Kit",
      equipmentType: "Ice Machine",
      size: "700 lb",
      bundle: "Annual",
      quantity: 1,
      cost: "$107.82",
    },
    {
      id: 4,
      description: "Ice Machine Annual Service Kit",
      equipmentType: "Ice Machine",
      size: "1000 lb",
      bundle: "Annual",
      quantity: 1,
      cost: "$107.82",
    },
    {
      id: 5,
      description: "Ice Machine Annual Service Kit",
      equipmentType: "Ice Machine",
      size: "900 lb",
      bundle: "Annual",
      quantity: 1,
      cost: "$107.82",
    },
  ];


   const [searchValue, setSearchValue] = useState("");
   const [selectedType, setSelectedType] = useState("");

   const inputFields: InputField[] = [
     {
       type: "dropdownButton",
       name: "All Bundles",
       options: ["Type 1", "Type 2", "Type 3", "Type 4"],
       disable: false,
       show: true,
       onChange: (value) => setSelectedType(value),
     },
     {
       type: "dropdownButton",
       name: "All Eqipment Types",
       options: ["Type 1", "Type 2", "Type 3", "Type 4"],
       disable: false,
       show: true,
       onChange: (value) => setSelectedType(value),
     },
   ];
  return (
    <div className="p-8 border border-slate/30 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            Default Materials Management
          </h1>
          <p className="text-sm text-slate mt-1">
            Manage default materials that will be available to all companies
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-silver rounded-lg text-sm font-medium text-charcoal hover:bg-platinum transition-colors">
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
            Bulk Edit
          </button>

          <Button value="Add Material" />
        </div>
      </div>

      {/* Filters */}
      <div className="">
        <SearchAndFilters
          fields={inputFields}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
      </div>
      {/* Materials Table */}
      <div className="bg-white border border-silver rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-platinum/30 border-b border-silver">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider">
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Equipment Type</div>
            <div className="col-span-1">Size</div>
            <div className="col-span-2">Task Bundle</div>
            <div className="col-span-1">Quantity</div>
            <div className="col-span-1">Cost</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-silver">
          {materials.map((material) => (
            <div
              key={material.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-platinum/20 transition-colors items-center"
            >
              {/* Description */}
              <div className="col-span-4">
                <p className="text-sm font-medium text-charcoal">
                  {material.description}
                </p>
              </div>

              {/* Equipment Type */}
              <div className="col-span-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cerulean/20 text-cerulean">
                  {material.equipmentType}
                </span>
              </div>

              {/* Size */}
              <div className="col-span-1">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                  {material.size}
                </span>
              </div>

              {/* Task Bundle */}
              <div className="col-span-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {material.bundle}
                </span>
              </div>

              {/* Quantity */}
              <div className="col-span-1 text-sm text-charcoal text-center">
                {material.quantity}
              </div>

              {/* Cost */}
              <div className="col-span-1 text-sm font-medium text-charcoal">
                {material.cost}
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
