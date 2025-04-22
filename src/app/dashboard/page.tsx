"use client"

import { useState } from "react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/layouts/site-header"
import { SubmitterDashboard } from "@/components/profiles/submitter/submitter-dashboard"
import { VerifierDashboard } from "@/components/profiles/verifier/verifier-dashboard"
import { FunderDashboard } from "@/components/profiles/funder/funder-dashboard"
import { AdminDashboard } from "@/components/profiles/admin/admin-dashboard"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ErrorBoundary } from "react-error-boundary"

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

function ErrorFallback() {
  return (
    <div className="p-4 border border-red-300 rounded-md bg-red-50 text-red-800">
      <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
      <p>There was an error loading the dashboard. Please try refreshing the page.</p>
    </div>
  )
}

// Define user types for the dashboard
type UserType = "submitter" | "verifier" | "funder" | "admin"

const userProfiles = [
  {
    value: "submitter",
    label: "Project Owner",
    description: "Create and manage impact projects"
  },
  {
    value: "verifier",
    label: "Verifier",
    description: "Verify impact claims and project data"
  },
  {
    value: "funder",
    label: "Funder",
    description: "Browse and fund impact projects"
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage platform and users"
  },
]

// Dashboard components for each user type
function DashboardContent({ userType }: { userType: UserType }) {
  switch (userType) {
    case "submitter":
      return <SubmitterDashboard />
    case "verifier":
      return <VerifierDashboard />
    case "admin":
      return <AdminDashboard />
    case "funder":
      return <FunderDashboard />
    default:
      return <SubmitterDashboard />
  }
}

export default function DashboardPage() {
  // Use local state for profile selection
  const [userType, setUserType] = useState<UserType>("submitter")
  
  // Get the current profile label
  const currentProfile = userProfiles.find(profile => profile.value === userType)
  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="text-sm text-muted-foreground">
                Testing Mode: Switch User Profile
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-between">
                    {currentProfile?.label || "Select profile"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {userProfiles.map((profile) => (
                    <DropdownMenuItem
                      key={profile.value}
                      onClick={() => setUserType(profile.value as UserType)}
                    >
                      <div className="flex flex-col">
                        <span>{profile.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {profile.description}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            Current Profile: <span className="font-medium">{currentProfile?.label}</span>
          </div>
          
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingState />}>
              <DashboardContent userType={userType} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
