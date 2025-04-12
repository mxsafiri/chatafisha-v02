"use client"

import { notFound } from "next/navigation"
import { mockProjects } from "@/lib/data/mock"
import { ProjectDetails } from "@/components/project/project-details"
import { ProjectEvidence } from "@/components/project/project-evidence"
import { ProjectMetrics } from "@/components/project/project-metrics"
import { ProjectVerification } from "@/components/project/project-verification"

interface ImpactProjectPageProps {
  params: {
    id: string
  }
}

export default function ImpactProjectPage({ params }: ImpactProjectPageProps) {
  const project = mockProjects.find((p) => p.id === params.id)

  if (!project) {
    return notFound()
  }

  return (
    <div className="container py-8 space-y-8">
      <ProjectDetails project={project} />
      <ProjectMetrics metrics={project.impactMetrics} />
      <ProjectEvidence evidence={project.evidence} />
      <ProjectVerification project={project} />
    </div>
  )
}
