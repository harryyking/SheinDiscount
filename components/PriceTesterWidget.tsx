"use client";

import { addVotes, getVotesForPlan } from "@/actions/actions"; // Only import client-used actions
import React, { useState, useEffect } from "react";

interface PriceTesterWidgetProps {
  planId: string; // Changed from productId to planId
  initialProduct: { id: string; name: string; url: string; Plan: { id: string; name: string; price: number }[] }; // From server
  initialVoteCounts: { too_high: number; just_right: number; a_steal: number; total: number }; // From server
  showResults?: boolean;
}

interface VoteCounts {
  too_high: number;
  just_right: number;
  a_steal: number;
  total: number;
}

const PriceTesterWidget: React.FC<PriceTesterWidgetProps> = ({
  planId,
  initialProduct,
  initialVoteCounts,
  showResults = false,
}) => {
  const [product] = useState(initialProduct);
  const [plan] = useState(initialProduct.Plan.find((p) => p.id === planId) || null); // Specific plan
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState<VoteCounts>(initialVoteCounts);
  const [error, setError] = useState<string | null>(null);

  // Check for prior vote on mount
  useEffect(() => {
    const storedVote = localStorage.getItem(`vote_${planId}`);
    if (storedVote) setHasVoted(true);
  }, [planId]);

  // Handle voting
  const handleVote = async (value: "too_high" | "just_right" | "a_steal") => {
    try {
      const response = await addVotes({ planId, value });
      if (!response.success) throw new Error(response.error || "Failed to submit vote");

      localStorage.setItem(`vote_${planId}`, value);
      setHasVoted(true);

      // Refresh vote counts
      const votesResponse = await getVotesForPlan(planId);
      if (votesResponse.success && votesResponse.voteCounts) {
        const counts = votesResponse.voteCounts;
        setVoteCounts({
          too_high: counts.too_high,
          just_right: counts.just_right,
          a_steal: counts.a_steal,
          total: counts.too_high + counts.just_right + counts.a_steal,
        });
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  // Error state (no loading since data is pre-fetched)
  if (error || !product || !plan) {
    return <div className="text-error">{error || "Plan not found"}</div>;
  }

  return (
    <div className="card bg-base-100 shadow-xl max-w-sm">
      <div className="card-body">
        <h2 className="card-title text-center">
          {hasVoted || showResults ? "Price Feedback Results" : "How does this price feel?"}
        </h2>
        <p className="text-center text-xl font-bold">
          {plan.name} - ${plan.price.toFixed(2)}
          {plan.name.toLowerCase() === "pro" && <span className="badge badge-accent ml-2">Pro</span>}
          {plan.name.toLowerCase() === "enterprise" && (
            <span className="badge badge-primary ml-2">Enterprise</span>
          )}
        </p>

        {!hasVoted && !showResults ? (
          <div className="flex flex-col gap-2 mt-2">
            <button className="btn btn-error" onClick={() => handleVote("too_high")}>
              Too High
            </button>
            <button className="btn btn-success" onClick={() => handleVote("just_right")}>
              Just Right
            </button>
            <button className="btn btn-primary" onClick={() => handleVote("a_steal")}>
              A Steal!
            </button>
          </div>
        ) : (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span>Too High</span>
              <span>
                {voteCounts.total > 0
                  ? Math.round((voteCounts.too_high / voteCounts.total) * 100)
                  : 0}%
              </span>
            </div>
            <progress
              className="progress progress-error w-full"
              value={voteCounts.too_high}
              max={voteCounts.total || 1}
            ></progress>

            <div className="flex justify-between items-center mb-1 mt-2">
              <span>Just Right</span>
              <span>
                {voteCounts.total > 0
                  ? Math.round((voteCounts.just_right / voteCounts.total) * 100)
                  : 0}%
              </span>
            </div>
            <progress
              className="progress progress-success w-full"
              value={voteCounts.just_right}
              max={voteCounts.total || 1}
            ></progress>

            <div className="flex justify-between items-center mb-1 mt-2">
              <span>A Steal!</span>
              <span>
                {voteCounts.total > 0
                  ? Math.round((voteCounts.a_steal / voteCounts.total) * 100)
                  : 0}%
              </span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={voteCounts.a_steal}
              max={voteCounts.total || 1}
            ></progress>

            <div className="text-center text-sm mt-3">Total votes: {voteCounts.total}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceTesterWidget;