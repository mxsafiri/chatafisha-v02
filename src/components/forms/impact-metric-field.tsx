"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import type { ImpactMetric } from "@/types/project"

interface ImpactMetricFieldProps {
  value: ImpactMetric[]
  onChange: (value: ImpactMetric[]) => void
}

const metricTypes = [
  "environmental",
  "social",
  "economic",
  "other"
] as const

type MetricType = typeof metricTypes[number]

const unitOptions = {
  environmental: ["kg", "tons", "pieces"],
  social: ["people", "households", "communities"],
  economic: ["USD", "KES", "jobs"],
  other: ["units"]
} as const

export function ImpactMetricField({
  value,
  onChange
}: ImpactMetricFieldProps) {
  const addMetric = () => {
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        name: "",
        unit: "kg",
        value: 0,
        type: "environmental"
      }
    ])
  }

  const updateMetric = (index: number, updates: Partial<ImpactMetric>) => {
    const newMetrics = [...value]
    newMetrics[index] = { ...newMetrics[index], ...updates }
    onChange(newMetrics)
  }

  const removeMetric = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {value.map((metric, index) => (
        <div key={metric.id} className="grid gap-4 p-4 border rounded-lg">
          <div className="grid gap-2">
            <Label>Metric Name</Label>
            <Input
              value={metric.name}
              onChange={(e) => updateMetric(index, { name: e.target.value })}
              placeholder="e.g., Waste Collected"
            />
          </div>

          <div className="grid gap-2">
            <Label>Type</Label>
            <Select
              value={metric.type || "environmental"}
              onValueChange={(type: MetricType) => updateMetric(index, { type })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select metric type" />
              </SelectTrigger>
              <SelectContent>
                {metricTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Unit</Label>
            <Select
              value={metric.unit}
              onValueChange={(unit) => updateMetric(index, { unit })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {unitOptions[metric.type as MetricType || "environmental"].map((unit) => (
                  <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Value</Label>
            <Input
              type="number"
              value={metric.value}
              onChange={(e) => updateMetric(index, { value: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeMetric(index)}
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove Metric
          </Button>
        </div>
      ))}

      <Button onClick={addMetric} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Impact Metric
      </Button>
    </div>
  )
}
