import React from "react";
import StatsCard from "../../UI-components/StatsCard";
import { ContactsIcon, NocontactIcon } from "../../../icons/icons";
import Actbox from "../../UI-components/Actbox";
import { useState } from "react";
import { CreateContactForm } from "../../contacts/CreateContactForm";
import ContactsExample from "../../UI-components/ContactPageDataFormed";
import Button from "../../UI-components/button";
export default function ContactsContent() {
  const value = {
    header: false,
    value: "Contacts",
    icon: <NocontactIcon />,
    description: "Manage your customer and prospect relationships here.",
  };

 

    const [searchValue, setSearchValue] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [formToggle, setFormToggle] = useState(false);
  
    const handleCreateContact = () => {
      setFormToggle(true);
    };
  
    const handleCancel = () => {
      setFormToggle(false);
    };
  
    const handleSubmit = (formData: any) => {
      console.log("Form submitted:", formData);
      // Handle form submission logic
      // After successful submission, you might want to close the form:
      // setFormToggle(false);
    };
  
    if (formToggle) {
      return (
        <CreateContactForm onCancel={handleCancel} onSubmit={handleSubmit} />
      );
    }
  

  const cards = [
    {
      title: "total contacts",
      value: 2,
      icon: <ContactsIcon />,
      hoverable: false,
    },
    {
      title: "Active Contacts",
      value: 1,
      icon: <ContactsIcon />,
      hoverable: false,
    },
    {
      title: "Prospects",
      value: 0,
      icon: <ContactsIcon />,
      hoverable: false,
    },
    {
      title: "Customers",
      value: 1,
      icon: <ContactsIcon />,
      hoverable: false,
    },
  ];

  const data = true;

  return (
    <div className=" ">
      {/* Main Content */}

      {/* Section Title Below */}
      <div className="flex  w-full justify-end">
        <Button onClick={handleCreateContact} value="Create contact" />
      </div>
      <div className="mx-auto mt-6 px-4">
        {/* Stats Overview Card */}
        <div className="bg-white rounded-lg border border-silver shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-4 h-4 text-cerulean"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-sm font-bold text-charcoal">
              Contact Management
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">2</div>
              <div className="text-[11px] text-slate mt-0.5">
                Total Contacts
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">1</div>
              <div className="text-[11px] text-slate mt-0.5">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">0</div>
              <div className="text-[11px] text-slate mt-0.5">Prospects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-charcoal">1</div>
              <div className="text-[11px] text-slate mt-0.5">Customers</div>
            </div>
          </div>

          {/* Empty State */}

          {data ? (
            <ContactsExample />
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 mb-4 text-silver">
                <NocontactIcon />
              </div>
              <h3 className="text-sm font-semibold text-charcoal mb-1">
                No contacts yet
              </h3>
              <p className="text-xs text-slate mb-4">
                Get started by adding your first contact
              </p>

              {/* Centered New Contact Button */}
              <Button onClick={handleCreateContact} value="Create contact" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
