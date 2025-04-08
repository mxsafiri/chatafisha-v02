"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { formatDate, formatCurrency } from "@/lib/utils"
import type { ImpactProject } from "@/types"

interface ImpactCardProps {
  project: ImpactProject
}

export function ImpactCard({ project }: ImpactCardProps) {
  const fundingProgress = (project.funding.received / project.funding.target) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="overflow-hidden transition-colors hover:border-primary/50">
        <CardHeader className="border-b p-0">
          {project.media[0] && (
            <div className="aspect-video overflow-hidden">
              <img
                src={project.media[0].url}
                alt={project.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <div className="flex items-center justify-between">
            <Badge
              variant={project.status === "verified" ? "default" : "secondary"}
              className="px-2 py-1"
            >
              {project.status === "verified" ? "✓ Verified" : "Pending Verification"}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {project.location}
            </div>
          </div>
          <div>
            <Link
              href={`/impact/${project.id}`}
              className="font-semibold hover:underline"
            >
              {project.title}
            </Link>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
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
            <Progress value={fundingProgress} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full">
            <Link href={`/impact/${project.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
