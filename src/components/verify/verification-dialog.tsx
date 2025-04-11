"use client"

import { useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { MapPin, Calendar, Users, Scale, Clock, TreePine } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { VerificationSubmission } from "@/types/project"

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
  const [feedback, setFeedback] = useState("")

  if (!submission) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{submission.title}</DialogTitle>
          <DialogDescription>
            Submitted by {submission.submittedBy.name} on{" "}
            {format(new Date(submission.submittedAt), "PPP")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{submission.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Evidence</h4>
            <div className="grid grid-cols-2 gap-4">
              {submission.evidence.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={item.url}
                      alt={item.description}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {submission.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Details</h4>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{submission.location.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(submission.submittedAt), "PPP")}</span>
              </div>
              {submission.metadata?.peopleInvolved && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{submission.metadata.peopleInvolved} people involved</span>
                </div>
              )}
              {submission.metadata?.wasteCollected && (
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-muted-foreground" />
                  <span>{submission.metadata.wasteCollected}kg waste collected</span>
                </div>
              )}
              {submission.metadata?.treesPlanted && (
                <div className="flex items-center gap-2">
                  <TreePine className="h-4 w-4 text-muted-foreground" />
                  <span>{submission.metadata.treesPlanted} trees planted</span>
                </div>
              )}
              {submission.metadata?.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{submission.metadata.duration}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Feedback</h4>
            <Textarea
              placeholder="Add your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => onOpenChange(false)}>
            Reject
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
