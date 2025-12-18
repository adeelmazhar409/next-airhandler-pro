"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import {
  FieldConfig,
  ModalConfig,
  DynamicModalProps,
  ModalSection,
} from "@/components/interface/DataTypes";
import { getFieldWidth } from "../utility/HelperFunctions";

export default function DynamicModal({
  isOpen,
  onClose,
  onSubmit,
  config,
  backgroundColor,
}: DynamicModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  // State for nested modal
  const [nestedModalState, setNestedModalState] = useState<{
    isOpen: boolean;
    config: ModalConfig | null;
    parentFieldLabel: string | null;
  }>({
    isOpen: false,
    config: null,
    parentFieldLabel: null,
  });

  // Store dynamically added options for dropdowns
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, string[]>
  >({});

  if (!isOpen) return null;

  const handleInputChange = (label: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({});
    setDynamicOptions({});
  };

  const handleClose = () => {
    setFormData({});
    setDynamicOptions({});
    onClose();
  };

  // Open nested modal
  const openNestedModal = (modalConfig: ModalConfig, fieldLabel: string) => {
    setNestedModalState({
      isOpen: true,
      config: modalConfig,
      parentFieldLabel: fieldLabel,
    });
  };

  // Close nested modal
  const closeNestedModal = () => {
    setNestedModalState({
      isOpen: false,
      config: null,
      parentFieldLabel: null,
    });
  };

  // Handle nested modal submission
  const handleNestedModalSubmit = (nestedData: Record<string, any>) => {
    console.log("Nested modal submitted:", nestedData);

    // Add the new option to the parent dropdown
    if (nestedModalState.parentFieldLabel) {
      const fieldLabel = nestedModalState.parentFieldLabel;

      // Combine First Name and Last Name for contact display
      const firstName = nestedData["First Name"] || "";
      const lastName = nestedData["Last Name"] || "";
      const newOptionValue =
        `${firstName} ${lastName}`.trim() ||
        nestedData[Object.keys(nestedData)[0]] ||
        "New Entry";

      setDynamicOptions((prev) => ({
        ...prev,
        [fieldLabel]: [...(prev[fieldLabel] || []), newOptionValue],
      }));

      // Auto-select the newly added option
      handleInputChange(fieldLabel, newOptionValue);
    }

    closeNestedModal();
  };

  const renderField = (
    field: FieldConfig,
    fieldIndex: number,
    sectionIndex?: number
  ) => {
    const fieldKey =
      sectionIndex !== undefined
        ? `modal-${sectionIndex}-${fieldIndex}-${field.label}`
        : `modal-${fieldIndex}-${field.label}`;

    // Toggle Switch
    if (field.type === "toggle") {
      return (
        <div
          key={fieldKey}
          className="flex items-center justify-between py-2 w-full"
        >
          <label className="text-sm font-medium text-charcoal">
            {field.label}
          </label>
          <button
            type="button"
            onClick={() =>
              handleInputChange(field.label, !formData[field.label])
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData[field.label] ? "bg-cerulean" : "bg-silver"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData[field.label] ? "translate-x-6" : "translate-x-1"
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

        {/* Text, Number, and Email Inputs */}
        {(field.type === "text" ||
          field.type === "number" ||
          field.type === "email") && (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.label] || ""}
            onChange={(e) => handleInputChange(field.label, e.target.value)}
            className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate"
          />
        )}

        {/* Dropdown with Optional Add Button */}
        {field.type === "dropdown" && (
          <div className="flex gap-2">
            <select
              value={formData[field.label] || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className="flex-1 px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal bg-white"
            >
              <option value="">{field.placeholder}</option>
              {/* Original options */}
              {field.option?.map((opt, idx) => (
                <option key={`original-${idx}`} value={opt}>
                  {opt}
                </option>
              ))}
              {/* Dynamically added options */}
              {dynamicOptions[field.label]?.map((opt, idx) => (
                <option key={`dynamic-${idx}`} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Add Button - Opens Nested Modal */}
            {field.buttonName && field.modal && (
              <button
                type="button"
                onClick={() => openNestedModal(field.modal!, field.label)}
                className="px-4 py-3 border border-silver rounded-lg hover:bg-platinum transition-colors flex items-center gap-2 text-charcoal font-medium"
              >
                {field.buttonName === "+" ? (
                  <Plus size={18} />
                ) : (
                  field.buttonName
                )}
              </button>
            )}
          </div>
        )}

        {/* Message/Help Text */}
        {field.message && (
          <p className="text-xs text-slate mt-1">{field.message}</p>
        )}
      </div>
    );
  };

  // Render modal content based on structure (with or without sections)
  const renderModalContent = () => {
    // Check if modalFields is an array of sections or fields
    const hasSection = config.modalFields?.find((item: any) => {
      if (item.sectionName && item.sectionName !== "button") return true;
    });

    if (hasSection) {
      // Render with sections
      return (
        <div className="space-y-6">
          {config.modalFields?.map((section: any, sectionIndex: number) => {
            // Handle button section
            if (section.sectionName === "button" && section.button) {
              return null; // Buttons are rendered in footer
            }

            // Handle field sections
            if (section.fields) {
              return (
                <div key={sectionIndex}>
                  {section.sectionName && (
                    <h3 className="text-base font-semibold text-charcoal mb-3">
                      {section.sectionName}
                    </h3>
                  )}
                  <div className="flex flex-wrap gap-4">
                    {section.fields.map(
                      (field: FieldConfig, fieldIndex: number) =>
                        renderField(field, fieldIndex, sectionIndex)
                    )}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      );
    } else {
      // Render without sections (flat structure)
      return (
        <div className="flex flex-wrap gap-4">
          {config.modalFields?.map((field: any, idx: number) =>
            renderField(field, idx)
          )}
        </div>
      );
    }
  };

  // Get button labels from config
  const getButtonLabels = () => {
    const buttonSection = config.modalFields?.find(
      (item: any) => item.sectionName === "button" && item.button
    );
    return buttonSection?.button || ["Cancel", "Submit"];
  };

  const buttonLabels = getButtonLabels();

  return (
    <>
      {/* Main Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          backgroundColor ? backgroundColor : "bg-black/80"
        }`}
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-silver">
            <h2 className="text-xl font-semibold text-charcoal">
              {config.modalHeading}
            </h2>
            <button
              onClick={handleClose}
              className="text-slate hover:text-charcoal transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {renderModalContent()}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-silver">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors"
            >
              {buttonLabels[0]}
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-cerulean text-white rounded-lg hover:bg-slate transition-colors"
            >
              {buttonLabels[1]}
            </button>
          </div>
        </div>
      </div>

      {/* Nested Modal - Renders on top of first modal */}
      {nestedModalState.isOpen && nestedModalState.config && (
        <DynamicModal
          isOpen={nestedModalState.isOpen}
          onClose={closeNestedModal}
          onSubmit={handleNestedModalSubmit}
          config={nestedModalState.config}
          backgroundColor="bg-black/20"
        />
      )}
    </>
  );
}
