"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Verifier } from "@/types/verification"

interface VerifierStatsProps {
  verifier: Verifier
}

export function VerifierStats({ verifier }: VerifierStatsProps) {
  const approvalRate = (verifier.stats.approved / verifier.stats.totalVerifications) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Verifier Stats</CardTitle>
        <CardDescription>
          {verifier.stats.totalVerifications} total verifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div>Approval Rate</div>
          <div className="font-medium">{approvalRate.toFixed(1)}%</div>
        </div>
        <Progress value={approvalRate} className="mt-2" />
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <div className="font-medium text-green-600 dark:text-green-400">
              {verifier.stats.approved}
            </div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </div>
          <div>
            <div className="font-medium text-yellow-600 dark:text-yellow-400">
              {verifier.stats.flagged}
            </div>
            <div className="text-xs text-muted-foreground">Flagged</div>
          </div>
          <div>
            <div className="font-medium text-red-600 dark:text-red-400">
              {verifier.stats.rejected}
            </div>
            <div className="text-xs text-muted-foreground">Rejected</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
