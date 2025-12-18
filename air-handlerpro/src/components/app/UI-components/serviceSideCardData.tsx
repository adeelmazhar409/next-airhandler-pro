// components/ServiceSiteCard.tsx

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  Edit2,
  Globe,
} from "lucide-react";

interface ServiceSiteCardProps {
  siteName: string;
  siteType: "hq" | "standalone" | "global" | string; // controls icon & badge style
  siteTypeLabel: string; // e.g., "AirHandler Pro HQ"
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  ownerEmail: string;
}

const ServiceSiteCard: React.FC<ServiceSiteCardProps> = ({
  siteName,
  siteType,
  siteTypeLabel,
  address,
  contactName,
  contactPhone,
  contactEmail,
  ownerEmail,
}) => {
  // Icon for site type
  const getSiteTypeIcon = () => {
    if (siteType === "hq") return <Building className="w-4 h-4" />;
    if (siteType === "global") return <Globe className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
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
          <h3 className="text-lg font-semibold text-gray-900">{siteName}</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition">
          <Edit2 className="w-5 h-5" />
        </button>
      </div>

      {/* Site Type Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-600">Site</span>
        <span className="flex items-center gap-1.5 px-3 py-1 bg-cerulean text-white text-xs font-medium rounded-full border border-gray-300">
          {getSiteTypeIcon()}
          {siteTypeLabel}
        </span>
      </div>

      {/* Service Location */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
          Service Location
        </p>
        <div className="flex items-start gap-2 mt-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{address}</p>
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
            <span className="text-sm font-medium">{contactName}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{contactPhone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{contactEmail}</span>
          </div>
        </div>
      </div>

      {/* Divider & Owner */}
      <div className="border-t border-gray-200 mx-auto -mx-6 pt-4">
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm">
            Owner: <span className="font-medium">{ownerEmail}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceSiteCard;
