import { useState } from "react";
import { Edit2, Check, X, Save, Download } from "lucide-react";
import { toast } from "@/components/toast";

interface EstimateData {
  customerCompanyId?: string;
  customerSiteId?: string;
  estimateName?: string;
  estimateNumber?: string;
  contractLength?: number;
  contractStartDate?: string;
  billingFrequency?: string;
  milesToSite?: number;
  travelCharge?: number;
  parkingFees?: number;
  status?: string;
  totalAmount?: number;
}

interface EstimateSummaryTableProps {
  data: Partial<EstimateData>;
  companyName?: string;
  siteName?: string;
  onUpdate: (updatedData: Partial<EstimateData>) => void;
  onSave: () => void;
}

export const EstimateSummaryTable = ({
  data,
  companyName,
  siteName,
  onUpdate,
  onSave,
}: EstimateSummaryTableProps) => {
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleEdit = (field: string, currentValue: any) => {
    setEditingCell(field);
    setEditValue(String(currentValue || ""));
  };

  const handleSaveCell = (field: string) => {
    const updatedData = { ...data, [field]: editValue };
    onUpdate(updatedData);
    setEditingCell(null);
    toast("✅ Field updated");
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const renderCell = (
    label: string,
    field: keyof EstimateData,
    value: any,
    type: "text" | "number" | "date" = "text"
  ) => {
    const isEditing = editingCell === field;

    return (
      <tr className="border-b border-silver hover:bg-platinum/30 transition-colors">
        <td className="px-4 py-3 text-sm font-medium text-charcoal bg-platinum/50">
          {label}
        </td>
        <td className="px-4 py-3">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type={type}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border-2 border-cerulean rounded focus:outline-none focus:ring-2 focus:ring-cerulean/50"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveCell(field);
                  if (e.key === "Escape") handleCancelEdit();
                }}
              />
              <button
                onClick={() => handleSaveCell(field)}
                className="p-1.5 bg-cerulean text-white rounded hover:bg-slate transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1.5 bg-silver text-charcoal rounded hover:bg-slate hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between group">
              <span className="text-sm text-charcoal">
                {value || <span className="text-slate italic">Not set</span>}
              </span>
              <button
                onClick={() => handleEdit(field, value)}
                className="p-1 opacity-0 group-hover:opacity-100 text-slate hover:text-cerulean transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white border-2 border-silver rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-cerulean px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Estimate Summary</h3>
          <p className="text-xs text-white/80 mt-0.5">
            Review and edit your estimate details
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-white text-cerulean font-medium rounded hover:bg-platinum transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Estimate
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <tbody>
          {/* Customer Information Section */}
          <tr className="bg-platinum">
            <td
              colSpan={2}
              className="px-4 py-2 text-xs font-bold text-charcoal uppercase tracking-wide"
            >
              Customer Information
            </td>
          </tr>
          <tr className="border-b border-silver">
            <td className="px-4 py-3 text-sm font-medium text-charcoal bg-platinum/50 w-1/3">
              Company Name
            </td>
            <td className="px-4 py-3 text-sm text-charcoal">
              {companyName || "Not selected"}
            </td>
          </tr>
          <tr className="border-b border-silver">
            <td className="px-4 py-3 text-sm font-medium text-charcoal bg-platinum/50">
              Service Site
            </td>
            <td className="px-4 py-3 text-sm text-charcoal">
              {siteName || "Not selected"}
            </td>
          </tr>

          {/* Estimate Details Section */}
          <tr className="bg-platinum">
            <td
              colSpan={2}
              className="px-4 py-2 text-xs font-bold text-charcoal uppercase tracking-wide"
            >
              Estimate Details
            </td>
          </tr>
          {renderCell("Estimate Name", "estimateName", data.estimateName)}
          {renderCell("Estimate Number", "estimateNumber", data.estimateNumber)}
          {renderCell(
            "Contract Length (months)",
            "contractLength",
            data.contractLength,
            "number"
          )}
          {renderCell(
            "Contract Start Date",
            "contractStartDate",
            data.contractStartDate,
            "date"
          )}
          {renderCell(
            "Billing Frequency",
            "billingFrequency",
            data.billingFrequency
          )}

          {/* Travel & Fees Section */}
          <tr className="bg-platinum">
            <td
              colSpan={2}
              className="px-4 py-2 text-xs font-bold text-charcoal uppercase tracking-wide"
            >
              Travel & Fees
            </td>
          </tr>
          {renderCell(
            "Miles to Site",
            "milesToSite",
            data.milesToSite,
            "number"
          )}
          {renderCell(
            "Travel Charge ($)",
            "travelCharge",
            data.travelCharge,
            "number"
          )}
          {renderCell(
            "Parking Fees ($)",
            "parkingFees",
            data.parkingFees,
            "number"
          )}

          {/* Status & Total Section */}
          <tr className="bg-platinum">
            <td
              colSpan={2}
              className="px-4 py-2 text-xs font-bold text-charcoal uppercase tracking-wide"
            >
              Status & Total
            </td>
          </tr>
          {renderCell("Status", "status", data.status || "Draft")}
          {renderCell(
            "Total Amount ($)",
            "totalAmount",
            data.totalAmount,
            "number"
          )}
        </tbody>
      </table>

      {/* Footer Info */}
      <div className="bg-platinum/30 px-6 py-3 border-t border-silver">
        <p className="text-xs text-slate">
          💡 <strong>Tip:</strong> Click on any field to edit it directly. Press
          Enter to save or Escape to cancel.
        </p>
      </div>
    </div>
  );
};
