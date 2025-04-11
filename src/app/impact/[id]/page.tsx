"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { mockProjects } from "@/lib/data/mock"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Users, Trash2, Trees } from "lucide-react"
import Link from "next/link"
import type { ImpactProject } from "@/types/project"

const fallbackImage = "/images/placeholder.jpg" as const

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<ImpactProject | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchProject = async () => {
      setIsLoading(true)
      try {
        const foundProject = mockProjects.find((p) => p.id === params.id)
        if (foundProject) {
          setProject(foundProject)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-[200px]" />
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="aspect-video" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-[300px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    )
  }

  const projectImages = project.images.length > 0 ? project.images : [fallbackImage]

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center gap-4">
        <Link href="/impact">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <Badge
          variant={
            project.status === "verified"
              ? "default"
              : project.status === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={projectImages[0]}
              alt={project.title}
              width={800}
              height={450}
              className="aspect-video object-cover"
            />
          </div>
          {projectImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {projectImages.slice(1).map((image, i) => (
                <Image
                  key={i}
                  src={image}
                  alt={`${project.title} ${i + 2}`}
                  width={200}
                  height={150}
                  className="aspect-video rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={project.creator.avatar} />
              <AvatarFallback>
                {project.creator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Created by</p>
              <p className="font-medium">{project.creator.name}</p>
            </div>
          </div>

          <p className="text-muted-foreground">{project.description}</p>

          <div className="space-y-2">
            <p className="text-sm font-medium">Funding Progress</p>
            <Progress
              value={(project.funding.received / project.funding.target) * 100}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>${project.funding.received.toLocaleString()} raised</p>
              <p>${project.funding.target.toLocaleString()} goal</p>
            </div>
          </div>

          <Tabs defaultValue="impact" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="impact" className="flex-1">
                Impact
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex-1">
                Updates
              </TabsTrigger>
            </TabsList>
            <TabsContent value="impact">
              <div className="grid gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Users className="h-4 w-4" />
                      People Impacted
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {project.impactMetrics.peopleImpacted.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Trash2 className="h-4 w-4" />
                      Waste Collected
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {project.impactMetrics.wasteCollected.toLocaleString()} kg
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Trees className="h-4 w-4" />
                      Trees Planted
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {project.impactMetrics.treesPlanted.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="updates">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-sm text-muted-foreground">
                    No updates yet
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
