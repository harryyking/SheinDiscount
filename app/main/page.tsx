"use client"

import { useState, useEffect, useRef } from "react"
import CsvUploader from "@/components/CsvUploader"
import ManualEntry from "@/components/ManualEntry"
import GraphOptions from "@/components/GraphOptions"
import GraphDisplay from "@/components/GraphDisplay"
import DataPreview from "@/components/DataPreview"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { defaultData } from "@/lib/utils"

const DynamicExportButton = dynamic(() => import("@/components/ExportButton"), { ssr: false })

export default function AppPage() {
  const [csvData, setCsvData] = useState<any[]>(defaultData)
  const [graphOptions, setGraphOptions] = useState<{
    graphType: "bar" | "line" | "pie"
    xAxis: string
    yAxis: string
    title: string
    tooltipEnabled: boolean
    backgroundColor: string
    gridEnabled: boolean
    curveEnabled: boolean
  }>({
    graphType: "bar",
    xAxis: "Date",
    yAxis: "Sales",
    title: "Sample Sales Data",
    tooltipEnabled: true,
    backgroundColor: "#4bc0c0",
    gridEnabled: true,
    curveEnabled: true, // New default
  })
  const graphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("csvData")
    if (storedData) {
      setCsvData(JSON.parse(storedData))
    } else {
      localStorage.setItem("csvData", JSON.stringify(defaultData))
    }
  }, [])

  const handleClearData = () => {
    localStorage.removeItem("csvData")
    localStorage.setItem("exportCount", "0") // Reset export count
    setCsvData(defaultData)
    setGraphOptions({
      graphType: "bar",
      xAxis: "Date",
      yAxis: "Sales",
      title: "Sample Sales Data",
      tooltipEnabled: true,
      backgroundColor: "#4bc0c0",
      gridEnabled: true,
      curveEnabled: true
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-8">Data Viz for Hustlers</h1>

      

      <div className="w-full max-w-6xl flex flex-col gap-10">
      <div className="absolute top-0 right-0">
            <DynamicExportButton graphRef={graphRef} />
          </div>

        {/* Graph Options - First */}
        <section className="w-full">
          <GraphOptions data={csvData} onOptionsChange={setGraphOptions} />
        </section>

        {/* Graph Display */}
        <section className="w-full relative">
          <h2 className="text-xl font-semibold mb-4">Graph Display</h2>
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
              curveEnabled={graphOptions.curveEnabled}
            />
          </div>
        </section>

        {/* Data Preview */}
        <section className="w-full">
          <h2 className="text-xl font-semibold mb-4">Data Preview</h2>
          <DataPreview data={csvData} />
          <div className="mt-4">
            <Button variant="destructive" onClick={handleClearData}>
              Reset to Default
            </Button>
          </div>
        </section>

        {/* Manual Entry */}
        <section className="w-full">
          <h2 className="text-xl font-semibold mb-4">Manual Entry</h2>
          <ManualEntry onDataLoaded={setCsvData} />
        </section>

        {/* CSV Input - Last */}
        <section className="w-full mb-8">
          <h2 className="text-xl font-semibold mb-4">CSV Input</h2>
          <CsvUploader onDataLoaded={setCsvData} />
        </section>
      </div>
    </main>
  )
}

