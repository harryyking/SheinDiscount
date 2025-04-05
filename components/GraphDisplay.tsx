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
  backgroundColor?: string;
  gridEnabled: boolean;
  curveEnabled: boolean;
}) {
  const [chartColors, setChartColors] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      const computedStyles = getComputedStyle(root);
      const colors = [
        computedStyles.getPropertyValue("--chart-1").trim(),
        computedStyles.getPropertyValue("--chart-2").trim(),
        computedStyles.getPropertyValue("--chart-3").trim(),
        computedStyles.getPropertyValue("--chart-4").trim(),
        computedStyles.getPropertyValue("--chart-5").trim(),
      ];
      setChartColors(colors);
    }
  }, []);

  if (!data || data.length === 0 || !xAxis || yAxes.length === 0) {
    return <p className="text-muted-foreground">No data to display.</p>;
  }

  const labels = data.map((row) => row[xAxis]);
  
  const datasets = graphType === "pie" 
    ? [{
        label: yAxes[0], // For pie charts, we only use the first yAxis
        data: data.map((row) => {
          const value = Number(row[yAxes[0]]);
          return isNaN(value) ? 0 : value;
        }),
        backgroundColor: chartColors.length > 0 
          ? chartColors 
          : ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"],
      }]
    : yAxes.map((yAxis, index) => ({
        label: yAxis,
        data: data.map((row) => {
          const value = Number(row[yAxis]);
          return isNaN(value) ? 0 : value;
        }),
        backgroundColor: backgroundColor || chartColors[index] || "var(--primary)",
        borderColor: graphType === "line" ? "var(--primary)" : undefined,
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
        color: "var(--foreground)",
      },
      tooltip: { enabled: tooltipEnabled },
      legend: {
        display: true,
        labels: { color: "var(--foreground)" },
      },
    },
    scales:
      graphType !== "pie"
        ? {
            x: {
              grid: { display: gridEnabled, color: "var(--muted)" },
              ticks: { color: "var(--foreground)" },
            },
            y: {
              beginAtZero: true,
              grid: { display: gridEnabled, color: "var(--muted)" },
              ticks: { color: "var(--foreground)" },
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