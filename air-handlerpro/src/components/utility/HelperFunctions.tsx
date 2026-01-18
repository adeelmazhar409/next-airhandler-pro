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

function formatDateTime(isoString: string): string {
  return new Date(isoString)
    .toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
}

function toISOTimestamp({
  date,
  hour,
  minute,
}: {
  date: string;
  hour: string;
  minute: string;
}): string {
  const [h, meridian] = hour.split(" ");
  let hours = Number(h);

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  return `${date}T${String(hours).padStart(2, "0")}:${minute}:00Z`;
}

function fromISOTimestamp(iso: string): {
  date: string;
  hour: string;
  minute: string;
} {
  const [datePart, timePart] = iso.replace("Z", "").split("T");
  const [hh, mm] = timePart.split(":");

  let hours = Number(hh);
  const minute = mm;

  const meridian = hours >= 12 ? "PM" : "AM";

  // Convert 24h → 12h
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return {
    date: datePart,
    hour: `${hours.toString().padStart(2, "0")} ${meridian}`,
    minute,
  };
}

function calculateTotalHours(
  scheduled_start: string,
  scheduled_end: string
): number {
  const start = new Date(scheduled_start).getTime();
  const end = new Date(scheduled_end).getTime();

  const diffMs = end - start; // milliseconds
  const diffHours = diffMs / (1000 * 60 * 60);

  return diffHours;
}

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
    ? linkTableValue
        .map((k) => displayValue[k] || "")
        .filter(Boolean)
        .join(" ")
    : displayValue[linkTableValue] || "";
};

function buildFinalCompanyObject(company: any[], relatedTables: any[]) {
  const finalCompanyObject = company.map((com) => {
    const contacts = relatedTables.find((t) => t.contacts)?.contacts || [];

    const users = relatedTables.find((t) => t.users)?.users || [];

    const companyTypes =
      relatedTables.find((t) => t.company_types)?.company_types || [];

    const sites = relatedTables.find((t) => t.sites)?.sites || [];

    const primaryContact = contacts.find(
      (c: any) => c.id === com.primary_contact_id
    );

    const owner = users.find((u: any) => u.id === com.owner_id);

    const companyType = companyTypes.find(
      (t: any) => t.id === com.company_type_id
    );

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
        const primaryContact = contacts.find(
          (c: any) => c.id === sit.primary_contact_id
        );
        if (!primaryContact) return null;
        const firstName = primaryContact.first_name ?? "";
        const lastName = primaryContact.last_name ?? "";
        const name = (firstName + " " + lastName).trim();
        return name.length > 0 ? name : null;
      })(),
      primary_contact_phone:
        contacts.find((c: any) => c.id === sit.primary_contact_id)?.phone ??
        null,
      primary_contact_email:
        contacts.find((c: any) => c.id === sit.primary_contact_id)?.email ??
        null,
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
    const contactStatus =
      relatedTables.find((t) => t.contact_status)?.contact_status || [];
    const contactType =
      relatedTables.find((t) => t.contact_types)?.contact_types || [];
    const owner = users.find((u: any) => u.id === con.owner_id);
    const company = companies.find((c: any) => c.id === con.parent_company_id);
    const site = sites.find((s: any) => s.id === con.service_site_id);
    const contactStatusValue = contactStatus.find(
      (s: any) => s.id === con.contact_status_id
    );
    const contactTypeValue = contactType.find(
      (t: any) => t.id === con.contact_type_id
    );

    return {
      id: con.id,
      first_name: con.first_name,
      last_name: con.last_name,
      title: con.title,
      department: con.department,
      email: con.email,
      phone: con.phone,
      mobile_phone: con.mobile_phone,
      work_phone: con.work_phone,
      contact_type: contactTypeValue?.type ?? null,
      contact_status: contactStatusValue?.status ?? null,
      owner_name: owner?.full_name ?? null,
      company_name: company?.business_name ?? null,
      site_name: site?.site_name ?? null,
    };
  });
  return finalContactObject;
}

function buildFinalActivityObject(activity: any[], relatedTables: any[]) {
  const finalActivityObject = activity.map((act) => {
    const contacts = relatedTables.find((t) => t.contacts)?.contacts || [];
    const users = relatedTables.find((t) => t.users)?.users || [];
    const owner = users.find((u: any) => u.id === act.owner_id);
    const contact = contacts.find((c: any) => c.id === act.contact_id);
    return {
      id: act.id,
      subject: act.subject,
      description: act.description,
      activity_type: act.activity_type,
      priority: act.priority,
      related_to_type: act.related_to_type,
      related_to_id: act.related_to_id,
      contact_name: contact?.first_name + " " + contact?.last_name || null,
      owner_name: owner?.full_name || null,
      contact_phone: contact?.phone || null,
      contact_email: contact?.email || null,
      due_date: act.due_date,
      due_time: act.due_time,
      status: act.status,
      created_at: act.created_at,
      updated_at: act.updated_at,
    };
  });
  return finalActivityObject;
}

