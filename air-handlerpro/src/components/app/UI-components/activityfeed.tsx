"use client";
import ActivityItem from "@/components/app/UI-components/Activityitem";

const activityItems = [
  {
    title: "Deal created from maintenance estimate",
    description:
      "Deal automatically created from maintenance estimate 25-10035",
    relatedTo: "deal · 7e5edd56-b2c9-4f1a-9e8d-3a7f9c1d2e4f",
    completedDate: "Nov 5, 2025",
    priority: "medium" as const,
    type: "note" as const,
  },
  {
    title: "Deal created from maintenance estimate",
    description: "Deal automatically created from maintenance estimate dscsd",
    relatedTo: "deal · 725ff69fb-1a2b-4c3d-8e9f-0a1b2c3d4e5f",
    completedDate: "Oct 2, 2025",
    priority: "medium" as const,
    type: "note" as const,
  },
  {
    title: "Deal created from maintenance estimate",
    description: "Deal automatically created from maintenance estimate 125487",
    relatedTo: "deal · 46513576-8d9e-4f2a-b1c3-d5e6f7a8b9c0",
    completedDate: "Oct 1, 2025",
    priority: "medium" as const,
    type: "note" as const,
  },
  {
    title: "John Clark @ RCL Labs",
    description: "Review proposal in person",
    relatedTo: "deal · d5a54fac-3e2f-4b1a-9c8d-7e6f5d4c3b2a",
    dueDate: "Sep 30, 2025 6:00 PM",
    completedDate: "Oct 1, 2025",
    priority: "high" as const,
    type: "meeting" as const,
  },
  {
    title: "Sarah Mitchell @ Vertex Solutions",
    description: "Follow-up call scheduled regarding pricing concerns",
    relatedTo: "deal · a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    dueDate: "Dec 20, 2025 2:30 PM",
    priority: "high" as const,
    type: "meeting" as const,
  },
  {
    title: "System Notification",
    description: "Discount approval requested by Tim Wallick",
    relatedTo: "deal · 9f8e7d6c-5b4a-3938-2716-1829abcde012",
    completedDate: "Dec 15, 2025",
    priority: "low" as const,
    type: "note" as const,
  },
  {
    title: "Emma Rodriguez",
    description: "Updated scope of work document attached",
    relatedTo: "deal · 11223344-5566-7788-99aa-bbccddeeff00",
    completedDate: "Dec 10, 2025",
    priority: "medium" as const,
    type: "task" as const,
  },
];
export default function ActivityFeed() {
  return (
    <div className=" mx-auto p-6 space-y-4">
      {activityItems.map((item, index) => (
        <ActivityItem
          key={index} // Better: use a unique id if available
          title={item.title}
          desc={item.description}
          relatedTo={item.relatedTo}
          completedDate={item.completedDate}
          dueDate={item.dueDate}
          priority={item.priority}
          type={item.type}
        />
      ))}
    </div>
  );
}
