"use client"

import { createContext, useContext, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSubmissionSchema } from "@/lib/validations/project"
import type { ProjectSubmissionFormData } from "@/lib/validations/project"

interface ProjectFormProviderProps {
  children: React.ReactNode
}

interface ProjectFormContextValue {
  step: number
  setStep: (step: number) => void
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
}

const ProjectFormContext = createContext<ProjectFormContextValue | null>(null)

export function useProjectForm() {
  const context = useContext(ProjectFormContext)
  if (!context) {
    throw new Error("useProjectForm must be used within a ProjectFormProvider")
  }
  return context
}

export function ProjectFormProvider({ children }: ProjectFormProviderProps) {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const methods = useForm<ProjectSubmissionFormData>({
    resolver: zodResolver(projectSubmissionSchema),
    defaultValues: {
      title: "",
      description: "",
      projectType: "waste-management",
      startDate: new Date().toISOString(),
      isRecurring: false,
      tags: [],
      evidence: [],
      location: {
        name: "",
        coordinates: { lat: 0, lng: 0 },
      },
      submitter: {
        name: "",
        organization: "",
        contact: {
          email: "",
        },
        region: "",
        ward: "",
      },
      metrics: {
        base: {
          peopleImpacted: 0,
          wasteCollected: 0,
          treesPlanted: 0,
        },
        specific: {},
      },
    },
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
      <FormProvider {...methods}>{children}</FormProvider>
    </ProjectFormContext.Provider>
  )
}
