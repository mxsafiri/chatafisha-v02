"use client"

import { useState } from "react"
import Link from "next/link"
import { ProjectSubmission } from "@/types"
import { mockProjects } from "@/lib/data/mock"
import { ProjectCard } from "@/components/project/project-card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, MapPin, Search } from "lucide-react"
import { formatDate, formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface ProjectListProps {
  filter?: "all" | "active" | "completed"
  userId?: string
}

export function ProjectList({ filter = "all", userId }: ProjectListProps) {
  const [search, setSearch] = useState("")

  const userProjects = mockProjects
    .filter(p => !userId || p.submitter.id === userId)
    .filter(p => 
      filter === "all" ? true :
      filter === "active" ? p.status === "in-review" :
      p.status === "approved"
    )
    .filter(p => 
      search ? 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      : true
    )

  const totalProjects = userProjects.length
  const totalImpact = userProjects.reduce((acc, p) => {
    // Sum up all metric values
    const projectImpact = p.impactMetrics.reduce((sum, metric) => {
      if (metric.type === "social" && metric.name === "People Impacted") {
        return sum + metric.value
      }
      return sum
    }, 0)
    return acc + projectImpact
  }, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => filter === "all" ? null : filter === "active" ? null : null}
              size="sm"
            >
              All Projects
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              onClick={() => filter === "active" ? null : filter === "all" ? null : null}
              size="sm"
            >
              Active
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => filter === "completed" ? null : filter === "all" ? null : null}
              size="sm"
            >
              Completed
            </Button>
          </div>
          <div className="relative w-full sm:w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {userProjects.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No projects found</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {totalProjects} projects • {totalImpact.toLocaleString()} people impacted
        </div>
      </CardContent>
    </Card>
  )
}
