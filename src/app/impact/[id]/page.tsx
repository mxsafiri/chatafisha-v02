"use client"

import { useParams } from "next/navigation"
import { mockProjects } from "@/lib/data/mock"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { notFound } from "next/navigation"
import { formatDate, formatCurrency } from "@/lib/utils"
import type { ImpactProject } from "@/types"

function ProjectNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Project Not Found</h1>
            <p className="mt-2 text-muted-foreground">The project you're looking for doesn't exist.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const project = mockProjects.find((p) => p.id === params.id)

  if (!project) {
    return ProjectNotFound()
  }

  const fundingProgress = (project.funding.received / project.funding.target) * 100

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "verified":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Project Images */}
        <div className="space-y-4">
          {project.images.map((image, i) => (
            <div
              key={i}
              className="relative aspect-video overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`${project.title} image ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant={getBadgeVariant(project.status)}>
              {project.status}
            </Badge>
            <span className="text-sm text-gray-500">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Creator Info */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={project.creator.avatar}
                  alt={project.creator.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{project.creator.name}</h3>
                <p className="text-sm text-gray-500">{project.location}</p>
              </div>
            </div>
          </Card>

          {/* Funding Progress */}
          <Card className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Funding Progress</h3>
            <Progress value={fundingProgress} className="mb-2" />
            <div className="flex justify-between text-sm">
              <span>
                Raised: ${project.funding.received.toLocaleString()}
              </span>
              <span>Goal: ${project.funding.target.toLocaleString()}</span>
            </div>
            <Button className="mt-4 w-full">Support Project</Button>
          </Card>

          {/* Impact Metrics */}
          <Card className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Impact Metrics</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {project.impactMetrics.peopleImpacted.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">People Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {project.impactMetrics.wasteCollected.toLocaleString()} kg
                </div>
                <div className="text-sm text-gray-500">Waste Collected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {project.impactMetrics.treesPlanted.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Trees Planted</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
