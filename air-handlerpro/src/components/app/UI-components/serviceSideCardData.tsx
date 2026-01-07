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
} from "lucide-react";

interface ServiceSiteCardProps {
  siteData: any;
  onEdit?: () => void;
  onDelete?: () => void;
  viewMode?: "list" | "grid";
}

const ServiceSiteCard: React.FC<ServiceSiteCardProps> = ({
  siteData,
  onEdit,
  onDelete,
  viewMode = "grid",
}) => {
  const getSiteTypeIcon = () => {
    if (siteData.site_type === "hq") return <Building className="w-4 h-4" />;
    if (siteData.site_type === "global") return <Globe className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

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

  // GRID VIEW - your original beautiful card
  if (viewMode === "grid") {
    return (
      <div
        className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-[370px] transition-all duration-300
          shadow-[2px_2px_0_0_rgba(76,92,104,1),4px_4px_0_0_rgba(70,73,76,1),6px_6px_0_0_rgba(25,133,161,1)]
          hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
          hover:-translate-y-1"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              {siteData.site_name}
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

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-600">Site</span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-cerulean text-white text-xs font-medium rounded-full">
            {getSiteTypeIcon()}
            {siteData.site_type || "Standard"}
          </span>
        </div>

        <div className="mb-5">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            Service Location
          </p>
          <div className="flex items-start gap-2 mt-2 text-gray-700">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              {siteData.service_address || "No address provided"}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            Service Contact
          </p>
          <div className="mt-2 space-y-2">
            {siteData.primary_contact_name && (
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">
                  {siteData.primary_contact_name}
                </span>
              </div>
            )}
            {siteData.primary_contact_phone && (
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  {siteData.primary_contact_phone}
                </span>
              </div>
            )}
            {siteData.primary_contact_email && (
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  {siteData.primary_contact_email}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 -mx-6 pt-4">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm">
              Owner:{" "}
              <span className="font-medium">
                {siteData.owner_name || "Unassigned"}
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW - full width horizontal
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow w-full">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 bg-cerulean/10 rounded-full flex items-center justify-center flex-shrink-0">
            {getSiteTypeIcon()}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{siteData.site_name}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {siteData.service_address || "No address"}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
              {siteData.primary_contact_name && (
                <div className="flex items-center gap-1 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{siteData.primary_contact_name}</span>
                </div>
              )}
              {siteData.primary_contact_phone && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{siteData.primary_contact_phone}</span>
                </div>
              )}
              {siteData.primary_contact_email && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{siteData.primary_contact_email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 ml-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cerulean text-white text-xs font-medium rounded-full">
              {siteData.site_type || "Standard"}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-cerulean hover:bg-cerulean/10 rounded-md transition-colors"
              title="Edit site"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Delete site"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSiteCard;
