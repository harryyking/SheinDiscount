"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react"; // Import Trash2 icon

export default function ManualEntry({
  onDataLoaded,
}: {
  onDataLoaded: (data: any[]) => void;
}) {
  const [rows, setRows] = useState([{ x: "", y: "" }]);

  const addRow = () => setRows([...rows, { x: "", y: "" }]);
  const updateRow = (index: number, field: "x" | "y", value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  
  const removeRow = (index: number) => {
    if (rows.length === 1) {
      alert("You must keep at least one row.");
      return;
    }
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleSubmit = () => {
    const data = rows
      .filter((row) => row.x.trim() && row.y.trim())
      .map((row) => ({ Date: row.x, Value: Number(row.y) || 0 }));
    if (data.length === 0) {
      alert("Please enter at least one valid row.");
      return;
    }
    localStorage.setItem("csvData", JSON.stringify(data));
    onDataLoaded(data);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="grid grid-cols-3 gap-2">
        <span className="font-semibold">X-Axis (e.g., Date)</span>
        <span className="font-semibold">Y-Axis (e.g., Value)</span>
        <span className="font-semibold sr-only">Remove</span> {/* Hidden label for accessibility */}
        {rows.map((row, index) => (
          <div key={index} className="col-span-3 grid grid-cols-3 gap-2 items-center">
            <Input
              value={row.x}
              onChange={(e) => updateRow(index, "x", e.target.value)}
              placeholder="e.g., 2025-01"
            />
            <Input
              value={row.y}
              onChange={(e) => updateRow(index, "y", e.target.value)}
              placeholder="e.g., 100"
              type="number"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeRow(index)}
              className="text-destructive hover:text-destructive/80"
              aria-label={`Remove row ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={addRow}>Add Row</Button>
        <Button onClick={handleSubmit}>Generate Graph</Button>
      </div>
    </div>
  );
}