"use client";

import DynamicFormBuilder from '@/components/forms/DynamicFormBuilder';
import { WorkOrderFormProps } from '@/components/forms/forms-instructions/WorkOrderFormProp';

interface WorkOrderFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
  linkTableData: any[];
  editingWorkOrder: any;
}

export function WorkOrderForm({ onCancel, onSubmit, linkTableData, editingWorkOrder }: WorkOrderFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 text-charcoal hover:text-slate transition-colors mb-4 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Work Orders</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">
          {editingWorkOrder ? "Edit Work Order" : "Create Work Order"}
        </h1>
      </div>

      {/* Dynamic Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <DynamicFormBuilder
          config={WorkOrderFormProps}
          onSubmit={onSubmit}
          onCancel={onCancel}
          linkTableData={linkTableData}
          editingData={editingWorkOrder}
        />
      </div>
    </div>
  );
}