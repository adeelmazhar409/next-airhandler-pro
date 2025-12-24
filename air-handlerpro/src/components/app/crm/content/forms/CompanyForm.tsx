"use client";

import { useState } from "react";
import DynamicFormBuilder from "@/components/forms/DynamicFormBuilder";
import { CompanyFormProps } from "@/components/forms/forms-instructions/CompanyProp";
import { createCompany, updateCompany, type Company } from "@/service/companies";

interface CompanyFormComponentProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
  editingCompany?: Company | null;
}

export function CompanyForm({ onCancel, onSubmit, editingCompany }: CompanyFormComponentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!editingCompany;

  // Pre-fill the form config with editing company data
  const formConfig = isEditMode && editingCompany
    ? CompanyFormProps.map((section) => {
        if ('fields' in section && section.fields) {
          return {
            ...section,
            fields: section.fields.map((field) => {
              if (field.label === "Business Name") {
                return { ...field, placeholder: editingCompany.business_name };
              }
              if (field.label === "Company Type") {
                return { ...field, placeholder: editingCompany.company_type };
              }
              if (field.label === "Primary Contact") {
                return {
                  ...field,
                  placeholder:
                    typeof editingCompany.primary_contact === "string"
                      ? editingCompany.primary_contact
                      : "",
                };
              }
              if (field.label === "Billing Address") {
                return { ...field, placeholder: editingCompany.billing_address };
              }
              return field;
            }),
          };
        }
        return section;
      })
    : CompanyFormProps;

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // DEBUG: Log what's coming from the form
      console.log("Raw form data from DynamicFormBuilder:", formData);

      // Transform the form data to match the API expected format
      // DynamicFormBuilder uses the 'label' property as keys
      const transformedData = {
        businessName: formData["Business Name"] || "",
        companyType: formData["Company Type"] || "",
        primaryContact: formData["Primary Contact"] || "",
        billingAddress: formData["Billing Address"] || "",
        serviceSites: formData["Service Sites"] || [], // This is a list-with-add field
      };

      console.log("Transformed data being sent to API:", transformedData);

      // In edit mode, use existing values for empty fields
      if (isEditMode && editingCompany) {
        if (!transformedData.businessName) {
          transformedData.businessName = editingCompany.business_name;
        }
        if (!transformedData.companyType) {
          transformedData.companyType = editingCompany.company_type;
        }
        if (!transformedData.primaryContact) {
          transformedData.primaryContact =
            typeof editingCompany.primary_contact === "string"
              ? editingCompany.primary_contact
              : "";
        }
        if (!transformedData.billingAddress) {
          transformedData.billingAddress = editingCompany.billing_address;
        }
      }

      // Validate required fields
      if (!transformedData.businessName) {
        throw new Error("Business Name is required");
      }
      if (!transformedData.companyType) {
        throw new Error("Company Type is required");
      }
      if (!transformedData.primaryContact) {
        throw new Error("Primary Contact is required");
      }
      if (!transformedData.billingAddress) {
        throw new Error("Billing Address is required");
      }

      // Call the appropriate service function based on mode
      let result;
      if (isEditMode && editingCompany) {
        result = await updateCompany(editingCompany.id, transformedData);
        if (!result.success) {
          throw new Error(result.error || "Failed to update company");
        }
        console.log("Success:", result.message);
        console.log("Updated company data:", result.data);
      } else {
        result = await createCompany(transformedData);
        if (!result.success) {
          throw new Error(result.error || "Failed to create company");
        }
        console.log("Success:", result.message);
        console.log("Created company data:", result.data);
      }

      // Call the parent's onSubmit handler with the company data
      onSubmit(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex items-center gap-2 text-charcoal hover:text-slate transition-colors mb-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>←</span>
          <span>Back to Companies</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">
          {isEditMode ? "Edit Company" : "Add Parent Company"}
        </h1>
        <p className="text-slate mt-1">
          {isEditMode
            ? "Update company information and manage customer relationships."
            : "Create a new parent company to organize your service sites and manage customer relationships."}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Error {isEditMode ? "Updating" : "Creating"} Company
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Form */}
      <div className="bg-white rounded-lg shadow-sm p-8 relative">
        <DynamicFormBuilder
          config={formConfig}
          onSubmit={handleFormSubmit}
          onCancel={onCancel}
        />

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-lg border border-slate">
              <div className="w-5 h-5 border-2 border-cerulean border-t-transparent rounded-full animate-spin" />
              <span className="text-charcoal font-medium">
                {isEditMode ? "Updating company..." : "Creating company..."}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
