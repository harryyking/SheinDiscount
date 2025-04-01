"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { parse } from "papaparse";

export default function CsvUploader({
  onDataLoaded,
}: {
  onDataLoaded: (data: any[]) => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    setFileName(file.name);
    parse(file, {
      complete: (result) => {
        const data = result.data as any[];
        if (data.length === 0) {
          alert("The CSV file is empty.");
          return;
        }
        localStorage.setItem("csvData", JSON.stringify(data));
        onDataLoaded(data);
      },
      header: true,
      skipEmptyLines: true,
      error: () => alert("Error parsing CSV file."),
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button asChild>
        <label htmlFor="csv-upload">Upload CSV</label>
      </Button>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileUpload}
      />
      {fileName && <p className="text-sm text-gray-600">Loaded: {fileName}</p>}
    </div>
  );
}