"use client";

import DynamicFormBuilder from "@/components/forms/DynamicFormBuilder";
import { SiteFormProps } from "@/components/forms/forms-instructions/SiteProp";

interface SiteFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export function SiteForm({ onCancel, onSubmit }: SiteFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-charcoal hover:text-slate transition-colors mb-4 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Sites</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">Add Service Site</h1>
        <p className="text-slate mt-1">
          Create a new service site for your organization
        </p>
      </div>

      {/* Dynamic Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <DynamicFormBuilder
          config={SiteFormProps}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
