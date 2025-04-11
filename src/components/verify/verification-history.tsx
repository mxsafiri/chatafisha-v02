"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Download } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockVerificationSubmissions } from "@/lib/data/mock-verifications"

// For demo, we'll modify some submissions to be verified
const verifiedSubmissions = mockVerificationSubmissions.map((submission, index) => ({
  ...submission,
  status: index === 0 ? "verified" : index === 1 ? "flagged" : submission.status,
  verifiedAt: index === 0 || index === 1 ? "2025-04-11T08:00:00Z" : undefined,
}))

export function VerificationHistory() {
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredSubmissions = verifiedSubmissions.filter((submission) =>
    statusFilter === "all" ? true : submission.status === statusFilter
  )

  const handleExport = () => {
    // In a real app, this would generate and download a CSV
    console.log("Exporting verification history...")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Impact Title</TableHead>
              <TableHead>Community</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified Date</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.title}</TableCell>
                <TableCell>{submission.submittedBy.organization}</TableCell>
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
                  {submission.verifiedAt
                    ? format(new Date(submission.verifiedAt), "MMM d, yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {submission.comments.length > 0
                    ? submission.comments[0].content
                    : "No comments"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
