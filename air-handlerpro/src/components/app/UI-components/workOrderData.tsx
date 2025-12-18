// components/ScheduledVisitCard.tsx

import React from 'react';
import { Calendar, FileText } from 'lucide-react';

interface ScheduledVisitCardProps {
  siteName: string;
  contactName: string;
  dateTime: string;               // e.g., "Aug 26, 2025 4:00 PM"
  description: string;            // Main note/description
  reportCount: number;            // Number of reports
  status?: 'scheduled' | 'completed' | 'cancelled'; // Optional status badge
}

const ScheduledVisitCard: React.FC<ScheduledVisitCardProps> = ({
  siteName,
  contactName,
  dateTime,
  description,
  reportCount,
  status = 'scheduled',
}) => {
  const statusStyles = {
    scheduled: 'bg-gray-200 text-gray-700',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{siteName}</h3>
          <p className="text-sm text-gray-600 mt-1">{contactName}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-2 text-gray-700 mb-4">
        <Calendar className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium">{dateTime}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-5 leading-relaxed">
        {description}
      </p>

      {/* Footer: Reports + Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-600">
          <FileText className="w-4 h-4" />
          <span className="text-sm">
            {reportCount} report{reportCount !== 1 ? 's' : ''}
          </span>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ScheduledVisitCard;