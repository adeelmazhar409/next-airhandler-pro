import React, { useEffect, useState } from "react";

interface Tab {
  name: string;
  value: string;
  icon?: React.ReactNode;
}

export interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function HorizontalBar({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  // Force re-render after mount to calculate underline position
  useEffect(() => {
    setMounted(true);
  }, []);

  const getUnderlineStyle = () => {
    if (activeIndex === -1 || !tabRefs.current[activeIndex] || !mounted) {
      return { left: 0, width: 0 };
    }

    let left = 0;
    for (let i = 0; i < activeIndex; i++) {
      if (tabRefs.current[i]) {
        left += tabRefs.current[i]!.offsetWidth + 24; // 24px is gap-6
      }
    }

    return {
      left: `${left}px`,
      width: `${tabRefs.current[activeIndex]?.offsetWidth || 0}px`,
    };
  };

  return (
    <div className="mb-6">
      <div className="border-b border-charcoal relative">
        <nav className="flex gap-6">
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => onTabChange(tab.value)}
              className={`pb-4 px-1 text-[15px] font-medium flex items-center gap-2 relative transition-colors ${
                activeTab === tab.value
                  ? "text-charcoal/70 font-semibold"
                  : "text-charcoal hover:text-charcoal/80"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Animated Underline */}
        <div
          className="absolute bottom-0 h-0.5 bg-cerulean transition-all duration-300 ease-in-out"
          style={getUnderlineStyle()}
        />
      </div>
    </div>
  );
}
