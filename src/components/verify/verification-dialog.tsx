"use client"

import { useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { MapPin, Calendar, Users, Scale, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { VerificationSubmission } from "@/types/verification"

interface VerificationDialogProps {
  submission: VerificationSubmission | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VerificationDialog({
  submission,
  open,
  onOpenChange,
}: VerificationDialogProps) {
  const [comment, setComment] = useState("")

  if (!submission) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{submission.title}</DialogTitle>
          <DialogDescription>
            Submitted by {submission.submittedBy.organization} on{" "}
            {format(new Date(submission.submittedAt), "PPP")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground">{submission.description}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Evidence</h3>
              <div className="grid grid-cols-2 gap-2">
                {submission.evidence.map((evidence) => (
                  <div key={evidence.id} className="relative aspect-video overflow-hidden rounded-md">
                    <Image
                      src={evidence.url}
                      alt={evidence.caption || ""}
                      fill
                      className="object-cover"
                    />
                    {evidence.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-xs text-white">
                        {evidence.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {submission.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">Impact Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{submission.location.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(submission.submittedAt), "PPP")}</span>
                </div>
                {submission.metadata.peopleInvolved && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{submission.metadata.peopleInvolved} people involved</span>
                  </div>
                )}
                {submission.metadata.wasteCollected && (
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-muted-foreground" />
                    <span>{submission.metadata.wasteCollected}kg waste collected</span>
                  </div>
                )}
                {submission.metadata.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{submission.metadata.duration} hours duration</span>
                  </div>
                )}
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold">Verification Action</h3>
              <Textarea
                placeholder="Add a comment about this verification..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex space-x-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    // Handle verification
                    onOpenChange(false)
                  }}
                >
                  Verify Impact
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    // Handle rejection
                    onOpenChange(false)
                  }}
                >
                  Flag Issues
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
