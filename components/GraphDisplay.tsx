"use client";

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
}: {
  data: any[];
  graphType: "bar" | "line" | "pie";
  xAxis: string;
  yAxis: string;
  title: string;
  tooltipEnabled: boolean;
  backgroundColor: string;
}) {
  if (!data || data.length === 0 || !xAxis || !yAxis) {
    return <p className="text-gray-500">No data to display.</p>;
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
            ? labels.map((_, i) =>
                i % 2 === 0 ? backgroundColor : adjustColor(backgroundColor, 0.2)
              )
            : backgroundColor,
        borderColor: adjustColor(backgroundColor, -0.2),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: title, font: { size: 18 } },
      tooltip: { enabled: tooltipEnabled },
      legend: { display: graphType !== "pie" },
    },
    scales:
      graphType !== "pie"
        ? {
            y: { beginAtZero: true },
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

// Helper to adjust color brightness
function adjustColor(color: string, amount: number) {
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount * 255));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount * 255));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount * 255));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}