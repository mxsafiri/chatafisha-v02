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
  location: z.string().min(3, "Location is required"),
  impactType: z.array(z.string()).min(1, "Select at least one impact type"),
  sdgGoals: z.array(z.number()).min(1, "Select at least one SDG goal"),
  fundingTarget: z.number().min(100, "Funding target must be at least $100"),
  media: z.array(z.string()).optional(),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

const defaultValues: Partial<ProjectFormValues> = {
  impactType: [],
  sdgGoals: [],
  media: [],
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
      // TODO: Implement actual project submission
      console.log(data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Project Submitted",
        description: "Your project has been submitted for review.",
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
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Navigation */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/impact-explorer">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Link>
              </Button>
            </div>

            {/* Form Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Submit a New Project</h1>
              <p className="mt-2 text-muted-foreground">
                Share your impact project with the community and connect with potential funders.
              </p>
            </div>

            {/* Project Submission Form */}
            <div className="mx-auto max-w-2xl space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                          Choose a clear and descriptive title for your project.
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
                            placeholder="Describe your project, its goals, and expected impact..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide detailed information about your project and how it will create impact.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Kibera, Nairobi" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the primary location where the project will take place.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="impactType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Impact Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange([value])}
                            defaultValue={field.value?.[0]}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select impact type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="waste-management">Waste Management</SelectItem>
                              <SelectItem value="community-engagement">Community Engagement</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="marine-conservation">Marine Conservation</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Choose the primary type of impact your project will create.
                        </FormDescription>
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
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange([parseInt(value)])}
                            defaultValue={field.value?.[0]?.toString()}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select SDG goal" />
                            </SelectTrigger>
                            <SelectContent>
                              {sdgGoals.map((goal: SDGGoal) => (
                                <SelectItem key={goal.id} value={goal.id.toString()}>
                                  {goal.icon} {goal.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Select the UN Sustainable Development Goals your project addresses.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fundingTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Target (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter funding target"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Set a realistic funding goal for your project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label htmlFor="media">Project Media</Label>
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
                                accept="image/*"
                                multiple
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-muted-foreground">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Project"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
