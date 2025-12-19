import React from "react";
import Image from "next/image";

import { Upload, Building2, DollarSign, Settings,Info } from "lucide-react";
import {
  SectionHeader,
  FormInput,
  InfoBox,
  SaveButton,
} from "../admin/adminUi"

interface LaborRate {
  type: "Journeyman" | "Technician" | "Helper";
  hourlyRate: string;
}

interface EquipmentRule {
  id: string;
  equipmentType: string;
  defaultLaborType: "Journeyman" | "Technician" | "Helper";
}


const laborData = [
  {
    label: "Helper",
    count: 0,
    color: "bg-black",
    dotColor: "bg-black",
  },
  {
    label: "Technician",
    count: 27,
    color: "bg-cerulean",
    dotColor: "bg-cerulean",
  },
  {
    label: "Journeyman",
    count: 5,
    color: "text-slate",
    dotColor: "bg-slate",
  },
];
// Company Info Tab
export const CompanyInfoTab = ({
  companyName,
  setCompanyName,
  logoPreview,
  setLogoPreview,
  handleLogoUpload,
  handleSave,
}: {
  companyName: string;
  setCompanyName: (name: string) => void;
  logoPreview: string | null;
  setLogoPreview: (preview: string | null) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
}) => (
  <div className="bg-white border border-silver rounded-lg p-8">
    <SectionHeader icon={Building2} title="Company Information" />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <div>
        <FormInput
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
        />

        <div className="space-y-4 mb-6">
          <FormInput
            label="Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="info@company.com"
          />
        </div>

        <FormInput
          label="Business Address"
          rows={4}
          placeholder="Enter your business address"
        />
      </div>

      {/* Right Column - Logo Upload */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          Company Logo
        </label>
        <p className="text-sm text-slate mb-4">
          Upload your company logo. This will appear on estimates and proposals.
        </p>

        <div className="border-2 border-dashed border-silver rounded-lg p-8 text-center hover:border-cerulean transition-colors h-[400px] flex items-center justify-center">
          {logoPreview ? (
            <div className="space-y-4">
              <div className="relative w-64 h-64 mx-auto">
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
                <Upload className="w-6 h-6 text-slate" />
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
    </div>

    <SaveButton onClick={handleSave}>Save Changes</SaveButton>
  </div>
);

// Labor Rates Tab
export const LaborRatesTab = ({
  laborRates,
  handleLaborRateChange,
  handleSave,
}: {
  laborRates: LaborRate[];
  handleLaborRateChange: (index: number, value: string) => void;
  handleSave: () => void;
}) => (
  <>
    <div className="bg-white border border-silver rounded-lg p-8">
      <SectionHeader
        icon={DollarSign}
        title="Labor Rates"
        description="Define hourly rates for different labor types"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {laborRates.map((rate, index) => (
          <div
            key={rate.type}
            className="border border-silver rounded-lg p-6 hover:border-cerulean/50 transition-colors"
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-charcoal block mb-1">
                  {rate.type}
                </label>
                <p className="text-xs text-slate">
                  {rate.type === "Journeyman" &&
                    "Experienced certified technician"}
                  {rate.type === "Technician" &&
                    "Skilled technician with certification"}
                  {rate.type === "Helper" && "Entry-level assistant technician"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-charcoal font-medium">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={rate.hourlyRate}
                  onChange={(e) => handleLaborRateChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-silver rounded-lg text-[15px] text-charcoal font-semibold text-right focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors"
                />
                <span className="text-slate font-medium">/hr</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SaveButton onClick={handleSave}>Save Labor Rates</SaveButton>
    </div>
    <div className="p-8 bg-white border my-4 border-slate/30 rounded-lg">
      {/* Header */}
      <h1 className="text-2xl font-bold text-charcoal mb-8 flex items-center gap-2">
        <Info className="w-6 h-6" />
        Labor Type Mappings
      </h1>

      {/* Journeyman Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-green-700 mb-4">
          Journeyman Labor Rate Applied To:
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-slate">
            <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
            <span>Any equipment with "Chiller" in the name</span>
          </li>
          <li className="flex items-start gap-2 text-slate">
            <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
            <span>Variable Frequency Drive</span>
          </li>
          <li className="flex items-start gap-2 text-slate">
            <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
            <span>Boiler</span>
          </li>
        </ul>
      </div>

      {/* Technician Section */}
      <div className="bg-blue-50 border border-cerulean rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-cerulean mb-4">
          Technician Labor Rate Applied To:
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-slate">
            <span className="w-2 h-2 bg-cerulean rounded-full mt-2"></span>
            <span>All other equipment types (default)</span>
          </li>
        </ul>
      </div>

      {/* Usage Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-charcoal mb-3">
          Usage Information
        </h3>
        <p className="text-sm text-slate leading-relaxed">
          These rates will be used to calculate labor costs in Maintenance
          Estimate Pro. The system automatically applies the appropriate labor
          rate based on equipment type, then multiplies by hours to provide
          total labor cost for gross profit calculations.
        </p>
      </div>
    </div>
  </>
);

// Equipment Rules Tab
export const EquipmentRulesTab = ({
  equipmentRules,
  handleEquipmentRuleChange,
  handleSave,
}: {
  equipmentRules: EquipmentRule[];
  handleEquipmentRuleChange: (
    id: string,
    laborType: "Journeyman" | "Technician" | "Helper"
  ) => void;
  handleSave: () => void;
}) => (
  <>
    <InfoBox
      title="How Equipment Rules Work"
      description="These rules determine which labor rate is automatically applied when adding equipment to maintenance estimates. Changes will affect all future estimates but not existing ones."
    />

    <div className="bg-white border border-silver rounded-lg p-8">
      <SectionHeader
        icon={Settings}
        title="Equipment Rules"
        description="Assign default labor types to equipment types"
      />

      {/* Table Header */}
      <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-platinum/20 rounded-t-lg border-b border-silver">
        <div className="text-sm font-semibold text-charcoal">
          Equipment Type
        </div>
        <div className="text-sm font-semibold text-charcoal">
          Default Labor Type
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-silver border border-t-0 border-silver rounded-b-lg">
        {equipmentRules.map((rule) => (
          <div
            key={rule.id}
            className="grid grid-cols-2 gap-4 px-4 py-4 hover:bg-platinum/10 transition-colors"
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
                    e.target.value as "Journeyman" | "Technician" | "Helper"
                  )
                }
                className="w-full px-4 py-2 border border-silver rounded-lg text-[15px] text-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors cursor-pointer"
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
      <div className="mt-4">
        <button className="w-full px-4 py-3 border-2 border-dashed border-silver rounded-lg text-sm font-medium text-slate hover:border-cerulean hover:text-cerulean hover:bg-cerulean/5 transition-colors">
          + Add Equipment Type
        </button>
      </div>

      <SaveButton onClick={handleSave}>Save Equipment Rules</SaveButton>
    </div>
    <div className="p-8 bg-white border border-slate/30 my-3 rounded-lg">
      <h2 className="text-2xl font-bold text-charcoal mb-6">
        Current Labor Rate Distribution
      </h2>

      <div className="grid grid-cols-3 gap-6 ">
        {laborData.map((item, index) => (
          <div
            key={index}
            className="border border-silver rounded-lg p-6 bg-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-3 h-3 rounded-full ${item.dotColor}`}></span>
              <span className="text-base font-medium text-charcoal">
                {item.label}
              </span>
            </div>
            <div className="text-4xl font-bold text-charcoal mb-1">
              {item.count}
            </div>
            <div className="text-sm text-slate">equipment types</div>
          </div>
        ))}
      </div>
    </div>
  </>
);
