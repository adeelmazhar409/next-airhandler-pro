import React, { useEffect, useState } from "react";
import { ChevronDown, Calendar, Plus, Search, X, Clock } from "lucide-react";
import DynamicModal from "./DynamicModal";
import {
  DynamicFormBuilderProps,
  FieldConfig,
  isFieldConfig,
  isSectionConfig,
  ModalConfig,
} from "../interface/DataTypes";
import {
  generateHourOptions,
  generateMinuteOptions,
  getFieldWidth,
} from "../utility/HelperFunctions";

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

  // Add this useEffect to clean up object URLs
  useEffect(() => {
    return () => {
      // Clean up all object URLs when component unmounts
      Object.values(selectedFiles).forEach((files) => {
        files?.forEach((file) => {
          if (file instanceof File) {
            URL.revokeObjectURL(URL.createObjectURL(file));
          }
        });
      });
    };
  }, [selectedFiles]);

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
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
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
                {isDropdownOpen && field.option && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-auto">
                    {field.option.map((opt, idx) => (
                      <div
                        key={idx} // Move key here to the parent div
                        className="flex flex-col justify-start px-4 py-2 hover:bg-platinum cursor-pointer"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            selectOption(fieldKey, field.label, opt)
                          }
                          className="w-full text-left text-charcoal transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                        {field.optionDescription &&
                          field.optionDescription[idx] && (
                            <p className="text-[10px] text-gray-600 font-sans">
                              {field.optionDescription[idx]}
                            </p>
                          )}
                      </div>
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
                  className="px-4 py-3 border border-silver rounded-lg hover:bg-platinum transition-colors flex items-center gap-2 text-charcoal font-medium whitespace-nowrap cursor-pointer"
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
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedFiles[field.label].map((file, idx) => {
                    const isImage = file.type.startsWith("image/");
                    const fileUrl = URL.createObjectURL(file);

                    return (
                      <div
                        key={idx}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-silver bg-platinum/30"
                      >
                        {/* Image Preview or File Icon */}
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

                        {/* Hover Overlay with Actions */}
                        <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                          {/* Change Button */}
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

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => removeFile(field.label, idx)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors cursor-pointer"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        {/* File Name Tooltip (appears on hover) */}
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

      case "tag-input":
        const tags = formData[field.label] || [];
        const tagInputKey = `${fieldKey}-input`;

        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={field.placeholder}
                value={searchTerms[tagInputKey] || ""}
                onChange={(e) => {
                  setSearchTerms((prev) => ({
                    ...prev,
                    [tagInputKey]: e.target.value,
                  }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchTerms[tagInputKey]?.trim()) {
                    e.preventDefault();
                    handleInputChange(field.label, [
                      ...tags,
                      searchTerms[tagInputKey].trim(),
                    ]);
                    setSearchTerms((prev) => ({ ...prev, [tagInputKey]: "" }));
                  }
                }}
                className="flex-1 px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate"
              />
              <button
                type="button"
                onClick={() => {
                  if (searchTerms[tagInputKey]?.trim()) {
                    handleInputChange(field.label, [
                      ...tags,
                      searchTerms[tagInputKey].trim(),
                    ]);
                    setSearchTerms((prev) => ({ ...prev, [tagInputKey]: "" }));
                  }
                }}
                className="px-4 py-3 border border-silver rounded-lg hover:bg-platinum transition-colors text-charcoal font-medium cursor-pointer"
              >
                {field.buttonName || "Add"}
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-platinum rounded-full text-sm text-charcoal"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = tags.filter(
                          (_: string, i: number) => i !== idx
                        );
                        handleInputChange(field.label, newTags);
                      }}
                      className="hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case "radio-dropdown":
        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="relative">
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
              {isDropdownOpen && field.option && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-auto">
                  {field.option.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => selectOption(fieldKey, field.label, opt)}
                      className="w-full px-4 py-3 text-left hover:bg-platinum transition-colors cursor-pointer flex items-center gap-3"
                    >
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          formData[field.label] === opt
                            ? "border-cerulean"
                            : "border-silver"
                        }`}
                      >
                        {formData[field.label] === opt && (
                          <span className="w-2 h-2 rounded-full bg-cerulean"></span>
                        )}
                      </span>
                      <span className="text-charcoal">{opt}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "checkbox-group":
        const selectedValues = formData[field.label] || [];

        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-3">
              {field.label}
            </label>
            <div className="space-y-3">
              {field.box?.map((option: any, idx: number) => {
                const isChecked = selectedValues.includes(option.value);
                return (
                  <label
                    key={idx}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange(field.label, [
                            ...selectedValues,
                            option.value,
                          ]);
                        } else {
                          handleInputChange(
                            field.label,
                            selectedValues.filter(
                              (v: string) => v !== option.value
                            )
                          );
                        }
                      }}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                        isChecked
                          ? "bg-cerulean border-cerulean"
                          : "border-silver group-hover:border-cerulean"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm text-charcoal">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case "stage-dropdown":
        const stageColors: Record<string, string> = {
          "Lead (10%)": "bg-slate",
          "Qualified (35%)": "bg-cerulean",
          "Proposal (50%)": "bg-yellow-500",
          "Negotiation (85%)": "bg-orange-500",
          "Closed Won (100%)": "bg-green-500",
          "Closed Lost (0%)": "bg-red-500",
          "Closed Other (0%)": "bg-slate",
        };

        return (
          <div key={fieldKey} className={getFieldWidth(field.nature)}>
            <label className="block text-sm font-medium text-charcoal mb-2">
              {field.label}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(fieldKey)}
                className="w-full px-4 py-3 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {formData[field.label] && (
                    <span
                      className={`w-3 h-3 rounded-full ${
                        stageColors[formData[field.label]] || "bg-slate"
                      }`}
                    ></span>
                  )}
                  <span
                    className={
                      formData[field.label] ? "text-charcoal" : "text-slate"
                    }
                  >
                    {formData[field.label] || field.placeholder}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && field.option && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg overflow-hidden">
                  {field.option.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => selectOption(fieldKey, field.label, opt)}
                      className="w-full px-4 py-2.5 text-left hover:bg-platinum transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            stageColors[opt] || "bg-slate"
                          }`}
                        ></span>
                        <span className="text-charcoal text-sm">{opt}</span>
                      </div>
                      {formData[field.label] === opt && (
                        <svg
                          className="w-4 h-4 text-cerulean"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const hasSection = config?.some((item) => {
    return (
      isSectionConfig(item) && item.sectionName && item.sectionName !== "button"
    );
  });

  return (
    <>
      <div className="space-y-6">
        {!hasSection ? (
          // FLAT LAYOUT - Render all items as fields directly with buttons
          <>
            <div className="flex flex-wrap gap-4">
              {config.map((item, index) => {
                if (isFieldConfig(item)) {
                  return renderField(item, 0, index);
                }
                return null;
              })}
            </div>

            {/* Render button section for flat layout */}
            {config.some(
              (item) =>
                isSectionConfig(item) &&
                item.sectionName === "button" &&
                item.button
            ) && (
              <div className="flex justify-end gap-3 pt-4">
                {config
                  .filter(
                    (item) =>
                      isSectionConfig(item) &&
                      item.sectionName === "button" &&
                      item.button
                  )
                  .map((buttonSection, btnSecIdx) => {
                    if (
                      isSectionConfig(buttonSection) &&
                      buttonSection.button
                    ) {
                      return buttonSection.button.map((btnText, btnIdx) => (
                        <button
                          key={`${btnSecIdx}-${btnIdx}`}
                          type="button"
                          onClick={btnIdx === 0 ? onCancel : handleSubmit}
                          className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                            btnIdx === 0
                              ? "border border-silver text-charcoal hover:bg-platinum"
                              : "bg-charcoal text-white hover:bg-cerulean"
                          }`}
                        >
                          {btnText}
                        </button>
                      ));
                    }
                    return null;
                  })}
              </div>
            )}
          </>
        ) : (
          // SECTIONED LAYOUT - Render with section headers
          config.map((section, sectionIndex) => {
            if (!isSectionConfig(section)) return null;

            // Handle button section
            if (section.sectionName === "button" && section.button) {
              return (
                <div key={sectionIndex} className="flex justify-end gap-3 pt-4">
                  {section.button.map((btnText, btnIdx) => (
                    <button
                      key={btnIdx}
                      type="button"
                      onClick={btnIdx === 0 ? onCancel : handleSubmit}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
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
