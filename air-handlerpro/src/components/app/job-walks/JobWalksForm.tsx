"use client";

import DynamicFormBuilder from "@/components/forms/DynamicFormBuilder";
import { JobWalksFormProps } from "@/components/forms/forms-instructions/JobWalksProp";

interface JobWalksFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export function JobWalksForm({ onCancel, onSubmit }: JobWalksFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-charcoal hover:text-slate transition-colors mb-4 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Job</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">New Job Walk</h1>
      </div>

      {/* Dynamic Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <DynamicFormBuilder
          config={JobWalksFormProps}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
