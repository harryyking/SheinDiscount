"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { usePaystackPayment } from "react-paystack";

// Define PaystackProps type
interface PaystackProps {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
  currency?: string;
  [key: string]: any;
}

export default function ExportButton({
  graphRef,
}: {
  graphRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [exportCount, setExportCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [initializePayment, setInitializePayment] = useState<((options: {
    onSuccess: (response: any) => void;
    onClose: () => void;
  }) => void) | null>(null); // Store the payment function
  const FREE_EXPORT_LIMIT = 3;
  const PAYMENT_AMOUNT = 100; // $1 = 100 cents (USD)

  // Load export count and initialize client-side check
  useEffect(() => {
    setIsClient(true);
    const storedCount = localStorage.getItem("exportCount");
    if (storedCount) {
      setExportCount(parseInt(storedCount, 10));
    }
  }, []);

  // Define Paystack config and initialize payment only on client
  useEffect(() => {
    if (!isClient) return;

    const config: PaystackProps = {
      reference: new Date().getTime().toString(),
      email: "user@example.com", // Replace with dynamic email
      amount: PAYMENT_AMOUNT,
      publicKey: "pk_test_your_public_key_here", // Replace with your key
      currency: "USD", // Assuming USD support
    };

    // Set the initializePayment function once we're on the client
    setInitializePayment(() => usePaystackPayment(config));
  }, [isClient]);

  // Export graph as PNG
  const handleExport = () => {
    if (!isClient || !graphRef.current) {
      alert("No graph available to export.");
      return;
    }

    html2canvas(graphRef.current)
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "graph.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      })
      .catch((error) => {
        console.error("Export failed:", error);
        alert("Failed to export graph.");
      });
  };

  // Handle export button click
  const handleClick = () => {
    if (!isClient || !initializePayment) return; // Wait for client and payment setup

    const newCount = exportCount + 1;
    setExportCount(newCount);
    localStorage.setItem("exportCount", newCount.toString());

    if (newCount <= FREE_EXPORT_LIMIT) {
      handleExport();
    } else {
      // Define callbacks and trigger payment on click
      const onSuccess = (response: any) => {
        console.log("Payment successful:", response);
        handleExport();
        alert("Payment successful! Graph exported.");
      };

      const onClose = () => {
        console.log("Payment modal closed");
        alert("Payment cancelled.");
      };

      initializePayment({ onSuccess, onClose });
    }
  };

  return (
    <Button onClick={handleClick} disabled={!isClient || !initializePayment}>
      Export Graph{" "}
      {exportCount >= FREE_EXPORT_LIMIT
        ? "($1)"
        : `(${FREE_EXPORT_LIMIT - exportCount} free left)`}
    </Button>
  );
}