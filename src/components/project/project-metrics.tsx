"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Users, Scale } from "lucide-react"
import type { ImpactMetric } from "@/types/project"

interface ProjectMetricsProps {
  metrics: ImpactMetric[]
}

const metricIcons = {
  environmental: Leaf,
  social: Users,
  economic: Scale,
  other: Scale,
} as const

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Impact Metrics</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metricIcons[metric.type || "other"]
          return (
            <Card key={metric.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className="h-4 w-4" />
                  {metric.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {metric.value.toLocaleString()} {metric.unit}
                </p>
                {metric.verifiedAt && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Verified on {new Date(metric.verifiedAt).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
