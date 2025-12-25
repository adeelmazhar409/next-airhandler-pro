// components/CustomerAccountCard.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  User,
  Edit2,
  Users,
  Trash2,
  Edit,
} from "lucide-react";

interface CustomerAccountCardProps {
  companyData: any;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

const CustomerAccountCard: React.FC<CustomerAccountCardProps> = ({
  companyData,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleEdit = () => {
    setIsDropdownOpen(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setIsDropdownOpen(false);
    onDelete?.();
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 w-full max-w-sm
     transition-all duration-300
        shadow-[2px_2px_0_0_rgba(76,92,104,1),4px_4px_0_0_rgba(70,73,76,1),6px_6px_0_0_rgba(25,133,161,1)]
        hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
        hover:-translate-y-1
        ${isDeleting ? 'opacity-50 pointer-events-none' : ''}
    `}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Building className="w-6 h-6 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">{companyData.business_name}</h3>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <Edit2 className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-3 mb-5">
        <span className="px-4 py-1.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {companyData.company_type}
        </span>
        <span className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-300">
          <Users className="w-4 h-4" />
          {companyData.sites_count} {companyData.sites_count === 1 ? "Site" : "Sites"}
        </span>
      </div>

      {/* Billing Contact Section */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-3">
          Billing Contact
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">
              {companyData.primary_contact.first_name} {companyData.primary_contact.last_name}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
            <span className="text-sm text-gray-700">{companyData.billing_address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{companyData.primary_contact.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{companyData.primary_contact.email}</span>
          </div>
        </div>
      </div>

      {/* Owner */}
      <div className="border-t border-gray-200 -mx-auto pt-4 mb-5">
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">
            Owner: <span className="font-medium">{companyData.owner?.email || companyData.created_by || "N/A"}</span>
          </span>
        </div>
      </div>

      {/* View Sites Button */}
      <button className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
        View Sites ({companyData.sites_count || 0})
      </button>
    </div>
  );
};

export default CustomerAccountCard;
