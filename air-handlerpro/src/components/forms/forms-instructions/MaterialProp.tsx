export const MaterialFormProps = [
  {
    nature: "full",
    type: "text",
    label: "Description",
    placeholder: "Describe material",
    required: true,
  },
  {
    sectionName: "Equipment Specifications",
    sectionBorder: true,
    fields: [
      {
        nature: "full",
        type: "search-dropdown",
        label: "Equipment Type",
        placeholder: "Describe material",
        required: true,
        option: ["1", "2"],
      },
      {
        nature: "full",
        type: "dropdown",
        label: "Equipment Size",
        placeholder: "Describe material",
        required: true,
        option: ["1", "2", "3"],
      },
      {
        nature: "full",
        type: "dropdown",
        label: "Task Bundle",
        placeholder: "Describe material",
        required: true,
        option: ["1", "2", "3"],
      },
    ],
  },
  {
    sectionName: "",
    fields: [
      {
        nature: "half",
        type: "number",
        label: "Quantity",
        placeholder: "0",
        required: true,
      },
      {
        nature: "half",
        type: "number",
        label: "Cost ($)",
        placeholder: "0",
        required: true,
      },
    ],
  },
  {
    sectionName: "button",
    button: ["Cancel", "Create Material"],
  },
];
