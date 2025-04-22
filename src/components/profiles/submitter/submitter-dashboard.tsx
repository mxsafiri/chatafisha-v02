"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Clock, CheckCircle, BarChart3 } from "lucide-react"
import Link from "next/link"
import { ProjectList } from "@/components/dashboard/project-list"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { VerificationStatusList } from "@/components/profiles/submitter/verification-status-list"
import { ImpactMetricsSummary } from "@/components/profiles/submitter/impact-metrics-summary"
import { submitterImpactSummary } from "@/lib/data/mock-submitter"

export function SubmitterDashboard() {
  const { 
    totalProjects, 
    verifiedProjects, 
    pendingProjects, 
    totalFunding 
  } = submitterImpactSummary

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Project Dashboard</h2>
        <Button asChild>
          <Link href="/submit-project" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Submit New Project</span>
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {verifiedProjects} verified projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingProjects}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting verification
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Projects</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedProjects}</div>
            <p className="text-xs text-muted-foreground">
              Successfully verified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFunding.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="verification">Verification Status</TabsTrigger>
          <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="space-y-4">
          <ProjectList userId="2" /> {/* Using ID from mock data */}
        </TabsContent>
        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
              <CardDescription>
                Track the verification status of your submitted projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VerificationStatusList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Impact Metrics</CardTitle>
              <CardDescription>
                Visualize the impact of your projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImpactMetricsSummary />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <ActivityFeed />
        </TabsContent>
      </Tabs>
    </div>
  )
}
