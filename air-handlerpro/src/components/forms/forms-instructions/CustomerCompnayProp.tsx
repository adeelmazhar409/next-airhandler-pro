export const CustomerCompanyFormProps = [
  {
    nature: "full",
    type: "text",
    label: "Company Name",
    placeholder: "Acme Corp",
    required: true,
  },
  {
    nature: "full",
    type: "url",
    label: "Domain",
    placeholder: "acmecorp.com",
    required: true,
  },
  {
    sectionName: "button",
    button: ["Cancel", "Create Company"],
  },
];
