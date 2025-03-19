"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProducts } from "@/actions/actions";
import prisma from "@/lib/db";
import DashboardContent from "@/components/DashboardContent";
import { Product } from "@/components/DashboardContent";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user.email) return <div className="text-red-500 p-6">Please log in</div>;

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return <div className="text-red-500 p-6">User not found</div>;

  const response = await getUserProducts(user.id);
  if (!response.success || !response.products) return <div className="text-red-500 p-6">Failed to load products</div>;

  // Explicitly cast to match DashboardContent's Product type
  const products: Product[] = response.products.map((p) => ({
    id: p.id,
    name: p.name,
    Plan: p.Plan.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      Vote: plan.Vote.map((vote) => ({ value: vote.value as "too_high" | "just_right" | "a_steal" })),
    })),
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Pricing Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">See how customers vote on your prices and get tips to boost MRR.</p>
      <DashboardContent products={products} />
      <a href="/dashboard/products/new" className="btn btn-primary mt-6 text-lg">Add New Product</a>
    </div>
  );
}