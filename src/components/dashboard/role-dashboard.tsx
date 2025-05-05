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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Stats cards - different for each role */}
          {renderRoleStats(user.role)}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                {getRoleSpecificTitle(user.role)}
              </CardTitle>
              <CardDescription>
                {getRoleSpecificDescription(user.role)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {renderRoleSpecificContent(user.role)}
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed role={user.role} />
            </CardContent>
          </Card>
        </div>
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

// Placeholder components
function renderRoleStats(role: UserRole) {
  switch (role) {
    case "verifier":
      return (
        <>
          <StatCard 
            title="Pending Verifications" 
            value="12" 
            description="Awaiting your review"
            icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
            trend="+4 this week"
          />
          <StatCard 
            title="Completed" 
            value="48" 
            description="Projects verified"
            icon={<CheckSquare className="h-4 w-4 text-muted-foreground" />}
            trend="+7 this month"
          />
          <StatCard 
            title="Accuracy Rate" 
            value="97%" 
            description="Verification accuracy"
            icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
            trend="+2% improvement"
          />
          <StatCard 
            title="Impact Score" 
            value="89" 
            description="Your verification impact"
            icon={<Leaf className="h-4 w-4 text-muted-foreground" />}
            trend="+5 points"
          />
        </>
      );
    case "admin":
      return (
        <>
          <StatCard 
            title="Total Users" 
            value="1,284" 
            description="Platform users"
            icon={<Users2 className="h-4 w-4 text-muted-foreground" />}
            trend="+24 this week"
          />
          <StatCard 
            title="Projects" 
            value="342" 
            description="Active projects"
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            trend="+18 this month"
          />
          <StatCard 
            title="Verifications" 
            value="287" 
            description="Completed verifications"
            icon={<CheckSquare className="h-4 w-4 text-muted-foreground" />}
            trend="+32 this month"
          />
          <StatCard 
            title="Total Funding" 
            value="$1.2M" 
            description="Funds distributed"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            trend="+$120K this month"
          />
        </>
      );
    case "submitter":
      return (
        <>
          <StatCard 
            title="Your Projects" 
            value="8" 
            description="Total submissions"
            icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
            trend="+2 this month"
          />
          <StatCard 
            title="Verified" 
            value="5" 
            description="Approved projects"
            icon={<CheckSquare className="h-4 w-4 text-muted-foreground" />}
            trend="+1 this week"
          />
          <StatCard 
            title="Funding" 
            value="$24K" 
            description="Total received"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            trend="+$5K this month"
          />
          <StatCard 
            title="Impact Score" 
            value="76" 
            description="Your project impact"
            icon={<Leaf className="h-4 w-4 text-muted-foreground" />}
            trend="+12 points"
          />
        </>
      );
    case "funder":
      return (
        <>
          <StatCard 
            title="Funded Projects" 
            value="15" 
            description="Projects you support"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            trend="+3 this month"
          />
          <StatCard 
            title="Total Invested" 
            value="$86K" 
            description="Your contributions"
            icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
            trend="+$12K this month"
          />
          <StatCard 
            title="Impact Score" 
            value="92" 
            description="Your funding impact"
            icon={<Leaf className="h-4 w-4 text-muted-foreground" />}
            trend="+8 points"
          />
          <StatCard 
            title="Available" 
            value="$45K" 
            description="Funds available"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            trend="Ready to deploy"
          />
        </>
      );
    default:
      return (
        <>
          <StatCard 
            title="Projects" 
            value="0" 
            description="Your projects"
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            trend="Start creating!"
          />
          <StatCard 
            title="Verified" 
            value="0" 
            description="Verified projects"
            icon={<CheckSquare className="h-4 w-4 text-muted-foreground" />}
            trend="None yet"
          />
          <StatCard 
            title="Funding" 
            value="$0" 
            description="Total received"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            trend="Get started!"
          />
          <StatCard 
            title="Impact" 
            value="0" 
            description="Your impact score"
            icon={<Leaf className="h-4 w-4 text-muted-foreground" />}
            trend="Create a project!"
          />
        </>
      );
  }
}

function renderRoleSpecificContent(role: UserRole) {
  // Placeholder for role-specific content
  return (
    <div className="text-center py-8">
      <Badge variant={role === "user" ? "default" : (role as any)} className="mb-4">
        {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
      </Badge>
      <p className="text-muted-foreground">
        Role-specific content will be displayed here based on your permissions.
      </p>
      <Button className="mt-4" variant="outline">
        {role === "verifier" && "View Verification Queue"}
        {role === "admin" && "View Admin Panel"}
        {role === "submitter" && "Create New Project"}
        {role === "funder" && "Browse Funding Opportunities"}
        {role === "user" && "Explore Projects"}
      </Button>
    </div>
  );
}

// Placeholder components for tabs
function ActivityFeed({ role }: { role: UserRole }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center py-4">
        Activity feed will be displayed here.
      </p>
    </div>
  );
}

function ProjectsList({ role }: { role: UserRole }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center py-4">
        Projects list will be displayed here.
      </p>
    </div>
  );
}

function ImpactMetrics({ role }: { role: UserRole }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center py-4">
        Impact metrics will be displayed here.
      </p>
    </div>
  );
}

function ActivityLog({ role }: { role: UserRole }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center py-4">
        Activity log will be displayed here.
      </p>
    </div>
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
