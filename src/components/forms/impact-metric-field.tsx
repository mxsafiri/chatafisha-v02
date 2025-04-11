"use client"

import { useState } from "react"
import { PlusCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { defaultImpactMetrics } from "@/lib/data/impact-metrics"
import type { ImpactMetricValue, ImpactMetricType } from "@/types/project"

interface ImpactMetricFieldProps {
  value: ImpactMetricValue[]
  onChange: (metrics: ImpactMetricValue[]) => void
}

export function ImpactMetricField({ value, onChange }: ImpactMetricFieldProps) {
  const [customMetric, setCustomMetric] = useState<ImpactMetricType | null>(null)

  const handleAddMetric = (metricId: string) => {
    const metric = defaultImpactMetrics.find((m) => m.id === metricId)
    if (!metric) return

    onChange([
      ...value,
      {
        metricId: metric.id,
        value: 0,
        unit: metric.unit,
        timestamp: new Date().toISOString()
      }
    ])
  }

  const handleAddCustomMetric = () => {
    if (!customMetric) return

    onChange([
      ...value,
      {
        metricId: customMetric.id,
        value: 0,
        unit: customMetric.unit,
        timestamp: new Date().toISOString()
      }
    ])
    setCustomMetric(null)
  }

  const handleUpdateMetric = (index: number, metricValue: number) => {
    const newMetrics = [...value]
    newMetrics[index] = { ...newMetrics[index], value: metricValue }
    onChange(newMetrics)
  }

  const handleRemoveMetric = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const usedMetricIds = value.map((m) => m.metricId)
  const availableMetrics = defaultImpactMetrics.filter(
    (m) => !usedMetricIds.includes(m.id)
  )

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {value.map((metric, index) => {
          const metricType = defaultImpactMetrics.find((m) => m.id === metric.metricId)
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <Label>{metricType?.name || metric.metricId}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={metric.value}
                    onChange={(e) => handleUpdateMetric(index, Number(e.target.value))}
                    placeholder="Enter value"
                  />
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveMetric(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
      </div>

      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-2">
          <Label>Add Impact Metric</Label>
          <Select onValueChange={handleAddMetric}>
            <SelectTrigger>
              <SelectValue placeholder="Select a metric" />
            </SelectTrigger>
            <SelectContent>
              {availableMetrics.map((metric) => (
                <SelectItem key={metric.id} value={metric.id}>
                  {metric.name}
                </SelectItem>
              ))}
              <SelectItem value="custom">Add Custom Metric</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {customMetric && (
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <Label>Metric Name</Label>
            <Input
              value={customMetric.name}
              onChange={(e) =>
                setCustomMetric({ ...customMetric, name: e.target.value })
              }
              placeholder="e.g., Plastic Bottles Recycled"
            />
          </div>
          <div className="space-y-2">
            <Label>Unit</Label>
            <Input
              value={customMetric.unit}
              onChange={(e) =>
                setCustomMetric({ ...customMetric, unit: e.target.value })
              }
              placeholder="e.g., count, kg, liters"
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={customMetric.category}
              onValueChange={(value: any) =>
                setCustomMetric({ ...customMetric, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="economic">Economic</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddCustomMetric} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Custom Metric
          </Button>
        </div>
      )}
    </div>
  )
}
