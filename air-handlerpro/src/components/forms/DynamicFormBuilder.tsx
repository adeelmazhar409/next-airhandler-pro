import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  Calendar,
  Plus,
  Search,
  X,
  Clock,
  CloudCog,
} from "lucide-react";
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
  getDisplayOptions,
  getDisplayValue,
  getFieldWidth,
} from "../utility/HelperFunctions";
import { inspect } from "util";

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({
  linkTableData,
  editingData,
  config,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    editingData || {}
  );

  // Previous form data variables

  // const [formData, setFormData] = useState<Record<string, any>>({});
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

              case "textarea":
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

              case "toggle":
                fieldSchema = z
                  .boolean()
                  .refine(
                    (val) => val === true || val === false,
                    "Please select a value"
                  );
                break;

              case "checkbox-group":
                fieldSchema = z
                  .array(z.string())
                  .min(1, `${field.label} is required`);
                break;

              case "list-with-add":
                fieldSchema = z
                  .array(z.any())
                  .min(1, `${field.label} is required`);
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

  // Initialize React Hook Form
  const {
    control,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createValidationSchema()),
    defaultValues: editingData || {},
  });

  // Watch all form values for debugging
  const formValues = watch();
  
  useEffect(() => {
    if (editingData) {
      reset(editingData);
    }
  }, [editingData, reset]);

  const toggleDropdown = (label: string) => {
    setDropdownStates((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const selectOption = (fieldKey: string, value: string, onChange: any) => {
    onChange(value);
    toggleDropdown(fieldKey);
    setSearchTerms((prev) => ({ ...prev, [fieldKey]: "" }));
  };

  const handleFileChange = (
    label: string,
    files: FileList | null,
    onChange: any
  ) => {
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles((prev) => ({
        ...prev,
        [label]: fileArray,
      }));
      onChange(fileArray);
    }
  };

  const removeFile = (
    label: string,
    index: number,
    currentFiles: File[],
    onChange: any
  ) => {
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    setSelectedFiles((prev) => ({
      ...prev,
      [label]: updatedFiles,
    }));
    onChange(updatedFiles);
  };

  const onFormSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    if (onSubmit) {
      onSubmit(data);
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
        {field.Title}
        {field.required && (
          <span className="text-red-500 ml-1 text-base align-super">*</span>
        )}
      </label>
    );
  };

  const renderError = (fieldLabel: string) => {
    const error = errors[fieldLabel];
    if (error) {
      return (
        <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
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
    const hasError = !!errors[field.label];
    const errorBorderClass = hasError ? "border-red-500" : "border-silver";

    switch (field.type) {
      case "text":
      case "number":
      case "email":
      case "url":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <div
                className={getFieldWidth(field.nature)}
                data-field={field.label}
              >
                {renderLabel(field)}
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={value || ""}
                  onChange={onChange}
                  className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate`}
                />
                {renderError(field.label)}
                {field.message && !hasError && (
                  <p className="text-gray-500 text-[12px] mt-2">
                    {field.message}
                  </p>
                )}
              </div>
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <div
                className={getFieldWidth(field.nature)}
                data-field={field.label}
              >
                {renderLabel(field)}
                <textarea
                  placeholder={field.placeholder}
                  value={value || ""}
                  onChange={onChange}
                  rows={field.rows || 4}
                  className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate resize-y`}
                />
                {renderError(field.label)}
              </div>
            )}
          />
        );

      case "date":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <div
                className={getFieldWidth(field.nature)}
                data-field={field.label}
              >
                {renderLabel(field)}
                <div className="relative">
                  <input
                    type="date"
                    value={value || ""}
                    onChange={onChange}
                    className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal cursor-pointer`}
                  />
                </div>
                {renderError(field.label)}
              </div>
            )}
          />
        );

      case "time":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <div
                className={getFieldWidth(field.nature)}
                data-field={field.label}
              >
                {renderLabel(field)}
                <div className="relative">
                  <input
                    type="time"
                    value={value || ""}
                    onChange={onChange}
                    className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal cursor-pointer`}
                  />
                </div>
                {renderError(field.label)}
              </div>
            )}
          />
        );

      case "date&time":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue={{ date: "", hour: "", minute: "" }}
            render={({ field: { onChange, value } }) => {
              const currentValue = value || { date: "", hour: "", minute: "" };

              return (
                <div
                  className={getFieldWidth(field.nature)}
                  data-field={field.label}
                >
                  {renderLabel(field)}
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="date"
                        value={currentValue.date || ""}
                        onChange={(e) =>
                          onChange({ ...currentValue, date: e.target.value })
                        }
                        className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-charcoal cursor-pointer`}
                      />
                    </div>

                    <div className="w-24 relative">
                      <select
                        value={currentValue.hour || ""}
                        onChange={(e) =>
                          onChange({ ...currentValue, hour: e.target.value })
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
                        value={currentValue.minute || ""}
                        onChange={(e) =>
                          onChange({ ...currentValue, minute: e.target.value })
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
            }}
          />
        );

      case "search-dropdown":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => {
              const displayOptions = getDisplayOptions(
                linkTableData || [],
                field.linkTable
              );
              const displayValue = getDisplayValue(
                displayOptions,
                value,
                field.linkTableValue as string | string[]
              );

              return (
                <div
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
                      <span className={value ? "text-charcoal" : "text-slate"}>
                        {value || field.placeholder}
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
                              value={searchTerm || field.placeholder}
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
                          {displayOptions.length > 0 ? (
                            displayOptions.map((option, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                  selectOption(fieldKey, option.id, onChange)
                                }
                                className="w-full px-4 py-2 text-left hover:bg-platinum transition-colors text-charcoal text-sm cursor-pointer"
                              >
                                {Array.isArray(field.linkTableValue)
                                  ? field.linkTableValue
                                      .map(
                                        (value) =>
                                          option[value as keyof typeof option]
                                      )
                                      .join(" ")
                                  : option[
                                      field.linkTableValue as keyof typeof option
                                    ]}
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
            }}
          />
        );

      case "dropdown":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => {
              const displayOptions = getDisplayOptions(
                linkTableData || [],
                field.linkTable
              );
              const displayValue = getDisplayValue(
                displayOptions,
                value,
                field.linkTableValue as string | string[]
              );

              return (
                <div
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
                      <span className={value ? "text-charcoal" : "text-slate"}>
                        {displayValue || field.placeholder}
                      </span>
                      <ChevronDown className="w-5 h-5 text-slate" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-hidden">
                        <div className="overflow-y-auto max-h-60">
                          {displayOptions?.map((option, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                // Store the ID, not the display value
                                onChange(option.id);
                                toggleDropdown(fieldKey);
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-platinum transition-colors text-charcoal text-sm cursor-pointer"
                            >
                              {Array.isArray(field.linkTableValue)
                                ? field.linkTableValue
                                    .map(
                                      (value) =>
                                        option[value as keyof typeof option]
                                    )
                                    .join(" ")
                                : option[
                                    field.linkTableValue as keyof typeof option
                                  ]}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {renderError(field.label)}
                </div>
              );
            }}
          />
        );

      case "radio-dropdown":
        const radioFilteredOptions =
          field.option?.filter((option) =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
          ) || [];
        const optionDescriptions = field.optionDescription || [];

        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <div
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
                    <span className={value ? "text-charcoal" : "text-slate"}>
                      {value || field.placeholder}
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
                            const isSelected = value === option;
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
                                      selectOption(fieldKey, option, onChange)
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
            )}
          />
        );

      case "file":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => {
              const files = (value as File[]) || [];

              return (
                <div
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
                      onChange={(e) =>
                        handleFileChange(field.label, e.target.files, onChange)
                      }
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
                            onClick={() =>
                              removeFile(field.label, idx, files, onChange)
                            }
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
            }}
          />
        );

      case "toggle":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <div
                className={getFieldWidth(field.nature)}
                data-field={field.label}
              >
                <div className="flex items-center justify-between">
                  {renderLabel(field)}
                  <button
                    type="button"
                    onClick={() => onChange(!value)}
                    className={`relative w-14 h-6 rounded-full transition-colors cursor-pointer ${
                      value ? "bg-cerulean" : "bg-silver"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          />
        );

      case "tag-input":
        const tagInputKey = `${fieldKey}-input`;

        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => {
              const tags = (value as string[]) || [];

              return (
                <div
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
                        if (
                          e.key === "Enter" &&
                          searchTerms[tagInputKey]?.trim()
                        ) {
                          e.preventDefault();
                          onChange([...tags, searchTerms[tagInputKey].trim()]);
                          setSearchTerms((prev) => ({
                            ...prev,
                            [tagInputKey]: "",
                          }));
                        }
                      }}
                      className={`flex-1 px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-charcoal placeholder-slate`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (searchTerms[tagInputKey]?.trim()) {
                          onChange([...tags, searchTerms[tagInputKey].trim()]);
                          setSearchTerms((prev) => ({
                            ...prev,
                            [tagInputKey]: "",
                          }));
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
                              onChange(newTags);
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
            }}
          />
        );

      case "checkbox-group":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => {
              const selectedOptions = (value as string[]) || [];

              return (
                <div
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
                          onClick={() => {
                            const newSelected = isChecked
                              ? selectedOptions.filter(
                                  (item) => item !== option.label
                                )
                              : [...selectedOptions, option.label];
                            onChange(newSelected);
                          }}
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
            }}
          />
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
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <div
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
                      {value && (
                        <span
                          className={`w-3 h-3 rounded-full ${
                            colorMap[value] || "bg-slate"
                          }`}
                        ></span>
                      )}
                      <span className={value ? "text-charcoal" : "text-slate"}>
                        {value || field.placeholder}
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
                            selectOption(fieldKey, option, onChange)
                          }
                          className="w-full px-4 py-2 text-left hover:bg-platinum transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <span
                            className={`w-3 h-3 rounded-full ${
                              colorMap[option] || "bg-slate"
                            }`}
                          ></span>
                          <span className="text-charcoal text-sm">
                            {option}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {renderError(field.label)}
              </div>
            )}
          />
        );

      case "list-with-add":
        return (
          <Controller
            key={fieldKey}
            name={field.label}
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => {
              const displayOptions = getDisplayOptions(
                linkTableData || [],
                field.linkTable
              );
              const displayValue = getDisplayValue(
                displayOptions,
                value,
                field.linkTableValue as string | string[]
              );

              // Filter by search term first, then remove already selected items
              const filteredDisplayOptions = displayOptions
                .filter((option: any) => {
                  if (!searchTerm) return true;
                  const searchLower = searchTerm.toLowerCase();
                  // Search in the display value(s)
                  if (Array.isArray(field.linkTableValue)) {
                    return field.linkTableValue.some((key) =>
                      String(option[key as keyof typeof option])
                        .toLowerCase()
                        .includes(searchLower)
                    );
                  } else {
                    return String(
                      option[field.linkTableValue as keyof typeof option]
                    )
                      .toLowerCase()
                      .includes(searchLower);
                  }
                })
                .filter((option: any) => !value.includes(option.id));

              return (
                <div
                  className={getFieldWidth(field.nature)}
                  data-field={field.label}
                >
                  {renderLabel(field)}
                  <div className="flex gap-2 items-center justify-end mb-2">
                      {field.placeholder && (
                    <div className="w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <button
                            type="button"
                            onClick={() => toggleDropdown(fieldKey)}
                            className={`w-full px-4 py-3 border ${errorBorderClass} rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean text-left flex items-center justify-between bg-white cursor-pointer`}
                          >
                            <span
                              className={
                                displayValue && displayValue.length > 0
                                  ? "text-charcoal"
                                  : "text-slate"
                              }
                            >
                              {displayValue || field.placeholder}
                            </span>
                            <ChevronDown className="w-5 h-5 text-slate" />
                          </button>
                          {isDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-silver rounded-lg shadow-lg max-h-60 overflow-hidden">
                              {/* search input */}
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
                                    className="w-full pl-9 pr-3 py-2 border border-silver rounded focus:outline-none focus:ring-2 focus:ring-cerulean text-sm text-charcoal"
                                  />
                                </div>
                              </div>
                              {/* list of items */}
                              <div className="overflow-y-auto max-h-48 py-2">
                                {filteredDisplayOptions.length > 0 ? (
                                  filteredDisplayOptions.map(
                                    (option: any, idx: any) => {
                                      return (
                                        <button
                                          key={idx}
                                          type="button"
                                          onClick={() => {
                                            if (!value.includes(option.id)) {
                                              onChange(option.id);
                                              toggleDropdown(fieldKey);
                                              setSearchTerms((prev) => ({
                                                ...prev,
                                                [fieldKey]: "",
                                              }));
                                            }
                                          }}
                                          disabled={value.includes(option.id)}
                                          className={`w-full px-4 py-2 text-left hover:bg-platinum transition-colors text-charcoal text-sm ${
                                            value.includes(option.id)
                                              ? "opacity-50 cursor-not-allowed"
                                              : "cursor-pointer"
                                          }`}
                                        >
                                          {Array.isArray(field.linkTableValue)
                                            ? field.linkTableValue
                                                .map(
                                                  (value) =>
                                                    option[
                                                      value as keyof typeof option
                                                    ]
                                                )
                                                .join(" ")
                                            : option[
                                                field.linkTableValue as keyof typeof option
                                              ]}
                                        </button>
                                      );
                                    }
                                  )
                                ) : (
                                  <div className="px-4 py-2 text-slate text-sm">
                                    No options found
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                    </div>
                      )}
                    <button
                      type="button"
                      onClick={() => {
                        if (field.modal) {
                          openModal(field.modal, field.label);
                        }
                      }}
                      className="px-4 py-3 w-fit border border-silver rounded-md hover:bg-platinum transition-colors text-charcoal text-sm font-medium cursor-pointer"
                    >
                      {field.buttonName || "Add"}
                    </button>
                  </div>
                  {!field.placeholder && displayValue.length === 0 ? (
                    <div className="w-full px-4 py-6 border border-silver rounded-lg bg-platinum/20 text-center">
                      <p className="text-slate text-sm">
                        {field.message ||
                          field.placeholder ||
                          "No items added yet"}
                      </p>
                    </div>
                  ) : !field.placeholder && displayValue.length > 0 ? (
                    <div className="space-y-2">
                      {displayValue.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-4 py-3 border border-silver rounded-lg bg-white hover:bg-platinum/30 transition-colors group"
                        >
                          <div className="flex-1">
                            <p className="text-charcoal font-medium text-sm">
                              {typeof item === "string"
                                ? item
                                : Array.isArray(field.linkTableValue)
                                ? field.linkTableValue
                                    .map(
                                      (value) =>
                                        item[value as keyof typeof item]
                                    )
                                    .join(" ")
                                : item[
                                    field.linkTableValue as keyof typeof item
                                  ]}
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
                              const newItems = displayValue.filter(
                                (_: any, i: number) => i !== idx
                              );
                              onChange(newItems);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity ml-3 text-slate hover:text-red-500 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {renderError(field.label)}
                </div>
              );
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form onSubmit={rhfHandleSubmit(onFormSubmit)} className="space-y-8">
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
                      type={btnIdx === 0 ? "button" : "submit"}
                      onClick={btnIdx === 0 ? onCancel : undefined}
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
      </form>

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
