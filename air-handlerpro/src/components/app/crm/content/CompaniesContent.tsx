"use client"

import React, { useState } from "react";
import Actbox from "../../UI-components/Actbox";
import { BuildingIcon } from "../../../icons/icons";
import { SiteIcon } from "../../../icons/icons";
import Button from "../../UI-components/button";
import ServiceSitesGrid from "../../UI-components/serviceSideDataFormed";
import CustomerAccountsGrid from "../../UI-components/companySideDataFormed";
import { CompanyForm } from "./forms/CompanyForm";
import { SiteForm } from "./forms/SiteForm";
import { type Company } from "@/service/api/companies";

export default function CompaniesContent() {
  const [view, setView] = useState<"Companies" | "sites">("Companies");
  const [companyFormToggle, setCompanyFormToggle] = useState(false);
  const [siteFormToggle, setSiteFormToggle] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateCompany = () => {
    setEditingCompany(null);
    setCompanyFormToggle(true);
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    setCompanyFormToggle(true);
  };

  const handleCreateSite = () => {
    setSiteFormToggle(true);
  };

  const handleCancel = () => {
    setCompanyFormToggle(false);
    setSiteFormToggle(false);
    setEditingCompany(null);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Close the form and reset editing state
    setCompanyFormToggle(false);
    setEditingCompany(null);
    // Trigger refresh by incrementing the key
    setRefreshKey((prev) => prev + 1);
  };

  if (companyFormToggle) {
    return (
      <CompanyForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        editingCompany={editingCompany}
      />
    );
  }

  if (siteFormToggle) {
    return <SiteForm onCancel={handleCancel} onSubmit={handleSubmit} />;
  }

  const companyValue = {
    header: false,
    value: "Companies",
    icon: <BuildingIcon />,
    description:
      "Companies help you organize your contacts and deals by grouping them under a single entity.",
  };

  const siteValue = {
    header: false,
    value: "Sites",
    icon: <SiteIcon />,
    description:
      "Sites help you manage locations associated with your companies and streamline service operations.",
  };
  const companydata = true;
  const ServiceData = true;

  return (
    <div className="">
      <div className="flex gap-2 mb-6 justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setView("Companies")}
            className={`flex items-center gap-2 px-4 py-2 border border-black font-medium transition-colors rounded-md ${
              view === "Companies"
                ? "bg-charcoal text-white"
                : "bg-white text-charcoal hover:bg-charcoal/30"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Companies
          </button>

          <button
            onClick={() => setView("sites")}
            className={`flex items-center gap-2 px-4 py-2 border border-black font-medium transition-colors rounded-md ${
              view === "sites"
                ? "bg-charcoal text-white"
                : "bg-white text-charcoal hover:bg-charcoal/30"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            sites
          </button>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateCompany} value="Add Companies" />
          <Button onClick={handleCreateSite} value="Add Sites" />
        </div>
      </div>

      {view === "Companies" &&
        (companydata ? (
          <CustomerAccountsGrid
            key={refreshKey}
            onEditCompany={handleEditCompany}
          />
        ) : (
          <Actbox {...companyValue} />
        ))}

      {view === "sites" &&
        (ServiceData ? <ServiceSitesGrid /> : <Actbox {...siteValue} />)}
    </div>
  );
}
