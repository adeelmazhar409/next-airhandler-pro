// components/ContactCard.tsx

import React, { useEffect , useRef , useState } from "react";
import { Mail, Phone, Edit2, Globe, Building, MapPin } from "lucide-react";

const ContactCard: React.FC<any> = ({
  contactData,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const { first_name, last_name, title, department, parent_company_id, service_site_id, email, phone, mobile_phone, work_phone, contact_type, contact_status, owner_id, created_by, created_at, updated_at } = contactData;

   // Icon for site type
   const getSiteTypeIcon = () => {
    if (contactData.contact_type === "Primary Contact") return <Building className="w-4 h-4" />;
    if (contactData.contact_type === "Secondary Contact") return <Globe className="w-4 h-4" />;
    if (contactData.contact_type === "Decision Maker") return <Globe className="w-4 h-4" />;
    if (contactData.contact_type === "Influencer") return <Globe className="w-4 h-4" />;
    if (contactData.contact_type === "Technical Contact") return <Globe className="w-4 h-4" />;
    if (contactData.contact_type === "Financial Contact") return <Globe className="w-4 h-4" />;
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
    confirm(`Are you sure you want to delete ${contactData.first_name} $ " " ${contactData.last_name}?`, () => {
      handleDelete();
    });
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
            {first_name[0]}{last_name[0]}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{first_name} {last_name}</h3>
            {title && (
              <p className="text-sm text-gray-600">
                {title}
              </p>
            )}
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition" onClick={onEdit}>
          <Edit2 className="w-5 h-5" />
        </button>
      </div>

      {/* Tags & Status */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {contact_status === "active" && (
          <span className="px-3 py-1 bg-slate text-white text-xs font-medium rounded-full">
            Active
          </span>
        )}
        {contact_type && contact_type !== "Primary Contact" && (
          <span className="px-3 py-1 bg-slate text-white text-xs font-medium rounded-full">
            {contact_type}
          </span>
        )}
      </div>

      {/* Contact Info */}
      {(email || phone || mobile_phone || work_phone) && (
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
      {(email || phone || mobile_phone || work_phone) && (
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
