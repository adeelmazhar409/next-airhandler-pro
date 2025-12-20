"use client";

import DynamicFormBuilder from "@/components/forms/DynamicFormBuilder";
import { ActivityFormProps } from "@/components/forms/forms-instructions/ActivityProp";

interface ActivityFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export function ActivityForm({ onCancel, onSubmit }: ActivityFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-charcoal hover:text-slate transition-colors mb-4 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Activities</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">New Activity</h1>
      </div>

      {/* Dynamic Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <DynamicFormBuilder
          config={ActivityFormProps}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
