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
import { calculateCRMStats } from "@/lib/crm-data";

export default function DashboardContent() {
  // Calculate all stats dynamically
  const stats = calculateCRMStats();

  // Pipeline stats
  const pipelineStats = [
    {
      title: "Total Pipeline",
      value: stats.totalPipeline,
      subtitle: `${stats.openDealsCount} deals`,
      icon: <TotalPipelineIcon />,
    },
    {
      title: "Won Deals",
      value: stats.wonDealsValue,
      subtitle: `${stats.wonDealsCount} deals closed`,
      icon: <WonDealsIcon />,
    },
    {
      title: "Conversion Rate",
      value: stats.conversionRate,
      icon: <ConversionRateIcon />,
      bar: true,
    },
    {
      title: "Avg Deal Size",
      value: stats.avgDealSize,
      subtitle: "Per closed deal",
      icon: <TotalPipelineIcon />,
    },
  ];

  // Activity stats
  const activityStats = [
    {
      title: "Overdue Tasks",
      value: stats.overdueTasks.toString(),
      subtitle: "Need attention",
      icon: <OverdueTasksIcon />,
      alert: stats.overdueTasks > 0,
    },
    {
      title: "Upcoming",
      value: stats.upcomingTasks.toString(),
      subtitle: "Next 7 days",
      icon: <UpcomingTasksIcon />,
    },
    {
      title: "Calls",
      value: stats.callsThisMonth.toString(),
      subtitle: "This month",
      icon: <CallsIcon />,
    },
    {
      title: "Emails",
      value: stats.emailsThisMonth.toString(),
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
      <div className="grid grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Pipeline by Stage"
          type="bar"
          data={stats.pipelineByStage}
          barColor="#1985A1"
        />
        <ChartPlaceholder
          title="Activities by Type"
          type="pie"
          data={stats.activitiesByType}
        />
      </div>

      <TopDeals deals={stats.topDeals} />
    </>
  );
}
