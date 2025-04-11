"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VerificationDialog } from "@/components/verify/verification-dialog"
import { mockVerificationSubmissions } from "@/lib/data/mock-verifications"
import type { VerificationSubmission } from "@/types/verification"

export function SubmissionsList() {
  const [selectedSubmission, setSelectedSubmission] = useState<VerificationSubmission | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSubmissions = mockVerificationSubmissions.filter((submission) =>
    submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.submittedBy.organization.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search submissions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Impact Title</TableHead>
              <TableHead>Community</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.title}</TableCell>
                <TableCell>{submission.submittedBy.organization}</TableCell>
                <TableCell>{submission.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      submission.status === "verified"
                        ? "default"
                        : submission.status === "flagged"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(submission.submittedAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <VerificationDialog
        submission={selectedSubmission}
        open={!!selectedSubmission}
        onOpenChange={(open) => !open && setSelectedSubmission(null)}
      />
    </div>
  )
}
