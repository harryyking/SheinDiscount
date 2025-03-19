"use server";
import prisma from "@/lib/db";

// Types
type CreateProductParams = {
  userId: string;
  name: string;
  url: string;
  price: number;
  plan?: "BASIC" | "PRO" | "ENTERPRISE"; // Optional, defaults to BASIC in schema
};

type AddVoteParams = {
  productId: string;
  value: "too_high" | "just_right" | "a_steal";
};

// Create Product
export async function createProduct(params: CreateProductParams) {
  try {
    const product = await prisma.product.create({
      data: {
        userId: params.userId,
        name: params.name,
        url: params.url,
      },
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
    const vote = await prisma.vote.create({
      data: {
        productId: params.productId,
        value: params.value,
      },
    });
    return { success: true, vote };
  } catch (error) {
    console.error("Error adding vote:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Get Product
export async function getProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name: true, url: true},
    });
    if (!product) throw new Error("Product not found");
    return { success: true, product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Get Votes for Product
export async function getVotesForProduct(productId: string) {
  try {
    const votes = await prisma.vote.findMany({
      where: { productId },
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