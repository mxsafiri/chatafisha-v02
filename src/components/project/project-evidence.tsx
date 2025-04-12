"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import type { ProjectSubmission } from "@/types/project"

interface ProjectEvidenceProps {
  evidence: ProjectSubmission["evidence"]
}

export function ProjectEvidence({ evidence }: ProjectEvidenceProps) {
  if (!evidence.length) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Evidence</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {evidence.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{item.description}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.type === "image" && (
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={item.url}
                    alt={item.description}
                    width={400}
                    height={300}
                    className="aspect-video object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {item.location.name}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
