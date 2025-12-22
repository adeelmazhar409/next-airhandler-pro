"use client";

import DynamicFormBuilder from "@/components/forms/DynamicFormBuilder";
import { CustomerCompanyFormProps } from "@/components/forms/forms-instructions/CustomerCompnayProp";

interface CustomerCompanyFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export function CustomerCompanyForm({
  onCancel,
  onSubmit,
}: CustomerCompanyFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-charcoal hover:text-slate transition-colors mb-4 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Companies</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">Add Company</h1>
      </div>

      {/* Dynamic Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <DynamicFormBuilder
          config={CustomerCompanyFormProps}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
