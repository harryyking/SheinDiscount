"use client";

import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function GraphDisplay({
  data,
  graphType,
  xAxis,
  yAxes,
  title,
  tooltipEnabled,
  backgroundColor,
  gridEnabled,
  curveEnabled,
}: {
  data: any[];
  graphType: "bar" | "line" | "pie";
  xAxis: string;
  yAxes: string[];
  title: string;
  tooltipEnabled: boolean;
  backgroundColor: string;
  gridEnabled: boolean;
  curveEnabled: boolean;
}) {
  const [themeColors, setThemeColors] = useState({
    primary: "oklch(0.723 0.219 149.579)",
    foreground: "oklch(0.141 0.005 285.823)",
    muted: "oklch(0.967 0.001 286.375)",
    chart1: "oklch(0.646 0.222 41.116)",
    chart2: "oklch(0.6 0.118 184.704)",
    chart3: "oklch(0.398 0.07 227.392)",
    chart4: "oklch(0.828 0.189 84.429)",
    chart5: "oklch(0.769 0.188 70.08)",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      const computedStyles = getComputedStyle(root);
      setThemeColors({
        primary: computedStyles.getPropertyValue("--primary").trim() || "oklch(0.723 0.219 149.579)",
        foreground: computedStyles.getPropertyValue("--foreground").trim() || "oklch(0.141 0.005 285.823)",
        muted: computedStyles.getPropertyValue("--muted").trim() || "oklch(0.967 0.001 286.375)",
        chart1: computedStyles.getPropertyValue("--chart-1").trim() || "oklch(0.646 0.222 41.116)",
        chart2: computedStyles.getPropertyValue("--chart-2").trim() || "oklch(0.6 0.118 184.704)",
        chart3: computedStyles.getPropertyValue("--chart-3").trim() || "oklch(0.398 0.07 227.392)",
        chart4: computedStyles.getPropertyValue("--chart-4").trim() || "oklch(0.828 0.189 84.429)",
        chart5: computedStyles.getPropertyValue("--chart-5").trim() || "oklch(0.769 0.188 70.08)",
      });
    }
  }, []);

  if (!data || data.length === 0 || !xAxis || yAxes.length === 0) {
    return <p className="text-muted-foreground">No data to display.</p>;
  }

  const labels = data.map((row) => row[xAxis]);
  
  const datasets = graphType === "pie" 
    ? [{
        label: yAxes[0], // Pie charts typically use one dataset
        data: data.map((row) => {
          const value = Number(row[yAxes[0]]);
          return isNaN(value) ? 0 : value;
        }),
        backgroundColor: [
          themeColors.chart1,
          themeColors.chart2,
          themeColors.chart3,
          themeColors.chart4,
          themeColors.chart5,
        ],
      }]
    : yAxes.map((yAxis, index) => ({
        label: yAxis,
        data: data.map((row) => {
          const value = Number(row[yAxis]);
          return isNaN(value) ? 0 : value;
        }),
        backgroundColor: backgroundColor || themeColors[`chart${index + 1}` as keyof typeof themeColors] || themeColors.primary,
        tension: graphType === "line" && curveEnabled ? 0.4 : 0,
      }));

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 18 },
        color: themeColors.foreground,
      },
      tooltip: { enabled: tooltipEnabled },
      legend: {
        display: true,
        labels: { color: themeColors.foreground },
      },
    },
    scales:
      graphType !== "pie"
        ? {
            x: {
              grid: { display: gridEnabled, color: themeColors.muted },
              ticks: { color: themeColors.foreground },
            },
            y: {
              beginAtZero: true,
              grid: { display: gridEnabled, color: themeColors.muted },
              ticks: { color: themeColors.foreground },
            },
          }
        : undefined,
  };

  return (
    <div className="h-96">
      {graphType === "bar" && <Bar data={chartData} options={options} />}
      {graphType === "line" && <Line data={chartData} options={options} />}
      {graphType === "pie" && <Pie data={chartData} options={options} />}
    </div>
  );
}