"use client";

import { useState, useEffect, useRef } from "react";
import CsvUploader from "@/components/CsvUploader";
import GraphOptions from "@/components/GraphOptions";
import GraphDisplay from "@/components/GraphDisplay";
import DataPreview from "@/components/DataPreview";
import ExportButton from "@/components/ExportButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function AppPage() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [graphOptions, setGraphOptions] = useState<{
    graphType: "bar" | "line" | "pie";
    xAxis: string;
    yAxis: string;
  }>({
    graphType: "bar",
    xAxis: "",
    yAxis: "",
  });
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("csvData");
    if (storedData) setCsvData(JSON.parse(storedData));
  }, []);

  const handleClearData = () => {
    localStorage.removeItem("csvData");
    setCsvData([]);
    setGraphOptions({ graphType: "bar", xAxis: "", yAxis: "" });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">
        Data Viz for Hustlers
      </h1>
      <CsvUploader onDataLoaded={setCsvData} />
      {csvData.length > 0 ? (
        <div className="w-full max-w-4xl flex flex-col gap-6">
          <DataPreview data={csvData} />
          <GraphOptions data={csvData} onOptionsChange={setGraphOptions} />
          <Card className="p-4 w-full">
            <div ref={graphRef}>
              <GraphDisplay
                data={csvData}
                graphType={graphOptions.graphType}
                xAxis={graphOptions.xAxis}
                yAxis={graphOptions.yAxis}
              />
            </div>
          </Card>
          <div className="flex gap-4 justify-center">
            <ExportButton graphRef={graphRef} />
            <Button variant="destructive" onClick={handleClearData}>
              Clear Data
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Upload a CSV to get started!</p>
      )}
    </main>
  );
}