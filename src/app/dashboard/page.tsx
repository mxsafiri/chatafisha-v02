"use client"

import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/layouts/site-header"
import { RoleDashboard } from "@/components/dashboard/role-dashboard"
import { Button } from "@/components/ui/button"
import { ChevronDown, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ErrorBoundary } from "react-error-boundary"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { getUserData, logout } from "@/actions/auth"
import { useEffect, useState } from "react"
import type { UserRole } from "@/types"
import { Badge } from "@/components/ui/badge"

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

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{
    id: string;
    name?: string;
    email?: string;
    role: UserRole;
    address?: string;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true)
        const userData = await getUserData()
        
        if (userData) {
          setUser({
            id: userData.id,
            address: userData.address,
            role: userData.role as UserRole,
            // Use address as name if no name is provided
            name: userData.address.slice(0, 6) + '...' + userData.address.slice(-4),
          })
        } else {
          setUser(null)
          // Redirect to login if no user
          router.push("/login")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      await logout()
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      })
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      })
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="container flex-1 space-y-4 p-8 pt-6">
          <LoadingState />
        </div>
      </div>
    )
  }
  
  // DEMO MODE: Remove authentication check for demo purposes
  // if (!user) {
  //   // This should be handled by middleware, but just in case
  //   router.push("/login")
  //   return null
  // }
  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              {user && (
                <p className="text-muted-foreground">
                  Welcome back, {user.name}
                </p>
              )}
            </div>
            {user && (
              <div className="flex items-center gap-2">
                <Badge variant={user.role === "user" ? "default" : (user.role as any)}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </Button>
              </div>
            )}
          </div>
          
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingState />}>
              <RoleDashboard defaultTab="overview" />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
