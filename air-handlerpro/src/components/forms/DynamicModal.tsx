"use client";

import { useEffect, useState } from "react";
import { X, Plus, ChevronDown, Search } from "lucide-react";
import {
  FieldConfig,
  ModalConfig,
  DynamicModalProps,
  ModalSection,
} from "@/components/interface/DataTypes";
import { generateHourOptions, generateMinuteOptions, getFieldWidth } from "../utility/HelperFunctions";

export default function DynamicModal({
  isOpen,
  onClose,
  onSubmit,
  config,
  backgroundColor,
}: DynamicModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>(
    {}
  );
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File[]>>(
    {}
  );

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

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(selectedFiles).forEach((files) => {
        files?.forEach((file) => {
          if (file instanceof File) {
            URL.revokeObjectURL(URL.createObjectURL(file));
          }
        });
      });
    };
  }, [selectedFiles]);

  if (!isOpen) return null;

  const handleInputChange = (label: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleDateTimeChange = (
    label: string,
    type: "date" | "hour" | "minute",
    value: string
  ) => {
    setFormData((prev) => {
      const currentData = prev[label] || { date: "", hour: "", minute: "" };
      return {
        ...prev,
        [label]: {
          ...currentData,
          [type]: value,
        },
      };
    });
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
    onSubmit(formData);
    setFormData({});
    setDynamicOptions({});
    setDropdownStates({});
    setSearchTerms({});
    setSelectedFiles({});
  };

  const handleClose = () => {
    setFormData({});
    setDynamicOptions({});
    setDropdownStates({});
    setSearchTerms({});
    setSelectedFiles({});
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

      setDynamicOptions((prev: any) => ({
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

    const isDropdownOpen = dropdownStates[fieldKey] || false;
    const searchTerm = searchTerms[fieldKey] || "";
    const width = getFieldWidth(field.nature);

    switch (field.type) {
      case "text":
      case "number":
      case "email":
        return (
          <div key={fieldKey} className={width}>
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
          <div key={fieldKey} className={width}>
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
          <div key={fieldKey} className={width}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData[field.label] || ""}
                onChange={(e) => handleInputChange(field.label, e.target.value)}
                className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal cursor-pointer"
              />
            </div>
          </div>
        );

      case "date&time":
        const dateTimeData = formData[field.label] || {
          date: "",
          hour: "",
          minute: "",
        };
        const hourDropdownKey = `${fieldKey}-hour`;
        const minuteDropdownKey = `${fieldKey}-minute`;
        const isHourDropdownOpen = dropdownStates[hourDropdownKey] || false;
        const isMinuteDropdownOpen = dropdownStates[minuteDropdownKey] || false;

        return (
          <div key={fieldKey} className={width}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="flex gap-2">
              {/* Date Input */}
              <div className="relative flex-1">
                <input
                  type="date"
                  value={dateTimeData.date || ""}
                  onChange={(e) =>
                    handleDateTimeChange(field.label, "date", e.target.value)
                  }
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal cursor-pointer"
                />
              </div>

              {/* Hour Dropdown */}
              <div className="relative w-32">
                <button
                  type="button"
                  onClick={() => toggleDropdown(hourDropdownKey)}
                  className="w-full px-3 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white cursor-pointer"
                >
                  <span
                    className={
                      dateTimeData.hour ? "text-charcoal" : "text-slate"
                    }
                  >
                    {dateTimeData.hour || field.hourplaceholder || "00 AM"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate transition-transform ${
                      isHourDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isHourDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-auto">
                    {generateHourOptions().map((hour, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          handleDateTimeChange(field.label, "hour", hour);
                          toggleDropdown(hourDropdownKey);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-platinum text-charcoal transition-colors text-sm cursor-pointer"
                      >
                        {hour}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Minute Dropdown */}
              <div className="relative w-24">
                <button
                  type="button"
                  onClick={() => toggleDropdown(minuteDropdownKey)}
                  className="w-full px-3 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white cursor-pointer"
                >
                  <span
                    className={
                      dateTimeData.minute ? "text-charcoal" : "text-slate"
                    }
                  >
                    {dateTimeData.minute || field.minuteplaceholder || "00"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate transition-transform ${
                      isMinuteDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMinuteDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-auto">
                    {generateMinuteOptions().map((minute, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          handleDateTimeChange(field.label, "minute", minute);
                          toggleDropdown(minuteDropdownKey);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-platinum text-charcoal transition-colors text-sm cursor-pointer"
                      >
                        {minute}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "search-dropdown":
        const filteredOptions =
          field.option?.filter((opt) =>
            opt.toLowerCase().includes(searchTerm.toLowerCase())
          ) || [];

        return (
          <div key={fieldKey} className={width}>
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
                      className="w-full px-4 py-3 text-left hover:bg-platinum text-charcoal transition-colors cursor-pointer"
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
        // Combine original options with dynamically added options
        const allOptions = [
          ...(field.option || []),
          ...(dynamicOptions[field.label] || []),
        ];

        return (
          <div key={fieldKey} className={width}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => toggleDropdown(fieldKey)}
                  className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white cursor-pointer"
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
                {isDropdownOpen && allOptions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-auto">
                    {allOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectOption(fieldKey, field.label, opt)}
                        className="w-full px-4 py-3 text-left hover:bg-platinum text-charcoal transition-colors cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {field.buttonName && field.modal && (
                <button
                  type="button"
                  onClick={() => openNestedModal(field.modal!, field.label)}
                  className="px-4 py-3 border border-silver rounded-lg hover:bg-platinum transition-colors flex items-center gap-2 text-charcoal font-medium whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  {field.buttonName}
                </button>
              )}
            </div>
            {field.message && (
              <p className="text-xs text-slate mt-1">{field.message}</p>
            )}
          </div>
        );

      case "file":
        return (
          <div key={fieldKey} className={width}>
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
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedFiles[field.label].map((file, idx) => {
                    const isImage = file.type.startsWith("image/");
                    const fileUrl = URL.createObjectURL(file);

                    return (
                      <div
                        key={idx}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-silver bg-platinum/30"
                      >
                        {isImage ? (
                          <img
                            src={fileUrl}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-4">
                            <svg
                              className="w-12 h-12 text-slate mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="text-xs text-charcoal text-center truncate w-full px-2">
                              {file.name}
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                          <label className="cursor-pointer bg-cerulean hover:bg-cerulean/90 text-white p-2 rounded-lg transition-colors">
                            <input
                              type="file"
                              accept={field.accept}
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const newFiles = [
                                    ...selectedFiles[field.label],
                                  ];
                                  newFiles[idx] = e.target.files[0];
                                  setSelectedFiles({
                                    ...selectedFiles,
                                    [field.label]: newFiles,
                                  });
                                }
                              }}
                              className="hidden"
                            />
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                          </label>

                          <button
                            type="button"
                            onClick={() => removeFile(field.label, idx)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors cursor-pointer"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        {isImage && (
                          <div className="absolute bottom-0 left-0 right-0 bg-charcoal/90 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {file.name}
                          </div>
                        )}
                      </div>
                    );
                  })}
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
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
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
              className="text-slate hover:text-charcoal transition-colors cursor-pointer"
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
              className="px-6 py-2 border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors cursor-pointer"
            >
              {buttonLabels[0]}
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-cerulean text-white rounded-lg hover:bg-slate transition-colors cursor-pointer"
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
