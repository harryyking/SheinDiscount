"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function ManualEntry({
  onDataLoaded,
}: {
  onDataLoaded: (data: any[]) => void
}) {
  const [rows, setRows] = useState([{ x: "", y1: "", y2: "" }])

  const addRow = () => setRows([...rows, { x: "", y1: "", y2: "" }])
  const updateRow = (index: number, field: "x" | "y1" | "y2", value: string) => {
    const newRows = [...rows]
    newRows[index][field] = value
    setRows(newRows)
  }
  const removeRow = (index: number) => {
    if (rows.length === 1) {
      alert("You must keep at least one row.")
      return
    }
    const newRows = rows.filter((_, i) => i !== index)
    setRows(newRows)
  }

  const handleSubmit = () => {
    const data = rows
      .filter((row) => row.x.trim() && (row.y1.trim() || row.y2.trim()))
      .map((row) => ({
        Date: row.x,
        Sales: Number(row.y1) || 0,
        Profit: Number(row.y2) || 0,
      }))
    if (data.length === 0) {
      alert("Please enter at least one valid row.")
      return
    }
    localStorage.setItem("csvData", JSON.stringify(data))
    onDataLoaded(data)
  }

  return (
    <Card className="w-full bg-gray-100 border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Data Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 font-medium text-sm text-gray-600">X-Axis (Date)</th>
                <th className="text-left py-2 px-2 font-medium text-sm text-gray-600">Y1 (Sales)</th>
                <th className="text-left py-2 px-2 font-medium text-sm text-gray-600">Y2 (Profit)</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-0">
                  <td className="py-2 px-2">
                    <Input
                      value={row.x}
                      onChange={(e) => updateRow(index, "x", e.target.value)}
                      placeholder="e.g., 2025-01"
                      className="bg-white"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      value={row.y1}
                      onChange={(e) => updateRow(index, "y1", e.target.value)}
                      placeholder="e.g., 100"
                      type="number"
                      className="bg-white"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      value={row.y2}
                      onChange={(e) => updateRow(index, "y2", e.target.value)}
                      placeholder="e.g., 50"
                      type="number"
                      className="bg-white"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(index)}
                      className="text-gray-500 hover:text-red-500 hover:bg-gray-200"
                      aria-label={`Remove row ${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-4">
        <Button variant="outline" onClick={addRow} className="flex items-center gap-1 bg-white">
          <Plus className="h-4 w-4" /> Add Row
        </Button>
        <Button onClick={handleSubmit}>Generate Graph</Button>
      </CardFooter>
    </Card>
  )
}

