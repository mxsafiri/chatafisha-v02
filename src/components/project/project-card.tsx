import Link from "next/link"
import { ArrowRight, MapPin, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn, formatDate, formatCurrency } from "@/lib/utils"
import type { ProjectSubmission } from "@/types"

interface ProjectCardProps {
  project: ProjectSubmission
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Calculate people impacted
  const peopleImpacted = project.impactMetrics.reduce((sum, metric) => {
    if (metric.type === "social" && metric.name === "People Impacted") {
      return sum + metric.value
    }
    return sum
  }, 0)

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {project.images[0] && (
          <div className="relative h-32 w-full sm:h-auto sm:w-48">
            <img
              src={project.images[0]}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-semibold">
                <Link 
                  href={`/impact/${project.id}`}
                  className="hover:underline"
                >
                  {project.title}
                </Link>
              </h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{project.location.name}</span>
                <span>•</span>
                <Users className="h-4 w-4" />
                <span>{peopleImpacted.toLocaleString()} impacted</span>
                <span>•</span>
                <span>{formatDate(project.createdAt)}</span>
              </div>
            </div>
            <Badge 
              className={cn(
                "mt-2 sm:mt-0",
                project.status === "in-review" && "bg-yellow-500/10 text-yellow-500",
                project.status === "approved" && "bg-green-500/10 text-green-500",
                project.status === "rejected" && "bg-red-500/10 text-red-500"
              )}
            >
              {project.status}
            </Badge>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Funding Progress</span>
              <span>
                {formatCurrency(project.funding.received)} / {formatCurrency(project.funding.target)}
              </span>
            </div>
            <Progress 
              value={(project.funding.received / project.funding.target) * 100}
              className="mt-2"
            />
          </div>
          <div className="mt-4 flex items-center justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/impact/${project.id}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
