import Heading from "../Heading";
import Actbox from "../crm/UI-components/Actbox";
import { WorkerOrderIcon } from "@/components/icons/icons";

export default function ServiceReports() {
  // Define all sections in an array
  const sections = [
    {
      id: 1,
      title: "Work Orders",
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
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <Heading
        title="Service Reports"
        description="Manage work orders and service reports"
      />

      {/* Map through sections */}
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={index < sections.length - 1 ? "mb-8" : ""}
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <Actbox {...section.boxData} />
        </div>
      ))}
    </div>
  );
}
