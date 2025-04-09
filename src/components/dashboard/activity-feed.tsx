"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import {
  Award,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  MessageCircle,
  Users,
} from "lucide-react"

const activities = [
  {
    id: 1,
    type: "verification",
    title: "Project Verified",
    description: "Your project 'Ocean Cleanup Initiative' has been verified",
    timestamp: "2025-04-09T10:00:00Z",
    icon: Award,
  },
  {
    id: 2,
    type: "funding",
    title: "Funding Milestone",
    description: "Reached 75% of funding goal for 'Community Garden'",
    timestamp: "2025-04-09T09:30:00Z",
    icon: CircleDollarSign,
  },
  {
    id: 3,
    type: "impact",
    title: "Impact Update",
    description: "500 new people impacted by your projects this week",
    timestamp: "2025-04-09T08:45:00Z",
    icon: Users,
  },
  {
    id: 4,
    type: "comment",
    title: "New Comment",
    description: "Someone commented on your 'Waste Management' project",
    timestamp: "2025-04-09T08:00:00Z",
    icon: MessageCircle,
  },
  {
    id: 5,
    type: "submission",
    title: "Project Submitted",
    description: "Successfully submitted 'Renewable Energy Initiative'",
    timestamp: "2025-04-09T07:30:00Z",
    icon: FileText,
  },
] as const

const getActivityColor = (type: string) => {
  switch (type) {
    case "verification":
      return "bg-green-500"
    case "funding":
      return "bg-blue-500"
    case "impact":
      return "bg-purple-500"
    case "comment":
      return "bg-yellow-500"
    case "submission":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

export function ActivityFeed() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="relative pl-8">
                <div
                  className={`absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center ${getActivityColor(
                    activity.type
                  )}`}
                >
                  <Icon className="h-3 w-3 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{activity.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
