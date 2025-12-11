import React from "react";
import StatsCard from "../UI-components/StatsCard";
import { ContactsIcon, NocontactIcon } from "../../../icons/icons";
import Actbox from "../UI-components/Actbox";

export default function ContactsContent() {
  const value = {
    header: false,
    value: "Contacts",
    icon: <NocontactIcon />,
    description: "Manage your customer and prospect relationships here.",
  };

  const cards = [
    {
      title: "total contacts",
      value: 0,
      icon: <ContactsIcon />,
      hoverable: false,
    },
    {
      title: "Active Contacts",
      value: 0,
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
      value: 0,
      icon: <ContactsIcon />,
      hoverable: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="mx-auto mt-6 px-4">
        {/* Stats Overview Card */}
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-4 h-4 text-gray-700"
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
            <h2 className="text-sm font-bold text-gray-900">
              Contact Management
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                Total Contacts
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Prospects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Customers</div>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
              <NocontactIcon />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              No contacts yet
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Get started by adding your first contact
            </p>

            {/* Centered New Contact Button */}
            <button className="bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 mx-auto hover:bg-gray-800 transition-all shadow-md">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Contact
            </button>
          </div>
        </div>

        {/* Section Title Below */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Contacts</h3>
            <p className="text-xs text-gray-600">
              Manage your customer and prospect relationships
            </p>
          </div>

          {/* Repeated New Contact Button (Bottom Right) */}
          <button className="bg-black text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-800 transition-all shadow-md">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Contact
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 px-4">
        {cards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>
      <Actbox {...value} />
    </div>
  );
}
