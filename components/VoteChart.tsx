'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface VoteChartProps {
  data: {
    too_high: number;
    just_right: number;
    steal: number;
  };
  chartType?: 'bar' | 'pie';
}

const VoteChart: React.FC<VoteChartProps> = ({ data, chartType = 'bar' }) => {
  const chartData = {
    labels: ['Too High', 'Just Right', 'A Steal'],
    datasets: [
      {
        label: 'Votes',
        data: [data.too_high, data.just_right, data.steal],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Price Perception Votes',
      },
    },
  };

  return (
    <div className="w-full max-w-md">
      {chartType === 'bar' ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Pie data={chartData} options={options} />
      )}
    </div>
  );
};

export default VoteChart;