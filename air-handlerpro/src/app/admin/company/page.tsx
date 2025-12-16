"use client";
import React, { useState } from "react";
import Image from "next/image";

// Icons
const UploadIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const BuildingIcon = () => (
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
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const DollarIcon = () => (
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
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ToolIcon = () => (
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
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);

interface LaborRate {
  type: "Journeyman" | "Technician" | "Helper";
  hourlyRate: string;
}

interface EquipmentRule {
  id: string;
  equipmentType: string;
  defaultLaborType: "Journeyman" | "Technician" | "Helper";
}

export default function CompanyAdminPage() {
  const [activeTab, setActiveTab] = useState("company-info");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("ACME HVAC Services");
  const [laborRates, setLaborRates] = useState<LaborRate[]>([
    { type: "Journeyman", hourlyRate: "75.00" },
    { type: "Technician", hourlyRate: "55.00" },
    { type: "Helper", hourlyRate: "35.00" },
  ]);

  const [equipmentRules, setEquipmentRules] = useState<EquipmentRule[]>([
    {
      id: "1",
      equipmentType: "RTU (Rooftop Unit)",
      defaultLaborType: "Journeyman",
    },
    { id: "2", equipmentType: "Split System", defaultLaborType: "Technician" },
    { id: "3", equipmentType: "Chiller", defaultLaborType: "Journeyman" },
    { id: "4", equipmentType: "Boiler", defaultLaborType: "Journeyman" },
    { id: "5", equipmentType: "Heat Pump", defaultLaborType: "Technician" },
    { id: "6", equipmentType: "Air Handler", defaultLaborType: "Technician" },
    { id: "7", equipmentType: "Exhaust Fan", defaultLaborType: "Helper" },
    { id: "8", equipmentType: "Pump", defaultLaborType: "Helper" },
  ]);

  const tabs = [
    { name: "Company Info", value: "company-info" },
    { name: "Labor Rates", value: "labor-rates" },
    { name: "Equipment Rules", value: "equipment-rules" },
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLaborRateChange = (index: number, value: string) => {
    const newRates = [...laborRates];
    newRates[index].hourlyRate = value;
    setLaborRates(newRates);
  };

  const handleEquipmentRuleChange = (
    id: string,
    laborType: "Journeyman" | "Technician" | "Helper"
  ) => {
    const newRules = equipmentRules.map((rule) =>
      rule.id === id ? { ...rule, defaultLaborType: laborType } : rule
    );
    setEquipmentRules(newRules);
  };

  const handleSave = () => {
    console.log("Saving company settings...");
    // Add your save logic here
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-platinum/10 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center    text-charcoal mb-2">
          Company Admin Panel
        </h1>
        <p className="text-slate text-center text-[15px]">
          Manage your company settings, labor rates, and equipment
          configurations
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className=" relative">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`pb-4  text-[15px] font-medium relative transition-colors ${
                  activeTab === tab.value
                    ? "text-charcoal font-semibold"
                    : "text-slate hover:text-charcoal"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Animated Underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-cerulean transition-all duration-300 ease-in-out"
            style={{
              left: `${
                tabs.findIndex((tab) => tab.value === activeTab) * 125
              }px`,
              width: "100px",
            }}
          />
        </div>
      </div>

      {/* Company Info Tab */}
      {activeTab === "company-info" && (
        <div className="max-w-3xl">
          <div className="bg-white border-2 border-charcoal rounded-3xl p-6 shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-cerulean/10 flex items-center justify-center">
                <BuildingIcon />
              </div>
              <h2 className="text-lg font-bold text-charcoal">
                Company Information
              </h2>
            </div>

            {/* Company Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-silver rounded-lg text-[15px] text-charcoal focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors"
                placeholder="Enter company name"
              />
            </div>

            {/* Logo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Company Logo
              </label>
              <p className="text-sm text-slate mb-4">
                Upload your company logo. This will appear on estimates and
                proposals.
              </p>

              <div className="border-2 border-dashed border-silver rounded-xl p-8 text-center hover:border-cerulean transition-colors">
                {logoPreview ? (
                  <div className="space-y-4">
                    <div className="relative w-48 h-48 mx-auto">
                      <Image
                        src={logoPreview}
                        alt="Company Logo Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <button
                      onClick={() => setLogoPreview(null)}
                      className="text-sm text-slate hover:text-charcoal transition-colors"
                    >
                      Remove Logo
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-16 h-16 mx-auto mb-4 bg-platinum rounded-full flex items-center justify-center">
                      <UploadIcon />
                    </div>
                    <label className="cursor-pointer">
                      <span className="text-cerulean font-medium hover:text-cerulean/80 transition-colors">
                        Click to upload
                      </span>
                      <span className="text-slate"> or drag and drop</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </label>
                    <p className="text-xs text-slate mt-2">
                      PNG, JPG, or SVG (max. 2MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-silver rounded-lg text-[15px] text-charcoal focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-silver rounded-lg text-[15px] text-charcoal focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors"
                  placeholder="info@company.com"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Business Address
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border-2 border-silver rounded-lg text-[15px] text-charcoal focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors resize-none"
                placeholder="Enter your business address"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full px-6 py-3 bg-cerulean border-2 border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Labor Rates Tab */}
      {activeTab === "labor-rates" && (
        <div className="max-w-3xl">
          <div className="bg-white border-2 border-charcoal rounded-3xl p-6 shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-cerulean/10 flex items-center justify-center">
                <DollarIcon />
              </div>
              <div>
                <h2 className="text-lg font-bold text-charcoal">Labor Rates</h2>
                <p className="text-sm text-slate">
                  Define hourly rates for different labor types
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {laborRates.map((rate, index) => (
                <div
                  key={rate.type}
                  className="border-2 border-silver rounded-xl p-4 hover:border-cerulean/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-charcoal block mb-1">
                        {rate.type}
                      </label>
                      <p className="text-xs text-slate">
                        {rate.type === "Journeyman" &&
                          "Experienced certified technician"}
                        {rate.type === "Technician" &&
                          "Skilled technician with certification"}
                        {rate.type === "Helper" &&
                          "Entry-level assistant technician"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-charcoal font-medium">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={rate.hourlyRate}
                        onChange={(e) =>
                          handleLaborRateChange(index, e.target.value)
                        }
                        className="w-24 px-3 py-2 border-2 border-silver rounded-lg text-[15px] text-charcoal font-semibold text-right focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors"
                      />
                      <span className="text-slate font-medium">/hr</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="bg-cerulean/5 border border-cerulean/20 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <svg
                  className="w-5 h-5 text-cerulean flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm text-charcoal font-medium mb-1">
                    About Labor Rates
                  </p>
                  <p className="text-sm text-slate">
                    These rates will be used to calculate labor costs in your
                    estimates and proposals. You can assign specific labor types
                    to equipment types in the Equipment Rules section.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full px-6 py-3 bg-cerulean border-2 border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors"
            >
              Save Labor Rates
            </button>
          </div>
        </div>
      )}

      {/* Equipment Rules Tab */}
      {activeTab === "equipment-rules" && (
        <div className="max-w-4xl">
          <div className="bg-white border-2 border-charcoal rounded-3xl p-6 shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-cerulean/10 flex items-center justify-center">
                <ToolIcon />
              </div>
              <div>
                <h2 className="text-lg font-bold text-charcoal">
                  Equipment Rules
                </h2>
                <p className="text-sm text-slate">
                  Assign default labor types to equipment types
                </p>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-platinum/30 rounded-t-lg border-b-2 border-silver">
              <div className="text-sm font-semibold text-charcoal">
                Equipment Type
              </div>
              <div className="text-sm font-semibold text-charcoal">
                Default Labor Type
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-silver">
              {equipmentRules.map((rule) => (
                <div
                  key={rule.id}
                  className="grid grid-cols-2 gap-4 px-4 py-4 hover:bg-platinum/20 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-[15px] text-charcoal font-medium">
                      {rule.equipmentType}
                    </span>
                  </div>
                  <div>
                    <select
                      value={rule.defaultLaborType}
                      onChange={(e) =>
                        handleEquipmentRuleChange(
                          rule.id,
                          e.target.value as
                            | "Journeyman"
                            | "Technician"
                            | "Helper"
                        )
                      }
                      className="w-full px-4 py-2 border-2 border-silver rounded-lg text-[15px] text-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors cursor-pointer"
                    >
                      <option value="Journeyman">Journeyman</option>
                      <option value="Technician">Technician</option>
                      <option value="Helper">Helper</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Equipment Type Button */}
            <div className="px-4 py-4 border-t-2 border-silver">
              <button className="w-full px-4 py-3 border-2 border-dashed border-silver rounded-lg text-sm font-medium text-slate hover:border-cerulean hover:text-cerulean hover:bg-cerulean/5 transition-colors">
                + Add Equipment Type
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-cerulean/5 border border-cerulean/20 rounded-lg p-4 mt-6 mb-6">
              <div className="flex gap-3">
                <svg
                  className="w-5 h-5 text-cerulean flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm text-charcoal font-medium mb-1">
                    How Equipment Rules Work
                  </p>
                  <p className="text-sm text-slate">
                    When creating estimates, the system will automatically use
                    the labor type you've assigned here for each equipment type.
                    You can always override this on a per-estimate basis.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full px-6 py-3 bg-cerulean border-2 border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors"
            >
              Save Equipment Rules
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
