"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/layouts/site-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Overview } from "@/components/dashboard/overview"
import { ProjectList } from "@/components/dashboard/project-list"
import { VerificationQueue } from "@/components/dashboard/verification-queue"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

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
            <Overview />
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <ProjectList />
          </TabsContent>
          <TabsContent value="verifications" className="space-y-4">
            <VerificationQueue />
          </TabsContent>
          <TabsContent value="activity" className="space-y-4">
            <ActivityFeed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
