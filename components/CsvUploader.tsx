"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { parse } from "papaparse";

export default function CsvUploader({
  onDataLoaded,
}: {
  onDataLoaded: (data: any[]) => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [csvText, setCsvText] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }
    setFileName(file.name);
    parse(file, {
      complete: (result) => processData(result.data as any[]),
      header: true,
      skipEmptyLines: true,
      error: () => alert("Error parsing CSV file."),
    });
  };

  const handleTextParse = () => {
    if (!csvText.trim()) {
      alert("Please enter some CSV data.");
      return;
    }
    parse(csvText, {
      complete: (result) => processData(result.data as any[]),
      header: true,
      skipEmptyLines: true,
      error: () => alert("Error parsing pasted CSV."),
    });
  };

  const processData = (data: any[]) => {
    if (data.length === 0) {
      alert("No valid data found.");
      return;
    }
    localStorage.setItem("csvData", JSON.stringify(data));
    onDataLoaded(data);
    setFileName(null);
    setCsvText("");
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <Button asChild>
        <label htmlFor="csv-upload">Upload CSV File</label>
      </Button>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileUpload}
      />
      {fileName && <p className="text-sm text-gray-600">Loaded: {fileName}</p>}
      <Textarea
        placeholder="Or paste CSV here (e.g., Date,Sales\n2025-01,100)"
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
        className="mt-4"
      />
      <Button onClick={handleTextParse}>Parse Pasted CSV</Button>
    </div>
  );
}