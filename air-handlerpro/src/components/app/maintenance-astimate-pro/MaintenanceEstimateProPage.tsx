"use client";

import Button from "../button";
import Actbox from "../crm/UI-components/Actbox";
import Heading from "../Heading";
import { ClockIcon } from "@/components/icons/icons";

export default function MaintenanceEstimatePro() {
const data = {
  header: false,
  value:  "Estimate",
  icon: <ClockIcon />,
  description:
    "Create and manage professional maintenance estimates with advanced features.",
};
  return (
    <div className=" bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Heading title="Maintenance Estimate Pro" description=" Create and manage professional maintenance estimates with advanced
            features."/>
        
        <Button value="Estimate"/>
      </div>

      {/* Empty State Card */}
 
      <Actbox {...data} />
 
    </div>
  );
}
