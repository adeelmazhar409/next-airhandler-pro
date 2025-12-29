export const CompanyFormProps = [
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
        type: "list-with-add",
        placeholder: "Select a contact",
        message: "Select an existing contact or create a new one",
        buttonName: "+",
        linkTable: "contacts",
        linkTableValue: ["first_name", "last_name"],
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
                },
                {
                  label: "Last Name",
                  nature: "half",
                  type: "text",
                  placeholder: "Enter last name",
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
    type: "list-with-add",
    label: "service_sites",
    Title: "Service Sites",
    buttonName: "+ Add Site",
    linkTable: "sites",
    linkTableValue: "site_name",
    message: "No service sites added yet",
    modal: {
      modalHeading: "Add Service Site",
      modalFields: [
        {
          label: "site_name",
          Title: "Site Name",
          required: true,
          nature: "full",
          type: "text",
          placeholder: "Enter site name",
        },
        {
          label: "primary_contact",
          nature: "full",
          type: "dropdown",
          Title: "Primary Contact",
          required: true,
          placeholder: "Select a contact",
          option: ["test1", "test2"],
          buttonName: "+",
          modal: {
            modalHeading: "Create New Contact",
            modalFields: [
              {
                sectionName: "Basic Information",
                fields: [
                  {
                    label: "First Name",
                    Title: "First Name",
                    nature: "half",
                    type: "text",
                    placeholder: "Enter first name",
                  },
                  {
                    label: "Last Name",
                    Title: "Last Name",
                    nature: "half",
                    type: "text",
                    placeholder: "Enter last name",
                  },
                  {
                    label: "Title",
                    Title: "Title",
                    nature: "half",
                    type: "text",
                    placeholder: "Job title",
                  },
                  {
                    label: "Department",
                    Title: "Department",
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
                    Title: "Email",
                    nature: "half",
                    type: "email",
                    placeholder: "email@example.com",
                  },
                  {
                    label: "Phone",
                    Title: "Phone",
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
        {
          label: "service_address",
          nature: "full",
          Title: "Service Address",
          type: "text",
          placeholder: "Enter service address",
          required: true,
        },

        {
          sectionName: "button",
          button: ["Cancel", "Add Site"],
        },
      ],
    },
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

export const LinkTable = [
  'contacts', 'users', 'company_types'
];
