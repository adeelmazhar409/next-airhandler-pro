"use client";

import { useState } from "react";
import DynamicFormBuilder from "@/components/forms/DynamicFormBuilder";
import { DealFormProps } from "@/components/forms/forms-instructions/DealProp";
import { createDeal } from "@/service/deals";

interface DealFormComponentProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export function DealForm({ onCancel, onSubmit }: DealFormComponentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // DEBUG: Log what's coming from the form
      console.log("Raw form data from DynamicFormBuilder:", formData);

      // Transform the form data to match the API expected format
      // DynamicFormBuilder uses the 'label' property as keys
      const transformedData = {
        dealName: formData["Deal Name"] || "",
        dealValue: formData["Deal Value ($)"]
          ? parseFloat(formData["Deal Value ($)"])
          : 0,
        probability: formData["Probability (%)"]
          ? parseInt(formData["Probability (%)"])
          : 0,
        stage: formData["Stage"] || "Lead (10%)",
        expectedCloseDate: formData["Expected Close Date"] || null,
        source: formData["Source"] || null,
        parentCompany: formData["Parent Company"] || null,
        serviceSite: formData["Service Site"] || "",
        description: formData["Description"] || null,
      };

      console.log("Transformed data being sent to API:", transformedData);

      // Validate required fields
      if (!transformedData.dealName) {
        throw new Error("Deal Name is required");
      }
      if (!transformedData.serviceSite) {
        throw new Error("Service Site is required");
      }

      // Call the service function with transformed data
      const result = await createDeal(transformedData);

      if (!result.success) {
        throw new Error(result.error || "Failed to create deal");
      }

      console.log("Success:", result.message);
      console.log("Created deal data:", result.data);

      // Call the parent's onSubmit handler with the created deal data
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
          <span>Back to Pipeline</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">Create New Deal</h1>
        <p className="text-slate mt-1">Add a new deal to your sales pipeline</p>
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
                Error Creating Deal
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Form */}
      <div className="bg-white rounded-lg shadow-sm p-8 relative">
        <DynamicFormBuilder
          config={DealFormProps}
          onSubmit={handleFormSubmit}
          onCancel={onCancel}
        />

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-lg border border-slate">
              <div className="w-5 h-5 border-2 border-cerulean border-t-transparent rounded-full animate-spin" />
              <span className="text-charcoal font-medium">
                Creating deal...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
