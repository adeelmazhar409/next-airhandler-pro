import React, { useState } from "react";
import { ChevronDown, Calendar, Plus, Search, X } from "lucide-react";
import DynamicModal from "./DynamicModal";
import {
  DynamicFormBuilderProps,
  FieldConfig,
  ModalConfig,
} from "../interface/DataTypes";
import { getFieldWidth } from "../utility/HelperFunctions";

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({
  config,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>(
    {}
  );
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File[]>>(
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
    setSearchTerms((prev) => ({ ...prev, [fieldKey]: "" }));
  };

  const handleFileChange = (label: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles((prev) => ({
        ...prev,
        [label]: fileArray,
      }));
      handleInputChange(label, fileArray);
    }
  };

  const removeFile = (label: string, index: number) => {
    setSelectedFiles((prev) => {
      const updated = { ...prev };
      updated[label] = updated[label].filter((_, i) => i !== index);
      return updated;
    });
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
    closeModal();
  };

  const renderField = (
    field: FieldConfig,
    sectionIndex: number,
    fieldIndex: number
  ) => {
    const fieldKey = `${sectionIndex}-${fieldIndex}-${field.label}`;
    const isDropdownOpen = dropdownStates[fieldKey] || false;
    const searchTerm = searchTerms[fieldKey] || "";

    switch (field.type) {
      case "text":
      case "number":
      case "email":
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

      case "textarea":
        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <textarea
              placeholder={field.placeholder}
              value={formData[field.label] || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              rows={field.rows || 4}
              className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate resize-y"
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
                value={formData[field.label] || ""}
                onChange={(e) => handleInputChange(field.label, e.target.value)}
                className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate pointer-events-none" />
            </div>
          </div>
        );

      case "search-dropdown":
        const filteredOptions =
          field.option?.filter((opt) =>
            opt.toLowerCase().includes(searchTerm.toLowerCase())
          ) || [];

        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={searchTerm || formData[field.label] || ""}
                  onChange={(e) => {
                    setSearchTerms((prev) => ({
                      ...prev,
                      [fieldKey]: e.target.value,
                    }));
                    setDropdownStates((prev) => ({
                      ...prev,
                      [fieldKey]: true,
                    }));
                  }}
                  onFocus={() =>
                    setDropdownStates((prev) => ({ ...prev, [fieldKey]: true }))
                  }
                  className="w-full pl-10 pr-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate"
                />
              </div>
              {isDropdownOpen && filteredOptions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredOptions.map((opt, idx) => (
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
          </div>
        );

      case "dropdown":
        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => toggleDropdown(fieldKey)}
                  className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white"
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

      case "file":
        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div>
              <label className="w-full px-4 py-3 border border-silver rounded-lg cursor-pointer hover:bg-platinum transition-colors flex items-center justify-center text-slate">
                <input
                  type="file"
                  multiple={field.multiple}
                  accept={field.accept}
                  onChange={(e) =>
                    handleFileChange(field.label, e.target.files)
                  }
                  className="hidden"
                />
                <span className="text-sm">
                  {selectedFiles[field.label]?.length > 0
                    ? `${selectedFiles[field.label].length} file(s) selected`
                    : field.placeholder || "Choose Files"}
                </span>
              </label>

              {selectedFiles[field.label]?.length > 0 && (
                <div className="mt-3 space-y-2">
                  {selectedFiles[field.label].map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-2 bg-platinum/50 rounded-lg"
                    >
                      <span className="text-sm text-charcoal truncate flex-1">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(field.label, idx)}
                        className="ml-2 text-slate hover:text-charcoal"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "toggle":
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

      default:
        return null;
    }
  };

  const hasSection = config?.find((item: any) => {
    if (item.sectionName && item.sectionName !== "button") return true;
  });

  return (
    <>
      <div className="space-y-6">
        {hasSection ? (
          // FLAT LAYOUT - Render all items as fields directly
          <>
            <div className="flex flex-wrap gap-4">
              {config.map((item: any, index) => renderField(item, 0, index))}
            </div>
          </>
        ) : (
          // SECTIONED LAYOUT - Render with section headers
          config.map((section, sectionIndex) => {
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
                {/* Only show header if section has a name and it's not just "button" */}
                {section.sectionName && section.sectionName !== "button" && (
                  <div className="flex items-center gap-3 mb-4">
                    {section.Icon && (
                      <div className="text-charcoal">{section.Icon}</div>
                    )}
                    <h2 className="text-xl font-semibold text-charcoal">
                      {section.sectionName}
                    </h2>
                  </div>
                )}
                {section.fields && (
                  <div className="flex flex-wrap gap-4">
                    {section.fields.map((field, fieldIndex) =>
                      renderField(field, sectionIndex, fieldIndex)
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
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
