export const DealFormProps = [
  {
    nature: "full",
    type: "text",
    label: "Deal Name",
    placeholder: "Enter deal name",
    required: true,
  },
  {
    nature: "half",
    type: "number",
    label: "Deal Value ($)",
    placeholder: "0.00",
  },
  {
    nature: "half",
    type: "number",
    label: "Probability (%)",
    placeholder: "0",
  },
  {
    nature: "half",
    type: "stage-dropdown",
    label: "Stage",
    placeholder: "Lead (10%)",
    option: [
      "Lead (10%)",
      "Qualified (35%)",
      "Proposal (50%)",
      "Negotiation (85%)",
      "Closed Won (100%)",
      "Closed Lost (0%)",
      "Closed Other (0%)",
    ],
  },
  {
    nature: "half",
    type: "date",
    label: "Expected Close Date",
    placeholder: "Pick a date",
  },
  {
    nature: "half",
    type: "text",
    label: "Source",
    placeholder: "Lead source (e.g., Website, Referral)",
  },
  {
    nature: "half",
    type: "dropdown",
    label: "Parent Company",
    placeholder: "Select parent company",
    option: [
      "ABC Corporation",
      "XYZ Industries",
      "Tech Solutions Inc",
      "Green Energy Co",
    ],
  },
  {
    nature: "full",
    type: "dropdown",
    label: "Service Site",
    placeholder: "Select service site",
    required: true,
    option: ["Main Office", "Branch A", "Branch B", "Warehouse"],
  },

  {
    nature: "full",
    type: "textarea",
    label: "Description",
    placeholder: "Enter deal description, notes, or requirements...",
    rows: 4,
  },

  {
    sectionName: "button",
    button: ["Cancel", "Create Deal"],
  },
];
