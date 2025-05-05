import type { UserRole } from "@/types"

export type NavItem = {
  title: string
  href: string
  roles?: UserRole[]
  description?: string
  isExternal?: boolean
  icon?: string
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
  submitter: [
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
  funder: [
    {
      title: "Funding Dashboard",
      href: "/dashboard",
      description: "Manage your funding portfolio",
    },
    {
      title: "Funding Opportunities",
      href: "/fund",
      description: "Discover projects to fund",
    },
    {
      title: "My Investments",
      href: "/dashboard?tab=investments",
      description: "Track your funded projects",
    },
    {
      title: "Impact Portfolio",
      href: "/dashboard?tab=impact",
      description: "View your funding impact",
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

// Function to get navigation items based on user role
export function getNavItemsByRole(role: UserRole): NavItem[] {
  // Admin users have access to all navigation items
  if (role === "admin") {
    return roleNavItems.admin
  }
  
  return roleNavItems[role] || roleNavItems.user
}

// Get the appropriate redirect path after login based on user role
export function getRedirectPathByRole(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin"
    case "verifier":
      return "/verify"
    case "funder":
      return "/fund"
    case "submitter":
      return "/dashboard"
    default:
      return "/dashboard"
  }
}

// Get protected routes that require specific roles
export const protectedRoutes = {
  admin: ["/admin", "/admin/:path*"],
  verifier: ["/verify", "/verify/:path*"],
  funder: ["/fund", "/fund/:path*"],
  submitter: ["/submit-project", "/submit-project/:path*"],
  authenticated: ["/dashboard", "/profile", "/profile/:path*"]
}

// Check if a route is protected and requires authentication
export function isProtectedRoute(pathname: string): boolean {
  const allProtectedPaths = [
    ...protectedRoutes.admin,
    ...protectedRoutes.verifier,
    ...protectedRoutes.funder,
    ...protectedRoutes.submitter,
    ...protectedRoutes.authenticated
  ]
  
  return allProtectedPaths.some(route => {
    // Convert route pattern to regex
    const pattern = route.replace(/\/:path\*/, "(/.*)?").replace(/\//g, "\\/")
    const regex = new RegExp(`^${pattern}$`)
    return regex.test(pathname)
  })
}

// Check if a route requires a specific role
export function requiresRole(pathname: string, role: UserRole): boolean {
  // Admin can access all routes
  if (role === "admin") return true
  
  // Check role-specific routes
  const roleRoutes = protectedRoutes[role as keyof typeof protectedRoutes] || []
  
  return roleRoutes.some(route => {
    // Convert route pattern to regex
    const pattern = route.replace(/\/:path\*/, "(/.*)?").replace(/\//g, "\\/")
    const regex = new RegExp(`^${pattern}$`)
    return regex.test(pathname)
  })
}

// Get role badge color
export function getRoleBadgeColor(role: UserRole): string {
  switch (role) {
    case "admin":
      return "rose"
    case "verifier":
      return "blue"
    case "funder":
      return "amber"
    case "submitter":
      return "emerald"
    default:
      return "default"
  }
}
