"use client"

import * as React from "react"
import { PlusCircle, X } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import type { ImpactMetric } from "@/types/project"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const defaultUnits = [
  "people",
  "kg",
  "tonnes",
  "trees",
  "hectares",
  "litres",
  "units",
  "hours",
  "days",
  "kW",
  "other",
] as const

const metricTypes = [
  { value: "environmental", label: "Environmental" },
  { value: "social", label: "Social" },
  { value: "economic", label: "Economic" },
  { value: "other", label: "Other" },
] as const

type MetricType = typeof metricTypes[number]["value"]
type MetricUnit = typeof defaultUnits[number]

export function DynamicMetricInput() {
  const { control, register, setValue, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray<{ impactMetrics: ImpactMetric[] }>({
    control,
    name: "impactMetrics",
  })

  const handleAddMetric = () => {
    append({
      id: crypto.randomUUID(),
      name: "",
      unit: defaultUnits[0],
      value: 0,
      type: "environmental",
      createdAt: new Date().toISOString(),
    })
  }

  const metrics = watch("impactMetrics")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base">Impact Metrics</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddMetric}
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Metric
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label>Metric Name</Label>
                  <Input
                    {...register(`impactMetrics.${index}.name`)}
                    placeholder="e.g., Women Trained"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Select
                    {...register(`impactMetrics.${index}.unit`)}
                    value={metrics?.[index]?.unit}
                    onValueChange={(value: MetricUnit) => setValue(`impactMetrics.${index}.unit`, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input
                    {...register(`impactMetrics.${index}.value`, { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    {...register(`impactMetrics.${index}.type`)}
                    value={metrics?.[index]?.type}
                    onValueChange={(value: MetricType) => setValue(`impactMetrics.${index}.type`, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {metricTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end md:col-span-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {fields.length === 0 && (
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground text-center">
                No impact metrics added. Click &quot;Add Metric&quot; to start tracking your impact.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
