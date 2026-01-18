export const JobWalksFormProps = [
  {
    nature: "full",
    type: "dropdown",
    required: true,
    label: "customer_site_id",
    Title: "Customer Company",
    placeholder: "Search customers...",
    linkTable: "sites",
    linkTableValue: ["site_name","service_address"],
    linkTableValue2: { table: "contacts", linkvalue: "service_site_id" },
  },
  {
    nature: "full",
    type: "text",
    label: "job_name",
    Title: "Job Name / Site Address",
    placeholder: "e.g., AC Repair - 123 Main St",
  },
  {
    sectionName: "",
    fields: [
      {
        nature: "half",
        type: "date",
        label: "date_of_walk",
        Title: "Date of Walk",
        placeholder: "12/17/2025",
      },
      {
        nature: "half",
        type: "dropdown",
        label: "task_type",
        Title: "Task Type",
        placeholder: "Select task type",
        linkTable: "task_types",
        linkTableValue: "type",
      },
    ],
  },
  {
    nature: "full",
    type: "textarea",
    label: "job_notes",
    Title: "Job Notes / Observations",
    placeholder: "Record issues, model/serials, access notes, etc.",
    rows: 6,
  },
  {
    nature: "full",
    type: "textarea",
    label: "next_step",
    Title: "Next Step / Action Needed",
    placeholder: "Describe what needs to happen next...",
    rows: 5,
  },

  {
    nature: "full",
    type: "text",
    label: "assigned_to",
    Title: "Assign To",
    placeholder: "Enter team member",
  },
  {
    nature: "full",
    type: "file",
    label: "photos",
    Title: "Photos",
    placeholder: "No file chosen",
    message: "Upload photos to document your work",
    accept: "image/*",
    multiple: true,
    required: true,
  },
  {
    sectionName: "button",
    button: ["Cancel", "Create Job Walk"],
  },
];

export const JobWalksLinkTable = ["sites", "contacts", "task_types", "users"];
