"use client"

import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { mockUsers } from "@/lib/data/mock"
import { ProjectList } from "@/components/dashboard/project-list"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileOverview } from "@/components/profile/profile-overview"
import { ImpactMetrics } from "@/components/profile/impact-metrics"

function LoadingState() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[200px]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
      </div>
    </div>
  )
}

interface ProfilePageProps {
  params: {
    id: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = mockUsers.find(u => u.id === params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="container flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<LoadingState />}>
            <ProfileOverview userId={params.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <Suspense fallback={<LoadingState />}>
            <ProjectList userId={params.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="impact" className="space-y-4">
          <Suspense fallback={<LoadingState />}>
            <ImpactMetrics userId={params.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardContent>
              <p>Settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
