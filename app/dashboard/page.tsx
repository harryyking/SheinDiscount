"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Plan {
  id: string;
  name: string;
  price: number;
  Vote: { value: "too_high" | "just_right" | "a_steal" }[];
}

interface Product {
  id: string;
  name: string;
  Plan: Plan[];
}

interface Props {
  products: Product[];
}

export default function DashboardContent({ products }: Props) {
  // Recommendation logic based on votes
  const getRecommendation = (plan: Plan): string => {
    const votes = plan.Vote;
    const totalVotes = votes.length;
    if (totalVotes < 10) return "Need more votes for a solid recommendation.";
    
    const tooHigh = votes.filter((v) => v.value === "too_high").length;
    const justRight = votes.filter((v) => v.value === "just_right").length;
    const aSteal = votes.filter((v) => v.value === "a_steal").length;
    const tooHighPercent = (tooHigh / totalVotes) * 100;
    const aStealPercent = (aSteal / totalVotes) * 100;

    if (tooHighPercent > 50) {
      return `Over 50% say "${plan.name}" at $${plan.price} is Too High. Try lowering it by 10-20% to boost signups.`;
    } else if (aStealPercent > 50) {
      return `Over 50% say "${plan.name}" at $${plan.price} is A Steal. You could raise it by 10-20% for more MRR.`;
    } else if (justRight > tooHigh && justRight > aSteal) {
      return `"${plan.name}" at $${plan.price} feels Just Right to most. Keep it steady and monitor!`;
    }
    return "Votes are mixed—gather more feedback to see a clear trend.";
  };

  // Chart data generator
  const getChartData = (plan: Plan) => ({
    labels: ["Too High", "Just Right", "A Steal"],
    datasets: [
      {
        label: "Votes",
        data: [
          plan.Vote.filter((v) => v.value === "too_high").length,
          plan.Vote.filter((v) => v.value === "just_right").length,
          plan.Vote.filter((v) => v.value === "a_steal").length,
        ],
        backgroundColor: ["#ef4444", "#22c55e", "#3b82f6"], // Red, Green, Blue
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, title: { display: true, text: "Vote Count" } } },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.length === 0 ? (
        <p className="text-gray-600">No products yet—add one to start tracking votes!</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="card bg-white shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h2>
            {product.Plan.map((plan) => (
              <div key={plan.id} className="mb-6">
                <p className="text-lg font-semibold text-gray-700">{plan.name} - ${plan.price}</p>
                <div className="h-48 mt-2">
                  <Bar data={getChartData(plan)} options={chartOptions} />
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Total Votes: {plan.Vote.length}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-2">Recommendation:</p>
                  <p className="text-sm text-gray-700">{getRecommendation(plan)}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}