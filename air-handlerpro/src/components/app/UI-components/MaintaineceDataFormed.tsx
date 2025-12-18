import EstimateCard from "./MantainaceData";
// data/estimates.ts

export const estimatesData = [
  {
    title: "Testing",
    estimateNumber: "#123456",
    customerName: "SH Network",
    address: "1234 Sample Service Site Dr Orlando, FL 32901",
    contractTerm: "12 months",
    billingFrequency: "Monthly",
    startDate: "Jan 01, 2026",
    totalAmount: "$0",
    createdDate: "Created Dec 03, 2025",
    status: "draft" as const,
  },
  {
    title: "Maintenance Estimate - SH Network",
    estimateNumber: "#EST-13375476",
    customerName: "SH Network",
    address: "1234 Sample Service Site Dr Orlando, FL 32901",
    contractTerm: "12 months",
    billingFrequency: "Annual",
    startDate: "Dec 02, 2025",
    totalAmount: "$0",
    createdDate: "Created Dec 03, 2025",
    status: "draft" as const,
  },
  {
    title: "Maintenance Estimate - New Estimate",
    estimateNumber: "#EST-34733382",
    customerName: "Test SH Network Site w/ parent",
    address: "65654 Street Lane orlando, FL 35654",
    contractTerm: "12 months",
    billingFrequency: "Annual",
    startDate: "Nov 21, 2025",
    totalAmount: "$0",
    createdDate: "Created Nov 21, 2025",
    status: "draft" as const,
  },
  // Add more estimates easily here
];

export default function EstimatesGrid() {
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Estimates</h2>

      <div className="flex gap-3 flex-wrap">
        {estimatesData.map((estimate, index) => (
          <EstimateCard
                key={index} // Use unique ID in real app
                {...estimate}
          />
        ))}
      </div>
    </div>
  );
}
