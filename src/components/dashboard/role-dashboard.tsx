"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/actions/auth";
import { UserRole } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart3, 
  CheckSquare, 
  ClipboardList, 
  CreditCard, 
  FileText, 
  Leaf, 
  PieChart, 
  Users2, 
  Recycle,
  Loader2
} from "lucide-react";

// Import role-specific dashboard components
import { AdminDashboard } from "@/components/profiles/admin/admin-dashboard";
import { FunderDashboard } from "@/components/profiles/funder/funder-dashboard";
import { SubmitterDashboard } from "@/components/profiles/submitter/submitter-dashboard";
import { VerifierDashboard } from "@/components/profiles/verifier/verifier-dashboard";

interface RoleDashboardProps {
  defaultTab?: string;
}

export function RoleDashboard({ defaultTab = "overview" }: RoleDashboardProps) {
  const router = useRouter();
  const [user, setUser] = useState<{
    id: string;
    role: UserRole;
    address?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserData();
        
        if (userData) {
          setUser({
            id: userData.id,
            role: userData.role as UserRole,
            address: userData.address,
          });
        } else {
          setUser(null);
          // Redirect to login if no user
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Please log in to view your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/login")}>
            Go to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="impact">Impact</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4 mt-4">
        {/* Render the appropriate role-specific dashboard */}
        {renderRoleDashboard(user.role)}
      </TabsContent>
      
      <TabsContent value="projects" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>
              {getRoleProjectsDescription(user.role)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectsList role={user.role} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="impact" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Impact Metrics</CardTitle>
            <CardDescription>
              Track your environmental and social impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImpactMetrics role={user.role} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="activity" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>
              Your recent actions and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityLog role={user.role} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// Helper functions for role-specific content
function getRoleSpecificTitle(role: UserRole): string {
  switch (role) {
    case "verifier":
      return "Verification Queue";
    case "admin":
      return "Platform Overview";
    case "submitter":
      return "Your Submissions";
    case "funder":
      return "Funding Opportunities";
    default:
      return "Dashboard Overview";
  }
}

function getRoleSpecificDescription(role: UserRole): string {
  switch (role) {
    case "verifier":
      return "Projects waiting for your verification";
    case "admin":
      return "Platform-wide statistics and management";
    case "submitter":
      return "Status of your submitted projects";
    case "funder":
      return "Projects seeking funding";
    default:
      return "Your personalized dashboard";
  }
}

function getRoleProjectsDescription(role: UserRole): string {
  switch (role) {
    case "verifier":
      return "Projects you've verified or are in your queue";
    case "admin":
      return "All projects on the platform";
    case "submitter":
      return "Projects you've submitted";
    case "funder":
      return "Projects you've funded or can fund";
    default:
      return "Projects you're involved with";
  }
}

// Function to render the appropriate role-specific dashboard
function renderRoleDashboard(role: UserRole) {
  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "verifier":
      return <VerifierDashboard />;
    case "submitter":
      return <SubmitterDashboard />;
    case "funder":
      return <FunderDashboard />;
    default:
      return (
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Welcome to Chatafisha Impact Portal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Complete your profile to get started</p>
            </div>
          </CardContent>
        </Card>
      );
  }
}

// Placeholder components for tabs
function ActivityFeed({ role }: { role: UserRole }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Activity feed will appear here</p>
      </CardContent>
    </Card>
  );
}

function ProjectsList({ role }: { role: UserRole }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Your projects and involvements</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Project list will appear here</p>
      </CardContent>
    </Card>
  );
}

function ImpactMetrics({ role }: { role: UserRole }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Impact Metrics</CardTitle>
        <CardDescription>Your environmental and social impact</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Impact metrics will appear here</p>
      </CardContent>
    </Card>
  );
}

function ActivityLog({ role }: { role: UserRole }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>Recent actions and events</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Activity log will appear here</p>
      </CardContent>
    </Card>
  );
}

// Stat card component
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: string;
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{trend}</p>
      </CardContent>
    </Card>
  );
}

// Loading skeleton
function DashboardSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="flex space-x-4 w-full">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="h-[300px] w-full col-span-4" />
        <Skeleton className="h-[300px] w-full col-span-3" />
      </div>
    </div>
  );
}
