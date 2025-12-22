// app/page.tsx or any component

import ScheduledVisitCard from "./workOrderData";

// data/scheduledVisits.ts - Enhanced with complete data structure
export const scheduledVisitsData = [
  {
    id: "wo-001",
    siteName: "Test SH Network Site w/ parent",
    contactName: "Mason Keith",
    phone: "407-458-5548",
    email: "mason@gmail.com",
    workOrderNumber: "123456",
    serviceAddress: "65654 Street Lane orlando, FL 35654",
    scheduledStart: "Aug 26, 2025 4:00 PM",
    scheduledEnd: "Aug 26, 2025 8:00 PM",
    dateTime: "Aug 26, 2025 4:00 PM",
    description: "Brand New Work Order Reporting Page",
    equipmentInfo: "Trane TSC50HA",
    reportCount: 3,
    status: "scheduled" as const,
    createdDate: "Aug 21, 2025 4:52 AM",
    serviceReports: [
      {
        id: "sr-001",
        status: "draft" as const,
        createdDate: "Aug 21, 2025 5:52 AM",
        hours: 0,
      },
      {
        id: "sr-002",
        status: "signed" as const,
        createdDate: "Aug 21, 2025 5:00 AM",
        hours: 6,
      },
      {
        id: "sr-003",
        status: "draft" as const,
        createdDate: "Aug 21, 2025 5:36 AM",
        hours: 0,
      },
    ],
  },
  {
    id: "wo-002",
    siteName: "Stan Lee's Service Site",
    contactName: "Stan Lee",
    phone: "407-555-1249",
    email: "stan.lee@stanlees.com",
    workOrderNumber: "123457",
    serviceAddress: "15488 Orange Dr Apopka, FL 32756",
    scheduledStart: "Aug 22, 2025 12:30 PM",
    scheduledEnd: "Aug 22, 2025 4:30 PM",
    dateTime: "Aug 22, 2025 12:30 PM",
    description:
      "Customer called stating RTU 7 was not cooling properly and there is water coming through the ceiling tiles.",
    equipmentInfo: "York RTU-7",
    reportCount: 1,
    status: "scheduled" as const,
    createdDate: "Aug 20, 2025 10:15 AM",
    serviceReports: [
      {
        id: "sr-004",
        status: "draft" as const,
        createdDate: "Aug 22, 2025 1:00 PM",
        hours: 0,
      },
    ],
  },
  // Add more visits easily here
];

interface ScheduledVisitsGridProps {
  onViewDetails?: (workOrderId: string) => void;
}

export default function ScheduledVisitsGrid({
  onViewDetails,
}: ScheduledVisitsGridProps) {
  return (
    <div className="">
      <div className="flex gap-3 flex-wrap">
        {scheduledVisitsData.map((visit) => (
          <ScheduledVisitCard
            key={visit.id}
            {...visit}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
