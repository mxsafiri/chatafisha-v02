"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getNavItemsByRole } from "@/lib/navigation"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import type { UserRole } from "@/types"
import { 
  User, 
  Settings, 
  LogOut, 
  ClipboardList, 
  CheckSquare, 
  BarChartHorizontal,
  PlusCircle,
  Users,
  Loader2
} from "lucide-react"
import ThirdwebConnectButton from "@/components/auth/thirdweb/connect-button"
import { getUserData, logout } from "@/actions/auth"

export function UserNav() {
  const router = useRouter()
  const [user, setUser] = useState<{
    id: string;
    name?: string;
    email?: string;
    role: UserRole;
    address?: string;
    avatar?: string;
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
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])
  
  // If loading or no user, show connect button
  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    )
  }
  
  if (!user) {
    return <ThirdwebConnectButton variant="outline" size="sm" />
  }

  // Get navigation items based on user role
  const roleNavItems = getNavItemsByRole(user.role)
  
  // Determine if user is a project submitter
  const isSubmitter = user.role === "submitter" || user.role === "admin"
  
  // Helper function to render the appropriate icon based on role
  const getRoleIcon = () => {
    switch (user.role) {
      case "verifier":
        return <CheckSquare className="mr-2 h-4 w-4" />
      case "admin":
        return <Users className="mr-2 h-4 w-4" />
      case "submitter":
        return <ClipboardList className="mr-2 h-4 w-4" />
      case "funder":
        return <BarChartHorizontal className="mr-2 h-4 w-4" />
      default:
        return <ClipboardList className="mr-2 h-4 w-4" />
    }
  }
  
  // Helper function to get the role menu title
  const getRoleMenuTitle = () => {
    switch (user.role) {
      case "verifier":
        return "Verification Tools"
      case "admin":
        return "Admin Tools"
      case "submitter":
        return "Submitter Tools"
      case "funder":
        return "Funding Tools"
      default:
        return "My Tools"
    }
  }

  // Get role-specific avatar ring color
  const getRoleRingColor = () => {
    switch (user.role) {
      case "verifier":
        return "ring-blue-500"
      case "admin":
        return "ring-rose-500"
      case "submitter":
        return "ring-emerald-500"
      case "funder":
        return "ring-amber-500"
      default:
        return "ring-primary"
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      })
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error logging out:", error)
      toast({
        title: "Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      })
    }
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className={`h-8 w-8 ring-2 ${getRoleRingColor()} ring-offset-1 ring-offset-background`}>
            <AvatarImage src={user.avatar} alt={user.name || user.address} />
            <AvatarFallback>{user.name?.slice(0, 2) || user.address?.slice(0, 2) || "UN"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || user.address}</p>
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            )}
            <div className="flex items-center gap-1 mt-1">
              <Badge variant={user.role === "user" ? "default" : (user.role as any)}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
              {user.role !== "admin" && isSubmitter && (
                <Badge variant="submitter" className="text-[10px] px-1.5 py-0">Submitter</Badge>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Common items for all users */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user.id}`} className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center">
              <BarChartHorizontal className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        {/* Role-specific navigation */}
        {roleNavItems.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span className="flex items-center">
                    {getRoleIcon()}
                    <span>{getRoleMenuTitle()}</span>
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {roleNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>
                          <span>{item.title}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </>
        )}
        
        {/* Project submission option */}
        {isSubmitter && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/submit-project" className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Submit New Project</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/profile/${user.id}?tab=settings`} className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
