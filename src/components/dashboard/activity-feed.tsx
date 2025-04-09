"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import {
  Award,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  MessageCircle,
  Users,
  Leaf,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Activity = {
  id: number
  type: "verification" | "funding" | "impact" | "comment" | "project" | "milestone"
  title: string
  description: string
  timestamp: string
  projectId?: string
  projectTitle?: string
  icon: any
}

const activities: Activity[] = [
  {
    id: 1,
    type: "verification",
    title: "Project Verified",
    description: "Your project 'Ocean Cleanup Initiative' has been verified",
    timestamp: "2025-04-09T10:00:00Z",
    projectId: "1",
    projectTitle: "Ocean Cleanup Initiative",
    icon: Award,
  },
  {
    id: 2,
    type: "funding",
    title: "Funding Milestone",
    description: "Reached 75% of funding goal for 'Community Garden'",
    timestamp: "2025-04-09T09:30:00Z",
    projectId: "2",
    projectTitle: "Community Garden",
    icon: CircleDollarSign,
  },
  {
    id: 3,
    type: "impact",
    title: "Impact Achievement",
    description: "Successfully impacted 1000+ lives through waste management",
    timestamp: "2025-04-09T09:00:00Z",
    icon: Users,
  },
  {
    id: 4,
    type: "project",
    title: "New Project Created",
    description: "Started a new project 'Urban Tree Planting'",
    timestamp: "2025-04-09T08:30:00Z",
    projectId: "3",
    projectTitle: "Urban Tree Planting",
    icon: Leaf,
  },
  {
    id: 5,
    type: "milestone",
    title: "Project Milestone",
    description: "Completed phase 1 of 'Waste Collection Network'",
    timestamp: "2025-04-09T08:00:00Z",
    projectId: "4",
    projectTitle: "Waste Collection Network",
    icon: CheckCircle2,
  },
]

function getActivityColor(type: Activity["type"]) {
  switch (type) {
    case "verification":
      return "bg-green-500/10 text-green-500"
    case "funding":
      return "bg-blue-500/10 text-blue-500"
    case "impact":
      return "bg-purple-500/10 text-purple-500"
    case "comment":
      return "bg-orange-500/10 text-orange-500"
    case "project":
      return "bg-yellow-500/10 text-yellow-500"
    case "milestone":
      return "bg-cyan-500/10 text-cyan-500"
    default:
      return "bg-gray-500/10 text-gray-500"
  }
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Activity Feed</CardTitle>
        <Button variant="ghost" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className={cn(
                "mt-1 flex h-8 w-8 items-center justify-center rounded-full",
                getActivityColor(activity.type)
              )}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {activity.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <time className="text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString()}
                  </time>
                  {activity.projectId && (
                    <Button variant="link" size="sm" className="h-auto p-0" asChild>
                      <Link href={`/impact/${activity.projectId}`}>
                        View Project
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
