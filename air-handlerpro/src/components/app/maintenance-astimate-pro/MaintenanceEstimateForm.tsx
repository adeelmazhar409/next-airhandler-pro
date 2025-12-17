"use client";

import React from 'react';
import { Users } from 'lucide-react';
import DynamicFormBuilder from '@/components/forms/DynamicFormBuilder';
import { MaintenanceEstimateFormProps } from '@/components/forms/forms-instructions/MaintenanceEstimate';

interface MaintenanceEstimateFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export function MaintenanceEstimateForm({ onCancel, onSubmit }: MaintenanceEstimateFormProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 text-charcoal hover:text-slate transition-colors mb-4 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Estimates</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">
          New Maintenance Estimate Pro
        </h1>
        <p className="text-slate mt-1">
          Create a comprehensive maintenance estimate
        </p>
      </div>

      {/* Dynamic Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <DynamicFormBuilder
          config={MaintenanceEstimateFormProps}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}