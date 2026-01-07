import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  Edit2,
  Globe,
  Building,
  MapPin,
  Edit,
  Trash2,
} from "lucide-react";
import { confirm } from "@/components/confirm";

interface ContactCardProps {
  contactData: any;
  onEdit?: () => void;
  onDelete?: () => void;
  viewMode?: "list" | "grid";
}

const ContactCard: React.FC<ContactCardProps> = ({
  contactData,
  onEdit,
  onDelete,
  viewMode = "grid",
}) => {
  const {
    first_name,
    last_name,
    title,
    department,
    email,
    phone,
    mobile_phone,
    work_phone,
    contact_type,
    contact_status,
  } = contactData;

  const getContactStatusColor = () => {
    if (contact_status === "Active") return "bg-green-400";
    if (contact_status === "Inactive") return "bg-red-400";
    if (contact_status === "Prospect") return "bg-orange-400";
    if (contact_status === "Customer") return "bg-blue-400";
    if (contact_status === "Former Customer") return "bg-gray-400";
    return "bg-gray-500";
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

  // GRID VIEW (your current card design)
  if (viewMode === "grid") {
    return (
      <div
        className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-[371px] transition-all duration-300
          shadow-[2px_2px_0_0_rgba(76,92,104,1),4px_4px_0_0_rgba(70,73,76,1),6px_6px_0_0_rgba(25,133,161,1)]
          hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
          hover:-translate-y-1"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
              {first_name?.[0]}
              {last_name?.[0]}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {first_name} {last_name}
              </h3>
              {title && <p className="text-sm text-gray-600">{title}</p>}
            </div>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-gray-400 hover:text-gray-600 transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Edit2 className="w-5 h-5" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
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

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {contact_status && (
            <span
              className={`px-3 py-1 text-white text-xs font-medium rounded-full ${getContactStatusColor()}`}
            >
              {contact_status}
            </span>
          )}
          {contact_type && contact_type !== "Primary Contact" && (
            <span className="px-3 py-1 bg-slate text-white text-xs font-medium rounded-full">
              {contact_type}
            </span>
          )}
        </div>

        {(email || phone || mobile_phone || work_phone) && (
          <div className="space-y-3 mb-6 text-gray-700">
            {email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{email}</span>
              </div>
            )}
            {(phone || mobile_phone || work_phone) && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  {phone || mobile_phone || work_phone}
                </span>
              </div>
            )}
          </div>
        )}

        {(email || phone || mobile_phone || work_phone) && (
          <>
            <div className="border-t border-gray-200 -mx-6 mb-4" />
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Mail className="w-4 h-4 text-charcoal" />
                <span className="text-sm text-charcoal font-medium">Email</span>
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
  }

  // LIST VIEW – full width horizontal layout
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow w-full">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-base font-semibold text-gray-700 flex-shrink-0">
            {first_name?.[0]}
            {last_name?.[0]}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">
              {first_name} {last_name}
            </h4>
            {title && <p className="text-sm text-gray-600 mt-1">{title}</p>}

            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
              {email && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </div>
              )}
              {(phone || mobile_phone || work_phone) && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{phone || mobile_phone || work_phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 ml-4">
          <div className="flex gap-2">
            {contact_status && (
              <span
                className={`px-3 py-1 text-white text-xs font-medium rounded-full ${getContactStatusColor()}`}
              >
                {contact_status}
              </span>
            )}
            {contact_type && contact_type !== "Primary Contact" && (
              <span className="px-3 py-1 bg-slate text-white text-xs font-medium rounded-full">
                {contact_type}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-cerulean hover:bg-cerulean/10 rounded-md transition-colors"
              title="Edit contact"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Delete contact"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
