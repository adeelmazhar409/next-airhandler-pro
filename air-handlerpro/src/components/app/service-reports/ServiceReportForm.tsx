"use client";

import DynamicFormBuilder from '@/components/forms/DynamicFormBuilder';
import { ServiceReportFormProps } from '@/components/forms/forms-instructions/ServiceReportProp';

interface ServiceReportFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export function ServiceReportForm({ onCancel, onSubmit }: ServiceReportFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 text-charcoal hover:text-slate transition-colors mb-4 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Reports</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">
        Create Work Order
        </h1>
      </div>

      {/* Dynamic Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <DynamicFormBuilder
          config={ServiceReportFormProps}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}