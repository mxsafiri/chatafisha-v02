"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { mockProjects } from "@/lib/data/mock"

export function VerificationQueue() {
  const [filter, setFilter] = useState<"pending" | "reviewed" | "all">("pending")
  const verificationRequests = mockProjects
    .filter(p => p.status === "pending")
    .slice(0, 3) // Simulating pending verification requests

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          onClick={() => setFilter("pending")}
        >
          Pending
        </Button>
        <Button
          variant={filter === "reviewed" ? "default" : "outline"}
          onClick={() => setFilter("reviewed")}
        >
          Reviewed
        </Button>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All Requests
        </Button>
      </div>

      <div className="grid gap-4">
        {verificationRequests.map((request) => (
          <Card key={request.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{request.title}</h3>
                  <Badge>Verification Needed</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {request.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {request.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Submitted {formatDate(request.createdAt)}
                  </div>
                </div>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/impact/${request.id}`}>
                  Review Request
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Button variant="default">Verify</Button>
                <Button variant="outline">Request Changes</Button>
                <Button variant="outline" className="text-destructive">
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
