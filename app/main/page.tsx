"use client";

import { useState, useEffect, useRef } from "react";
import CsvUploader from "@/components/CsvUploader";
import ManualEntry from "@/components/ManualEntry";
import GraphOptions from "@/components/GraphOptions";
import GraphDisplay from "@/components/GraphDisplay";
import DataPreview from "@/components/DataPreview";
import ExportButton from "@/components/ExportButton";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";


export default function AppPage() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [graphOptions, setGraphOptions] = useState<{
    graphType: "bar" | "line" | "pie";
    xAxis: string;
    yAxis: string;
    title: string;
    tooltipEnabled: boolean;
    backgroundColor: string;
  }>({
    graphType: "bar",
    xAxis: "",
    yAxis: "",
    title: "My Graph",
    tooltipEnabled: true,
    backgroundColor: "#4bc0c0",
  });
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("csvData");
    if (storedData) setCsvData(JSON.parse(storedData));
  }, []);

  const handleClearData = () => {
    localStorage.removeItem("csvData");
    setCsvData([]);
    setGraphOptions({ ...graphOptions, xAxis: "", yAxis: "" });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">
        Data Viz for Hustlers
      </h1>
      <Tabs defaultValue="upload" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload/Paste</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <CsvUploader onDataLoaded={setCsvData} />
        </TabsContent>
        <TabsContent value="manual">
          <ManualEntry onDataLoaded={setCsvData} />
        </TabsContent>
      </Tabs>
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
                title={graphOptions.title}
                tooltipEnabled={graphOptions.tooltipEnabled}
                backgroundColor={graphOptions.backgroundColor}
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
        <p className="text-gray-500">Enter data to get started!</p>
      )}
    </main>
  );
}