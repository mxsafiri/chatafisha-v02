"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ProjectSubmission } from "@/types/project"

interface ProjectDetailsProps {
  project: ProjectSubmission
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/impact">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <Badge
          variant={
            project.status === "approved"
              ? "default"
              : project.status === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar>
              {project.submitter.avatar ? (
                <AvatarImage src={project.submitter.avatar} />
              ) : null}
              <AvatarFallback>
                {project.submitter.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Submitted by</p>
              <p className="font-medium">{project.submitter.name}</p>
              <p className="text-sm text-muted-foreground">{project.submitter.organization}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold">Description</h2>
            <p className="mt-2 text-muted-foreground">{project.description}</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-muted-foreground">{project.location.name}</p>
            </div>
            <div>
              <h3 className="font-medium">Project Type</h3>
              <p className="text-sm text-muted-foreground">{project.projectType}</p>
            </div>
            <div>
              <h3 className="font-medium">Start Date</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(project.startDate).toLocaleDateString()}
              </p>
            </div>
            {project.endDate && (
              <div>
                <h3 className="font-medium">End Date</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(project.endDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
