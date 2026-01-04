export const CompanyFormProps = [
  {
    Title: 'id',
    label: "id",
    nature: "hidden",
    type: "hidden",
  },
  {
    sectionName: "Company Information",
    fields: [
      {
        nature: "half",
        Title: 'Business Name',
        type: "text",
        label: "business_name",
        placeholder: "Enter business name",
        required: true,
      },
      {
        nature: "half",
        type: "dropdown",
        label: "company_type_id",
        Title: 'Company Type',
        linkTable: "company_types",
        linkTableValue: "type",
        placeholder: "Select company type",
        required: true,
      },
    ],
  },
  {
    sectionName: "Billing Contact",
    fields: [
      {
        Title: 'Primary Contact',
        label: "primary_contact_id",
        nature: "full",
        type: "list-with-search",
        placeholder: "Select a contact",
        message: "Select an existing contact or create a new one",
        linkTable: "contacts",
        linkTableValue: ["first_name", "last_name"],
      },
      {
        nature: "full",
        type: "textarea",
        label: "billing_address",
        Title: "Billing Address",
        placeholder: "Enter billing address",
        rows: 4,
      },
    ],
  },
  {
    nature: "full",
    type: "multi-select",
    label: "sites",
    Title: "Service Sites",
    placeholder: "Select service sites",
    linkTable: "sites",
    linkTableValue: ["site_name", "service_address", "site_type"],
    message: "No service sites added yet",
    
  },
  {
    nature: "full",
    type: "dropdown",
    label: "owner_id",
    Title: "Owner",
    linkTable: "users",
    linkTableValue: "full_name",
    placeholder: "Select owner (defaults to you)",
    message: "If left blank, you will be set as the owner.",
  },
  {
    nature: "full",
    type: "textarea",
    label: "notes",
    Title: "Notes",
    placeholder: "Add any additional notes about this company...",
    rows: 4,
  },
  {
    sectionName: "button",
    button: ["Cancel", "Create Parent Company"],
  },
];

export const companyLinkTable = [
  'contacts', 'users', 'company_types', 'sites'
];
