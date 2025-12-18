// components/ContactCard.tsx

import React from "react";
import { Mail, Phone, Edit2 } from "lucide-react";

export interface ContactCardProps {
  initials: string;
  name: string;
  role?: string; // e.g., "Sr Maintenance Engineer • Engineering"
  department?: string; // Only used in customer card
  tags?: { label: string; color: "cerulean" | "gray" }[];
  status?: "active" | "inactive"; // For internal users (shows "Active" badge)
  email?: string;
  phone?: string;
  showActions?: boolean; // Show Email/Call buttons at bottom
}

const ContactCard: React.FC<ContactCardProps> = ({
  initials,
  name,
  role,
  department,
  tags = [],
  status,
  email,
  phone,
  showActions = true,
}) => {
  const getTagColor = (color: string) => {
    switch (color) {
        case "cerulean":
            return "bg-cerulean text-white";
     
      case "gray":
        return "bg-gray-200 text-gray-800 border border-gray-300";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div
      className="bg-white rounded-xl  border border-gray-200 p-6 w-full max-w-sm  transition-all duration-300
        shadow-[2px_2px_0_0_rgba(76,92,104,1),4px_4px_0_0_rgba(70,73,76,1),6px_6px_0_0_rgba(25,133,161,1)]
        hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
        hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
            {initials}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            {role && (
              <p className="text-sm text-gray-600">
                {role}
                {department && (
                  <span className="text-gray-500"> • {department}</span>
                )}
              </p>
            )}
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition">
          <Edit2 className="w-5 h-5" />
        </button>
      </div>

      {/* Tags & Status */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {status === "active" && (
          <span className="px-3 py-1 bg-slate text-white text-xs font-medium rounded-full">
            Active
          </span>
        )}
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 text-xs font-medium rounded-full ${getTagColor(
              tag.color
            )}`}
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Contact Info */}
      {(email || phone) && (
        <div className="space-y-3 mb-6 text-gray-700">
          {email && (
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{phone}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <>
          <div className="border-t border-gray-200 -mx-6 mb-4" />
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Mail className="w-4 h-4 text-charcoal" />
              <span className="text-sm text-charcoal  font-medium">Email</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Phone className="w-4 h-4 text-charcoal" />
              <span className="text-sm text-charcoal font-medium">Call</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactCard;
