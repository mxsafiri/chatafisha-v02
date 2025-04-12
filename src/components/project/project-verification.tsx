"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle } from "lucide-react"
import type { ProjectSubmission } from "@/types/project"

interface ProjectVerificationProps {
  project: ProjectSubmission
}

export function ProjectVerification({ project }: ProjectVerificationProps) {
  if (project.status !== "submitted" && project.status !== "in-review") {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Project</CardTitle>
        <CardDescription>
          Review the project details and evidence before verifying or rejecting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Verification Notes</h3>
            <Textarea
              placeholder="Add any notes about your verification decision..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-4">
        <Button variant="outline" className="gap-2">
          <XCircle className="h-4 w-4" />
          Reject
        </Button>
        <Button className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Verify
        </Button>
      </CardFooter>
    </Card>
  )
}
