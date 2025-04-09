"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { mockUsers } from "@/lib/data/mock"
import { notFound } from "next/navigation"

interface ImpactMetricsProps {
  userId: string
}

export function ImpactMetrics({ userId }: ImpactMetricsProps) {
  const user = mockUsers.find(u => u.id === userId)

  if (!user) {
    notFound()
  }

  const impactData = [
    {
      name: "People Impacted",
      value: user.metrics.peopleImpacted,
    },
    {
      name: "Waste Collected (kg)",
      value: user.metrics.wasteCollected,
    },
    {
      name: "Trees Planted",
      value: user.metrics.treesPlanted,
    },
    {
      name: "Projects Verified",
      value: user.metrics.projectsVerified,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Impact Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
