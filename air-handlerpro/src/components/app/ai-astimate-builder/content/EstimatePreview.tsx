import {
  AvgDealSizeIcon,
  EquipmentIcon,
  ScheduleIcon,
} from "@/components/icons/icons";
import { Building2, CheckCircle2 } from "lucide-react";

interface EstimatePreviewProps {
  selectedCompany: any;
  selectedSite: any;
  estimateData: any;
  conversationStep: string;
  onSaveDraft?: () => void;
  onViewEstimate?: () => void;
}

export const EstimatePreview = ({
  selectedCompany,
  selectedSite,
  estimateData,
  conversationStep,
  onSaveDraft,
  onViewEstimate,
}: EstimatePreviewProps) => {
  const hasCustomer = selectedCompany && selectedSite;
  const hasEstimateInfo =
    estimateData.estimateName && estimateData.estimateNumber;
  const hasSchedule =
    estimateData.contractStartDate && estimateData.contractLength;
  const isComplete = conversationStep === "complete";

  return (
    <div className="w-80 bg-white border-l border-silver flex flex-col flex-shrink-0">
      {/* Preview Header */}
      <div className="px-4 py-3 border-b border-silver">
        <h2 className="text-sm font-semibold text-charcoal">
          Estimate Preview
        </h2>
        <p className="text-xs text-slate mt-0.5">
          Track your estimate progress
        </p>
      </div>

      {/* Preview Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Customer Section */}
        <SidebarSection
          title="Customer & Site"
          badge={hasCustomer ? "Confirmed" : "Pending"}
          icon={<Building2 className="w-4 h-4" />}
        >
          {hasCustomer ? (
            <div className="space-y-1">
              <p className="text-sm font-medium text-charcoal">
                {selectedCompany?.business_name}
              </p>
              {selectedCompany?.industry && (
                <p className="text-xs text-slate">{selectedCompany.industry}</p>
              )}
              <div className="mt-2 pt-2 border-t border-silver">
                <p className="text-xs font-medium text-charcoal">
                  {selectedSite?.site_name}
                </p>
                <p className="text-xs text-slate">
                  {selectedSite?.service_address}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate">
              Waiting for customer information...
            </p>
          )}
        </SidebarSection>

        <div className="border-t border-silver" />

        {/* Estimate Details */}
        <SidebarSection
          title="Estimate Details"
          icon={<EquipmentIcon />}
          badge={hasEstimateInfo ? "Set" : "Pending"}
        >
          {hasEstimateInfo ? (
            <div className="space-y-1">
              <p className="text-xs text-charcoal">
                <span className="font-medium">Name:</span>{" "}
                {estimateData.estimateName}
              </p>
              <p className="text-xs text-charcoal">
                <span className="font-medium">Number:</span>{" "}
                {estimateData.estimateNumber}
              </p>
              {estimateData.contractLength && (
                <p className="text-xs text-charcoal">
                  <span className="font-medium">Contract:</span>{" "}
                  {estimateData.contractLength} months
                </p>
              )}
              {estimateData.billingFrequency && (
                <p className="text-xs text-charcoal">
                  <span className="font-medium">Billing:</span>{" "}
                  {estimateData.billingFrequency}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate">
              Estimate details will appear here
            </p>
          )}
        </SidebarSection>

        <div className="border-t border-silver" />

        {/* Schedule */}
        <SidebarSection
          title="Schedule"
          badge={hasSchedule ? "Set" : "Pending"}
          icon={<ScheduleIcon />}
        >
          {hasSchedule ? (
            <div className="space-y-1">
              <p className="text-xs text-charcoal">
                <span className="font-medium">Start Date:</span>{" "}
                {estimateData.contractStartDate}
              </p>
              {estimateData.contractLength && (
                <p className="text-xs text-charcoal">
                  <span className="font-medium">Duration:</span>{" "}
                  {estimateData.contractLength} months
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate">Schedule not defined yet</p>
          )}
        </SidebarSection>

        <div className="border-t border-silver" />

        {/* Travel Info */}
        <SidebarSection
          title="Travel Info"
          icon={<AvgDealSizeIcon color={"grey"} />}
        >
          {estimateData.milesToSite !== undefined ? (
            <div className="space-y-1">
              <p className="text-xs text-charcoal">
                <span className="font-medium">Miles:</span>{" "}
                {estimateData.milesToSite}
              </p>
              <p className="text-xs text-slate mt-2">
                Total cost will be calculated when the estimate is complete
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate">
              Travel information will be added during setup
            </p>
          )}
        </SidebarSection>

        <div className="border-t border-silver" />

        {/* Progress */}
        <div>
          <h3 className="font-semibold text-charcoal mb-3 text-xs">Progress</h3>
          <div className="space-y-2">
            <ProgressItem label="Customer Info" completed={hasCustomer} />
            <ProgressItem
              label="Estimate Details"
              completed={hasEstimateInfo}
            />
            <ProgressItem label="Schedule" completed={hasSchedule} />
            <ProgressItem label="Complete" completed={isComplete} />
          </div>
        </div>
      </div>

      {/* Action Buttons - Fixed at Bottom */}
      <div className="px-4 py-3 border-t border-silver space-y-2">
        <button
          onClick={onSaveDraft}
          className="w-full px-3 py-2 border border-silver rounded-lg text-charcoal text-xs font-medium hover:bg-platinum transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isComplete}
        >
          Save Draft
        </button>
        <button
          onClick={onViewEstimate}
          className="w-full px-3 py-2 bg-cerulean text-white rounded-lg text-xs font-medium hover:bg-cerulean/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isComplete}
        >
          View Estimate
        </button>
      </div>
    </div>
  );
};

// Helper components
const SidebarSection = ({
  title,
  badge,
  icon,
  children,
}: {
  title: string;
  badge?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        {icon}
        <h3 className="font-semibold text-charcoal text-xs">{title}</h3>
      </div>
      {badge && (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            badge === "Confirmed" || badge === "Set"
              ? "bg-green-100 text-green-700"
              : "bg-slate/10 text-slate"
          }`}
        >
          {badge}
        </span>
      )}
    </div>
    {children}
  </div>
);

const ProgressItem = ({
  label,
  completed,
}: {
  label: string;
  completed: boolean;
}) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-4 h-4 rounded-full flex items-center justify-center ${
        completed ? "bg-green-500" : "bg-slate/20"
      }`}
    >
      {completed && <CheckCircle2 className="w-3 h-3 text-white" />}
    </div>
    <span
      className={`text-xs ${
        completed ? "text-charcoal font-medium" : "text-slate"
      }`}
    >
      {label}
    </span>
  </div>
);
