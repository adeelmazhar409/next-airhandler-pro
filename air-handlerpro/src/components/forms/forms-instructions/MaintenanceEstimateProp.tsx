import { UserIcon } from "@/components/icons/icons";

export const MaintenanceEstimateFormProps = [
  {
    sectionName: "Customer Site Selection",
    Icon: <UserIcon />,
    sectionBorder: true,
    fields: [
      {
        nature: "full",
        type: "dropdown",
        label: "Select Customer Site",
        placeholder: "Choose a customer site",
        option: ["uk", "ed"],
        buttonName: "Add New Site",
        modal: {
          modalHeading: "Add Service Site",
          modalFields: [
            {
              label: "Site Name",
              nature: "full",
              type: "text",
              placeholder: "Enter site name",
            },
            {
              label: "Parent Company (Optional)",
              nature: "full",
              type: "dropdown",
              placeholder: "Select parent company or leave standalone.",
              option: ["Standalone Site"],
            },
            {
              label: "Primary Contact",
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
                    sectionName: "Company Associations",
                    fields: [
                      {
                        label: "Parent Company",
                        nature: "half",
                        type: "dropdown",
                        placeholder: "Select company",
                        option: ["test1", "test2"],
                      },
                      {
                        label: "Service site",
                        nature: "half",
                        type: "dropdown",
                        placeholder: "Select site",
                        option: ["test1", "test2"],
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
              label: "Service Address",
              nature: "full",
              type: "text",
              placeholder: "Enter service address",
            },
            {
              nature: "full",
              label: "Manually set Owner",
              type: "toggle",
            },
            {
              label: "Owner",
              type: "dropdown",
              nature: "full",
              placeholder: "Select owner (defaults to parent or you)",
              message:
                "If not set, owner defaults to the parent companys owner or the creator.",
            },
            {
              sectionName: "button",
              button: ["Cancel", "Add Service Site"],
            },
          ],
        },
      },
    ],
  },
  {
    sectionName: "Estimate Information",
    sectionBorder: false,
    fields: [
      {
        nature: "half",
        type: "text",
        label: "Estimate Name",
        placeholder: "Enter estimate name",
      },
      {
        nature: "half",
        type: "number",
        label: "Estimate Number",
        placeholder: "Enter estimate number",
      },
    ],
  },
  {
    sectionName: "Contract Settings",
    sectionBorder: false,
    fields: [
      {
        nature: "half",
        type: "number",
        label: "Contract Length (months)",
        placeholder: "12",
      },
      {
        nature: "half",
        type: "date",
        label: "Contract Start Date",
        placeholder: "Pick a date",
      },
      {
        nature: "half",
        type: "dropdown",
        label: "Billing Frequency",
        placeholder: "Monthly",
        option: ["Monthly", "Quarterly", "Annual", "Bi-Annual"],
      },
    ],
  },
  {
    sectionName: "Travel & Additional Costs",
    sectionBorder: false,
    fields: [
      {
        nature: "third",
        type: "number",
        label: "Miles to Site",
        placeholder: "0",
      },
      {
        nature: "third",
        type: "number",
        label: "Travel Charge (if not using mileage)",
        placeholder: "0",
      },
      {
        nature: "third",
        type: "number",
        label: "Parking/Other Fees",
        placeholder: "0",
      },
    ],
  },
  {
    sectionName: "button",
    button: ["Cancel", "Create Estimate"],
  },
];
