"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GraphOptions({
  data,
  onOptionsChange,
}: {
  data: any[];
  onOptionsChange: (options: {
    graphType: "bar" | "line" | "pie";
    xAxis: string;
    yAxis: string;
  }) => void;
}) {
  const [graphType, setGraphType] = useState<"bar" | "line" | "pie">("bar");
  const [xAxis, setXAxis] = useState<string>("");
  const [yAxis, setYAxis] = useState<string>("");

  useEffect(() => {
    if (data.length > 0) {
      const columns = Object.keys(data[0]);
      setXAxis(columns[0]);
      setYAxis(columns[1] || columns[0]);
    }
  }, [data]);

  useEffect(() => {
    if (xAxis && yAxis) {
      onOptionsChange({ graphType, xAxis, yAxis });
    }
  }, [graphType, xAxis, yAxis, onOptionsChange]);

  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Select
        value={graphType}
        onValueChange={(value) => setGraphType(value as "bar" | "line" | "pie")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Graph Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bar">Bar</SelectItem>
          <SelectItem value="line">Line</SelectItem>
          <SelectItem value="pie">Pie</SelectItem>
        </SelectContent>
      </Select>
      <Select value={xAxis} onValueChange={setXAxis}>
        <SelectTrigger>
          <SelectValue placeholder="X-Axis" />
        </SelectTrigger>
        <SelectContent>
          {columns.map((col) => (
            <SelectItem key={col} value={col}>
              {col}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={yAxis} onValueChange={setYAxis}>
        <SelectTrigger>
          <SelectValue placeholder="Y-Axis" />
        </SelectTrigger>
        <SelectContent>
          {columns.map((col) => (
            <SelectItem key={col} value={col}>
              {col}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}