// app/page.tsx or any component
import ContactCard from "@/components/app/UI-components/contactPageData";
import { ContactCardProps } from "@/components/app/UI-components/contactPageData";

export default function ContactsExample() {
  const data: ContactCardProps[] = [
    {
      initials: "JS",
      name: "John Smith",
      role: "Sr Maintenance Engineer",
      department: "Engineering",
      tags: [
        { label: "Customer", color: "cerulean" },
        { label: "Primary", color: "gray" },
      ],
      email: "John@maintenaceengineer.com",
      phone: "407-555-4581",
      showActions: true,
    },
    {
      initials: "TW",
      name: "Tim Wallick",
      role: "Owner",
      status: "active",
      tags: [{ label: "Primary", color: "gray" }],
      email: "timwallick@gmail.com",
      phone: "4072215756",
      showActions: true,
    },
  ];

  return (
    <div className="p-8 ">
      <div className="flex flex-wrap gap-8 justify-center">
        {data.map((contact, index) => (
          <ContactCard key={index} {...contact} />
        ))}
      </div>
    </div>
  );
}
