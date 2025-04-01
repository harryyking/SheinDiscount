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
  yAxis,
  title,
  tooltipEnabled,
  backgroundColor,
  gridEnabled,
  curveEnabled,
}: {
  data: any[];
  graphType: "bar" | "line" | "pie";
  xAxis: string;
  yAxis: string;
  title: string;
  tooltipEnabled: boolean;
  backgroundColor: string;
  gridEnabled: boolean;
  curveEnabled: boolean;
}) {
  const [themeColors, setThemeColors] = useState({
    primary: "oklch(0.723 0.219 149.579)", // Light mode --primary
    foreground: "oklch(0.141 0.005 285.823)", // Light mode --foreground
    muted: "oklch(0.967 0.001 286.375)", // Light mode --muted
    chart1: "oklch(0.646 0.222 41.116)", // --chart-1
    chart2: "oklch(0.6 0.118 184.704)", // --chart-2
    chart3: "oklch(0.398 0.07 227.392)", // --chart-3
    chart4: "oklch(0.828 0.189 84.429)", // --chart-4
    chart5: "oklch(0.769 0.188 70.08)", // --chart-5
  });

  // Fetch theme colors from CSS variables on mount
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

  if (!data || data.length === 0 || !xAxis || !yAxis) {
    return <p className="text-muted-foreground">No data to display.</p>;
  }

  const labels = data.map((row) => row[xAxis]);
  const values = data.map((row) => {
    const value = Number(row[yAxis]);
    return isNaN(value) ? 0 : value;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: yAxis,
        data: values,
        backgroundColor:
          graphType === "pie"
            ? labels.map((_, i) => {
                const colors = [
                  themeColors.chart1,
                  themeColors.chart2,
                  themeColors.chart3,
                  themeColors.chart4,
                  themeColors.chart5,
                ];
                return colors[i % colors.length];
              })
            : backgroundColor || themeColors.primary, // Default to --primary
        borderColor: adjustColor(themeColors.primary, -0.2),
        borderWidth: 1,
        tension: graphType === "line" && curveEnabled ? 0.4 : 0,
      },
    ],
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
        display: graphType !== "pie",
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

function adjustColor(color: string, amount: number) {
  // Parse OKLCH color (assuming format "oklch(L C H)")
  const match = color.match(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/);
  if (!match) return color; // Fallback to original if parsing fails
  let [_, l, c, h] = match.map(Number);
  l = Math.min(1, Math.max(0, l + amount)); // Adjust lightness
  return `oklch(${l} ${c} ${h})`;
}