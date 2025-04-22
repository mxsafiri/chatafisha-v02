"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckSquare, Users, Scale, TreePine } from "lucide-react"
import Link from "next/link"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { VerificationQueue } from "@/components/dashboard/verification-queue"
import { VerifierStats } from "@/components/verify/verifier-stats"
import { mockVerifier } from "@/lib/data/mock-verifier"

export function VerifierDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Verification Dashboard</h2>
        <Button asChild>
          <Link href="/verify" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            <span>Verification Queue</span>
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Verified</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockVerifier.stats.totalVerifications}</div>
            <p className="text-xs text-muted-foreground">
              +8 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">People Impacted</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Through verified projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Collected</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500 kg</div>
            <p className="text-xs text-muted-foreground">
              Through verified projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trees Planted</CardTitle>
            <TreePine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350</div>
            <p className="text-xs text-muted-foreground">
              Through verified projects
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="queue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="queue">Verification Queue</TabsTrigger>
          <TabsTrigger value="history">Verification History</TabsTrigger>
          <TabsTrigger value="stats">Performance</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="queue" className="space-y-4">
          <VerificationQueue />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification History</CardTitle>
              <CardDescription>
                Review your past verifications and their outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You have verified {mockVerifier.stats.totalVerifications} projects to date.
                </p>
                {/* Verification history would go here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats" className="space-y-4">
          <VerifierStats verifier={mockVerifier} />
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <ActivityFeed />
        </TabsContent>
      </Tabs>
    </div>
  )
}
