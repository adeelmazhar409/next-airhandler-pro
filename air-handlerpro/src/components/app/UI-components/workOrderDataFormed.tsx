// app/page.tsx or any component

import ScheduledVisitCard from './workOrderData';


// data/scheduledVisits.ts

export const scheduledVisitsData = [
  {
    siteName: "Test SH Network Site w/ parent",
    contactName: "Mason Keith",
    dateTime: "Aug 26, 2025 4:00 PM",
    description: "Brand New Work Order Reporting Page",
    reportCount: 3,
    status: "scheduled" as const,
  },
  {
    siteName: "Stan Lee's Service Site",
    contactName: "Stan Lee",
    dateTime: "Aug 22, 2025 12:30 PM",
    description: "Customer called stating RTU 7 was not cooling properly and there is water coming through the ceiling tiles.",
    reportCount: 1,
    status: "scheduled" as const,
  },
  // Add more visits easily here
];




export default function ScheduledVisitsGrid() {
  return (
    <div className="">
      
      <div className="flex gap-3 flex-wrap">
        {scheduledVisitsData.map((visit, index) => (
          <ScheduledVisitCard
                key={index} // Use unique ID in production
                {...visit}
          />
        ))}
      </div>
    </div>
  );
}