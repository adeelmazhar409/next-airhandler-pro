export const CreateNewContactFormProps = [
  {
    sectionName: "Basic Information",
    fields: [
      {
        nature: "half",
        type: "text",
        label: "First Name",
        placeholder: "Enter first name",
        required: true,
      },
      {
        nature: "half",
        type: "text",
        label: "Last Name",
        placeholder: "Enter last name",
        required: true,
      },
      {
        nature: "half",
        type: "text",
        label: "Title",
        placeholder: "Job title",
      },
      {
        nature: "half",
        type: "text",
        label: "Department",
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
        label: "Parent Company",
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
        label: "Service Site",
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
        label: "Email",
        placeholder: "email@example.com",
      },
      {
        nature: "half",
        type: "text",
        label: "Phone",
        placeholder: "Primary phone number",
      },
      {
        nature: "half",
        type: "text",
        label: "Mobile Phone",
        placeholder: "Mobile phone number",
      },
      {
        nature: "half",
        type: "text",
        label: "Work Phone",
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
        label: "Contact Type",
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
        label: "Contact Status",
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
        label: "Preferred Contact Method",
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
        label: "Tags",
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
        label: "Communication Preferences",
        option: [
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
