"use client"

import { createContext, useContext, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { ProjectSubmission } from "@/types"

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
    type: z.enum(["grant", "donation", "investment"]),
    currency: z.string(),
    amount: z.number(),
    target: z.number(),
    received: z.number()
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
  })).default([]),
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

interface ProjectFormContextValue {
  step: number
  setStep: (step: number) => void
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
}

const ProjectFormContext = createContext<ProjectFormContextValue | undefined>(undefined)

export function useProjectFormContext() {
  const context = useContext(ProjectFormContext)
  if (!context) {
    throw new Error("useProjectFormContext must be used within a ProjectFormProvider")
  }
  return context
}

interface ProjectFormProviderProps {
  children: React.ReactNode
}

export function ProjectFormProvider({ children }: ProjectFormProviderProps) {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "waste-management",
      category: "",
      projectType: "",
      startDate: new Date().toISOString(),
      isRecurring: false,
      evidence: [],
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
        type: "grant",
        currency: "USD",
        amount: 0,
        target: 0,
        received: 0
      },
      status: "draft" as const,
      submitter: {
        id: "", // Will be filled from auth
        name: "",
        organization: "",
        contact: {
          email: "",
        },
        region: "",
        ward: ""
      }
    },
    mode: "onChange"
  })

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <ProjectFormContext.Provider
      value={{ step, setStep, totalSteps, nextStep, prevStep }}
    >
      <FormProvider {...form}>
        {children}
      </FormProvider>
    </ProjectFormContext.Provider>
  )
}
