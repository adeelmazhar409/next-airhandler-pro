import React from "react";
import StatsCardsRow from "../../UI-components/StatCardRow";
import ChartPlaceholder from "../../UI-components/ChartPlaceholder";
import TopDeals from "../../UI-components/Topdeal";

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
      value: "$180,733",
      subtitle: "9 deals",
      icon: <TotalPipelineIcon />,
    },
    {
      title: "Won Deals",
      value: "$97,000",
      subtitle: "4 deals closed",
      icon: <WonDealsIcon />,
    },
    {
      title: "Conversion Rate",
      value: "44.4%",
      icon: <ConversionRateIcon />,
      bar: true,
    },
    {
      title: "Avg Deal Size",
      value: "$24,250",
      subtitle: "Per closed deal",
      icon: <TotalPipelineIcon />,
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

  // Chart data for Pipeline by Stage (Bar Chart)
  const pipelineData = [
    { label: "Proposal", value: 3 },
    { label: "Negotiation", value: 1 },
    { label: "Closed Won", value: 4 },
    { label: "Closed Lost", value: 1 },
  ];

  // Chart data for Activities by Type (Pie Chart)
  const activitiesData = [
    { label: "Note", value: 60, color: "#3B82F6" },
    { label: "Meeting", value: 40, color: "#10B981" },
  ];


  const sampleDeals = [
    { name: "Deal #1", stage: "Proposal", amount: 75000, progress: 50 },
    { name: "Deal #2", stage: "Closed won", amount: 50000, progress: 100 },
    {
      name: "Repiping chilled water",
      stage: "Closed won",
      amount: 29500,
      progress: 100,
    },
    { name: "Closed Won!", stage: "Closed won", amount: 15000, progress: 100 },
    {
      name: "Test Estimate1 - 25-10035",
      stage: "Proposal",
      amount: 4680,
      progress: 50,
    },
  ];
  return (
    <>
      {/* Pipeline Stats */}
      <StatsCardsRow stats={pipelineStats} />

      {/* Activity Stats */}
      <StatsCardsRow stats={activityStats} />

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Pipeline by Stage"
          type="bar"
          data={pipelineData}
          barColor="#1985A1"
        />
        <ChartPlaceholder
          title="Activities by Type"
          type="pie"
          data={activitiesData}
          
        />
      </div>
      <TopDeals deals={sampleDeals} />

    </>
  );
}
