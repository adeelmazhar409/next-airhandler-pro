"use client";

import { useState } from "react";

interface ServiceReportCreateFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export function ServiceReportCreateForm({
  onCancel,
  onSubmit,
}: ServiceReportCreateFormProps) {
  const [formData, setFormData] = useState({
    workOrderNumber: "",
    technician: "",
    startTime: "",
    endTime: "",
    workPerformed: "",
    partsUsed: "",
    recommendations: "",
    customerName: "",
    status: "Draft",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Service Report Data:", formData);
    onSubmit(formData);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-charcoal hover:text-slate transition-colors mb-4 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Service Reports</span>
        </button>
        <h1 className="text-3xl font-bold text-charcoal">
          Create Service Report
        </h1>
        <p className="text-slate mt-1">
          Document completed work, parts used, and customer signatures
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-8"
      >
        {/* Work Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-charcoal mb-4">
            Work Information
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Work Order Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="workOrderNumber"
                value={formData.workOrderNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
                placeholder="Enter work order number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Technician <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="technician"
                value={formData.technician}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
                placeholder="Technician name"
                required
              />
            </div>
          </div>
        </div>

        {/* Time & Duration Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-charcoal mb-4">
            Time & Duration
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
                required
              />
            </div>
          </div>
        </div>

        {/* Work Details Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-charcoal mb-4">Work Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Work Performed <span className="text-red-500">*</span>
              </label>
              <textarea
                name="workPerformed"
                value={formData.workPerformed}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
                placeholder="Describe the work that was completed..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Parts & Materials Used
              </label>
              <textarea
                name="partsUsed"
                value={formData.partsUsed}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
                placeholder="List all parts and materials used..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Recommendations
              </label>
              <textarea
                name="recommendations"
                value={formData.recommendations}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
                placeholder="Any recommendations for future maintenance or repairs..."
              />
            </div>
          </div>
        </div>

        {/* Customer Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-charcoal mb-4">
            Customer Information
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Report Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
                required
              >
                <option value="Draft">Draft</option>
                <option value="Pending Signature">Pending Signature</option>
                <option value="Signed">Signed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-charcoal mb-4">
            Additional Information
          </h2>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-silver rounded-lg focus:outline-none focus:ring-2 focus:ring-cerulean"
              placeholder="Any additional notes or observations..."
            />
          </div>
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-silver rounded-lg text-charcoal hover:bg-platinum transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-charcoal transition-colors"
          >
            Create Service Report
          </button>
        </div>
      </form>
    </div>
  );
}
