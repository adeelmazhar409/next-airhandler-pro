export const ActivityFormProps = [
  {
    nature: "full",
    type: "text",
    label: "subject",
    Title: "Subject",
    placeholder: "Enter activity subject",
    required: true,
  },

  {
    sectionName: "",
    fields: [
      {
        nature: "half",
        type: "dropdown",
        label: "activity_type",
        Title: "Activity Type",
        placeholder: "Select type",
        required: true,
        nativeOption: [
          { value: "Call", label: "Call" },
          { value: "Meeting", label: "Meeting" },
          { value: "Task", label: "Task" },
          { value: "Email", label: "Email" },
          { value: "Note", label: "Note" },
        ],
      },
      {
        nature: "half",
        type: "radio-dropdown",
        label: "priority",
        Title: "Priority",
        placeholder: "Select priority",
        nativeOption: [
          { value: "Low", label: "Low" },
          { value: "Medium", label: "Medium" },
          { value: "High", label: "High" },
          { value: "Urgent", label: "Urgent" },
        ],
        radioColor: {
          Low: "bg-green-400",
          Medium: "bg-yellow-400",
          High: "bg-orange-400",
          Urgent: "bg-red-400",
        },
      },
    ],
  },
  {
    sectionName: "",
    fields: [
      {
        nature: "half",
        type: "dropdown",
        label: "related_to_type",
        Title: "Related To",
        placeholder: "Select type",
        required: true,
        nativeOption: [
          { value: "deals", label: "Deal" },
          { value: "sites", label: "Service Site" },
          { value: "companies", label: "Parent Company" },
        ],
      },
      {
        nature: "half",
        type: "dropdown",
        label: "related_to_id",
        Title: "Related Item",
        placeholder: "Select item",
        required: false,
        activeDependence: "Related To",
        dataDependence: {
          field: "Related To",
          dataMapping: [
            { value: "deals", linkTable: "deals", linkTableValue: "deal_name" },
            {
              value: "sites",
              linkTable: "sites",
              linkTableValue: "site_name",
            },
            {
              value: "companies",
              linkTable: "companies",
              linkTableValue: "business_name",
            },
          ],
        },
      },
    ],
  },
  {
    sectionName: "",
    fields: [
      {
        nature: "half",
        type: "date",
        label: "due_date",
        Title: "Due Date",
        placeholder: "Pick a date",
      },
      {
        nature: "half",
        type: "time",
        label: "due_time",
        Title: "Due Time",
        placeholder: "09:00 AM",
        activeDependence: "Due Date",
      },
    ],
  },
  {
    sectionName: "",
    fields: [
      {
        nature: "half",
        type: "dropdown",
        label: "contact_id",
        Title: "Contact",
        placeholder: "Select Related Item first",
        linkTable: "contacts",
        linkTableValue: ["first_name", "last_name"],
      },
      {
        nature: "half",
        type: "dropdown",
        label: "assigned_to",
        Title: "Assign To",
        placeholder: "Select user (leave empty for self)",
        linkTable: "users",
        linkTableValue: "full_name",
      },
    ],
  },
  {
    nature: "full",
    type: "textarea",
    label: "description",
    Title: "Description",
    placeholder: "Enter activity description, notes, or instructions...",
    rows: 4,
  },
  {
    sectionName: "button",
    button: ["Cancel", "Create Activity"],
  },
];
export const activityLinkTable = [
  "contacts",
  "users",
  "deals",
  "sites",
  "companies",
];
