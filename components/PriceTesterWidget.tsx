"use client";

import { addVotes, getProduct, getVotesForProduct } from "@/actions/actions";
import React, { useState, useEffect } from "react";

interface PriceTesterWidgetProps {
  productId: string;
  showResults?: boolean; // Optional prop to show results immediately
}

interface VoteCounts {
  too_high: number;
  just_right: number;
  a_steal: number;
  total: number;
}

const PriceTesterWidget: React.FC<PriceTesterWidgetProps> = ({
  productId,
  showResults = false,
}) => {
  const [product, setProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({
    too_high: 0,
    just_right: 0,
    a_steal: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product and vote data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      // Check if user has already voted
      const storedVote = localStorage.getItem(`vote_${productId}`);
      if (storedVote) setHasVoted(true);

      // Fetch product
      const productResponse = await getProduct(productId);
      if (productResponse.success && productResponse.product) {
        setProduct(productResponse.product);
      } else {
        setError(productResponse.error || "Failed to load product");
      }

      // Fetch votes
      const votesResponse = await getVotesForProduct(productId);
      if (votesResponse.success && votesResponse.voteCounts) {
        const counts = votesResponse.voteCounts;
        setVoteCounts({
          too_high: counts.too_high,
          just_right: counts.just_right,
          a_steal: counts.a_steal,
          total: counts.too_high + counts.just_right + counts.a_steal,
        });
      } else {
        setError(votesResponse.error || "Failed to load votes");
      }

      setIsLoading(false);
    };

    loadData();
  }, [productId]);

  // Handle voting
  const handleVote = async (value: "too_high" | "just_right" | "a_steal") => {
    try {
      const response = await addVotes({ productId, value });
      if (!response.success) throw new Error(response.error || "Failed to submit vote");

      // Store vote in localStorage to prevent multiple votes
      localStorage.setItem(`vote_${productId}`, value);
      setHasVoted(true);

      // Refresh vote counts
      const votesResponse = await getVotesForProduct(productId);
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return <div className="text-error">{error || "Product not found"}</div>;
  }

  // Format plan name for display

  return (
    <div className="card bg-base-100 shadow-xl max-w-sm">
      <div className="card-body">
        <h2 className="card-title text-center">
          {hasVoted || showResults ? "Price Feedback Results" : "How does this price feel?"}
        </h2>
        {/* <p className="text-center text-xl font-bold">
          {planDisplay} - ${product.price.toFixed(2)}
          {product.plan === "PRO" && <span className="badge badge-accent ml-2">Pro</span>}
          {product.plan === "ENTERPRISE" && (
            <span className="badge badge-primary ml-2">Enterprise</span>
          )}
        </p> */}

        {!hasVoted && !showResults ? (
          <div className="flex flex-col gap-2 mt-2">
            <button
              className="btn btn-error"
              onClick={() => handleVote("too_high")}
            >
              Too High
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleVote("just_right")}
            >
              Just Right
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleVote("a_steal")}
            >
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

            <div className="text-center text-sm mt-3">
              Total votes: {voteCounts.total}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceTesterWidget;