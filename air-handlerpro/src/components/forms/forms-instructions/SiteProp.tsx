export const SiteFormProps = [
  {
    sectionName: "Basic Information",
    sectionBorder: true,
    fields: [
      {
        nature: "half",
        type: "text",
        label: "Site Name",
        placeholder: "Enter site name",
        required: true,
      },
      {
        nature: "half",
        type: "dropdown",
        label: "Parent Company",
        placeholder: "Select parent company or leave standalone",
        option: [
          "ABC Corporation",
          "XYZ Industries",
          "Tech Solutions Inc",
          "Green Energy Co",
          "Standalone",
        ],
        buttonName: "+",
        modal: {
          modalHeading: "Add Parent Company",
          modalFields: [
            {
              nature: "half",
              type: "text",
              label: "Business Name",
              placeholder: "Enter business name",
              required: true,
            },
            {
              nature: "half",
              type: "dropdown",
              label: "Company Type",
              placeholder: "Select company type",
              required: true,
              option: ["Customer", "Prospect", "Vendor", "Subcontractor"],
            },
            {
              nature: "half",
              type: "text",
              label: "Billing Contact Name",
              placeholder: "Enter contact name",
              required: true,
            },
            {
              nature: "half",
              type: "text",
              label: "Billing Address",
              placeholder: "Enter billing address",
              required: true,
            },
            {
              nature: "half",
              type: "text",
              label: "Billing Contact Phone",
              placeholder: "Enter phone number",
              required: true,
            },
            {
              nature: "half",
              type: "text",
              label: "Billing Contact Email",
              placeholder: "Enter email address",
              required: true,
            },
            {
              nature: "half",
              type: "dropdown",
              label: "Owner",
              placeholder: "Select owner (defaults to you)",
              required: true,
              option: ["Customer", "Prospect", "Vendor", "Subcontractor"],
              message: "If left blank, the creator will be set as owner.",
            },
            {
              sectionName: "button",
              button: ["Cancel", "Create Company"],
            },
          ],
        },
      },
      {
        nature: "full",
        type: "text",
        label: "Service Address",
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
        type: "search-dropdown",
        label: "Primary Contact",
        placeholder: "Select a contact",
        required: true,
        option: [
          "John Smith",
          "Sarah Johnson",
          "Michael Brown",
          "Emily Davis",
          "David Wilson",
        ],
        buttonName: "+",
        message: "Select an existing contact or create a new one",
        modal: {
          modalHeading: "Create New Contact",
          modalFields: [
            {
              sectionName: "Basic Information",
              fields: [
                {
                  label: "First Name",
                  nature: "half",
                  type: "text",
                  placeholder: "Enter first name",
                  required: true,
                },
                {
                  label: "Last Name",
                  nature: "half",
                  type: "text",
                  placeholder: "Enter last name",
                  required: true,
                },
                {
                  label: "Title",
                  nature: "half",
                  type: "text",
                  placeholder: "Job title",
                },
                {
                  label: "Department",
                  nature: "half",
                  type: "text",
                  placeholder: "Department",
                },
              ],
            },
            {
              sectionName: "Contact Information",
              fields: [
                {
                  label: "Email",
                  nature: "half",
                  type: "email",
                  placeholder: "email@example.com",
                },
                {
                  label: "Phone",
                  nature: "half",
                  type: "text",
                  placeholder: "Primary phone number",
                },
              ],
            },
            {
              sectionName: "button",
              button: ["Cancel", "Create Contact"],
            },
          ],
        },
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
        label: "Manually Set Owner",
        message: "Override the default owner assignment",
      },
      {
        nature: "full",
        type: "dropdown",
        label: "Site Owner",
        placeholder: "Select owner (defaults to parent or you)",
        option: [
          "Default Assignment",
          "Tim Wallick",
          "Sarah Chen",
          "Michael Torres",
          "Emma Rodriguez",
          "David Anderson",
        ],
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
