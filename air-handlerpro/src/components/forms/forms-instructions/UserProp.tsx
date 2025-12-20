export const InviteUserFormProps = [
  {
    nature: "full",
    type: "email",
    label: "Email",
    placeholder: "jke@company.com",
    required: true,
  },
  {
    nature: "full",
    type: "text",
    label: "Name",
    placeholder: "John Doe",
    required: true,
  },
  {
    nature: "full",
    type: "dropdown",
    label: "Role",
    placeholder: "User",
    required: true,
    option: ["User", "Admin", "Manager", "Viewer", "Editor"],
  },
  {
    nature: "full",
    type: "dropdown",
    label: "Company",
    placeholder: "Select company",
    required: true,
    option: [
      "ABC Corporation",
      "XYZ Industries",
      "Tech Solutions Inc",
      "Green Energy Co",
      "Summit Retail Group",
    ],
  },
  {
    sectionName: "button",
    button: ["Cancel", "Send Invitation"],
  },
];
