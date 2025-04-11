"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas-pro"; // Updated import
import { usePaystackPayment } from "react-paystack";
import { Download } from "lucide-react";

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
  const FREE_EXPORT_LIMIT = 3;
  const PAYMENT_AMOUNT = 200; // $1 = 100 cents (USD)

  useEffect(() => {
    setIsClient(true);
    const storedCount = localStorage.getItem("exportCount");
    if (storedCount) {
      setExportCount(parseInt(storedCount, 10));
    }
  }, []);

  const config: PaystackProps = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: PAYMENT_AMOUNT,
    publicKey: "pk_live_388df0bca96db2e47bffa41fe478056984cdac52",
    currency: "GHS",
  };

  const onSuccess = (response: any) => {
    console.log("Payment successful:", response);
    handleExport();
    alert("Payment successful! Graph exported.");
  };

  const onClose = () => {
    console.log("Payment modal closed");
    alert("Payment cancelled.");
  };

  const initializePayment = usePaystackPayment(config);

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
        alert("Failed to export graph. Please try again.");
      });
  };

  const handleClick = () => {
    if (!isClient) return;

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
    <Button onClick={handleClick} disabled={!isClient} className="flex gap-4">
      <Download size={24}/>
      Export Graph{" "}
      {exportCount >= FREE_EXPORT_LIMIT
        ? "($1)"
        : `(${FREE_EXPORT_LIMIT - exportCount} free left)`}
    </Button>
  );
}