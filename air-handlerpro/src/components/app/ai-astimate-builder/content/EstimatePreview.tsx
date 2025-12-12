import {
  AvgDealSizeIcon,
  EquipmentIcon,
  PreviewIcon,
  ScheduleIcon,
} from "@/components/icons/icons";

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
        <h3 className="font-semibold text-gray-900 text-xs">{title}</h3>
      </div>
      {badge && (
        <span className="text-[10px] text-gray-500 bg-yellow-50 px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
    </div>
    {children}
  </div>
);

const ProgressItem = ({ label }: { label: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-600">{label}</span>
    <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
  </div>
);

export const EstimatePreview = () => (
  <div className="w-80 bg-white border border-black/30 flex flex-col pt-10">
    <div className="px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-1.5 text-gray-700">
        <PreviewIcon />
        <h2 className="font-semibold text-sm">Estimate Preview</h2>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      <SidebarSection title="Customer" badge="Pending" icon={null}>
        <p className="text-xs text-gray-500">
          Waiting for customer information...
        </p>
      </SidebarSection>

      <div className="border-t border-gray-200" />

      <SidebarSection
        title="Equipment"
        icon={<EquipmentIcon />}
        badge="0 items"
      >
        <p className="text-xs text-gray-500">No equipment configured yet</p>
      </SidebarSection>

      <div className="border-t border-gray-200" />

      <SidebarSection title="Schedule" badge="Pending" icon={<ScheduleIcon />}>
        <p className="text-xs text-gray-500">Schedule not defined yet</p>
      </SidebarSection>

      <div className="border-t border-gray-200" />

      <SidebarSection
        title="Estimated Cost"
        icon={<AvgDealSizeIcon color={"grey"} />}
      >
        <p className="text-xs text-gray-500">
          Cost will be calculated when all information is provided
        </p>
      </SidebarSection>

      <div className="border-t border-gray-200" />

      <div>
        <h3 className="font-semibold text-gray-900 mb-3 text-xs">Progress</h3>
        <div className="space-y-2">
          <ProgressItem label="Customer Info" />
          <ProgressItem label="Equipment" />
          <ProgressItem label="Schedule" />
        </div>
      </div>
    </div>

    <div className="px-4 py-3 border-t border-gray-200 space-y-2">
      <button className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors">
        Save Draft
      </button>
      <button className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors">
        View Estimate
      </button>
    </div>
  </div>
);
