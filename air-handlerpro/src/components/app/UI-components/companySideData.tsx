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
} from "lucide-react";

interface CustomerAccountCardProps {
  companyData: any;
  onEdit?: () => void;
  onDelete?: () => void;
  viewMode?: "list" | "grid";
}

const CustomerAccountCard: React.FC<CustomerAccountCardProps> = ({
  companyData,
  onEdit,
  onDelete,
  viewMode = "grid",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    setIsDropdownOpen(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setIsDropdownOpen(false);
    onDelete?.();
  };

  // GRID VIEW - original card design
  if (viewMode === "grid") {
    return (
      <div
        className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-[374px] transition-all duration-300
          shadow-[2px_2px_0_0_rgba(76,92,104,1),4px_4px_0_0_rgba(70,73,76,1),6px_6px_0_0_rgba(25,133,161,1)]
          hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
          hover:-translate-y-1"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              {companyData.business_name}
            </h3>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <Edit2 className="w-5 h-5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <span className="px-4 py-1.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {companyData.type || "Customer"}
          </span>
          <span className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-300">
            <Users className="w-4 h-4" />
            {companyData.sites?.length || 0}{" "}
            {companyData.sites?.length === 1 ? "Site" : "Sites"}
          </span>
        </div>

        <div className="mb-5">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-3">
            Billing Contact
          </p>
          <div className="space-y-3">
            {(companyData.first_name || companyData.last_name) && (
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">
                  {companyData.first_name} {companyData.last_name}
                </span>
              </div>
            )}
            {companyData.billing_address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <span className="text-sm text-gray-700">
                  {companyData.billing_address}
                </span>
              </div>
            )}
            {companyData.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {companyData.phone}
                </span>
              </div>
            )}
            {companyData.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {companyData.email}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 -mx-6 pt-4">
          <div className="flex items-center gap-3 mb-5">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              Owner:{" "}
              <span className="font-medium">
                {companyData.full_name || "N/A"}
              </span>
            </span>
          </div>
          <button className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            View Sites ({companyData.sites?.length || 0})
          </button>
        </div>
      </div>
    );
  }

  // LIST VIEW - full width horizontal
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow w-full">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Building className="w-6 h-6 text-gray-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">
              {companyData.business_name}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {companyData.billing_address || "No address"}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
              {(companyData.first_name || companyData.last_name) && (
                <div className="flex items-center gap-1 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>
                    {companyData.first_name} {companyData.last_name}
                  </span>
                </div>
              )}
              {companyData.phone && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{companyData.phone}</span>
                </div>
              )}
              {companyData.email && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{companyData.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 ml-4">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {companyData.type || "Customer"}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-300">
              {companyData.sites?.length || 0} Sites
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-cerulean hover:bg-cerulean/10 rounded-md transition-colors"
              title="Edit company"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Delete company"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountCard;
