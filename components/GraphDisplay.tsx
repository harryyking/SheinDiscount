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
}: {
  data: any[];
  graphType: "bar" | "line" | "pie";
  xAxis: string;
  yAxis: string;
}) {
  if (!data || data.length === 0 || !xAxis || !yAxis) {
    return <p className="text-gray-500">No data to display.</p>;
  }

  const labels = data.map((row) => row[xAxis]);
  const values = data.map((row) => {
    const value = Number(row[yAxis]);
    return isNaN(value) ? 0 : value; // Handle non-numeric values
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: yAxis,
        data: values,
        backgroundColor:
          graphType === "pie"
            ? [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ]
            : "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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