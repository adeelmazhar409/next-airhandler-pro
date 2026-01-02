// components/ServiceSiteCard.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  Edit2,
  Globe,
  Trash2,
  Edit,
} from "lucide-react";
import { confirm } from "@/components/confirm";

interface ServiceSiteCardProps {
  siteData: any;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

const ServiceSiteCard: React.FC<ServiceSiteCardProps> = ({
  siteData,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  // Icon for site type
  const getSiteTypeIcon = () => {
    if (siteData.site_type === "hq") return <Building className="w-4 h-4" />;
    if (siteData.site_type === "global") return <Globe className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
  }, [isDropdownOpen]);

  const handleEdit = () => {
    setIsDropdownOpen(false);
    onEdit?.();
  };

  const handleDeleteConfirm = () => {
    confirm(`Are you sure you want to delete ${siteData.site_name}?`, () => {
      onDelete?.();
    });
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-sm  transition-all duration-300
        shadow-[2px_2px_0_0_rgba(76,92,104,1),4px_4px_0_0_rgba(70,73,76,1),6px_6px_0_0_rgba(25,133,161,1)]
        hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
        hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">{siteData.site_name}</h3>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <Edit2 className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Site Type Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-600">Site</span>
        <span className="flex items-center gap-1.5 px-3 py-1 bg-cerulean text-white text-xs font-medium rounded-full border border-gray-300">
          {getSiteTypeIcon()}
          {siteData.site_type}
        </span>
      </div>

      {/* Service Location */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
          Service Location
        </p>
        <div className="flex items-start gap-2 mt-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{siteData.service_address}</p>
        </div>
      </div>

      {/* Service Contact */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
          Service Contact
        </p>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">{siteData.primary_contact_name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{siteData.primary_contact_phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{siteData.primary_contact_email}</span>
          </div>
        </div>
      </div>

      {/* Divider & Owner */}
      <div className="border-t border-gray-200 mx-auto -mx-6 pt-4">
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm">
            Owner: <span className="font-medium">{siteData.owner_name}</span>
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Service Site</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this service site?</p>
            <div className="flex justify-end gap-2">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                Cancel
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer" onClick={() => onDelete?.()}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSiteCard;
