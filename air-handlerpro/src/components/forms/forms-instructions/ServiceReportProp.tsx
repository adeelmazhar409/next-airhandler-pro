export const ServiceReportFormProps = [
  {
    nature: "full",
    type: "dropdown",
    label: "site_id",
    Title: "Customer Compaany",
    placeholder: "Select a customer company",
    required: true,
    linkTable: "companies",
    linkTableValue: "business_name",
    linkTableValue2: { table: "contacts", linkvalue: "primary_contact_id" },
  },
  {
    nature: "full",
    type: "number",
    label: "work_order_number",
    Title: "Work Order Number",
    placeholder: "Enter work order number...",
    required: true,
  },
  {
    nature: "full",
    type: "date&time",
    label: "scheduled_start",
    Title: "Scheduled Start",
    placeholder: "mm/dd/yyyy",
    hourplaceholder: "00 AM",
    minuteplaceholder: "00",
  },
  {
    nature: "full",
    type: "date&time",
    label: "scheduled_end",
    Title: "Scheduled End",
    placeholder: "mm/dd/yyyy",
    hourplaceholder: "00 AM",
    minuteplaceholder: "00",
  },
  {
    nature: "full",
    type: "textarea",
    label: "description",
    Title: "Description",
    placeholder: "Describe the work to be performed...",
    rows: 5,
  },
  {
    nature: "full",
    type: "textarea",
    label: "equipment_information",
    Title: "Equipment Information",
    placeholder: "Equipment details, model numbers, etc...",
    rows: 5,
  },

  {
    sectionName: "button",
    button: ["Cancel", "Create Work Order"],
  },
];

export const serviceReportLinkTable = ["companies", "contacts"];
