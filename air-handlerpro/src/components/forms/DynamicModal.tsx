"use client";

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { ModalConfig, ModalFieldConfig } from '@/components/interface/DataTypes';

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  config: ModalConfig;
}

export default function DynamicModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  config 
}: DynamicModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!isOpen) return null;

  const handleInputChange = (label: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({});
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  const getFieldWidth = (nature?: string) => {
    switch (nature) {
      case 'full':
        return 'w-full';
      case 'half':
        return 'w-full lg:w-[calc(50%-8px)]';
      case 'third':
        return 'w-full lg:w-[calc(33.333%-11px)]';
      default:
        return 'w-full';
    }
  };

  const renderField = (field: ModalFieldConfig, fieldIndex: number) => {
    const fieldKey = `modal-${fieldIndex}-${field.label}`;

    // Toggle Switch
    if (field.type === 'toggle') {
      return (
        <div key={fieldKey} className="flex items-center justify-between py-2 w-full">
          <label className="text-sm font-medium text-charcoal">
            {field.label}
          </label>
          <button
            type="button"
            onClick={() => handleInputChange(field.label, !formData[field.label])}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData[field.label] ? 'bg-cerulean' : 'bg-silver'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData[field.label] ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      );
    }

    const width = getFieldWidth(field.nature);

    return (
      <div key={fieldKey} className={width}>
        <label className="block text-sm font-medium text-charcoal mb-2">
          {field.label}
        </label>

        {/* Text and Number Inputs */}
        {(field.type === 'text' || field.type === 'number') && (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.label] || ''}
            onChange={(e) => handleInputChange(field.label, e.target.value)}
            className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate"
          />
        )}

        {/* Dropdown */}
        {field.type === 'dropdown' && (
          <div className="flex gap-2">
            <select
              value={formData[field.label] || ''}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className="flex-1 px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal bg-white"
            >
              <option value="">{field.placeholder}</option>
              {field.option?.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {field.buttonName && (
              <button
                type="button"
                className="px-4 py-3 border border-silver rounded-lg hover:bg-platinum transition-colors flex items-center gap-2 text-charcoal font-medium"
              >
                {field.buttonName === '+' ? (
                  <Plus className="w-5 h-5" />
                ) : (
                  field.buttonName
                )}
              </button>
            )}
          </div>
        )}

        {/* Helper Message */}
        {field.message && (
          <p className="text-xs text-slate mt-2">{field.message}</p>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-silver">
          <h2 className="text-xl font-semibold text-charcoal">
            {config.modalHeading}
          </h2>
          <button
            onClick={handleClose}
            className="text-slate hover:text-charcoal transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-4">
              {config.modalFields.map((field, idx) => renderField(field, idx))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-silver">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-3 border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-charcoal text-white rounded-lg hover:bg-cerulean transition-colors font-medium cursor-pointer"
          >
            {config.modalHeading}
          </button>
        </div>
      </div>
    </div>
  );
}