"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, ShieldCheck, Settings, BarChart3 } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const analyticsData = [
  {
    name: "Jan",
    users: 400,
    projects: 240,
  },
  {
    name: "Feb",
    users: 450,
    projects: 290,
  },
  {
    name: "Mar",
    users: 520,
    projects: 350,
  },
  {
    name: "Apr",
    users: 590,
    projects: 390,
  },
  {
    name: "May",
    users: 650,
    projects: 420,
  },
  {
    name: "Jun",
    users: 700,
    projects: 450,
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Platform Settings</span>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +42 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">
              +28 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="projects">Project Moderation</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>
                User and project growth over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Bar
                      dataKey="users"
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                      name="Users"
                    />
                    <Bar
                      dataKey="projects"
                      fill="#82ca9d"
                      radius={[4, 4, 0, 0]}
                      name="Projects"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users and their roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">User List</h3>
                  <Button variant="outline" size="sm">
                    Add User
                  </Button>
                </div>
                <div className="border rounded-md">
                  {/* User management table would go here */}
                  <p className="p-4 text-sm text-muted-foreground">
                    User management interface will be implemented here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Moderation</CardTitle>
              <CardDescription>
                Review and moderate projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Flagged Projects</h3>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="border rounded-md">
                  {/* Project moderation interface would go here */}
                  <p className="p-4 text-sm text-muted-foreground">
                    Project moderation interface will be implemented here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure platform settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">General Settings</h3>
                  <Button variant="outline" size="sm">
                    Save Changes
                  </Button>
                </div>
                <div className="border rounded-md p-4">
                  {/* Settings form would go here */}
                  <p className="text-sm text-muted-foreground">
                    System settings interface will be implemented here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
