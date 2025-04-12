"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { SiteHeader } from "@/components/layouts/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImpactMetricField } from "@/components/forms/impact-metric-field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { mockSDGGoals as sdgGoals } from "@/lib/data/mock"
import type { SDGGoal, ProjectSubmission, ImpactMetric } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["waste-management", "environmental", "social", "economic"]),
  category: z.string().min(1, "Category is required"),
  projectType: z.string().min(1, "Project type is required"),
  startDate: z.string(),
  endDate: z.string().optional(),
  isRecurring: z.boolean(),
  recurringInterval: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]).optional(),
  location: z.object({
    name: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    })
  }),
  impactMetrics: z.array(z.object({
    id: z.string(),
    name: z.string(),
    unit: z.string(),
    value: z.number(),
    type: z.enum(["environmental", "social", "economic", "other"]).optional()
  })),
  sdgGoals: z.array(z.number()),
  funding: z.object({
    amount: z.number(),
    currency: z.string(),
    type: z.string()
  }),
  evidence: z.array(z.object({
    id: z.string(),
    type: z.enum(["image", "video", "document"]),
    description: z.string(),
    url: z.string(),
    timestamp: z.string(),
    location: z.object({
      name: z.string(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number()
      })
    }),
    fileType: z.string(),
    fileSize: z.number(),
    fileName: z.string()
  })),
  status: z.enum(["draft", "submitted", "in-review", "approved", "rejected"]).default("draft"),
  submitter: z.object({
    id: z.string(),
    name: z.string(),
    organization: z.string(),
    avatar: z.string().optional(),
    contact: z.object({
      email: z.string().email(),
      phone: z.string().optional(),
      whatsapp: z.string().optional()
    }),
    region: z.string(),
    ward: z.string()
  })
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

const defaultValues: Partial<ProjectFormValues> = {
  type: "waste-management",
  category: "",
  projectType: "",
  startDate: new Date().toISOString().split("T")[0],
  isRecurring: false,
  location: {
    name: "",
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  impactMetrics: [],
  sdgGoals: [],
  funding: {
    amount: 0,
    currency: "USD",
    type: "grant"
  },
  evidence: [],
  status: "draft",
  submitter: {
    id: "",
    name: "",
    organization: "",
    contact: {
      email: ""
    },
    region: "",
    ward: ""
  }
}

export default function SubmitProject() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues
  })

  async function onSubmit(data: ProjectFormValues) {
    try {
      setIsSubmitting(true)
      
      // Transform form data to match ProjectSubmission type
      const submission: ProjectSubmission = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: data.evidence.filter(e => e.type === "image").map(e => e.url)
      }

      // TODO: Submit to API
      console.log("Submitting project:", submission)

      toast({
        title: "Project submitted successfully",
        description: "Your project has been submitted for review."
      })

      router.push("/impact-explorer")
    } catch (error) {
      console.error("Error submitting project:", error)
      toast({
        title: "Error submitting project",
        description: "There was an error submitting your project. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container py-6 lg:py-10">
        <div className="flex flex-col gap-8 pb-10">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight">Submit Project</h1>
              <p className="text-lg text-muted-foreground">
                Share your impact project with the community
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="waste-management">
                          Waste Management
                        </SelectItem>
                        <SelectItem value="environmental">
                          Environmental
                        </SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="economic">Economic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isRecurring"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Recurring Project</FormLabel>
                      <FormDescription>
                        Check if this is a recurring project
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("isRecurring") && (
                <FormField
                  control={form.control}
                  name="recurringInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recurring Interval</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interval" />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="impactMetrics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impact Metrics</FormLabel>
                    <FormControl>
                      <ImpactMetricField
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sdgGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SDG Goals</FormLabel>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {sdgGoals.map((goal: SDGGoal) => (
                        <div
                          key={goal.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={field.value?.includes(goal.id)}
                            onCheckedChange={(checked) => {
                              const value = field.value || []
                              if (checked) {
                                field.onChange([...value, goal.id])
                              } else {
                                field.onChange(
                                  value.filter((id) => id !== goal.id)
                                )
                              }
                            }}
                          />
                          <Label>{goal.name}</Label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit Project
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  )
}
