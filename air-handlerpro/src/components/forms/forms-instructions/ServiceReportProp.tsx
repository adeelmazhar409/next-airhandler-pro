export const ServiceReportFormProps = [
  {
    nature: "full",
    type: "detail-view-select",
    label: "work_order_id",
    Title: "Work Order",
    placeholder: "Select a work order",
    required: true,
    linkTable: "work_orders",
    linkTableValue: "work_order_number",
    linkTableValue2: { table: "sites", linkvalue: "customer_site_id" },
    linkTableValue3: { table: "contacts", linkvalue: "service_site_id" },
  },
  {
    sectionName: "Report",
    sectionBorder: true,
    fields: [
      {
        nature: "full",
        type: "textarea",
        label: "findings_repairs",
        Title: "Findings & Repairs",
        placeholder: "Document findings & repairs performed...",
        message: "Visible to customer",
        rows: 5,
      },
      {
        nature: "full",
        type: "textarea",
        label: "recommendations",
        Title: "Recommendations",
        placeholder: "Recommendations for future maintenance or repairs...",
        message: "Visible to customer",
        rows: 5,
      },
      {
        nature: "full",
        type: "textarea",
        label: "internal_note",
        Title: "Internal Notes",
        placeholder: "Internal notes for office use only...",
        message: "Office only - not visible to customer",
        rows: 5,
      },
    ],
  },
  {
    sectionName: "Photos",
    sectionBorder: true,
    fields: [
      {
        nature: "full",
        type: "file",
        label: "photos",
        Title: "Upload Photo",
        placeholder: "No photos yet",
        message: "Upload photos to document your work",
        accept: "image/*",
        multiple: true,
      },
    ],
  },
  // {
  //   sectionName: "Signature",
  //   sectionBorder: true,
  //   fields: [
  //     {
  //       nature: "full",
  //       type: "text",
  //       label: "customer_name",
  //       Title: "Customer Name",
  //       placeholder: "Enter customer full name",
  //       message: "Enter the name of the person who signed the service report",
  //     },
  //     {
  //       nature: "full",
  //       type: "signature",
  //       label: "signature",
  //       Title: "Customer Signature",
  //       placeholder: "No signature yet",
  //       message: "Get the customer's signature to complete the service report",
  //       accept: "image/*",
  //     },
  //     {
  //       nature: "full",
  //       type: "checkbox",
  //       label: "reviewed_work",
  //       Title: "I acknowledge that the work described has been completed to my satisfaction",
  //     },
  //   ],
  // },
  {
    sectionName: "Time Tracking",
    sectionBorder: true,
    fields: [
      {
        nature: "full",
        type: "number",
        label: "time",
        Title: "Time",
        placeholder: "Enter time tracking...",
        message: "Enter hours worked",
      },
      {
        nature: "full",
        type: "textarea",
        label: "notes",
        Title: "Notes (Optional)",
        placeholder: "Description of work performed...",
        rows: 5,
      },
    ],
  },

  {
    sectionName: "button",
    button: ["Cancel", "Create Service Site", "Save & Download"],
  },
];

export const serviceReportLinkTable = [
  "companies",
  "contacts",
  "sites",
  "work_orders",
  "service_reports",
];
