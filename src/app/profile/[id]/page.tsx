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
    <div className="container mx-auto py-8">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="verifications">Verifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<LoadingState />}>
            <ProfileOverview user={user} />
          </Suspense>
        </TabsContent>
        <TabsContent value="projects">
          <Suspense fallback={<LoadingState />}>
            {/* TODO: Add ProjectList component */}
          </Suspense>
        </TabsContent>
        <TabsContent value="verifications">
          <Suspense fallback={<LoadingState />}>
            {/* TODO: Add VerificationList component */}
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
