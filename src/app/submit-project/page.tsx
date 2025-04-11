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
import { sdgGoals } from "@/lib/data/mock"
import type { SDGGoal } from "@/types"

const projectFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  location: z.object({
    name: z.string().min(3, "Location name is required"),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    })
  }),
  impactType: z.array(z.string()).min(1, "Select at least one impact type"),
  sdgGoals: z.array(z.number()).min(1, "Select at least one SDG goal"),
  fundingTarget: z.number().min(100, "Funding target must be at least $100"),
  impactMetrics: z.array(z.object({
    metricId: z.string(),
    value: z.number(),
    unit: z.string(),
    timestamp: z.string(),
    evidence: z.array(z.string()).optional()
  })).min(1, "At least one impact metric is required"),
  evidence: z.array(z.object({
    file: z.string(),
    type: z.enum(["image", "video", "document"]),
    caption: z.string().optional(),
    metadata: z.object({
      timestamp: z.string(),
      location: z.object({
        lat: z.number(),
        lng: z.number()
      }).optional()
    })
  })).min(1, "At least one piece of evidence is required"),
  tags: z.array(z.string()).min(1, "Add at least one tag")
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

const defaultValues: Partial<ProjectFormValues> = {
  impactType: [],
  sdgGoals: [],
  location: {
    name: "",
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  impactMetrics: [],
  evidence: [],
  tags: []
}

export default function SubmitProject() {
  const router = useRouter()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProjectFormValues) {
    try {
      setIsUploading(true)
      // TODO: Submit to API
      console.log(data)
      toast({
        title: "Project submitted",
        description: "Your project has been submitted for verification.",
      })
      router.push("/impact-explorer")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 lg:py-10">
        <div className="flex flex-col space-y-8">
          <div>
            <Link
              href="/impact-explorer"
              className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to Impact Explorer
            </Link>
            <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight">
              Submit Impact Project
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Share your environmental impact project for verification and funding.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto w-full max-w-2xl space-y-8"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project title" {...field} />
                        </FormControl>
                        <FormDescription>
                          Give your project a clear and descriptive title.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project and its impact"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Explain what your project does and how it helps the environment.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel>Location Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Kibera, Nairobi" 
                              value={field.value.name}
                              onChange={e => 
                                field.onChange({ 
                                  ...field.value, 
                                  name: e.target.value 
                                })
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the primary location where the project will take place.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                        <div className="grid grid-cols-2 gap-4">
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="any"
                                placeholder="Latitude"
                                value={field.value.coordinates.lat}
                                onChange={e => 
                                  field.onChange({
                                    ...field.value,
                                    coordinates: {
                                      ...field.value.coordinates,
                                      lat: parseFloat(e.target.value)
                                    }
                                  })
                                }
                              />
                            </FormControl>
                          </FormItem>
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                step="any"
                                placeholder="Longitude"
                                value={field.value.coordinates.lng}
                                onChange={e => 
                                  field.onChange({
                                    ...field.value,
                                    coordinates: {
                                      ...field.value.coordinates,
                                      lng: parseFloat(e.target.value)
                                    }
                                  })
                                }
                              />
                            </FormControl>
                          </FormItem>
                        </div>
                      </div>
                    )}
                  />

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
                        <FormDescription>
                          Add metrics to measure your project&apos;s impact.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label htmlFor="evidence">Project Evidence</Label>
                    <div className="mt-2">
                      <div className="flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
                            >
                              <span>Upload files</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*,video/*,.pdf,.doc,.docx"
                                multiple
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || [])
                                  const evidence = files.map((file) => ({
                                    file: URL.createObjectURL(file),
                                    type: file.type.startsWith("image/")
                                      ? "image"
                                      : file.type.startsWith("video/")
                                      ? "video"
                                      : "document",
                                    metadata: {
                                      timestamp: new Date().toISOString(),
                                    },
                                  }))
                                  form.setValue("evidence", evidence)
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-muted-foreground">
                            Images, videos, or documents up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Submit Project"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
