"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerifierHeader } from "@/components/verify/verifier-header"
import { SubmissionsList } from "@/components/verify/submissions-list"
import { VerificationHistory } from "@/components/verify/verification-history"
import { VerifierStats } from "@/components/verify/verifier-stats"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { useUser } from "@/components/providers/user-provider"
import { Skeleton } from "@/components/ui/skeleton"

export default function VerifierPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [isLoading, setIsLoading] = useState(true)
  const [verifierData, setVerifierData] = useState(null)
  const router = useRouter()
  const { user, isAuthenticated, role } = useUser()

  // Check if user is authenticated and has verifier role
  useEffect(() => {
    const auth = getAuth()
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        // Not authenticated, redirect to login
        router.push("/login")
        return
      }

      try {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
        
        if (userDoc.exists()) {
          const userData = userDoc.data()
          
          // Get ID token to check custom claims
          const idTokenResult = await firebaseUser.getIdTokenResult(true)
          const role = idTokenResult.claims.role || userData.role
          
          if (role !== "verifier") {
            // Not a verifier, redirect to appropriate dashboard
            if (role === "submitter") {
              router.push("/submit-project")
            } else if (role === "funder") {
              router.push("/fund")
            } else if (role === "admin") {
              router.push("/admin")
            } else {
              router.push("/dashboard")
            }
            return
          }
          
          // User is a verifier, update verifier data
          setVerifierData({
            id: firebaseUser.uid,
            name: userData.name || firebaseUser.displayName || "Verifier",
            email: userData.email || firebaseUser.email || "",
            avatar: userData.avatar || firebaseUser.photoURL || "",
            joinedAt: userData.createdAt?.toDate?.() 
              ? new Date(userData.createdAt.toDate()).toISOString() 
              : new Date().toISOString(),
          })
        }
      } catch (error) {
        console.error("Error fetching verifier data:", error)
      } finally {
        setIsLoading(false)
      }
    })
    
    return () => unsubscribe()
  }, [router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="w-full h-16 bg-background border-b">
          <div className="container flex h-16 items-center px-4 sm:px-6">
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
        <main className="flex-1 space-y-4 p-8 pt-6">
          <Skeleton className="h-10 w-64 mb-6" />
          <Skeleton className="h-[400px] w-full rounded-md" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <VerifierHeader verifier={verifierData} />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Verification Dashboard</h2>
          <div className="flex items-center space-x-2">
            <VerifierStats verifier={verifierData} />
          </div>
        </div>
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pending">Pending Verifications</TabsTrigger>
            <TabsTrigger value="history">Verification History</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4">
            <SubmissionsList verifierId={verifierData.id} />
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <VerificationHistory verifierId={verifierData.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
