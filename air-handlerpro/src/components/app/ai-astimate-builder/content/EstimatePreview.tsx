import {
  AvgDealSizeIcon,
  EquipmentIcon,
  PreviewIcon,
  ScheduleIcon,
} from "@/components/icons/icons";
import { CheckCircle2, Circle } from "lucide-react";

const SidebarSection = ({
  title,
  icon,
  badge,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        {icon}
        <h3 className="font-semibold text-charcoal text-xs">{title}</h3>
      </div>
      {badge && (
        <span className="text-[10px] text-slate bg-yellow-50 px-1.5 py-0.5 rounded">
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
  <div className="flex items-center justify-between">
    <span className="text-xs text-slate">{label}</span>
    {completed ? (
      <CheckCircle2 className="w-4 h-4 text-green-500" />
    ) : (
      <Circle className="w-4 h-4 text-silver" />
    )}
  </div>
);

interface EstimatePreviewProps {
  selectedCompany?: { business_name: string; industry?: string } | null;
  selectedSite?: { site_name: string; service_address: string } | null;
  estimateData?: {
    estimateName?: string;
    estimateNumber?: string;
    contractLength?: number;
    contractStartDate?: string;
    billingFrequency?: string;
    milesToSite?: number;
    totalAmount?: number;
  };
  conversationStep?: string;
}

export const EstimatePreview = ({
  selectedCompany,
  selectedSite,
  estimateData = {},
  conversationStep = "initial",
}: EstimatePreviewProps) => {
  const hasCustomer = !!selectedCompany && !!selectedSite;
  const hasEstimateInfo = !!estimateData.estimateName;
  const hasSchedule = !!estimateData.contractStartDate;

  return (
    <div className="w-80 bg-white border border-silver flex flex-col pt-10">
      <div className="px-4 py-3 border-b border-silver">
        <div className="flex items-center gap-1.5 text-charcoal">
          <PreviewIcon />
          <h2 className="font-semibold text-sm">Estimate Preview</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Customer Section */}
        <SidebarSection
          title="Customer"
          badge={hasCustomer ? "Confirmed" : "Pending"}
          icon={null}
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

        {/* Cost */}
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
            <ProgressItem
              label="Complete"
              completed={conversationStep === "complete"}
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-silver space-y-2">
        <button
          className="w-full px-3 py-2 border border-silver rounded-lg text-charcoal text-xs font-medium hover:bg-platinum transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={conversationStep !== "complete"}
        >
          Save Draft
        </button>
        <button
          className="w-full px-3 py-2 bg-cerulean text-white rounded-lg text-xs font-medium hover:bg-slate transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={conversationStep !== "complete"}
        >
          View Estimate
        </button>
      </div>
    </div>
  );
};
