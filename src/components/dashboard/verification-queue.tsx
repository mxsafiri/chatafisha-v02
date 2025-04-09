"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Calendar, MapPin, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { formatDate, formatCurrency } from "@/lib/utils"
import { mockProjects } from "@/lib/data/mock"
import { cn } from "@/lib/utils"

export function VerificationQueue() {
  const [filter, setFilter] = useState<"pending" | "reviewed" | "all">("pending")
  const [search, setSearch] = useState("")

  const verificationRequests = mockProjects
    .filter(p => filter === "all" ? true : p.status === filter)
    .filter(p => 
      search ? 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      : true
    )
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Queue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={filter === "reviewed" ? "default" : "outline"}
              onClick={() => setFilter("reviewed")}
              size="sm"
            >
              Reviewed
            </Button>
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
            >
              All
            </Button>
          </div>
          <div className="relative w-full sm:w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {verificationRequests.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No projects to verify</p>
            </div>
          ) : (
            verificationRequests.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {project.images[0] && (
                    <div className="relative h-32 w-full sm:h-auto sm:w-48">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-semibold">
                          <Link 
                            href={`/impact/${project.id}`}
                            className="hover:underline"
                          >
                            {project.title}
                          </Link>
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                          <span>•</span>
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(project.createdAt)}</span>
                        </div>
                      </div>
                      <Badge 
                        className={cn(
                          "mt-2 sm:mt-0",
                          project.status === "pending" && "bg-yellow-500/10 text-yellow-500",
                          project.status === "verified" && "bg-green-500/10 text-green-500",
                          project.status === "rejected" && "bg-red-500/10 text-red-500"
                        )}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Funding Progress</span>
                        <span>
                          {formatCurrency(project.funding.received)} / {formatCurrency(project.funding.target)}
                        </span>
                      </div>
                      <Progress 
                        value={(project.funding.received / project.funding.target) * 100}
                        className="mt-2"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/impact/${project.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm">Verify Now</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
