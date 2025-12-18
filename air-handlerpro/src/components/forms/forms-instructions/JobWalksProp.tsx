export const JobWalksFormProps = [
  {
    nature: "full",
    type: "search-dropdown",
    label: "Link to Customer (optional)",
    placeholder: "Search customers...",
    option: [
      "ABC Corporation",
      "XYZ Industries",
      "Tech Solutions Inc",
      "Green Energy Co",
    ],
  },
  {
    nature: "full",
    type: "text",
    label: "Job Name / Site Address",
    placeholder: "e.g., AC Repair - 123 Main St",
  },

  {
    nature: "half",
    type: "date",
    label: "Date of Walk",
    placeholder: "12/17/2025",
  },
  {
    nature: "half",
    type: "dropdown",
    label: "Task Type",
    placeholder: "Select task type",
    option: ["Walk", "Inspection", "Assessment", "Survey", "Site Visit"],
  },

  {
    nature: "full",
    type: "textarea",
    label: "Job Notes / Observations",
    placeholder: "Record issues, model/serials, access notes, etc.",
    rows: 6,
  },
  {
    nature: "full",
    type: "textarea",
    label: "Next Step / Action Needed",
    placeholder: "Describe what needs to happen next...",
    rows: 5,
  },

  {
    nature: "full",
    type: "dropdown",
    label: "Assign To",
    placeholder: "Select team member",
    option: ["John Smith", "Sarah Johnson", "Mike Davis", "Emily Brown"],
  },

  {
    nature: "full",
    type: "file",
    label: "Photos",
    placeholder: "Choose Files",
    accept: "image/*",
    multiple: true,
  },

  {
    sectionName: "button",
    button: ["Cancel", "Save Job Walk"],
  },
];
