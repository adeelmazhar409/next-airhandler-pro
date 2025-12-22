import React, { useEffect, useState } from "react";
import { ChevronDown, Calendar, Plus, Search, X, Clock } from "lucide-react";
import { z } from "zod";
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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
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

  // Create dynamic Zod schema based on field configuration
  const createValidationSchema = () => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    const processFields = (items: (FieldConfig | any)[]) => {
      items.forEach((item) => {
        if (isSectionConfig(item) && item.fields) {
          processFields(item.fields);
        } else if (isFieldConfig(item)) {
          const field = item as FieldConfig;

          // Skip validation for certain field types
          if (field.type === "toggle" || field.type === "checkbox-group") {
            return;
          }

          // Only add validation if field is required
          if (field.required) {
            let fieldSchema: z.ZodTypeAny;

            // Create schema based on field type with custom error messages
            switch (field.type) {
              case "text":
                fieldSchema = z
                  .string()
                  .min(1, `${field.label} is required`)
                  .refine(
                    (val) => val === "" || /^[a-zA-Z ]+$/.test(val),
                    "Please enter only text"
                  );
                break;

              case "url":
                fieldSchema = z
                  .string()
                  .min(1, `${field.label} is required`)
                  .refine(
                    (val) =>
                      val === "" ||
                      /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/.test(val),
                    "Please enter correct format Domain name"
                  );
                break;

              case "email":
                fieldSchema = z
                  .string()
                  .min(1, `${field.label} is required`)
                  .refine(
                    (val) =>
                      val === "" ||
                      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i.test(
                        val
                      ),
                    `Please enter a valid email address`
                  );
                break;

              case "number":
                fieldSchema = z
                  .string()
                  .min(1, `${field.label} is required`)
                  .regex(
                    /^\d+(\.\d+)?$/,
                    `${field.label} must be a valid number`
                  );
                break;

              case "date":
                fieldSchema = z.string().min(1, `${field.label} is required`);
                break;

              case "time":
                fieldSchema = z.string().min(1, `${field.label} is required`);
                break;

              case "date&time":
                fieldSchema = z.object({
                  date: z.string().min(1, "Date is required"),
                  hour: z.string().min(1, "Hour is required"),
                  minute: z.string().min(1, "Minute is required"),
                });
                break;

              case "file":
                fieldSchema = z
                  .array(z.any())
                  .min(1, `${field.label} is required`);
                break;

              case "tag-input":
                fieldSchema = z
                  .array(z.string())
                  .min(
                    1,
                    `At least one ${field.label.toLowerCase()} is required`
                  );
                break;

              case "dropdown":
              case "search-dropdown":
              case "radio-dropdown":
              case "stage-dropdown":
                fieldSchema = z.string().min(1, `${field.label} is required`);
                break;

              case "textarea":
                fieldSchema = z.string().min(1, `${field.label} is required`);
                break;

              default:
                fieldSchema = z.string().min(1, `${field.label} is required`);
            }

            schemaFields[field.label] = fieldSchema;
          }
        }
      });
    };

    processFields(config);
    return z.object(schemaFields);
  };

  const handleInputChange = (label: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
    // Clear validation error when user starts typing
    if (validationErrors[label]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[label];
        return newErrors;
      });
    }
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
    // Clear validation error
    if (validationErrors[label]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[label];
        return newErrors;
      });
    }
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

  const handleSubmit = () => {
    try {
      // Create and validate schema
      const schema = createValidationSchema();

      // Prepare data for validation - handle undefined values
      const dataToValidate: Record<string, any> = {};

      // Collect all required fields from config
      const collectRequiredFields = (items: (FieldConfig | any)[]) => {
        items.forEach((item) => {
          if (isSectionConfig(item) && item.fields) {
            collectRequiredFields(item.fields);
          } else if (isFieldConfig(item) && item.required) {
            const field = item as FieldConfig;
            // Set the value from formData, or empty string/array if undefined
            if (field.type === "file" || field.type === "tag-input") {
              dataToValidate[field.label] = formData[field.label] || [];
            } else if (field.type === "date&time") {
              dataToValidate[field.label] = formData[field.label] || {
                date: "",
                hour: "",
                minute: "",
              };
            } else {
              dataToValidate[field.label] = formData[field.label] || "";
            }
          }
        });
      };

      collectRequiredFields(config);

      // Validate
      schema.parse(dataToValidate);

      // Clear any existing errors
      setValidationErrors({});

      // Submit if validation passes
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const errors: Record<string, string> = {};
        (error as z.ZodError<any>).issues.forEach((err) => {
          const path = (err.path ?? []).join(".");
          errors[path] = err.message;
        });
        setValidationErrors(errors);

        // Scroll to first error
        const firstErrorField = Object.keys(errors)[0];
        const element = document.querySelector(
          `[data-field="${firstErrorField}"]`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
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

  const renderLabel = (field: FieldConfig) => {
    return (
      <label className="block text-sm font-medium text-charcoal mb-2">
        {field.label}
        {field.required && (
          <span className="text-red-500 ml-1 text-base align-super">*</span>
        )}
      </label>
    );
  };

  const renderError = (fieldLabel: string) => {
    if (validationErrors[fieldLabel]) {
      return (
        <p className="text-red-500 text-sm mt-1">
          {validationErrors[fieldLabel]}
        </p>
      );
    }
    return null;
  };

  const renderField = (
    field: FieldConfig,
    sectionIndex: number,
    fieldIndex: number
  ) => {
    const fieldKey = `${sectionIndex}-${fieldIndex}-${field.label}`;
    const isDropdownOpen = dropdownStates[fieldKey] || false;
    const searchTerm = searchTerms[fieldKey] || "";
    const hasError = !!validationErrors[field.label];

    const errorBorderClass = hasError ? "border-red-500" : "border-silver";

    switch (field.type) {
      case "text":
      case "number":
      case "email":
      case "url":
        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.label] || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate`}
            />
            {renderError(field.label)}
            {field.message && !hasError && (
              <p className="text-gray-500 text-[12px] mt-2">{field.message}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <textarea
              placeholder={field.placeholder}
              value={formData[field.label] || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              rows={field.rows || 4}
              className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate resize-y`}
            />
            {renderError(field.label)}
          </div>
        );

      case "date":
        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <div className="relative">
              <input
                type="date"
                value={formData[field.label] || ""}
                onChange={(e) => handleInputChange(field.label, e.target.value)}
                className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal cursor-pointer`}
              />
            </div>
            {renderError(field.label)}
          </div>
        );

      case "time":
        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <div className="relative">
              <input
                type="time"
                value={formData[field.label] || ""}
                onChange={(e) => handleInputChange(field.label, e.target.value)}
                className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal cursor-pointer`}
              />
            </div>
            {renderError(field.label)}
          </div>
        );

      case "date&time":
        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="date"
                  value={formData[field.label]?.date || ""}
                  onChange={(e) =>
                    handleDateTimeChange(field.label, "date", e.target.value)
                  }
                  className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-charcoal cursor-pointer`}
                />
              </div>

              <div className="w-24 relative">
                <select
                  value={formData[field.label]?.hour || ""}
                  onChange={(e) =>
                    handleDateTimeChange(field.label, "hour", e.target.value)
                  }
                  className={`w-full px-3 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-charcoal cursor-pointer appearance-none`}
                >
                  <option value="">HH</option>
                  {generateHourOptions().map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />
              </div>

              <div className="w-24 relative">
                <select
                  value={formData[field.label]?.minute || ""}
                  onChange={(e) =>
                    handleDateTimeChange(field.label, "minute", e.target.value)
                  }
                  className={`w-full px-3 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-charcoal cursor-pointer appearance-none`}
                >
                  <option value="">MM</option>
                  {generateMinuteOptions().map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />
              </div>
            </div>
            {renderError(field.label)}
          </div>
        );

      case "search-dropdown":
        const filteredOptions =
          field.option?.filter((option) =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
          ) || [];

        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(fieldKey)}
                className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white cursor-pointer`}
              >
                <span
                  className={
                    formData[field.label] ? "text-charcoal" : "text-slate"
                  }
                >
                  {formData[field.label] || field.placeholder}
                </span>
                <ChevronDown className="w-5 h-5 text-slate" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-hidden">
                  <div className="p-2 border-b border-silver">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) =>
                          setSearchTerms((prev) => ({
                            ...prev,
                            [fieldKey]: e.target.value,
                          }))
                        }
                        className="w-full pl-9 pr-3 py-2 border border-silver rounded focus:outline-none focus:ring-2 focus:ring-cerulean text-sm"
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-48">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            selectOption(fieldKey, field.label, option)
                          }
                          className="w-full px-4 py-2 text-left hover:bg-platinum transition-colors text-charcoal text-sm cursor-pointer"
                        >
                          {option}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-slate text-sm">
                        No options found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {renderError(field.label)}
          </div>
        );

      case "dropdown":
        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(fieldKey)}
                className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white cursor-pointer`}
              >
                <span
                  className={
                    formData[field.label] ? "text-charcoal" : "text-slate"
                  }
                >
                  {formData[field.label] || field.placeholder}
                </span>
                <ChevronDown className="w-5 h-5 text-slate" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-hidden">
                  <div className="overflow-y-auto max-h-60">
                    {field.option?.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          handleInputChange(field.label, option);
                          toggleDropdown(fieldKey);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-platinum transition-colors text-charcoal text-sm cursor-pointer"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {renderError(field.label)}
          </div>
        );

      case "radio-dropdown":
        const radioFilteredOptions =
          field.option?.filter((option) =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
          ) || [];

        const optionDescriptions = field.optionDescription || [];

        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(fieldKey)}
                className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white cursor-pointer`}
              >
                <span
                  className={
                    formData[field.label] ? "text-charcoal" : "text-slate"
                  }
                >
                  {formData[field.label] || field.placeholder}
                </span>
                <ChevronDown className="w-5 h-5 text-slate" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-80 overflow-hidden">
                  <div className="p-2 border-b border-silver">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) =>
                          setSearchTerms((prev) => ({
                            ...prev,
                            [fieldKey]: e.target.value,
                          }))
                        }
                        className="w-full pl-9 pr-3 py-2 border border-silver rounded focus:outline-none focus:ring-2 focus:ring-cerulean text-sm"
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-64 p-2">
                    {radioFilteredOptions.length > 0 ? (
                      radioFilteredOptions.map((option, idx) => {
                        const isSelected = formData[field.label] === option;
                        return (
                          <label
                            key={idx}
                            className="flex items-start gap-3 p-3 hover:bg-platinum rounded-lg cursor-pointer transition-colors"
                          >
                            <div className="relative flex items-center justify-center mt-0.5">
                              <input
                                type="radio"
                                name={fieldKey}
                                checked={isSelected}
                                onChange={() =>
                                  selectOption(fieldKey, field.label, option)
                                }
                                className="w-4 h-4 text-cerulean border-silver focus:ring-2 focus:ring-cerulean cursor-pointer"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-charcoal">
                                {option}
                              </div>
                              {optionDescriptions[idx] && (
                                <div className="text-xs text-slate mt-1">
                                  {optionDescriptions[idx]}
                                </div>
                              )}
                            </div>
                          </label>
                        );
                      })
                    ) : (
                      <div className="px-4 py-2 text-slate text-sm">
                        No options found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {renderError(field.label)}
          </div>
        );

      case "file":
        const files = selectedFiles[field.label] || [];

        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <div
              className={`border-2 ${errorBorderClass} border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-cerulean transition-colors`}
              onClick={() =>
                document.getElementById(`file-input-${fieldKey}`)?.click()
              }
            >
              <input
                id={`file-input-${fieldKey}`}
                type="file"
                multiple={field.multiple}
                accept={field.accept}
                onChange={(e) => handleFileChange(field.label, e.target.files)}
                className="hidden"
              />
              <Plus className="w-8 h-8 mx-auto text-slate mb-2" />
              <p className="text-sm text-slate">
                {field.placeholder || "Click to upload files"}
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-2 bg-platinum rounded-lg"
                  >
                    <span className="text-sm text-charcoal truncate">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(field.label, idx)}
                      className="ml-2 text-slate hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {renderError(field.label)}
          </div>
        );

      case "toggle":
        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            <div className="flex items-center justify-between">
              {renderLabel(field)}
              <button
                type="button"
                onClick={() =>
                  handleInputChange(field.label, !formData[field.label])
                }
                className={`relative w-14 h-6 rounded-full transition-colors cursor-pointer ${
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
          </div>
        );

      case "tag-input":
        const tags = formData[field.label] || [];
        const tagInputKey = `${fieldKey}-input`;

        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
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
                className={`flex-1 px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate`}
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
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {renderError(field.label)}
          </div>
        );

      case "checkbox-group":
        const selectedOptions = formData[field.label] || [];

        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <div className="space-y-2">
              {field.box?.map((option: any, idx: number) => {
                const isChecked = selectedOptions.includes(option.label);
                return (
                  <label
                    key={idx}
                    className="flex items-center gap-3 p-3 border border-silver rounded-lg hover:bg-platinum cursor-pointer transition-colors group"
                  >
                    <span
                      className={`flex items-center justify-center w-5 h-5 border-2 rounded transition-colors ${
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

      case "list-with-add":
        const listItems = formData[field.label] || [];

        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            <div className="flex items-center justify-between mb-2">
              {renderLabel(field)}
              <button
                type="button"
                onClick={() => {
                  if (field.modal) {
                    openModal(field.modal, field.label);
                  }
                }}
                className="px-3 py-1.5 border border-silver rounded-md hover:bg-platinum transition-colors flex items-center gap-1 text-charcoal text-sm font-medium cursor-pointer"
              >
                {field.buttonName || "Add"}
              </button>
            </div>

            {listItems.length === 0 ? (
              <div className="w-full px-4 py-6 border border-silver rounded-lg bg-platinum/20 text-center">
                <p className="text-slate text-sm">
                  {field.message || field.placeholder}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {listItems.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-3 border border-silver rounded-lg bg-white hover:bg-platinum/30 transition-colors group"
                  >
                    <div className="flex-1">
                      <p className="text-charcoal font-medium text-sm">
                        {typeof item === "string"
                          ? item
                          : item.name || item.label}
                      </p>
                      {typeof item === "object" && item.description && (
                        <p className="text-slate text-xs mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = listItems.filter(
                          (_: any, i: number) => i !== idx
                        );
                        handleInputChange(field.label, newItems);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity ml-3 text-slate hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "stage-dropdown":
        const defaultStageColors: Record<string, string> = {
          "Lead (10%)": "bg-slate",
          "Qualified (35%)": "bg-cerulean",
          "Proposal (50%)": "bg-yellow-500",
          "Negotiation (85%)": "bg-orange-500",
          "Closed Won (100%)": "bg-green-500",
          "Closed Lost (0%)": "bg-red-500",
          "Closed Other (0%)": "bg-slate",
          Low: "bg-slate",
          Medium: "bg-cerulean",
          High: "bg-orange-500",
          Urgent: "bg-red-500",
        };

        const colorMap = field.optionColors || defaultStageColors;

        return (
          <div
            key={fieldKey}
            className={getFieldWidth(field.nature)}
            data-field={field.label}
          >
            {renderLabel(field)}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(fieldKey)}
                className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white cursor-pointer`}
              >
                <div className="flex items-center gap-2">
                  {formData[field.label] && (
                    <span
                      className={`w-3 h-3 rounded-full ${
                        colorMap[formData[field.label]] || "bg-slate"
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
                <ChevronDown className="w-5 h-5 text-slate" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {field.option?.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        selectOption(fieldKey, field.label, option)
                      }
                      className="w-full px-4 py-2 text-left hover:bg-platinum transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${
                          colorMap[option] || "bg-slate"
                        }`}
                      ></span>
                      <span className="text-charcoal text-sm">{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {renderError(field.label)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-8">
        {config.map((item, itemIndex) => {
          if (isFieldConfig(item)) {
            return renderField(item, itemIndex, 0);
          }

          if (isSectionConfig(item)) {
            if (item.sectionName === "button" && item.button) {
              return (
                <div key={itemIndex} className="flex gap-4 justify-end">
                  {item.button.map((btnText, btnIdx) => (
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

            return (
              <div
                key={itemIndex}
                className={`${
                  item.sectionBorder
                    ? "border-2 border-charcoal rounded-lg p-6"
                    : "space-y-4"
                }`}
              >
                {item.sectionName && item.sectionName !== "button" && (
                  <div className="flex items-center gap-3 mb-4">
                    {item.Icon && (
                      <div className="text-charcoal">{item.Icon}</div>
                    )}
                    <h2 className="text-xl font-semibold text-charcoal">
                      {item.sectionName}
                    </h2>
                  </div>
                )}
                {item.fields && (
                  <div className="flex flex-wrap gap-4">
                    {item.fields.map((field, fieldIndex) =>
                      renderField(field, itemIndex, fieldIndex)
                    )}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>

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
