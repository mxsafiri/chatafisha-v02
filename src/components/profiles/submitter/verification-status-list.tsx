"use client"

import { useState } from "react"
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Search,
  ChevronRight,
  MessageSquare
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"
import { submitterVerifications } from "@/lib/data/mock-submitter"

type VerificationStatus = "submitted" | "in-review" | "approved" | "rejected"

interface VerificationItem {
  projectId: string
  projectTitle: string
  status: string
  submittedAt: string
  lastUpdated: string
  verifierFeedback: string
  nextSteps: string
  assignedVerifier: {
    id: string
    name: string
    avatar: string
  } | null
}

export function VerificationStatusList() {
  const [search, setSearch] = useState("")
  const [selectedVerification, setSelectedVerification] = useState<VerificationItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")

  const filteredVerifications = submitterVerifications.filter(
    verification => verification.projectTitle.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "in-review":
      case "submitted":
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "approved":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Approved</Badge>
      case "rejected":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Rejected</Badge>
      case "in-review":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">In Review</Badge>
      case "submitted":
      default:
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Submitted</Badge>
    }
  }

  const handleViewDetails = (verification: VerificationItem) => {
    setSelectedVerification(verification)
    setIsDialogOpen(true)
  }

  const handleSendResponse = () => {
    // In a real app, this would send the response to the verifier
    setResponseMessage("")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Verification Status</h3>
        <div className="relative w-[250px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Next Steps</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVerifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No verifications found
                </TableCell>
              </TableRow>
            ) : (
              filteredVerifications.map((verification) => (
                <TableRow key={verification.projectId}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(verification.status)}
                      {getStatusBadge(verification.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{verification.projectTitle}</TableCell>
                  <TableCell>{formatDate(verification.submittedAt)}</TableCell>
                  <TableCell>{formatDate(verification.lastUpdated)}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {verification.nextSteps}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDetails(verification)}
                    >
                      <span className="sr-only">View details</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedVerification && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Verification Details</DialogTitle>
              <DialogDescription>
                {selectedVerification.projectTitle}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(selectedVerification.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Submitted: {formatDate(selectedVerification.submittedAt)}
                </div>
              </div>

              {selectedVerification.assignedVerifier && (
                <div className="rounded-md border p-4">
                  <h4 className="text-sm font-medium mb-2">Assigned Verifier</h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedVerification.assignedVerifier.avatar} />
                      <AvatarFallback>{selectedVerification.assignedVerifier.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{selectedVerification.assignedVerifier.name}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedVerification.verifierFeedback && (
                <div className="rounded-md border p-4">
                  <h4 className="text-sm font-medium mb-2">Verifier Feedback</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedVerification.verifierFeedback}
                  </p>
                </div>
              )}

              <div className="rounded-md border p-4">
                <h4 className="text-sm font-medium mb-2">Next Steps</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedVerification.nextSteps}
                </p>
              </div>

              {(selectedVerification.status === "rejected" || selectedVerification.status === "in-review") && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Your Response</h4>
                  <Textarea
                    placeholder="Add additional information or respond to feedback..."
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              {(selectedVerification.status === "rejected" || selectedVerification.status === "in-review") && (
                <Button 
                  onClick={handleSendResponse}
                  disabled={!responseMessage.trim()}
                  className="gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send Response
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
