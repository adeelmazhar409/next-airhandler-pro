// ============================================================================
// UTILITY FUNCTIONS

import { PasswordStrength } from "../interface/DataTypes";

// ============================================================================
const getPasswordInfo = (pwd: string): PasswordStrength => {
  const length = pwd.length >= 8;
  const lower = /[a-z]/.test(pwd);
  const upper = /[A-Z]/.test(pwd);
  const number = /[0-9]/.test(pwd);
  const special = /[^A-Za-z0-9]/.test(pwd);
  const passed = [length, lower, upper, number, special].filter(Boolean).length;
  const score = Math.min(100, passed * 20);
  return { length, lower, upper, number, special, score };
};

const getStrengthLabel = (score: number): string => {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Weak";
};

const getFieldWidth = (nature: string) => {
  switch (nature) {
    case "full":
      return "w-full";
    case "half":
      return "w-full lg:w-[calc(50%-8px)]";
    case "third":
      return "w-full lg:w-[calc(33.333%-11px)]";
    default:
      return "w-full";
  }
};

// Generate hour options (12-hour format)
const generateHourOptions = () => {
  const hours = [];
  for (let i = 1; i <= 12; i++) {
    hours.push(`${i.toString().padStart(2, "0")} AM`);
  }
  for (let i = 1; i <= 12; i++) {
    hours.push(`${i.toString().padStart(2, "0")} PM`);
  }
  return hours;
};

// Generate minute options
const generateMinuteOptions = () => {
  const minutes = [];
  for (let i = 0; i < 60; i += 5) {
    minutes.push(i.toString().padStart(2, "0"));
  }
  return minutes;
};

const getDisplayOptions = (linkTableData: any[], linkTable?: string) => {
  if (!linkTableData || !linkTable) return [];

  return linkTableData
    .map((item) => item?.[linkTable])
    .filter(Boolean)
    .flat();
};

const getDisplayValue = (
  displayOptions: any[],
  value: string | any[],
  linkTableValue: string | string[]
) => {
  const displayValue = displayOptions?.find((opt) => opt?.id === value);

  if (!displayValue) return "";

  return Array.isArray(linkTableValue)
    ? linkTableValue.map((k) => displayValue[k]).join(" ")
    : displayValue[linkTableValue];
};

function buildFinalCompanyObject(company: any[], relatedTables: any[]) {
  const finalCompanyObject = company.map((com) => {
    const contacts = relatedTables.find((t) => t.contacts)?.contacts || [];

    const users = relatedTables.find((t) => t.users)?.users || [];

    const companyTypes =
      relatedTables.find((t) => t.company_types)?.company_types || [];

    const sites = relatedTables.find((t) => t.sites)?.sites || [];

    const primaryContact = contacts.find((c: any) => c.id === com.primary_contact_id);

    const owner = users.find((u: any) => u.id === com.owner_id);

    const companyType = companyTypes.find((t: any) => t.id === com.company_type_id);

    const companySites = sites
      .filter((s: any) => s.company_id === com.id)
      .map((s: any) => s.site_name);

    return {
      id: com.id,
      business_name: com.business_name,
      billing_address: com.billing_address,
      notes: com.notes,
      first_name: primaryContact?.first_name ?? null,
      last_name: primaryContact?.last_name ?? null,
      title: primaryContact?.title ?? null,
      department: primaryContact?.department ?? null,
      email: primaryContact?.email ?? null,
      phone: primaryContact?.phone ?? null,
      mobile_phone: primaryContact?.mobile_phone ?? null,
      work_phone: primaryContact?.work_phone ?? null,
      contact_type: primaryContact?.contact_type ?? null,
      contact_status: primaryContact?.contact_status ?? null,

      type: companyType?.type ?? null,

      full_name: owner?.full_name ?? null,

      sites: companySites,
    };
  });
  return finalCompanyObject;
}

function buildFinalSiteObject(site: any[], relatedTables: any[]) {
  const finalSiteObject = site.map((sit) => {   
    const contacts = relatedTables.find((t) => t.contacts)?.contacts || [];
    const users = relatedTables.find((t) => t.users)?.users || [];
    const owner = users.find((u: any) => u.id === sit.site_owner_id);
    const company = relatedTables.find((t) => t.companies)?.companies || [];
    return {
      id: sit.id,
      site_name: sit.site_name,
      service_address: sit.service_address,
      site_type: sit.site_type,
      primary_contact_name: (() => {
        const primaryContact = contacts.find((c: any) => c.id === sit.primary_contact_id);
        if (!primaryContact) return null;
        const firstName = primaryContact.first_name ?? "";
        const lastName = primaryContact.last_name ?? "";
        const name = (firstName + " " + lastName).trim();
        return name.length > 0 ? name : null;
      })(),
      primary_contact_phone: contacts.find((c: any) => c.id === sit.primary_contact_id)?.phone ?? null,
      primary_contact_email: contacts.find((c: any) => c.id === sit.primary_contact_id)?.email ?? null,
      owner_name: owner?.full_name ?? null,
    };
  });
  return finalSiteObject;
}   

function buildTitleLabelMap(formProps: any[]) {
  const map: Record<string, string> = {};

  formProps.forEach((section: any) => {
    if (section.fields) {
      section.fields.forEach((field: any) => {
        if (field.Title && field.label) {
          map[field.Title] = field.label;
        }
      });
    } else if (section.Title && section.label) {
      map[section.Title] = section.label;
    }
  });

  return map;
}

function buildFinalContactObject(contact: any[], relatedTables: any[]) {
  const finalContactObject = contact.map((con) => {
    const companies = relatedTables.find((t) => t.companies)?.companies || [];
    const sites = relatedTables.find((t) => t.sites)?.sites || [];
    const users = relatedTables.find((t) => t.users)?.users || [];
    const owner = users.find((u: any) => u.id === con.owner_id);
    const company = companies.find((c: any) => c.id === con.parent_company_id);
    const site = sites.find((s: any) => s.id === con.service_site_id);
    return {
      id: con.id,
      first_name: con.first_name,
      last_name: con.last_name,
    };
  });
  return finalContactObject;
}

function mapTitlesToLabels(data: any, formProps: any[]) {
  const titleLabelMap = buildTitleLabelMap(formProps);

  const result: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    const label = titleLabelMap[key];

    if (!label) return;

    // Handle Service Sites (array of objects → array of ids)
    if (label === "sites" && Array.isArray(value)) {
      result[label] = value.map((v: any) => v.id);
    } else {
      result[label] = value;
    }
  });

  return result;
}


export {
  getPasswordInfo,
  getStrengthLabel,
  getFieldWidth,
  generateHourOptions,
  generateMinuteOptions,
  getDisplayOptions,
  getDisplayValue,
  buildFinalCompanyObject,
  buildFinalSiteObject,
  buildTitleLabelMap,
  buildFinalContactObject,
  mapTitlesToLabels,
};
