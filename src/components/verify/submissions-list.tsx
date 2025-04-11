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
import { mockVerifications } from "@/lib/data/mock"
import type { VerificationSubmission } from "@/types/project"

export function SubmissionsList() {
  const [selectedSubmission, setSelectedSubmission] = useState<VerificationSubmission | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSubmissions = mockVerifications.filter((submission) =>
    submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              <TableHead>Submitted By</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.title}</TableCell>
                <TableCell>{submission.submittedBy.name}</TableCell>
                <TableCell>{submission.location.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      submission.status === "approved"
                        ? "default"
                        : submission.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {submission.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(submission.submittedAt), "PPP")}</TableCell>
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
