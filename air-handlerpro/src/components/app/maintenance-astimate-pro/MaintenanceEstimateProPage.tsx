"use client";

import Button from "../UI-components/button";
import Actbox from "../UI-components/Actbox";
import Heading from "../Heading";
import { ClockIcon } from "@/components/icons/icons";
import { useState } from "react";
import EstimatesGrid from "../UI-components/MaintaineceDataFormed";
import { MaintenanceEstimateForm } from "./MaintenanceEstimateForm";

export default function MaintenanceEstimatePro() {
  const [formToggle, setFormToggle] = useState(false);

  const handleCreateEstimate = () => {
    setFormToggle(true);
  };

  const handleCancel = () => {
    setFormToggle(false);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission logic
    // After successful submission, you might want to close the form:
    // setFormToggle(false);
  };
  
  const ActboxData = {
    header: false,
    value: "Estimate",
    icon: <ClockIcon />,
    formOpen: handleCreateEstimate,
    description:
      "Create and manage professional maintenance estimates with advanced features.",
  };


  if (formToggle) {
    return (
      <MaintenanceEstimateForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    );
  }

  const MantainaceData = true;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Heading
          title="Maintenance Estimate Pro"
          description="Create and manage professional maintenance estimates with advanced features."
        />

        <Button onClick={handleCreateEstimate} value="New Estimate" />
      </div>

      {/* Empty State Card */}
      {MantainaceData ? <EstimatesGrid/> :   <Actbox {...ActboxData} /> }
   

    </div>
  );
}
