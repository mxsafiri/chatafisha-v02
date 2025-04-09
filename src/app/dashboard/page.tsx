"use client"

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/layouts/site-header"
import { Overview } from "@/components/dashboard/overview"
import { ProjectList } from "@/components/dashboard/project-list"
import { VerificationQueue } from "@/components/dashboard/verification-queue"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
      </div>
      <Skeleton className="h-[400px]" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Suspense fallback={<LoadingState />}>
              <Overview />
            </Suspense>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <Suspense fallback={<LoadingState />}>
              <ProjectList />
            </Suspense>
          </TabsContent>
          <TabsContent value="verifications" className="space-y-4">
            <Suspense fallback={<LoadingState />}>
              <VerificationQueue />
            </Suspense>
          </TabsContent>
          <TabsContent value="activity" className="space-y-4">
            <Suspense fallback={<LoadingState />}>
              <ActivityFeed />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
