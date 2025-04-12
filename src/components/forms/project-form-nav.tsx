"use client"

import { useProjectFormContext } from "./project-form-provider"
import { Button } from "@/components/ui/button"

const formSteps = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Project details and type",
  },
  {
    id: "impact-metrics",
    title: "Impact Metrics",
    description: "Measure your impact",
  },
  {
    id: "evidence",
    title: "Evidence Upload",
    description: "Document your work",
  },
  {
    id: "preview",
    title: "Preview & Submit",
    description: "Review and confirm",
  },
] as const

export function ProjectFormNav() {
  const { step, totalSteps, nextStep, prevStep } = useProjectFormContext()
  const isFirstStep = step === 1
  const isLastStep = step === totalSteps

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">
          {formSteps[step - 1].title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {formSteps[step - 1].description}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={prevStep}
          >
            Previous
          </Button>
        )}
        <Button
          onClick={nextStep}
          type={isLastStep ? "submit" : "button"}
        >
          {isLastStep ? "Submit Project" : "Next"}
        </Button>
      </div>
    </div>
  )
}
