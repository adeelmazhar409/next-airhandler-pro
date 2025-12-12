
import React from "react";
import StatsCard from "../crm/UI-components/StatsCard";
import Heading from "../Heading";
import Button from "../button";
import SearchAndFilters from "../crm/UI-components/SearchAndFilter";
import Actbox from "../crm/UI-components/Actbox";
import { ActiveCustomersIcon, ContactsIcon, CRMIcon, ServiceSitesIcon , NocontactIcon} from "@/components/icons/icons";
export default function ContactsPage() {
  const topStats = [
    {
      title: "Total Companies",
      value: "0",
      icon: <CRMIcon />,
      hoverable: false,
    },
    {
      title: "Service Sites",
      value: "0",
      icon: <ServiceSitesIcon />,
    },
    {
      title: "Active Customers",
      value: "0",
      icon: <ActiveCustomersIcon />,
    },
    {
      title: "Prospects",
      value: "0",
      icon: <ContactsIcon />,
    },
  ];

  const InputData = {
    value1: "All Statuses",
    value2: "All Types",
    value3: "Name",
    Buttons: true,
  }

  const value = {
    header: false,
    value: "Contacts",
    icon: <NocontactIcon/>,
    description:
      "Manage your customer and prospect relationships here.",
  };
  return (
    <div className=" bg-gray-50 p-8">
      <div className="flex justify-between items-center ">
        <Heading
          title="Contact"
          description="Manage your customer and prospect relationships"
        />
<Button value="Contact"/>

      </div>
      {/* Stats Cards Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {topStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>


      {/* Search and Filters Row */}
      
      <SearchAndFilters {...InputData} />


      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">Showing 0 of 0 contacts</p>
      </div>

      {/* Empty State */}

      <Actbox  {...value} />
      
    </div>
  );
}
