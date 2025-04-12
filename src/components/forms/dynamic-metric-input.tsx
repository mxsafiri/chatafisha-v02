"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash } from "lucide-react"
import type { ImpactMetric } from "@/types/project"

const metricTypes = [
  { value: "environmental", label: "Environmental" },
  { value: "social", label: "Social" },
  { value: "economic", label: "Economic" },
  { value: "other", label: "Other" },
] as const

const defaultMetrics = {
  environmental: [
    { name: "CO2 Reduction", unit: "kg" },
    { name: "Waste Diverted", unit: "kg" },
    { name: "Water Saved", unit: "liters" },
  ],
  social: [
    { name: "People Impacted", unit: "people" },
    { name: "Jobs Created", unit: "jobs" },
    { name: "Communities Served", unit: "communities" },
  ],
  economic: [
    { name: "Revenue Generated", unit: "USD" },
    { name: "Cost Savings", unit: "USD" },
    { name: "Investment Attracted", unit: "USD" },
  ],
}

interface FormValues {
  impactMetrics: ImpactMetric[]
}

export function DynamicMetricInput() {
  const { control } = useFormContext<FormValues>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "impactMetrics",
  })

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-4">
          <div className="flex-1 space-y-4">
            <Select
              onValueChange={(value) => {
                const defaultMetric = defaultMetrics[value as keyof typeof defaultMetrics]?.[0]
                if (defaultMetric) {
                  control._formValues.impactMetrics[index] = {
                    ...control._formValues.impactMetrics[index],
                    type: value,
                    name: defaultMetric.name,
                    unit: defaultMetric.unit,
                  }
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select metric type" />
              </SelectTrigger>
              <SelectContent>
                {metricTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Metric name"
              {...control.register(`impactMetrics.${index}.name`)}
            />

            <div className="flex gap-4">
              <Input
                type="number"
                placeholder="Value"
                {...control.register(`impactMetrics.${index}.value`, {
                  valueAsNumber: true,
                })}
              />
              <Input
                placeholder="Unit"
                {...control.register(`impactMetrics.${index}.unit`)}
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="mt-1"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            type: "environmental",
            name: "",
            value: 0,
            unit: "",
          })
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Metric
      </Button>
    </div>
  )
}
