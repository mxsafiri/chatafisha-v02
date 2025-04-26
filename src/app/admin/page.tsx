"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, getFirestore, collection, getDocs } from "firebase/firestore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    const auth = getAuth()
    const db = getFirestore()
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid))
          
          if (userDoc.exists()) {
            const userData = userDoc.data()
            
            // Check if user is an admin
            if (userData.role !== "admin" && userData.isAdmin !== true) {
              toast({
                title: "Access Denied",
                description: "You don't have permission to access the admin dashboard.",
                variant: "destructive",
              })
              router.push("/dashboard")
              return
            }
            
            setUserData(userData)
            
            // Fetch users
            const usersSnapshot = await getDocs(collection(db, "users"))
            const usersData = usersSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
            setUsers(usersData)
            
            // Fetch projects (placeholder for now)
            setProjects([
              { id: 1, name: "Plastic Collection", location: "Mombasa", status: "Active" },
              { id: 2, name: "Waste Management", location: "Nairobi", status: "Pending" },
              { id: 3, name: "Recycling Initiative", location: "Kisumu", status: "Completed" },
              { id: 4, name: "Beach Cleanup", location: "Malindi", status: "Active" },
              { id: 5, name: "Plastic Recycling", location: "Nakuru", status: "Pending" }
            ])
          } else {
            // User document doesn't exist
            toast({
              title: "User Not Found",
              description: "Your user profile is incomplete. Please contact support.",
              variant: "destructive",
            })
            router.push("/dashboard")
          }
        } catch (error) {
          console.error("Error fetching admin data:", error)
          toast({
            title: "Error",
            description: "Failed to load admin data. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      } else {
        // User is not logged in
        router.push("/login")
      }
    })
    
    return () => unsubscribe()
  }, [router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="h-12 w-full mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full mt-6" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, projects, and system settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.status === "Active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.status === "Pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="users" onClick={() => setActiveTab("users")}>
            Users
          </TabsTrigger>
          <TabsTrigger value="projects" onClick={() => setActiveTab("projects")}>
            Projects
          </TabsTrigger>
          <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Key metrics and system health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">User Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Submitters</span>
                      <span>{users.filter(u => u.role === "submitter" || u.isSubmitter).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Verifiers</span>
                      <span>{users.filter(u => u.role === "verifier" || u.isVerifier).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Funders</span>
                      <span>{users.filter(u => u.role === "funder" || u.isFunder).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Admins</span>
                      <span>{users.filter(u => u.role === "admin" || u.isAdmin).length}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Project Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Active</span>
                      <span>{projects.filter(p => p.status === "Active").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending</span>
                      <span>{projects.filter(p => p.status === "Pending").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed</span>
                      <span>{projects.filter(p => p.status === "Completed").length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </div>
              <Button>Add User</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name || user.displayName || "N/A"}</TableCell>
                      <TableCell>{user.email || "N/A"}</TableCell>
                      <TableCell>{user.role || "N/A"}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Management</CardTitle>
                <CardDescription>Manage impact projects</CardDescription>
              </div>
              <Button>Add Project</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.location}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === "Active" ? "bg-green-100 text-green-800" :
                          project.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {project.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">General Settings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Enable User Registration</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Enable Project Submission</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Enable Funding</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>New User Registration</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>New Project Submission</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Verification Completed</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
