import React from "react";
import StatsCardsRow from "../UI-components/StatCardRow";
import ChartPlaceholder from "../UI-components/ChartPlaceholder";
import {
  AvgDealSizeIcon,
  CallsIcon,
  ConversionRateIcon,
  EmailsIcon,
  OverdueTasksIcon,
  TotalPipelineIcon,
  UpcomingTasksIcon,
  WonDealsIcon,
} from "../../../icons/icons";

export default function DashboardContent() {
  const pipelineStats = [
    {
      title: "Total Pipeline",
      value: "$0",
      subtitle: "0 deals",
      icon: <TotalPipelineIcon />,
    },
    {
      title: "Won Deals",
      value: "$0",
      subtitle: "0 deals closed",
      icon: <WonDealsIcon />,
    },
    {
      title: "Conversion Rate",
      value: "0.0%",
      icon: <ConversionRateIcon />,
    },
    {
      title: "Avg Deal Size",
      value: "$0",
      subtitle: "Per closed deal",
      icon: <AvgDealSizeIcon />,
    },
  ];

  const activityStats = [
    {
      title: "Overdue Tasks",
      value: "0",
      subtitle: "Need attention",
      icon: <OverdueTasksIcon />,
      alert: true,
    },
    {
      title: "Upcoming",
      value: "0",
      subtitle: "Next 7 days",
      icon: <UpcomingTasksIcon />,
    },
    {
      title: "Calls",
      value: "0",
      subtitle: "This month",
      icon: <CallsIcon />,
    },
    {
      title: "Emails",
      value: "0",
      subtitle: "This month",
      icon: <EmailsIcon />,
    },
  ];

  return (
    <>
      {/* Pipeline Stats */}
      <StatsCardsRow stats={pipelineStats} />

      {/* Activity Stats */}
      <StatsCardsRow stats={activityStats} />

      {/* Charts Section */}
      <div className="grid grid-cols-2  gap-6">
        <ChartPlaceholder title="Pipeline by Stage" />
        <ChartPlaceholder title="Activities by Type" />
      </div>
    </>
  );
}
