"use client"

import Link from "next/link"
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
import { mockUsers } from "@/lib/data/mock"
import { getNavItemsByRole } from "@/lib/navigation"
import type { UserRole } from "@/types"
import { 
  User, 
  Settings, 
  LogOut, 
  ClipboardList, 
  CheckSquare, 
  BarChartHorizontal,
  PlusCircle,
  Users
} from "lucide-react"

// For demo purposes, we'll use the first community user
// In a real app, this would come from an auth context
const user = {
  ...mockUsers[0],
  role: "verifier" as UserRole // Explicitly type the role
}

export function UserNav() {
  // Get navigation items based on user role
  const roleNavItems = getNavItemsByRole(user.role)
  
  // Determine if user is a project submitter
  const isSubmitter = true // This would be determined by actual user data
  
  // Helper function to render the appropriate icon based on role
  const getRoleIcon = () => {
    switch (user.role) {
      case "verifier":
        return <CheckSquare className="mr-2 h-4 w-4" />
      case "admin":
        return <Users className="mr-2 h-4 w-4" />
      case "user":
        return <ClipboardList className="mr-2 h-4 w-4" />
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
      case "user":
        return "My Tools"
      default:
        return "My Tools"
    }
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs leading-none text-primary mt-1">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              {isSubmitter && user.role !== "admin" && " • Project Submitter"}
            </p>
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
        {(isSubmitter || user.role === "admin") && (
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
        <DropdownMenuItem className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
