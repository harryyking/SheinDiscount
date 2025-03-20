"use client";

import { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { createProduct } from "@/actions/actions";

// Define Plan interface
interface Plan {
  name: string;
  price: number;
}

// Define Product interface (matches createProduct response)
interface Product {
  id: string;
  name: string;
  url: string;
  Plan: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

// Define Zod schema
const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  url: z.string().url("Please enter a valid URL"),
  plans: z
    .array(
      z.object({
        name: z.string().min(1, "Plan name is required"),
        price: z.number().min(0, "Price must be a positive number"),
      })
    )
    .min(1, "At least one plan is required"),
});

type FormValues = z.infer<typeof formSchema>;

// Define toast type (for future library integration)
type ToastType = "success" | "error";

export default function ProductForm() {
  const [submittedProduct, setSubmittedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedPlanId, setCopiedPlanId] = useState<string | null>(null);

  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      plans: [{ name: "", price: 0 }],
    },
  });

  // Add a new plan
  const addPlan = useCallback(() => {
    const currentPlans = getValues("plans");
    setValue("plans", [...currentPlans, { name: "", price: 0 }]);
  }, [getValues, setValue]);

  // Remove a plan
  const removePlan = useCallback(
    (index: number) => {
      const currentPlans = getValues("plans");
      if (currentPlans.length > 1) {
        setValue(
          "plans",
          currentPlans.filter((_, i) => i !== index)
        );
      }
    },
    [getValues, setValue]
  );

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createProduct({
        name: data.name,
        url: data.url,
        plans: data.plans, // Zod ensures all plans are valid
      });

      if (response.success && response.product) {
        setSubmittedProduct(response.product);
        reset({
          name: "",
          url: "",
          plans: [{ name: "", price: 0 }],
        });
        showToast("Product created successfully", "success");
      } else {
        const errorMsg = response.error || "Failed to create product";
        setError(errorMsg);
        showToast(errorMsg, "error");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy embed code to clipboard
  const copyToClipboard = useCallback((planId: string) => {
    const embedCode = `<script src="http://localhost:3000/widget.js" data-plan-id="${planId}"></script>`;
    navigator.clipboard.writeText(embedCode);
    setCopiedPlanId(planId);
    showToast("Copied to clipboard", "success");

    const timeout = setTimeout(() => setCopiedPlanId(null), 2000);
    return () => clearTimeout(timeout); // Cleanup (though rare here)
  }, []);

  // Toast placeholder (replace with a library like react-toastify later)
  const showToast = (message: string, type: ToastType) => {
    console.log(`Toast (${type}): ${message}`);
    // Example: toast[type](message); with a library
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-2">Create New Product</h2>
          <p className="text-gray-600 mb-6">
            Add your product details and pricing plans to generate embed codes.
          </p>

          {error && (
            <div className="alert alert-error mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-semibold">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Wireless Earbuds"
                className={`input border w-full ${errors.name ? "input-error" : ""}`}
                {...register("name")}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name.message}</span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt">Enter the name of your product or service.</span>
              </label>
            </div>

            {/* Product URL */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-semibold">Website URL</span>
              </label>
              <input
                type="text"
                placeholder="e.g., https://your-site.com"
                className={`input border w-full ${errors.url ? "input-error" : ""}`}
                {...register("url")}
              />
              {errors.url && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.url.message}</span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt">Enter the URL where your product is hosted.</span>
              </label>
            </div>

            {/* Plans */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="label-text text-lg font-semibold">Pricing Plans</label>
                <button type="button" className="btn btn-ghost btn-sm text-primary" onClick={addPlan}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Plan
                </button>
              </div>

              {getValues("plans").map((_, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="form-control flex-1">
                    <input
                      type="text"
                      placeholder="Plan name"
                      className={`input border w-full ${errors.plans?.[index]?.name ? "input-error" : ""}`}
                      {...register(`plans.${index}.name`)}
                    />
                    {errors.plans?.[index]?.name && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.plans[index]!.name!.message}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control flex-1">
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      className={`input border w-full ${errors.plans?.[index]?.price ? "input-error" : ""}`}
                      {...register(`plans.${index}.price`, { valueAsNumber: true })}
                    />
                    {errors.plans?.[index]?.price && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.plans[index]!.price!.message}</span>
                      </label>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-ghost btn-sm text-error mt-3"
                    onClick={() => removePlan(index)}
                    disabled={getValues("plans").length <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {errors.plans && !errors.plans.some!((e) => e) && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.plans.message}</span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>

      {/* Generated Code Snippets */}
      {submittedProduct && (
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title text-xl">Your Embed Codes</h2>
            <p className="text-gray-600 mb-4">Copy these codes to embed voting widgets on your website.</p>

            <div className="space-y-4">
              {submittedProduct.Plan.map((plan) => (
                <div key={plan.id} className="p-4 border rounded-lg bg-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">
                      {plan.name} - ${plan.price.toFixed(2)}
                    </h3>
                    <button onClick={() => copyToClipboard(plan.id)} className="btn btn-sm btn-outline">
                      {copiedPlanId === plan.id ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Copied
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                            <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                          </svg>
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-gray-200 rounded-md font-mono text-sm overflow-x-auto">
                    {`<script src="http://localhost:3000/widget.js" data-plan-id="${plan.id}"></script>`}
                  </div>
                </div>
              ))}
            </div>

            <div className="card-actions justify-end mt-4">
              <button className="btn btn-ghost" onClick={() => setSubmittedProduct(null)}>
                Create Another Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}