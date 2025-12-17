"use client";
import React, { useState } from "react";
import { PageHeader, TabNavigation } from "../../../components/admin/adminUi";
import {
  CompanyInfoTab,
  LaborRatesTab,
  EquipmentRulesTab,
} from "../../../components/admin/comapnyadmintabs";

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
    <div className="min-h-screen w-full bg-cerulean">
      <PageHeader
        title="Company Admin Panel"
        description="Manage your company settings, labor rates, and equipment configurations"
      />

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="bg-platinum/5 min-h-[calc(100vh-185px)]">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {activeTab === "company-info" && (
            <CompanyInfoTab
              companyName={companyName}
              setCompanyName={setCompanyName}
              logoPreview={logoPreview}
              setLogoPreview={setLogoPreview}
              handleLogoUpload={handleLogoUpload}
              handleSave={handleSave}
            />
          )}

          {activeTab === "labor-rates" && (
            <LaborRatesTab
              laborRates={laborRates}
              handleLaborRateChange={handleLaborRateChange}
              handleSave={handleSave}
            />
          )}

          {activeTab === "equipment-rules" && (
            <EquipmentRulesTab
              equipmentRules={equipmentRules}
              handleEquipmentRuleChange={handleEquipmentRuleChange}
              handleSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}
