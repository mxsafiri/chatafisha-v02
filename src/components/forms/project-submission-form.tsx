"use client"

import { useFormContext } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import type { ProjectSubmissionFormData } from "@/lib/validations/project"

import { ProjectFormProvider, useProjectForm } from "./project-form-provider"
import { ProjectFormNav } from "./project-form-nav"
import { BasicInfoStep } from "./steps/basic-info-step"
import { ImpactMetricsStep } from "./steps/impact-metrics-step"
import { EvidenceUploadStep } from "./steps/evidence-upload-step"
import { PreviewStep } from "./steps/preview-step"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function ProjectSubmissionFormInner() {
  const { handleSubmit } = useFormContext<ProjectSubmissionFormData>()
  const { step } = useProjectForm()
  const { toast } = useToast()

  const onSubmit = async (data: ProjectSubmissionFormData) => {
    try {
      // TODO: Implement form submission
      console.log("Form data:", data)

      toast({
        title: "Project submitted successfully!",
        description: "Your project is now pending review.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error submitting project",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-6">
        <ProjectFormNav />
        <Separator className="my-6" />
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && <BasicInfoStep />}
            {step === 2 && <ImpactMetricsStep />}
            {step === 3 && <EvidenceUploadStep />}
            {step === 4 && <PreviewStep />}
          </motion.div>
        </AnimatePresence>
      </Card>
    </form>
  )
}

export function ProjectSubmissionForm() {
  return (
    <ProjectFormProvider>
      <ProjectSubmissionFormInner />
    </ProjectFormProvider>
  )
}
