"use client"

import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { projectTypeMetricFields } from "@/lib/config/project-metrics"
import type { ProjectSubmissionFormData } from "@/lib/validations/project"
import type { ProjectType } from "@/types/project"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

export function ImpactMetricsStep() {
  const { control, watch } = useFormContext<ProjectSubmissionFormData>()
  const projectType = watch("projectType") as ProjectType
  const metricFields = projectTypeMetricFields[projectType]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Base Metrics</h3>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={control}
            name="metrics.base.peopleImpacted"
            render={({ field }) => (
              <FormItem>
                <FormLabel>People Impacted</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Enter number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Total number of people benefiting from this project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="metrics.base.wasteCollected"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waste Collected (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Enter amount"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Total amount of waste collected in kilograms
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="metrics.base.treesPlanted"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trees Planted</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Enter number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Number of trees planted during this project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Project-Specific Metrics</h3>
        <div className="grid grid-cols-2 gap-6">
          {metricFields.map((field) => (
            <FormField
              key={field.id}
              control={control}
              name={`metrics.specific.${field.id}`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <span>{field.label}</span>
                    {field.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{field.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </FormLabel>
                  <FormControl>
                    {field.type === "select" ? (
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value as string}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`Select ${field.label.toLowerCase()}`}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              <span className="capitalize">
                                {option.replace(/-/g, " ")}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        {...formField}
                        onChange={(e) =>
                          field.type === "number"
                            ? formField.onChange(parseInt(e.target.value))
                            : formField.onChange(e.target.value)
                        }
                      />
                    )}
                  </FormControl>
                  {field.unit && (
                    <FormDescription>Measured in {field.unit}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
