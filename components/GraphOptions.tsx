"use client";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react"; // Icons for add/remove

export default function GraphOptions({
  data,
  onOptionsChange,
}: {
  data: any[];
  onOptionsChange: (options: {
    graphType: "bar" | "line" | "pie";
    xAxis: string;
    yAxes: string[]; // Multi-Y-axis
    title: string;
    tooltipEnabled: boolean;
    backgroundColor: string;
    gridEnabled: boolean;
    curveEnabled: boolean;
  }) => void;
}) {
  const [graphType, setGraphType] = useState<"bar" | "line" | "pie">("bar");
  const [xAxis, setXAxis] = useState<string>("Date");
  const [yAxes, setYAxes] = useState<string[]>(["Sales"]); // Multi-Y-axis
  const [title, setTitle] = useState("Sample Sales Data");
  const [tooltipEnabled, setTooltipEnabled] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#4bc0c0");
  const [gridEnabled, setGridEnabled] = useState(true);
  const [curveEnabled, setCurveEnabled] = useState(true);

  useEffect(() => {
    if (data.length > 0) {
      const columns = Object.keys(data[0]);
      setXAxis(columns[0]);
      setYAxes([columns[1] || columns[0]]); // Default to one Y-axis
    }
  }, [data]);

  useEffect(() => {
    if (xAxis && yAxes.length > 0) {
      onOptionsChange({
        graphType,
        xAxis,
        yAxes, // Multi-Y-axis
        title,
        tooltipEnabled,
        backgroundColor,
        gridEnabled,
        curveEnabled,
      });
    }
  }, [graphType, xAxis, yAxes, title, tooltipEnabled, backgroundColor, gridEnabled, curveEnabled, onOptionsChange]);

  const addYAxis = () => setYAxes([...yAxes, ""]);
  const removeYAxis = (index: number) => {
    if (yAxes.length === 1) return; // Keep at least one Y-axis
    setYAxes(yAxes.filter((_, i) => i !== index));
  };
  const updateYAxis = (index: number, value: string) => {
    const newYAxes = [...yAxes];
    newYAxes[index] = value;
    setYAxes(newYAxes);
  };

  return (
    <div className="w-full space-y-6">
      {/* Graph Options Section */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label htmlFor="graph-type">Graph Type</Label>
            <Select
              value={graphType}
              onValueChange={(value) => setGraphType(value as "bar" | "line" | "pie")}
            >
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

          <div className="space-y-2">
            <Label htmlFor="title">Graph Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter graph title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="x-axis">X-Axis</Label>
            <Input
              id="x-axis"
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              placeholder="e.g., Date"
            />
          </div>

          <div className="space-y-2">
            <Label>Y-Axes</Label>
            {yAxes.map((yAxis, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={yAxis}
                  onChange={(e) => updateYAxis(index, e.target.value)}
                  placeholder={`e.g., ${index === 0 ? "Sales" : "Profit"}`}
                />
                {yAxes.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeYAxis(index)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addYAxis} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Add Y-Axis
            </Button>
          </div>
        </div>
      </div>

      {/* Graph Styles Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Graph Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label htmlFor="color">Background Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="color"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-16 h-10"
              />
              <Input
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tooltip">Tooltip</Label>
            <Select
              value={tooltipEnabled ? "enabled" : "disabled"}
              onValueChange={(value) => setTooltipEnabled(value === "enabled")}
            >
              <SelectTrigger id="tooltip">
                <SelectValue placeholder="Tooltip" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grid">Grid</Label>
            <Select
              value={gridEnabled ? "enabled" : "disabled"}
              onValueChange={(value) => setTooltipEnabled(value === "enabled")}
            >
              <SelectTrigger id="grid">
                <SelectValue placeholder="Grid" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="curve">Curved Line</Label>
            <Select
              value={curveEnabled ? "enabled" : "disabled"}
              onValueChange={(value) => setCurveEnabled(value === "enabled")}
            >
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
      </div>
    </div>
  );
}