"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, Users, Calendar, CheckCircle2, Clock, Loader2 } from "lucide-react"
import { SiteHeader } from "@/components/layouts/site-header"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockProjects } from "@/lib/data/mock"
import { formatDate, formatCurrency } from "@/lib/utils"
import type { ImpactProject } from "@/types"

function ProjectNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Project Not Found</h1>
            <p className="mt-2 text-muted-foreground">The project you're looking for doesn't exist.</p>
            <Button asChild className="mt-4">
              <Link href="/impact-explorer">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ProjectDetail() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const project = mockProjects.find(p => p.id === id) as ImpactProject | undefined

  if (!id) {
    return <LoadingState />
  }

  if (!project) {
    return <ProjectNotFound />
  }

  const fundingProgress = (project.funding.received / project.funding.target) * 100

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

            {/* Project Header */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {project.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={project.status === "verified" ? "default" : "secondary"}
                      className="px-2 py-1"
                    >
                      {project.status === "verified" ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Pending Verification
                        </span>
                      )}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground">{project.description}</p>

                <div className="flex items-center gap-4 border-t pt-4">
                  <Avatar>
                    <AvatarImage src={project.creator.avatar} alt={project.creator.name} />
                    <AvatarFallback>{project.creator.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">{project.creator.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Created {formatDate(project.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Media */}
              <div className="space-y-4 lg:sticky lg:top-8">
                {project.media[0] && (
                  <div className="overflow-hidden rounded-lg border">
                    <div className="relative aspect-video">
                      <Image
                        src={project.media[0].url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                )}

                {/* Funding Progress */}
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-semibold">Funding Progress</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {formatCurrency(project.funding.received)} / {formatCurrency(project.funding.target)}
                      </span>
                    </div>
                    <Progress value={fundingProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {fundingProgress.toFixed(1)}% of goal reached
                    </p>
                  </div>
                  <Button className="mt-4 w-full">Support This Project</Button>
                </div>

                {/* Impact Metrics */}
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-semibold">Impact Metrics</h3>
                  <div className="mt-4 grid gap-4">
                    {project.metrics.wastePlasticKg && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Plastic Waste Collected</span>
                        <span className="font-medium">{project.metrics.wastePlasticKg} kg</span>
                      </div>
                    )}
                    {project.metrics.peopleImpacted && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">People Impacted</span>
                        <span className="font-medium">{project.metrics.peopleImpacted}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Verification Details */}
                {project.verificationDetails?.verifier && (
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-semibold">Verification Details</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={project.verificationDetails.verifier.avatar}
                            alt={project.verificationDetails.verifier.name}
                          />
                          <AvatarFallback>
                            {project.verificationDetails.verifier.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium">
                            {project.verificationDetails.verifier.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Verified on {formatDate(project.verificationDetails.verifiedAt || '')}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {project.verificationDetails.comments}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Score:</span>
                          <span className="font-medium">
                            {project.verificationDetails.score}/5.0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
