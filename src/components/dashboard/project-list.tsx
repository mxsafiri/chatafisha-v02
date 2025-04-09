"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { formatDate, formatCurrency } from "@/lib/utils"
import { mockProjects } from "@/lib/data/mock"

export function ProjectList() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const userProjects = mockProjects.slice(0, 5) // Simulating user's projects

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All Projects
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </div>

      <div className="grid gap-4">
        {userProjects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{project.title}</h3>
                  <Badge variant={project.status === "verified" ? "default" : "secondary"}>
                    {project.status === "verified" ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {project.impactMetrics.peopleImpacted} people impacted
                  </div>
                </div>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/impact/${project.id}`}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Funding Progress</span>
                <span>
                  {formatCurrency(project.funding.received)} / {formatCurrency(project.funding.target)}
                </span>
              </div>
              <Progress
                value={(project.funding.received / project.funding.target) * 100}
                className="h-2"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
