import Heading from "../Heading";
import Actbox from "../UI-components/Actbox";
import { WorkerOrderIcon } from "@/components/icons/icons";
import Button from "../UI-components/button";
import ScheduledVisitsGrid from "../UI-components/workOrderDataFormed";
import TechnicianReportsGrid from "../UI-components/recentServiceDataFormed";

export default function ServiceReports() {
  // Define data availability flags
  const hasWorkOrders = true; // Change to false to show empty state
  const hasServiceReports = true; // Change to false to show empty state

  // Define all sections in an array
  const sections = [
    {
      id: 1,
      title: "Work Orders",
      hasData: hasWorkOrders,
      component: <ScheduledVisitsGrid />,
      boxData: {
        header: false,
        value: "No work orders yet",
        icon: <WorkerOrderIcon />,
        description: "Create your first work order to get started",
      },
    },
    {
      id: 2,
      title: "Recent Service Reports",
      hasData: hasServiceReports,
      component: <TechnicianReportsGrid />,
      boxData: {
        header: false,
        value: "No service reports yet",
        icon: <WorkerOrderIcon />,
        description:
          "Service reports will appear here once technicians start documenting their work",
      },
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Heading
          title="Service Reports"
          description="Manage work orders and service reports"
        />
        <Button value="Work Order" />
      </div>

      {/* Map through sections */}
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={index < sections.length - 1 ? "mb-8" : ""}
        >
          <h2 className="text-lg font-bold text-charcoal mb-4">
            {section.title}
          </h2>

          {/* Conditional rendering: Show component if data exists, otherwise show Actbox */}
          {section.hasData ? (
            section.component
          ) : (
            <Actbox {...section.boxData} />
          )}
        </div>
      ))}
    </div>
  );
}
