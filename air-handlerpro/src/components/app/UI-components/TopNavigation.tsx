import React from "react";
import {
  ActivitiesIcon,
  ContactsIcon,
  PipelineIcon,
} from "@/components/icons/icons";
import HorizontalBar from "./horizantlebar"; // Update path as needed

import { TabNavigationProps } from "./horizantlebar";

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  // Map icons to tabs
  const tabsWithIcons = tabs.map((tab) => {
    let icon;
    switch (tab.value) {
     
      case "pipeline":
        icon = <PipelineIcon />;
        break;
      case "activities":
        icon = <ActivitiesIcon />;
        break;
      case "contacts":
        icon = <ContactsIcon />;
        break;
      default:
        icon = undefined;
    }

    return {
      ...tab,
      icon,
    };
  });

  return (
    <div className="">
    <HorizontalBar
      tabs={tabsWithIcons}
      activeTab={activeTab}
      onTabChange={onTabChange}

    />
    </div>
  );
}
