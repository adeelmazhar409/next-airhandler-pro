"use client";

import DynamicFormBuilder from "@/components/forms/DynamicFormBuilder";
import Header from "../UI-components/Header";
import Heading from "../Heading";
import Mainbox from "@/components/dashboard/main/mainbox";
// Import your form config when ready
// import { ServiceEstimateFormProps } from '@/components/forms/forms-instructions/ServiceEstimateProp';

interface ServiceEstimateBuilderProps {
  onBack: () => void;
}

export default function ServiceEstimateBuilder({
  onBack,
}: ServiceEstimateBuilderProps) {
  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission
    // After success, go back:
    // onBack();
  };

  const boxdata = {
    title: "Start from Pre-Built Template",
    titleSize: "text-2xl",
      description: "Choose from common HVAC service jobs",
    descriptionSize:"mt-[-18px] mx-3",
    list: [
      {
        value: "• Compressor Replacement",
      },
      {
        value: "• Condenser Fan Motor Replacement",
      },
      {
        value: "• Coil Cleaning",
      },
      {
        value: "• And more standard service jobs...",
      },
    ],
  };

    
    
  const boxdata2 = {
    title: "Build Custom Estimate",
    titleSize: "text-2xl",
    description: "Create a fully customized estimate",
    descriptionSize: "mt-[-18px] mx-3",
    list: [
      {
        value: "• Add labor hours at cost",
      },
      {
        value: "• Add materials at cost",
      },
      {
        value: "• Include detailed tasks",
      },
      {
        value: "• Set custom pricing",
      },
    ],
  };

      const boxdata3 = {
        title: "Estimate Details",
        titleSize: "text-2xl",
        description: "Coming soon - Full estimate builder interface",
        descriptionSize: "mt-[-18px] mx-3",
        list: [
          {
            value: "This page will include the complete estimate building interface with labor, materials, tasks, and proposal generation capabilities.",
          }
        ],
      };
    
  return (
    <div className="flex flex-col p-8">
      {" "}
      <Heading
        title="Create Service Estimate"
        description="Build your estimate from scratch or select a pre-built template

"
      />
      <div className="grid grid-cols-2 gap-10 my-2">
        <Mainbox {...boxdata} />
        <Mainbox {...boxdata2} />
      </div>
      <div className="my-5">
        <Mainbox {...boxdata3} />
      </div>
    </div>
  );
}
