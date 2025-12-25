export const CompanyFormProps = [
  {
    sectionName: "Company Information",
    fields: [
      {
        nature: "half",
        type: "text",
        label: "business_name",
        placeholder: "Enter business name",
        required: true,
      },
      {
        nature: "half",
        type: "dropdown",
        label: "company_type",
        placeholder: "Select company type",
        required: true,
        option: ["Customer", "Prospect", "Vendor", "Subcontractor"],
      },
    ],
  },
  {
    sectionName: "Billing Contact",
    fields: [
      {
        label: "primary_contact",
        nature: "full",
        type: "list-with-add",
        placeholder: "Select a contact",
        message: "Select an existing contact or create a new one",
        option: ["test1", "test2"],
        buttonName: "+",
        linkTable: "contacts",
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
        placeholder: "Enter billing address",
        rows: 4,
      },
    ],
  },
  {
    nature: "full",
    type: "list-with-add",
    label: "service_sites",
    placeholder: "No service sites added yet",
    buttonName: "Add Site",
    linkTable: "sites",
    message: "No service sites added yet",
    modal: {
      modalHeading: "Add Service Site",
      modalFields: [
        {
          label: "site_name",
          nature: "full",
          type: "text",
          placeholder: "Enter site name",
        },
        {
          label: "primary_contact",
          nature: "full",
          type: "dropdown",
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
          label: "service_address",
          nature: "full",
          type: "text",
          placeholder: "Enter service address",
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
    label: "owner",
    placeholder: "Select owner (defaults to you)",
    option: [
      "Me (Default)",
      "Tim Wallick",
      "Sarah Chen",
      "Michael Torres",
      "Emma Rodriguez",
      "David Anderson",
    ],
    message: "If left blank, you will be set as the owner.",
  },
  {
    nature: "full",
    type: "textarea",
    label: "notes",
    placeholder: "Add any additional notes about this company...",
    rows: 4,
  },
  {
    sectionName: "button",
    button: ["Cancel", "Create Parent Company"],
  },
];

export const LinkTable = [
  'contacts', 'users'
];
