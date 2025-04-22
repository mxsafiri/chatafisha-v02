import type { UserRole } from "@/types"

export type NavItem = {
  title: string
  href: string
  roles?: UserRole[]
  description?: string
  isExternal?: boolean
}

// Main navigation items shown in the top navbar
export const mainNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Impact Explorer",
    href: "/impact-explorer",
  },
  {
    title: "About",
    href: "/about",
  },
]

// Role-specific navigation items
export const roleNavItems: Record<UserRole, NavItem[]> = {
  user: [
    {
      title: "My Dashboard",
      href: "/dashboard",
      description: "View your impact and funded projects",
    },
    {
      title: "My Impact",
      href: "/dashboard?tab=impact",
      description: "Track your environmental and social impact",
    },
    {
      title: "Funded Projects",
      href: "/dashboard?tab=funded",
      description: "Manage projects you've funded",
    },
  ],
  verifier: [
    {
      title: "Verification Dashboard",
      href: "/dashboard",
      description: "Manage verification tasks and metrics",
    },
    {
      title: "Verification Queue",
      href: "/verify",
      description: "Review pending verification requests",
    },
    {
      title: "Verification History",
      href: "/dashboard?tab=history",
      description: "View your verification history",
    },
    {
      title: "Impact Metrics",
      href: "/dashboard?tab=metrics",
      description: "Track your verification impact",
    },
  ],
  admin: [
    {
      title: "Admin Dashboard",
      href: "/admin",
      description: "Platform management and oversight",
    },
    {
      title: "User Management",
      href: "/admin/users",
      description: "Manage users and roles",
    },
    {
      title: "Project Moderation",
      href: "/admin/projects",
      description: "Review and moderate projects",
    },
    {
      title: "System Settings",
      href: "/admin/settings",
      description: "Configure platform settings",
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      description: "View platform analytics",
    },
  ],
}

// Additional navigation items for the submitter role
export const submitterNavItems: NavItem[] = [
  {
    title: "Project Dashboard",
    href: "/dashboard",
    description: "Manage your projects and submissions",
  },
  {
    title: "My Projects",
    href: "/dashboard?tab=projects",
    description: "View and manage your submitted projects",
  },
  {
    title: "Submit New Project",
    href: "/submit-project",
    description: "Create a new impact project",
  },
  {
    title: "Verification Status",
    href: "/dashboard?tab=verification",
    description: "Track verification status of your projects",
  },
]

// Function to get navigation items based on user role
export function getNavItemsByRole(role: UserRole): NavItem[] {
  if (role === "user" && isProjectSubmitter()) {
    // If the user is also a project submitter
    return [...roleNavItems[role], ...submitterNavItems]
  }
  
  return roleNavItems[role] || []
}

// Helper function to determine if a user is a project submitter
// This would be replaced with actual logic based on your user data
function isProjectSubmitter(): boolean {
  // For now, we'll return true for demo purposes
  // In a real app, this would check if the user has submitted any projects
  return true
}
