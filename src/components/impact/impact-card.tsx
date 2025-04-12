"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { formatDate, formatCurrency } from "@/lib/utils"
import type { ProjectSubmission } from "@/types/project"
import cn from "classnames"

interface ImpactCardProps {
  project: ProjectSubmission
  layout?: "grid" | "list"
}

export function ImpactCard({ project, layout = "grid" }: ImpactCardProps) {
  const { funding } = project
  const progress = (funding.received / funding.target) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/impact/${project.id}`}>
        <Card
          className={cn(
            "group transition-all duration-300 hover:shadow-lg",
            layout === "list" && "flex"
          )}
        >
          <div
            className={cn(
              "relative aspect-video overflow-hidden rounded-t-lg",
              layout === "list" && "w-1/3 rounded-l-lg rounded-t-none"
            )}
          >
            <Image
              src={project.images[0] || "/placeholder-project.jpg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge
              variant={
                project.status === "approved"
                  ? "default"
                  : project.status === "rejected"
                  ? "destructive"
                  : "secondary"
              }
              className="absolute right-2 top-2"
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>

          <div className={cn(layout === "list" && "flex-1")}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
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
                <span className="text-sm text-muted-foreground">
                  {project.submitter.organization}
                </span>
              </div>
              <h3 className="line-clamp-2 text-lg font-semibold">
                {project.title}
              </h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {project.description}
              </p>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {project.location.name}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Funding Progress</span>
                  <span className="font-medium">
                    {formatCurrency(funding.received, funding.currency)} /{" "}
                    {formatCurrency(funding.target, funding.currency)}
                  </span>
                </div>
                <Progress value={progress} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.impactMetrics.slice(0, 2).map((metric) => (
                  <Badge key={metric.id} variant="outline">
                    {metric.value} {metric.unit}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter>
              <Button variant="ghost" className="ml-auto gap-2">
                View Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
