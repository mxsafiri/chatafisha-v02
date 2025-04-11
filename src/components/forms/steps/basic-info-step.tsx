"use client"

import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { projectTypeIcons } from "@/lib/config/project-metrics"
import type { ProjectSubmissionFormData } from "@/lib/validations/project"

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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BasicInfoStep() {
  const { control, watch } = useFormContext<ProjectSubmissionFormData>()
  const isRecurring = watch("isRecurring")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-2 gap-6"
    >
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Project Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter a descriptive title for your project" {...field} />
            </FormControl>
            <FormDescription>
              Choose a clear title that describes your impact project
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your project's goals, activities, and expected impact"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide details about what your project aims to achieve
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="projectType"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Project Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a project type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(projectTypeIcons).map(([type, Icon]) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="capitalize">
                        {type.replace(/-/g, " ")}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Choose the category that best fits your project
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={(date) =>
                    field.onChange(date?.toISOString() ?? "")
                  }
                  disabled={(date) =>
                    date > new Date() || date < new Date("2021-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              When did/will this project start?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="isRecurring"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Recurring Project</FormLabel>
              <FormDescription>
                Does this project happen on a regular basis?
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {isRecurring && (
        <FormField
          control={control}
          name="recurringInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recurring Interval</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How often does this project occur?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </motion.div>
  )
}
