"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerifierHeader } from "@/components/verify/verifier-header"
import { SubmissionsList } from "@/components/verify/submissions-list"
import { VerificationHistory } from "@/components/verify/verification-history"
import { VerifierStats } from "@/components/verify/verifier-stats"
import { mockVerifier } from "@/lib/data/mock-verifications"

export default function VerifierPage() {
  const [activeTab, setActiveTab] = useState("pending")

  return (
    <div className="flex min-h-screen flex-col">
      <VerifierHeader verifier={mockVerifier} />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Verification Dashboard</h2>
          <div className="flex items-center space-x-2">
            <VerifierStats verifier={mockVerifier} />
          </div>
        </div>
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Verifications</TabsTrigger>
            <TabsTrigger value="history">Verification History</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4">
            <SubmissionsList />
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <VerificationHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
