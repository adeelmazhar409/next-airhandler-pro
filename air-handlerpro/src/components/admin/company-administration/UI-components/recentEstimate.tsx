interface RecentItem {
  primary: string;
  secondary: string;
}

interface RecentItemsCardProps {
  title: string;
  icon?: string;
  items: RecentItem[];
  primaryLabel?: string;
  secondaryLabel?: string;
}

export default function RecentItemsCard({
  title,
  icon = "↗",
  items,
}: RecentItemsCardProps) {
  return (
    <div
      className="bg-white rounded-lg border p-2 border-gray-200
    transition-transform duration-300 hover:scale-102 ease-in-out
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_8px_rgba(76,92,104,0.3),0_1px_2px_rgba(0,0,0,0.2)]
    "
    >
      <h2 className="text-xl font-semibold text-gray-900 px-6 pt-5 pb-4 flex items-center gap-2">
        <span className="text-gray-500">{icon}</span> {title}
      </h2>
      <div className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <div
            key={index}
            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <p className="text-gray-900 font-medium">{item.primary}</p>
            <p className="text-sm text-gray-500">{item.secondary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
