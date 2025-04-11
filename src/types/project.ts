import type { Location, Funding, VerificationEvidence } from "@/types"

export type ImpactMetricType = {
  id: string
  name: string
  unit: string
  description: string
  category: "environmental" | "social" | "economic" | "other"
}

export interface ImpactMetric {
  peopleImpacted: number
  wasteCollected: number
  treesPlanted: number
}

export interface Creator {
  id: string
  name: string
  avatar: string
  organization: string
}

export interface ImpactProject {
  id: string
  title: string
  description: string
  type: "waste-management" | "environmental" | "social" | "economic"
  category: string
  status: "pending" | "verified" | "rejected"
  location: Location
  impactMetrics: ImpactMetric
  sdgGoals: number[]
  funding: Funding
  createdAt: string
  updatedAt: string
  images: string[]
  evidence: VerificationEvidence[]
  creator: Creator
}

export interface VerificationSubmission {
  id: string
  projectId: string
  verifierId: string
  status: "pending" | "approved" | "rejected"
  feedback?: string
  metrics: ImpactMetric
  evidence: VerificationEvidence[]
  createdAt: string
  updatedAt: string
}
