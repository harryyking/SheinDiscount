"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function GraphOptions({
  data,
  onOptionsChange,
}: {
  data: any[];
  onOptionsChange: (options: {
    graphType: "bar" | "line" | "pie";
    xAxis: string;
    yAxis: string;
    title: string;
    tooltipEnabled: boolean;
    backgroundColor: string;
  }) => void;
}) {
  const [graphType, setGraphType] = useState<"bar" | "line" | "pie">("bar");
  const [xAxis, setXAxis] = useState<string>("");
  const [yAxis, setYAxis] = useState<string>("");
  const [title, setTitle] = useState("My Graph");
  const [tooltipEnabled, setTooltipEnabled] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#4bc0c0");

  useEffect(() => {
    if (data.length > 0) {
      const columns = Object.keys(data[0]);
      setXAxis(columns[0]);
      setYAxis(columns[1] || columns[0]);
    }
  }, [data]);

  useEffect(() => {
    if (xAxis && yAxis) {
      onOptionsChange({
        graphType,
        xAxis,
        yAxis,
        title,
        tooltipEnabled,
        backgroundColor,
      });
    }
  }, [graphType, xAxis, yAxis, title, tooltipEnabled, backgroundColor, onOptionsChange]);

  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Graph Type</label>
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
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">X-Axis</label>
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
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Y-Axis</label>
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
      <div>
        <label className="block text-sm font-medium mb-1">Graph Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter graph title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tooltip</label>
        <Select
          value={tooltipEnabled ? "enabled" : "disabled"}
          onValueChange={(value) => setTooltipEnabled(value === "enabled")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tooltip" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <Input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
    </div>
  );
}