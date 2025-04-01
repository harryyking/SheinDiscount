"use client";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    gridEnabled: boolean;
    curveEnabled: boolean; // New prop
  }) => void;
}) {
  const [graphType, setGraphType] = useState<"bar" | "line" | "pie">("bar");
  const [xAxis, setXAxis] = useState<string>("Date");
  const [yAxis, setYAxis] = useState<string>("Sales");
  const [title, setTitle] = useState("Sample Sales Data");
  const [tooltipEnabled, setTooltipEnabled] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#4bc0c0");
  const [gridEnabled, setGridEnabled] = useState(true);
  const [curveEnabled, setCurveEnabled] = useState(true); // Default to curved

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
        gridEnabled,
        curveEnabled,
      });
    }
  }, [graphType, xAxis, yAxis, title, tooltipEnabled, backgroundColor, gridEnabled, curveEnabled, onOptionsChange]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-xl font-semibold">Graph Options</h2>
      <div className="flex flex-col gap-2">
        <Label htmlFor="graph-type">Graph Type</Label>
        <Select value={graphType} onValueChange={(value) => setGraphType(value as "bar" | "line" | "pie")}>
          <SelectTrigger id="graph-type">
            <SelectValue placeholder="Graph Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">Bar</SelectItem>
            <SelectItem value="line">Line</SelectItem>
            <SelectItem value="pie">Pie</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="x-axis">X-Axis</Label>
        <Input id="x-axis" value={xAxis} onChange={(e) => setXAxis(e.target.value)} placeholder="e.g., Date" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="y-axis">Y-Axis</Label>
        <Input id="y-axis" value={yAxis} onChange={(e) => setYAxis(e.target.value)} placeholder="e.g., Sales" />
      </div>

      <h2 className="text-xl font-semibold mt-4">Graph Styles</h2>
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Graph Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter graph title" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="tooltip">Tooltip</Label>
        <Select value={tooltipEnabled ? "enabled" : "disabled"} onValueChange={(value) => setTooltipEnabled(value === "enabled")}>
          <SelectTrigger id="tooltip">
            <SelectValue placeholder="Tooltip" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="color">Background Color</Label>
        <Input id="color" type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="grid">Grid</Label>
        <Select value={gridEnabled ? "enabled" : "disabled"} onValueChange={(value) => setGridEnabled(value === "enabled")}>
          <SelectTrigger id="grid">
            <SelectValue placeholder="Grid" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="curve">Curved Line</Label>
        <Select value={curveEnabled ? "enabled" : "disabled"} onValueChange={(value) => setCurveEnabled(value === "enabled")}>
          <SelectTrigger id="curve">
            <SelectValue placeholder="Curve" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}