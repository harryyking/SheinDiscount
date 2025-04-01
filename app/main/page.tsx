"use client";

import { useState, useEffect, useRef } from "react";
import CsvUploader from "@/components/CsvUploader";
import ManualEntry from "@/components/ManualEntry";
import GraphOptions from "@/components/GraphOptions";
import GraphDisplay from "@/components/GraphDisplay";
import DataPreview from "@/components/DataPreview";
import ExportButton from "@/components/ExportButton";
import { Button } from "@/components/ui/button";
import { defaultData } from "@/lib/utils";

export default function AppPage() {
  const [csvData, setCsvData] = useState<any[]>(defaultData);
  const [graphOptions, setGraphOptions] = useState<{
    graphType: "bar" | "line" | "pie";
    xAxis: string;
    yAxis: string;
    title: string;
    tooltipEnabled: boolean;
    backgroundColor: string;
    gridEnabled: boolean;
  }>({
    graphType: "bar",
    xAxis: "Date",
    yAxis: "Sales",
    title: "Sample Sales Data",
    tooltipEnabled: true,
    backgroundColor: "#4bc0c0",
    gridEnabled: true,
  });
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("csvData");
    if (storedData) {
      setCsvData(JSON.parse(storedData));
    } else {
      localStorage.setItem("csvData", JSON.stringify(defaultData));
    }
  }, []);

  const handleClearData = () => {
    localStorage.removeItem("csvData");
    localStorage.setItem("exportCount", "0"); // Reset export count
    setCsvData(defaultData);
    setGraphOptions({
      graphType: "bar",
      xAxis: "Date",
      yAxis: "Sales",
      title: "Sample Sales Data",
      tooltipEnabled: true,
      backgroundColor: "#4bc0c0",
      gridEnabled: true,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 gap-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mt-4">
        Data Viz for Hustlers
      </h1>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Inputs and Data Preview */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">CSV Input</h2>
            <CsvUploader onDataLoaded={setCsvData} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Manual Entry</h2>
            <ManualEntry onDataLoaded={setCsvData} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Data Preview</h2>
            <DataPreview data={csvData} />
          </div>
          <Button variant="destructive" onClick={handleClearData}>
            Reset to Default
          </Button>
        </div>
        {/* Right Column: Graph Options, Styles, and Display */}
        <div className="flex flex-col gap-6">
          <GraphOptions data={csvData} onOptionsChange={setGraphOptions} />
          <div className="relative">
            <div className="absolute top-0 right-0">
              <ExportButton graphRef={graphRef} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Graph Display</h2>
            <div ref={graphRef}>
              <GraphDisplay
                data={csvData}
                graphType={graphOptions.graphType}
                xAxis={graphOptions.xAxis}
                yAxis={graphOptions.yAxis}
                title={graphOptions.title}
                tooltipEnabled={graphOptions.tooltipEnabled}
                backgroundColor={graphOptions.backgroundColor}
                gridEnabled={graphOptions.gridEnabled}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}