function buildFinalWorkOrderObject(workOrder: any[], relatedTables: any[]) {
  const finalWorkOrderObject = workOrder.map((wo) => {
    const contacts = relatedTables.find((t) => t.contacts)?.contacts || [];
    const site =
      relatedTables
        .find((t) => t.sites)
        ?.sites.find((s: any) => s.id === wo.customer_site_id) || [];
    const contact = contacts.find(
      (c: any) => c.id === site?.primary_contact_id
    );
    const serviceReports =
      relatedTables
        .find((t) => t.service_reports)
        ?.service_reports?.filter((sr: any) => sr.work_order_id === wo.id) ||
      [];

    return {
      id: wo.id,
      work_order: wo.work_order_number || "Not assigned",
      description: wo.description,
      equipment_information: wo.equipment_information,
      scheduled_start: wo.scheduled_start,
      scheduled_end: wo.scheduled_end,
      site_name: site?.site_name || null,
      service_address: site?.service_address || null,
      contact_name: contact?.first_name + " " + contact?.last_name || null,
      contact_phone: contact?.phone || null,
      contact_email: contact?.email || null,
      created_at: wo.created_at,
      updated_at: wo.updated_at,
      service_reports: serviceReports,
    };
  });
  return finalWorkOrderObject;
}

function buildFinalServiceReportObject(
  serviceReport: any[],
  relatedTables: any[]
) {
  const finalServiceReportObject = serviceReport.map((sr) => {
    const workOrder = relatedTables.find((t) => t.work_orders)?.work_orders.find((wo: any) => wo.id === sr.work_order_id);
    const site = relatedTables.find((t) => t.sites)?.sites.find((s: any) => s.id === workOrder?.customer_site_id);
    const contact = relatedTables.find((t) => t.contacts)?.contacts.find((c: any) => c.id === site?.primary_contact_id);

    return {
      id: sr.id,
      findings_repairs: sr.findings_repairs || null,
      recommendations: sr.recommendations || null,
      internal_note: sr.internal_note || null,
      total_hours: sr.time || null,
      photo: sr.photo || null,
      status: sr.status || null,
      created_at: sr.created_at || null,
      updated_at: sr.updated_at || null,
      work_order: workOrder?.work_order_number || null,
      site_name: site?.site_name || null,
      service_address: site?.service_address || null,
      contact_name: contact?.first_name + " " + contact?.last_name || null,
    };
  });
  return finalServiceReportObject;
}

function buildFinalJobWalksObject(jobWalks: any[], relatedTables: any[]) {
  const finalJobWalksObject = jobWalks.map((jw) => {
    const site = relatedTables.find((t) => t.sites)?.sites.find((s: any) => s.id === jw.customer_site_id);
    const taskType = relatedTables.find((t) => t.task_types)?.task_types.find((t: any) => t.id === jw.task_type);
    const user = relatedTables.find((t) => t.users)?.users.find((u: any) => u.id === jw.created_by);
    return {
      id: jw.id,
      job_name: jw.job_name,
      date_of_walk: jw.date_of_walk,
      task_type: taskType?.type ?? null,
      job_notes: jw.job_notes,
      next_step: jw.next_step,
      assigned_to: jw.assigned_to || null,
      photos_count: jw.photos_count || null,
      created_by: user?.full_name || null,
    };
  });
  return finalJobWalksObject;
}

function mapTitlesToLabels(data: any, formProps: any[]) {
  const titleLabelMap = buildTitleLabelMap(formProps);

  const result: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    const label = titleLabelMap[key];
    if (!label) return;

    // ❌ skip empty strings
    if (value === "") return;

    // ❌ optionally skip null / undefined
    if (value === null || value === undefined) return;

    // Handle Service Sites (array of objects → array of ids)
    if (label === "sites" && Array.isArray(value)) {
      if (value.length === 0) return; // skip empty array
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
  buildFinalActivityObject,
  buildFinalWorkOrderObject,
  buildFinalServiceReportObject,
  buildFinalJobWalksObject,
  mapTitlesToLabels,
  formatDateTime,
  toISOTimestamp,
  fromISOTimestamp,
  calculateTotalHours,
};
