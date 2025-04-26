"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"

export default function FunderPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("available")

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
            
            // Check if user is a funder
            if (userData.role !== "funder" && userData.isFunder !== true) {
              toast({
                title: "Access Denied",
                description: "You don't have permission to access this page.",
                variant: "destructive",
              })
              router.push("/dashboard")
              return
            }
            
            setUserData(userData)
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
          console.error("Error fetching user data:", error)
          toast({
            title: "Error",
            description: "Failed to load user data. Please try again.",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funder Dashboard</h1>
          <p className="text-muted-foreground">
            Fund verified impact projects and track your contributions
          </p>
        </div>
        <Button className="mt-4 md:mt-0">Fund New Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Funded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projects Funded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Impact Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 kg CO₂</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="available" onClick={() => setActiveTab("available")}>
            Available Projects
          </TabsTrigger>
          <TabsTrigger value="funded" onClick={() => setActiveTab("funded")}>
            My Funded Projects
          </TabsTrigger>
          <TabsTrigger value="history" onClick={() => setActiveTab("history")}>
            Transaction History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for available projects */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item}>
                <CardHeader>
                  <CardTitle>Plastic Collection Project {item}</CardTitle>
                  <CardDescription>Mombasa, Kenya</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Funding Goal: $5,000</p>
                  <p>Current: $2,500 (50%)</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Fund This Project</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="funded" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for funded projects */}
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardHeader>
                  <CardTitle>Waste Management Initiative {item}</CardTitle>
                  <CardDescription>Nairobi, Kenya</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Your Contribution: $1,000</p>
                  <p>Total Funded: $4,500 (90%)</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent funding transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">Project {item}</p>
                      <p className="text-sm text-muted-foreground">April {item + 10}, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$1,000</p>
                      <p className="text-sm text-green-600">Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
