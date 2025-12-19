"use client";

import { useState } from "react";
import Heading from "../Heading";
import Button from "../UI-components/button";
import StatsCard from "../UI-components/StatsCard";
import Actbox from "../UI-components/Actbox";
import { ServiceEstimateIcon } from "../../icons/icons";

interface ServiceEstimatesProps {
  onNewEstimate: () => void; // Add this prop
}

export default function ServiceEstimates({
  onNewEstimate,
}: ServiceEstimatesProps) {
  const data = [
    {
      title: "Pre-Built Estimates",
      subtitle:
        "Select from standard service estimates Quick access to common HVAC service jobs including compressor replacements, condenser fan motors, and coil cleanings.",
    },
    {
      title: "Custom Builder",
      subtitle:
        "Build fully customized estimates Add labor hours, materials, and tasks to create detailed custom estimates tailored to your specific job requirements.",
    },
    {
      title: "Branded Proposals",
      subtitle:
        "Professional customer-facing proposals Generate custom proposals based on your company brand guidelines configured in Company Admin.",
    },
  ];

  const ActboxData = {
    header: true,
    value: "Estimates",
    icon: <ServiceEstimateIcon />,
    headerIcon: <ServiceEstimateIcon />,
    formOpen: onNewEstimate, // Use the prop
    description: "No estimates yet. Create your first estimate to get started.",
  };

  return (
    <div className=" p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Heading
          title="Service Estimates"
          description="Build accurate estimates for compressor replacements, motor repairs,
            coil cleanings, and more"
        />

        <Button onClick={onNewEstimate} value="New Estimate" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {data.map((data, index) => (
          <StatsCard key={index} {...data} />
        ))}
      </div>

      {/* Recent Estimates Section */}
      <Actbox {...ActboxData} />
    </div>
  );
}
