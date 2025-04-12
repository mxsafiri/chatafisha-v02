"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { ProjectSubmissionFormData } from "@/lib/validations/project"
import { cn } from "@/lib/utils"
import type { FieldError } from "react-hook-form"

export function ImpactMetricsStep() {
  const { register, control, formState: { errors } } = useFormContext<ProjectSubmissionFormData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "impactMetrics",
  })

  const handleAddMetric = () => {
    append({
      id: crypto.randomUUID(),
      name: "",
      unit: "",
      value: 0,
      type: "environmental",
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Impact Metrics</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddMetric}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Metric
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className={cn("relative", index === fields.length - 1 && "mb-6")}>
            <CardContent className="pt-6">
              <div className="absolute right-4 top-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`impactMetrics.${index}.name`}>Metric Name</Label>
                  <Input
                    {...register(`impactMetrics.${index}.name`)}
                    id={`impactMetrics.${index}.name`}
                    placeholder="e.g., Waste Collected"
                  />
                  {errors.impactMetrics?.[index]?.name && (
                    <p className="text-sm text-destructive">{(errors.impactMetrics[index]?.name as FieldError)?.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`impactMetrics.${index}.unit`}>Unit</Label>
                  <Input
                    {...register(`impactMetrics.${index}.unit`)}
                    id={`impactMetrics.${index}.unit`}
                    placeholder="e.g., kg"
                  />
                  {errors.impactMetrics?.[index]?.unit && (
                    <p className="text-sm text-destructive">{(errors.impactMetrics[index]?.unit as FieldError)?.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`impactMetrics.${index}.value`}>Value</Label>
                  <Input
                    {...register(`impactMetrics.${index}.value`, { valueAsNumber: true })}
                    id={`impactMetrics.${index}.value`}
                    type="number"
                    min="0"
                    step="0.01"
                  />
                  {errors.impactMetrics?.[index]?.value && (
                    <p className="text-sm text-destructive">{(errors.impactMetrics[index]?.value as FieldError)?.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`impactMetrics.${index}.type`}>Type</Label>
                  <Select
                    {...register(`impactMetrics.${index}.type`)}
                    defaultValue={field.type}
                  >
                    <SelectTrigger id={`impactMetrics.${index}.type`}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="economic">Economic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.impactMetrics?.[index]?.type && (
                    <p className="text-sm text-destructive">{(errors.impactMetrics[index]?.type as FieldError)?.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {fields.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">No metrics added yet. Click the button above to add one.</p>
          </div>
        )}
      </div>
    </div>
  )
}
