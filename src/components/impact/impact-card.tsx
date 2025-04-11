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
import type { ImpactProject } from "@/types/project"
import cn from "classnames"

interface ImpactCardProps {
  project: ImpactProject
  layout?: "grid" | "list"
}

export function ImpactCard({ project, layout = "grid" }: ImpactCardProps) {
  const progress = (project.funding.received / project.funding.target) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: layout === "grid" ? 1.02 : 1 }}
      className="group"
    >
      <Card className={cn(
        "overflow-hidden transition-colors hover:border-primary/50",
        layout === "list" && "flex"
      )}>
        <CardHeader className={cn(
          "border-b p-0",
          layout === "list" && "w-64 shrink-0"
        )}>
          {project.images[0] && (
            <div className={cn(
              "relative overflow-hidden",
              layout === "grid" ? "aspect-video" : "h-full"
            )}>
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          )}
        </CardHeader>
        <div className={cn(
          "flex flex-col",
          layout === "list" && "w-full"
        )}>
          <CardContent className={cn(
            "grid gap-4 p-6",
            layout === "list" && "flex-1"
          )}>
            <div className="flex items-center justify-between">
              <Badge
                variant={project.status === "verified" ? "default" : project.status === "pending" ? "secondary" : "destructive"}
                className="px-2 py-1"
              >
                {project.status}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {project.location.name}
              </div>
            </div>
            <div>
              <Link
                href={`/impact/${project.id}`}
                className="font-semibold hover:underline"
              >
                {project.title}
              </Link>
              <p className={cn(
                "mt-2 text-sm text-muted-foreground",
                layout === "grid" ? "line-clamp-2" : "line-clamp-3"
              )}>
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={project.creator.avatar} alt={project.creator.name} />
                <AvatarFallback>{project.creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium">{project.creator.name}</p>
                <p className="text-xs text-muted-foreground">
                  Created {formatDate(project.createdAt)}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Funding Progress</span>
                <span className="font-medium">
                  {formatCurrency(project.funding.received)} / {formatCurrency(project.funding.target)}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
          <CardFooter className={cn(
            "p-6 pt-0",
            layout === "list" && "border-t"
          )}>
            <Button asChild className={cn(
              layout === "grid" && "w-full"
            )}>
              <Link href={`/impact/${project.id}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
}
