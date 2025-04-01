"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { usePaystackPayment } from "react-paystack";

// Define PaystackProps type since it's not provided by react-paystack
interface PaystackProps {
  reference: string;
  email: string;
  amount: number; // In smallest currency unit (cents for USD)
  publicKey: string;
  currency?: string; // Optional, defaults to "NGN"
  [key: string]: any; // Allow additional props
}

export default function ExportButton({
  graphRef,
}: {
  graphRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [exportCount, setExportCount] = useState(0);
  const FREE_EXPORT_LIMIT = 3;
  const PAYMENT_AMOUNT = 100; // $1 = 100 cents (USD)

  // Load export count from localStorage on mount
  useEffect(() => {
    const storedCount = localStorage.getItem("exportCount");
    if (storedCount) {
      setExportCount(parseInt(storedCount, 10));
    }
  }, []);

  // Paystack configuration
  const config: PaystackProps = {
    reference: new Date().getTime().toString(),
    email: "user@example.com", // Replace with dynamic email if available
    amount: PAYMENT_AMOUNT, // $1 in cents
    publicKey: "pk_test_your_public_key_here", // Replace with your Paystack public key
    currency: "USD", // Set to USD (assuming your account supports it)
  };

  // Payment success callback
  const onSuccess = (response: any) => {
    console.log("Payment successful:", response);
    handleExport();
    alert("Payment successful! Graph exported.");
  };

  // Payment close callback
  const onClose = () => {
    console.log("Payment modal closed");
    alert("Payment cancelled.");
  };

  // Initialize Paystack payment
  const initializePayment = usePaystackPayment(config);

  // Export graph as PNG
  const handleExport = () => {
    if (graphRef.current) {
      html2canvas(graphRef.current)
        .then((canvas) => {
          const link = document.createElement("a");
          link.download = "graph.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        })
        .catch((error) => {
          console.error("Export failed:", error);
          alert("Failed to export graph. Please try again.");
        });
    } else {
      alert("No graph available to export.");
    }
  };

  // Handle export button click
  const handleClick = () => {
    const newCount = exportCount + 1;
    setExportCount(newCount);
    localStorage.setItem("exportCount", newCount.toString());

    if (newCount <= FREE_EXPORT_LIMIT) {
      handleExport();
    } else {
      initializePayment({ onSuccess, onClose });
    }
  };

  return (
    <Button onClick={handleClick}>
      Export Graph{" "}
      {exportCount >= FREE_EXPORT_LIMIT
        ? "($1)"
        : `(${FREE_EXPORT_LIMIT - exportCount} free left)`}
    </Button>
  );
}