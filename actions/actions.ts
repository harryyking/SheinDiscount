"use server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

// Types
type CreateProductParams = {
  name: string;
  url: string;
  plans: { name: string; price: number }[]; // Array of plans (e.g., [{ name: "Basic", price: 49 }])
};

type AddVoteParams = {
  planId: string; // Now uses planId instead of productId
  value: "too_high" | "just_right" | "a_steal";
};

// Create Product
export async function createProduct(params: CreateProductParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.email) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) throw new Error("User not found");

    const product = await prisma.product.create({
      data: {
        userId: user.id,
        name: params.name,
        url: params.url,
        Plan: {
          create: params.plans.map((plan) => ({
            name: plan.name,
            price: plan.price,
          })),
        },
      },
      include: { Plan: true }, // Return created plans
    });
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Add Vote
export async function addVotes(params: AddVoteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    // Verify the plan exists
    const plan = await prisma.plan.findUnique({
      where: { id: params.planId },
    });
    if (!plan) throw new Error("Plan not found");

    const vote = await prisma.vote.create({
      data: {
        planId: params.planId,
        value: params.value,
      },
    });
    return { success: true, vote };
  } catch (error) {
    console.error("Error adding vote:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Get Product (with Plans)
export async function getProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        url: true,
        Plan: {
          select: { id: true, name: true, price: true },
        },
      },
    });
    if (!product) throw new Error("Product not found");
    return { success: true, product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Get Votes for Plan (Updated to use planId)
export async function getVotesForPlan(planId: string) {
  try {
    const votes = await prisma.vote.findMany({
      where: { planId },
      select: { value: true, createdAt: true },
    });
    const voteCounts = votes.reduce(
      (acc: Record<string, number>, vote) => {
        acc[vote.value] = (acc[vote.value] || 0) + 1;
        return acc;
      },
      { too_high: 0, just_right: 0, a_steal: 0 }
    );
    return { success: true, voteCounts, votes };
  } catch (error) {
    console.error("Error fetching votes:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}