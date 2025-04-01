import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Turn your CSV data into stunning graphs with Data Viz for Hustlers. Free, simple, and perfect for solo entrepreneurs and micro-businesses.",
};

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Data Viz for Hustlers
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-2xl">
        Visualize your business data in seconds. Upload your CSV, create bar,
        line, or pie charts, and grow your hustle - no coding required.
      </p>
      <Button asChild size="lg">
        <Link href="/app">Try It Free</Link>
      </Button>
      <section className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Perfect for Solo Entrepreneurs
        </h2>
        <p className="text-gray-600 max-w-xl">
          Graph your Etsy sales, PayPal revenue, or client data with ease.
          Designed for freelancers, side-hustlers, and micro-business owners.
        </p>
      </section>
    </main>
  );
}