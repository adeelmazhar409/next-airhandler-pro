export const CreateNewContactFormProps = [
  {
    sectionName: "Basic Information",
    fields: [
      {
        nature: "half",
        type: "text",
        label: "first_name",
        Title: "First Name",
        placeholder: "Enter first name",
        required: true,
      },
      {
        nature: "half",
        type: "text",
        label: "last_name",
        Title: "Last Name",
        placeholder: "Enter last name",
        required: true,
      },
      {
        nature: "half",
        type: "text",
        label: "title",
        Title: "Title",
        placeholder: "Job title",
      },
      {
        nature: "half",
        type: "text",
        label: "department",
        Title: "Department",
        placeholder: "Department",
      },
    ],
  },
  {
    sectionName: "Company Associations",
    fields: [
      {
        nature: "half",
        type: "dropdown",
        label: "parent_company_id",
        Title: "Parent Company",
        placeholder: "None",
        linkTable: "companies",
        linkTableValue: "business_name",
      },
      {
        nature: "half",
        type: "dropdown",
        label: "service_site_id",
        Title: "Service Site",
        placeholder: "None",
        linkTable: "sites",
        linkTableValue: "site_name",
      },
    ],
  },
  {
    sectionName: "Contact Information",
    fields: [
      {
        nature: "half",
        type: "email",
        label: "email",
        Title: "Email",
        placeholder: "email@example.com",
      },
      {
        nature: "half",
        type: "text",
        label: "phone",
        Title: "Phone",
        placeholder: "Primary phone number",
      },
      {
        nature: "half",
        type: "text",
        label: "mobile_phone",
        Title: "Mobile Phone",
        placeholder: "Mobile phone number",
      },
      {
        nature: "half",
        type: "text",
        label: "work_phone",
        Title: "Work Phone",
        placeholder: "Work phone number",
      },
    ],
  },
  {
    sectionName: "Contact Details",
    fields: [
      {
        nature: "third",
        type: "dropdown",
        label: "contact_type",
        Title: "Contact Type",
        placeholder: "Primary Contact",
        linkTable: "contact_types",
        linkTableValue: "type",
      },
      {
        nature: "third",
        type: "radio-dropdown",
        label: "contact_status",
        Title: "Contact Status",
        placeholder: "Active",
        linkTable: "contact_status",
        linkTableValue: "status",
      },
      {
        nature: "third",
        type: "dropdown",
        label: "preferred_contact_method",
        Title: "Preferred Contact Method",
        placeholder: "Email",
        linkTable: "contact_method",
        linkTableValue: "method",
      },
    ],
  },
  {
    sectionName: "Tags",
    fields: [
      {
        nature: "full",
        type: "tag-input",
        label: "tags",
        Title: "Tags",
        placeholder: "Add a tag",
        buttonName: "Add",
      },
    ],
  },
  {
    sectionName: "Communication Preferences",
    fields: [
      {
        nature: "full",
        type: "checkbox-group",
        label: "communication_preferences",
        Title: "Communication Preferences",
        box: [
          { label: "Email opt-out", value: "email-opt-out" },
          { label: "SMS opt-out", value: "sms-opt-out" },
          { label: "Do not call", value: "do-not-call" },
        ],
      },
    ],
  },
  {
    sectionName: "Notes",
    fields: [
      {
        nature: "full",
        type: "textarea",
        label: "Notes",
        Title: "Notes",
        placeholder: "Add notes about this contact...",
        rows: 4,
      },
    ],
  },
  {
    sectionName: "button",
    button: ["Cancel", "Create Contact"],
  },
];

export const contactLinkTable = [
  "companies",
  "sites",
  "users",
  "contact_types",
  "contact_status",
  "contact_method"
];
