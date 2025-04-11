"use client"

import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { format } from "date-fns"
import {
  MapPin,
  Calendar,
  Users,
  Scale,
  Tree,
  Clock,
  Tag,
  Building,
  Mail,
  Phone,
} from "lucide-react"
import { projectTypeIcons } from "@/lib/config/project-metrics"
import type { ProjectSubmissionFormData } from "@/lib/validations/project"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function PreviewStep() {
  const { watch } = useFormContext<ProjectSubmissionFormData>()
  const formData = watch()
  const ProjectTypeIcon = projectTypeIcons[formData.projectType]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <ProjectTypeIcon className="h-8 w-8" />
            <div>
              <CardTitle>{formData.title}</CardTitle>
              <CardDescription>
                {formData.projectType.replace(/-/g, " ")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">
              {formData.description}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Project Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {format(new Date(formData.startDate), "PPP")}
                </span>
              </div>
              {formData.isRecurring && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm capitalize">
                    {formData.recurringInterval} project
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Impact Metrics</h4>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {formData.metrics.base.peopleImpacted}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    People Impacted
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {formData.metrics.base.wasteCollected}kg
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Waste Collected
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Tree className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {formData.metrics.base.treesPlanted}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Trees Planted
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Evidence</h4>
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-3 gap-4">
                {formData.evidence.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-3">
                      {item.type === "image" ? (
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.url}
                            alt={item.description}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="text-sm">{item.fileName}</div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div>
            <h4 className="font-medium mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Submitter Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formData.submitter.organization}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formData.submitter.region}, {formData.submitter.ward}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formData.submitter.contact.email}
                  </span>
                </div>
                {formData.submitter.contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {formData.submitter.contact.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
