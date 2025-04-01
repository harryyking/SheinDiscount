"use client";

import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";

export default function ExportButton({
  graphRef,
}: {
  graphRef: React.RefObject<HTMLDivElement | null>;
}) {
  const handleExport = () => {
    if (graphRef.current) {
      html2canvas(graphRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "graph.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    } else {
      alert("No graph available to export.");
    }
  };

  return (
    <Button onClick={handleExport} variant="outline">
      Export Graph ($2 - Coming Soon)
    </Button>
  );
}