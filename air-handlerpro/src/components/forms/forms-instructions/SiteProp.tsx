export const SiteFormProps = [
  {
    sectionName: "Basic Information",
    sectionBorder: true,
    fields: [
      {
        nature: "half",
        type: "text",
        label: "site_name",
        Title: "Site Name",
        placeholder: "Enter site name",
        required: true,
      },
      {
        nature: "half",
        type: "dropdown",
        label: "parent_company_id",
        Title: "Parent Company",
        placeholder: "Select parent company or leave standalone",
        linkTable: "companies",
        linkTableValue: "business_name",
      },
      {
        nature: "full",
        type: "text",
        label: "service_address",
        Title: "Service Address",
        placeholder: "Enter complete service address",
        message: "Include street address, city, state, and ZIP code",
      },
    ],
  },
  {
    sectionName: "Contact Information",
    sectionBorder: true,
    fields: [
      {
        nature: "full",
        type: "list-with-search",
        label: "primary_contact_id",
        Title: "Primary Contact",
        placeholder: "Select a contact",
        required: true,
        message: "Select an existing contact or create a new one",
        linkTable: "contacts",
        linkTableValue: ["first_name", "last_name"],
      },
    ],
  },
  {
    sectionName: "Owner Settings",
    sectionBorder: true,
    fields: [
      {
        nature: "full",
        type: "toggle",
        label: "manually_set_owner",
        Title: "Manually Set Owner",
        message: "Override the default owner assignment",
      },
      {
        nature: "full",
        type: "dropdown",
        label: "site_owner_id",
        Title: "Site Owner",
        placeholder: "Select owner (defaults to parent or you)",
        linkTable: "users",
        linkTableValue: "full_name",
        message:
          "If not set, owner defaults to the parent company's owner or the creator",
      },
    ],
  },
  {
    sectionName: "button",
    button: ["Cancel", "Create Service Site"],
  },
];

export const siteLinkTable = [
  'contacts', 'users', 'companies'
];