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
        option: [
          "ABC Corporation",
          "XYZ Industries",
          "Tech Solutions Inc",
          "Green Energy Co",
        ],
      },
      {
        nature: "half",
        type: "dropdown",
        label: "service_site_id",
        Title: "Service Site",
        placeholder: "None",
        option: ["Main Office", "Branch A", "Branch B", "Warehouse"],
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
        option: [
          "Primary Contact",
          "Secondary Contact",
          "Decision Maker",
          "Influencer",
          "Technical Contact",
          "Financial Contact",
        ],
        optionDescription: [
          "Main point of contact",
          "Alternative contact person",
          "Has authority to make purchasing decisions",
          "Influences purchasing decisions",
          "Technical expert or implementer",
          "Handles financial aspects",
        ],
      },
      {
        nature: "third",
        type: "radio-dropdown",
        label: "contact_status",
        Title: "Contact Status",
        placeholder: "Active",
        option: [
          "Active",
          "Prospect",
          "Customer",
          "Inactive",
          "Former Customer",
        ],
      },
      {
        nature: "third",
        type: "dropdown",
        label: "preferred_contact_method",
        Title: "Preferred Contact Method",
        placeholder: "Email",
        option: ["Email", "Phone", "Mobile", "LinkedIn", "Mail"],
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
  'companies', 'sites', 'users'
];