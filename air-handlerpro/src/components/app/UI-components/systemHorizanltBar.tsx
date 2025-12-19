import React from "react";
import HorizontalBar from "./horizantlebar";
import { TabNavigationProps } from "./horizantlebar";

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <HorizontalBar
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
}
