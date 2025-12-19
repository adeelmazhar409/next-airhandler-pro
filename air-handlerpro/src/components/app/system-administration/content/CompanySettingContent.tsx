"use client";

import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Save,
  Calendar,
  Settings,
  MapPin,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

export default function CompanySettings() {
  const [activeTab, setActiveTab] = useState("company-overview");

  const locations = [
    {
      name: "AirHandler Pro HQ",
      address: "32646 Welsh Trail",
      city: "Sorrento",
      state: "FL",
      zip: "32776",
      active: true,
    },
  ];

  return (
    <div className="p-8 space-y-6 flex flex-col max-w-4xl mx-auto">
      {/* Company Logo Section - Full Width */}
      <div className="bg-white border border-slate/30 rounded-lg p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <ImageIcon className="w-6 h-6" />
          Company Logo
        </h2>
        <div className="max-w-md">
          <div className="border-2 border-dashed border-slate/30 rounded-lg p-12 text-center bg-gray-50">
            <ImageIcon className="w-16 h-16 text-slate mx-auto mb-4" />
            <button className="px-4 py-2 bg-white border border-silver rounded-lg text-sm font-medium text-charcoal hover:bg-platinum transition-colors">
              Upload Image
            </button>
          </div>
        </div>
      </div>

      {/* Default Maintenance Estimate Settings - Full Width */}
      <div className="bg-white border border-slate/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Default Maintenance Estimate Settings
        </h2>

        <div className="space-y-6 max-w-4xl">
          {/* Standard Setup Hours Per Visit */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Standard Setup Hours Per Visit
            </label>
            <input
              type="text"
              defaultValue="0.25"
              className="w-full max-w-md px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
            />
            <p className="text-xs text-slate mt-1">
              Defaults: 0.25 hours (15 minutes) for equipment setup and takedown
            </p>
          </div>

          {/* Divider */}
          <hr className="border-slate/30" />

          {/* Travel Fee Type */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-3">
              Travel Fee Type for Estimates
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="travelFee"
                  defaultChecked
                  className="w-4 h-4 text-cerulean border-silver focus:ring-cerulean"
                />
                <span className="text-sm text-charcoal">
                  Calculate Mileage (one-way distance × rate)
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="travelFee"
                  className="w-4 h-4 text-cerulean border-silver focus:ring-cerulean"
                />
                <span className="text-sm text-charcoal">
                  Flat Trip Charge (per visit)
                </span>
              </label>
            </div>
            <p className="text-xs text-slate mt-2">
              Estimates will calculate one-way mileage using Google Maps API and
              multiply by the mileage rate below.
            </p>
          </div>

          {/* Divider */}
          <hr className="border-slate/30" />

          {/* Default Trip Cost Type */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-3">
              Default Trip Cost Type for Estimates
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripCost"
                  defaultChecked
                  className="w-4 h-4 text-cerulean border-silver focus:ring-cerulean"
                />
                <span className="text-sm text-charcoal">
                  Mileage Calculator (miles × rate × visits)
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripCost"
                  className="w-4 h-4 text-cerulean border-silver focus:ring-cerulean"
                />
                <span className="text-sm text-charcoal">
                  Trip Charge (flat fee per visit month)
                </span>
              </label>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-slate/30" />

          {/* Grid for Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Mileage Rate */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Mileage Rate ($ per mile)
              </label>
              <input
                type="text"
                defaultValue="0.68"
                className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>

            {/* Mileage Rate Effective Date */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Mileage Rate Effective Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pick a date"
                  className="w-full px-4 py-2 pl-10 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                />
                <Calendar className="w-4 h-4 text-slate absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Trip Charge */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Trip Charge ($ per visit month)
              </label>
              <input
                type="text"
                defaultValue="0.00"
                className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>

            {/* Travel Charge Effective Date */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Travel Charge Effective Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pick a date"
                  className="w-full px-4 py-2 pl-10 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                />
                <Calendar className="w-4 h-4 text-slate absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Labor Warranty */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Labor Warranty (%)
              </label>
              <input
                type="text"
                defaultValue="0.00"
                className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>

            {/* Default Hours Worked Per Day */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Default Hours Worked Per Day
              </label>
              <input
                type="text"
                defaultValue="8.00"
                className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full max-w-xs px-4 py-3 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal/90 transition-colors">
            Save Settings
          </button>
        </div>
      </div>

      {/* Company Locations - Full Width */}
      <div className="bg-white border border-slate/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-charcoal flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Company Locations (Home Bases)
          </h2>
          <button className="px-4 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-charcoal/90 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Location
          </button>
        </div>

        <div className="border border-slate/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-slate/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate">
                  Location Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate">
                  Address
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate">
                  City
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate">
                  State
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate">
                  Zip
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate">
                  Active
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <tr
                  key={index}
                  className="border-b border-slate/30 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-charcoal">
                    {location.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal">
                    {location.address}
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal">
                    {location.city}
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal">
                    {location.state}
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal">
                    {location.zip}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-green-600 font-medium">Yes</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-charcoal" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-charcoal" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
