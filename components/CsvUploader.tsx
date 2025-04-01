"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { parse } from "papaparse"
import { cn } from "@/lib/utils"

export default function CsvUploader({
  onDataLoaded,
}: {
  onDataLoaded: (data: any[]) => void
}) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [csvText, setCsvText] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".csv")) {
      setUploadStatus("error")
      setTimeout(() => setUploadStatus("idle"), 3000)
      return
    }

    processFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file || !file.name.endsWith(".csv")) {
      setUploadStatus("error")
      setTimeout(() => setUploadStatus("idle"), 3000)
      return
    }

    processFile(file)
  }

  const processFile = (file: File) => {
    setFileName(file.name)
    parse(file, {
      complete: (result) => {
        processData(result.data as any[])
        setUploadStatus("success")
        setTimeout(() => setUploadStatus("idle"), 3000)
      },
      header: true,
      skipEmptyLines: true,
      error: () => {
        setUploadStatus("error")
        setTimeout(() => setUploadStatus("idle"), 3000)
      },
    })
  }

  const handleTextParse = () => {
    if (!csvText.trim()) {
      setUploadStatus("error")
      setTimeout(() => setUploadStatus("idle"), 3000)
      return
    }

    parse(csvText, {
      complete: (result) => {
        processData(result.data as any[])
        setUploadStatus("success")
        setTimeout(() => setUploadStatus("idle"), 3000)
      },
      header: true,
      skipEmptyLines: true,
      error: () => {
        setUploadStatus("error")
        setTimeout(() => setUploadStatus("idle"), 3000)
      },
    })
  }

  const processData = (data: any[]) => {
    if (data.length === 0) {
      setUploadStatus("error")
      setTimeout(() => setUploadStatus("idle"), 3000)
      return
    }
    localStorage.setItem("csvData", JSON.stringify(data))
    onDataLoaded(data)
    setFileName(null)
    setCsvText("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Import CSV Data
        </CardTitle>
        <CardDescription>Upload a CSV file or paste your data directly</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="paste">Paste CSV</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                isDragging ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50",
                uploadStatus === "success" && "border-green-500 bg-green-50",
                uploadStatus === "error" && "border-red-500 bg-red-50",
              )}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-3 cursor-pointer">
                {uploadStatus === "idle" && (
                  <>
                    <Upload className="h-10 w-10 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-800">
                        {isDragging ? "Drop your CSV file here" : "Drag & drop your CSV file here"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                    </div>
                  </>
                )}

                {uploadStatus === "success" && (
                  <>
                    <CheckCircle className="h-10 w-10 text-green-500" />
                    <p className="font-medium text-green-700">CSV data imported successfully!</p>
                  </>
                )}

                {uploadStatus === "error" && (
                  <>
                    <AlertCircle className="h-10 w-10 text-red-500" />
                    <p className="font-medium text-red-700">Error importing CSV data</p>
                    <p className="text-sm text-red-600">Please check your file format and try again</p>
                  </>
                )}

                {fileName && uploadStatus === "idle" && (
                  <p className="text-sm text-gray-600 mt-2">Selected: {fileName}</p>
                )}
              </div>

              <input
                ref={fileInputRef}
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            <div className="text-xs text-gray-500">
              <p>Supported format: CSV with headers</p>
              <p>Example: Date,Sales,Category</p>
            </div>
          </TabsContent>

          <TabsContent value="paste" className="space-y-4">
            <Textarea
              placeholder="Paste your CSV data here (include headers)
                Example:
                Date,Sales,Category
                2023-01-01,100,Electronics
                2023-01-02,150,Clothing"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="min-h-[150px] font-mono text-sm"
            />

            <div className="flex justify-end">
              <Button onClick={handleTextParse} className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Parse CSV Data
              </Button>
            </div>

            {uploadStatus === "success" && (
              <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                <CheckCircle className="h-4 w-4" />
                CSV data imported successfully!
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
                <AlertCircle className="h-4 w-4" />
                Error importing CSV data. Please check your format and try again.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

