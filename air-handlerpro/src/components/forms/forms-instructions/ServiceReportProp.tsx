export const ServiceReportFormProps = [
    {
      nature: "full",
      type: "search-dropdown",
      label: "Customer",
      placeholder: "Select a customer",
      required: true,
      option: [
        "ABC Corporation",
        "XYZ Industries",
        "Tech Solutions Inc",
        "Green Energy Co",
      ],
    },
    {
      nature: "full",
      type: "number",
      label: "Work Order Number",
      placeholder: "Enter work order number...",
    },
    {
      nature: "full",
      type: "date&time",
      label: "Scheduled Start",
      placeholder: "mm/dd/yyyy",
      hourplaceholder: "00 AM",
      minuteplaceholder: "00"
    },
    {
      nature: "full",
      type: "date&time",
      label: "Scheduled End",
      placeholder: "mm/dd/yyyy",
      hourplaceholder: "00 AM",
      minuteplaceholder: "00"
    },  
    {
      nature: "full",
      type: "textarea",
      label: "Description",
      placeholder: "Describe the work to be performed...",
      rows: 5,
    },
    {
      nature: "full",
      type: "textarea",
      label: "Equipment Information",
      placeholder: "Equipment details, model numbers, etc...",
      rows: 5,
    },
  
    {
      sectionName: "button",
      button: ["Cancel", "Create Work Order"],
    },
  ];