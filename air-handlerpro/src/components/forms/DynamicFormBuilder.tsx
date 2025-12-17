import React, { useState } from "react";
import { ChevronDown, Calendar, Plus } from "lucide-react";
import DynamicModal from "./DynamicModal";
import { DynamicFormBuilderProps, FieldConfig, ModalConfig } from "../interface/DataTypes";

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({
  config,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>(
    {}
  );
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    config: ModalConfig | null;
    parentFieldLabel: string | null;
  }>({
    isOpen: false,
    config: null,
    parentFieldLabel: null,
  });

  const handleInputChange = (label: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const toggleDropdown = (label: string) => {
    setDropdownStates((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const selectOption = (fieldKey: string, label: string, value: string) => {
    handleInputChange(label, value);
    toggleDropdown(fieldKey);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const openModal = (modalConfig: ModalConfig, fieldLabel: string) => {
    setModalState({
      isOpen: true,
      config: modalConfig,
      parentFieldLabel: fieldLabel,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      config: null,
      parentFieldLabel: null,
    });
  };

  const handleModalSubmit = (modalData: Record<string, any>) => {
    console.log("Modal form submitted:", modalData);
    // You can process the modal data here
    // For example, add it to a list or update the parent dropdown
    closeModal();
  };

  const getFieldWidth = (nature: string) => {
    switch (nature) {
      case "full":
        return "w-full";
      case "half":
        return "w-full lg:w-[calc(50%-8px)]";
      case "third":
        return "w-full lg:w-[calc(33.333%-11px)]";
      default:
        return "w-full";
    }
  };

  const renderField = (
    field: FieldConfig,
    sectionIndex: number,
    fieldIndex: number
  ) => {
    const fieldKey = `${sectionIndex}-${fieldIndex}-${field.label}`;
    const isDropdownOpen = dropdownStates[fieldKey] || false;

    switch (field.type) {
      case "text":
      case "number":
        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.label] || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate"
            />
          </div>
        );

      case "date":
        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="relative">
              <input
                type="date"
                placeholder={field.placeholder}
                value={formData[field.label] || ""}
                onChange={(e) => handleInputChange(field.label, e.target.value)}
                className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate pointer-events-none" />
            </div>
          </div>
        );

      case "dropdown":
        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => toggleDropdown(fieldKey)}
                  className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-left flex items-center justify-between bg-white"
                >
                  <span
                    className={
                      formData[field.label] ? "text-charcoal" : "text-slate"
                    }
                  >
                    {formData[field.label] || field.placeholder}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && field.option && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-auto">
                    {field.option.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectOption(fieldKey, field.label, opt)}
                        className="w-full px-4 py-3 text-left hover:bg-platinum text-charcoal transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {field.buttonName && (
                <button
                  type="button"
                  onClick={() => {
                    if (field.modal) {
                      openModal(field.modal, field.label);
                    }
                  }}
                  className="px-4 py-3 border border-silver rounded-lg hover:bg-platinum transition-colors flex items-center gap-2 text-charcoal font-medium whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  {field.buttonName}
                </button>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {config.map((section, sectionIndex) => {
          // Handle button section
          if (section.sectionName === "button" && section.button) {
            return (
              <div key={sectionIndex} className="flex justify-end gap-3 pt-4">
                {section.button.map((btnText, btnIdx) => (
                  <button
                    key={btnIdx}
                    type="button"
                    onClick={btnIdx === 0 ? onCancel : handleSubmit}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      btnIdx === 0
                        ? "border border-silver text-charcoal hover:bg-platinum"
                        : "bg-charcoal text-white hover:bg-cerulean"
                    }`}
                  >
                    {btnText}
                  </button>
                ))}
              </div>
            );
          }

          // Handle regular form sections
          return (
            <div
              key={sectionIndex}
              className={`${
                section.sectionBorder
                  ? "border-2 border-charcoal rounded-lg p-6"
                  : "space-y-4"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {section.Icon && (
                  <div className="text-charcoal">{section.Icon}</div>
                )}
                <h2 className="text-xl font-semibold text-charcoal">
                  {section.sectionName}
                </h2>
              </div>
              {section.fields && (
                <div className="flex flex-wrap gap-4">
                  {section.fields.map((field, fieldIndex) =>
                    renderField(field, sectionIndex, fieldIndex)
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic Modal */}
      {modalState.isOpen && modalState.config && (
        <DynamicModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          config={modalState.config}
        />
      )}
    </>
  );
};

export default DynamicFormBuilder;