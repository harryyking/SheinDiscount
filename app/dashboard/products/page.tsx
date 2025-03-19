"use client";
import { useState } from "react";
import { createProduct } from "@/actions/actions";

// Define the Plan interface (already in your code, just making sure it’s clear)
interface Plan {
  name: string;
  price: number;
}

export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [plans, setPlans] = useState<Plan[]>([{ name: "", price: 0 }]);
  const [submittedProduct, setSubmittedProduct] = useState<any>(null);

  // Add a new plan input
  const addPlan = () => {
    setPlans([...plans, { name: "", price: 0 }]);
  };

  // Type-safe updatePlan with overloads for name and price
  function updatePlan(index: number, field: "name", value: string): void;
  function updatePlan(index: number, field: "price", value: string | number): void;
  function updatePlan(index: number, field: "name" | "price", value: string | number): void {
    if (index < 0 || index >= plans.length) {
      console.error("Invalid plan index:", index);
      return; // Prevent out-of-bounds errors
    }

    const newPlans = [...plans];
    if (field === "name") {
      newPlans[index].name = value as string; // Type assertion since field is "name"
    } else if (field === "price") {
      const numericValue = typeof value === "string" ? parseFloat(value) : value;
      newPlans[index].price = isNaN(numericValue) ? 0 : numericValue; // Default to 0 if invalid
    }
    setPlans(newPlans);
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createProduct({
      name: productName,
      url: productUrl,
      plans: plans.filter((plan) => plan.name && plan.price > 0), // Only submit valid plans
    });
    if (response.success) {
      setSubmittedProduct(response.product);
      setProductName("");
      setProductUrl("");
      setPlans([{ name: "", price: 0 }]); // Reset form
    }
  };

  return (
    <div className="card p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Product Name */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Wireless Earbuds"
            className="input border w-full mt-2 text-base"
            required
          />
        </div>

        {/* Product URL */}
        <div >
          <label className="text-lg font-semibold text-gray-700">Website URL</label>
          <input
            type="url"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            placeholder="e.g., https://your-site.com"
            className="input border w-full mt-2 text-base"
            required
          />
        </div>

        {/* Plans */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Plans</label>
          {plans.map((plan, index) => (
            <div key={index} className="flex gap-4 mt-2">
              <input
                type="text"
                value={plan.name}
                onChange={(e) => updatePlan(index, "name", e.target.value)}
                placeholder="e.g., Basic"
                className="input border w-1/2 text-base"
                required
              />
              <input
                type="number"
                value={plan.price || ""}
                onChange={(e) => updatePlan(index, "price", e.target.value)}
                placeholder="e.g., 29"
                className="input border w-1/2 text-base"
                min="0"
                step="0.01"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addPlan}
            className="btn btn-ghost text-orange-500 mt-2 text-base"
          >
            + Add Another Plan
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary text-lg">
          Create Product
        </button>
      </form>

      {/* Generated Code Snippets */}
      {submittedProduct && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Embed Codes</h2>
          {submittedProduct.Plan.map((plan: any) => (
            <div key={plan.id} className="card bg-white shadow-md p-4 mb-4">
              <p className="text-lg font-semibold">{plan.name} - ${plan.price}</p>
              <input
                value={`<script src="http://localhost:3000/widget.js" data-plan-id="${plan.id}"></script>`}
                readOnly
                className="input border w-full mt-2 text-sm"
              />
              <button
                onClick={() => navigator.clipboard.writeText(`<script src="http://localhost:3000/widget.js" data-plan-id="${plan.id}"></script>`)}
                className="btn btn-secondary mt-2 text-base"
              >
                Copy to Clipboard
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}