import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { ChartIcon } from "../../icons/icons";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartData {
  label: string;
  value: number;
}

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface ChartPlaceholderProps {
  title: string;
  type?: "bar" | "pie";
  data?: BarChartData[] | PieChartData[];
  barColor?: string;
}

export default function ChartPlaceholder({
  title,
  type = "bar",
  data,
  barColor = "",
}: ChartPlaceholderProps) {
  // If no data, show placeholder
  if (!data || data.length === 0) {
    return (
      <div
        className="bg-white rounded-normal p-6 transition-transform duration-300 hover:scale-101 ease-in-out
          shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_8px_rgba(76,92,104,0.3),0_1px_2px_rgba(0,0,0,0.2)]"
      >
        <div className="text-lg font-semibold text-charcoal mb-6">{title}</div>
        <div className="flex items-center justify-center h-[320px]">
          <div className="text-center text-silver">
            <ChartIcon />
            <p className="text-sm">No data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare Chart.js data based on type
  const chartData =
    type === "bar"
      ? prepareBarData(data as BarChartData[], barColor)
      : preparePieData(data as PieChartData[]);

  const chartOptions = type === "bar" ? getBarOptions() : getPieOptions();

  return (
    <div
      className="bg-white rounded-normal p-6 transition-transform duration-300 hover:scale-101 ease-in-out
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_8px_rgba(76,92,104,0.3),0_1px_2px_rgba(0,0,0,0.2)]"
    >
      <div className="text-lg font-semibold text-charcoal mb-6">{title}</div>
      <div className="h-[320px] flex items-center justify-center">
        {type === "bar" ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <Pie data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}

// Prepare data for Bar chart
function prepareBarData(data: BarChartData[], barColor: string) {
  return {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: barColor,
        borderRadius: 4,
        barThickness: 60,
      },
    ],
  };
}

// Prepare data for Pie chart
function preparePieData(data: PieChartData[]) {
  return {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderColor: "#ffffff",
        borderWidth: 3,
      },
    ],
  };
}

// Bar chart options
function getBarOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#36454F",
        padding: 12,
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#C0C0C0",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#708090",
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(112, 128, 144, 0.2)",
          borderDash: [5, 5],
        },
        ticks: {
          color: "#708090",
          font: {
            size: 12,
          },
          stepSize: 1,
        },
      },
    },
    animation: {
      duration: 750,
      easing: "easeOutQuart" as const,
    },
  };
}

// Pie chart options
function getPieOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "",
        padding: 12,
        titleColor: "#ffffff",
        bodyColor: "",
        borderColor: "#C0C0C0",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(0);
            return `${label}: ${percentage}%`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 750,
      easing: "easeOutQuart" as const,
    },
  };
}
