// pages/users.tsx
import Button from "@/components/app/UI-components/button";
import DataTable, { Column } from "../UI-components/table";
import { Users as UsersIcon, Edit, Edit2 } from "lucide-react";
import { InputField } from "@/components/interface/DataTypes";
import SearchAndFilters from "@/components/app/UI-components/SearchAndFilter";
import { useState } from "react";
export default function Materials() {

interface Material {
  id: number;
  description: string;
  equipmentType: string;
  size: string;
  bundle: string;
  quantity: number;
  cost: string;
}

  const materials: Material[] = [
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


   


       const materialColumns: Column<Material>[] = [
         {
           key: "description",
           header: "Description",
           span: 2, // Takes 2 units of space
           render: (material) => (
             <p className="text-sm font-medium text-charcoal">{material.description}</p>
           ),
         },
         {
           key: "equipmentType",
           header: "Equipment Type",
           span: 2, // Takes 2 units of space
           render: (material) => <p className="text-sm text-white bg-cerulean/70 w-fit p-1 px-2     rounded-2xl">{material.equipmentType}</p>,
         },
         {
           key: "size",
           header: "Size",
           span: 1, // Takes 1 unit of space
           render: (material) => <p className="text-sm text-slate">{material.size}</p>,
         },
         {
           key: "bundle",
           header: "Bundle",
           span: 1, // Takes 2 units of space
           render: (material) => (
             <span className="text-xs text-black ml-3  p-1 rounded-2xl  bg-charcoal/10">
               {material.bundle || "-"}
             </span>
           ),
         },
         {
           key: "quantity",
           header: "Quantity",
           span: 1, // Takes 1 unit of space
           render: (material) => (
             <span className="text-xs  bg-slate/10 rounded-2xl p-1.5 text-black">{material.quantity || "-"}</span>
           ),
         },
         {
           key: "cost",
           header: "Cost",
           span: 1, // Takes 1 unit of space
           align: "right",
           render: (material) => (
             <button className=" text-slate  hover:text-cerulean hover:bg-platinum rounded transition-colors">
               <span>{material.cost || "-"}</span>
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

           const handleRowClick = (material: Material) => {
      console.log("Clicked material:", material);
    };
   
  return (

  
    
    
         <div className="p-8 border border-slate/30 rounded-lg">
              <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
                  
                  Default Materials Management
                </h1>
                <p className="text-charcoal text-sm m-2">Manage default materials that will be available to all companies</p>
                </div>
              
              </div>
    
               <div className=" flex justify-between">
            <SearchAndFilters
              fields={inputFields}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
    
            />

            <div className="flex gap-2 ">
                <button className="flex  h-fit  items-baseline gap-2 px-4 py-1   border border-silver rounded-lg text-sm font-medium text-charcoal hover:bg-platinum transition-colors">
         
      <Edit2 className="h-4"/>
            Bulk Edit
          </button>
            <Button value="Add new Task"/></div>
          </div>
        
              <DataTable
                columns={materialColumns}
                data={materials}
                onRowClick={handleRowClick}
                emptyMessage="No materials found"
              />
            </div>
  );
}
