import type { Location, Funding, VerificationEvidence } from "@/types"

export type ImpactMetricType = {
  id: string
  name: string
  unit: string
  description: string
  category: "environmental" | "social" | "economic" | "other"
}

export type ImpactMetric = {
  id: string // For frontend management
  name: string
  unit: string
  value: number
  type?: "environmental" | "social" | "economic" | "other"
  createdAt?: string // For tracking when metric was added
  updatedAt?: string // For tracking updates
  verifiedAt?: string // For when a verifier approves the metric
  verifiedBy?: string // ID of the verifier who approved it
  evidence?: {
    fileUrl?: string
    description?: string
  }
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
  title: string
  description: string
  status: "pending" | "approved" | "rejected"
  feedback?: string
  metrics: ImpactMetric
  evidence: VerificationEvidence[]
  submittedAt: string
  createdAt: string
  updatedAt: string
  submittedBy: {
    id: string
    name: string
    avatar: string
  }
  location: Location
  tags: string[]
  metadata?: {
    peopleInvolved?: number
    wasteCollected?: number
    treesPlanted?: number
    location?: string
    duration?: string
  }
}

export type ProjectType = 
  | "waste-management"
  | "tree-planting"
  | "water-sanitation"
  | "renewable-energy"
  | "education"
  | "community"

export interface ProjectEvidence {
  id: string
  type: "image" | "video" | "document"
  url: string
  description: string
  timestamp: string
  location: Location
  fileType: string
  fileSize: number
  fileName: string
}

export type DynamicMetric = {
  id: string
  name: string
  unit: string
  value: number
  type?: "environmental" | "social" | "economic" | "other"
  evidence?: {
    file?: any
    description?: string
  }
}

export interface ProjectSubmissionFormData {
  title: string
  description: string
  projectType: ProjectType
  startDate: string
  endDate?: string
  isRecurring: boolean
  recurringInterval?: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  tags: string[]
  evidence: ProjectEvidence[]
  location: Location
  metrics: {
    dynamic: DynamicMetric[]
  }
  submitter: {
    id: string
    name: string
    organization: string
    avatar?: string
    contact: {
      email: string
      phone?: string
      whatsapp?: string
    }
    region: string
    ward: string
  }
}

export interface ProjectSubmission {
  id: string
  title: string
  description: string
  type: "waste-management" | "environmental" | "social" | "economic"
  category: string
  projectType: string
  startDate: string
  endDate?: string
  isRecurring: boolean
  recurringInterval?: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  location: {
    name: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  impactMetrics: ImpactMetric[]
  sdgGoals: number[]
  funding: Funding
  evidence: Array<{
    id: string
    type: "image" | "video" | "document"
    description: string
    url: string
    timestamp: string
    location: {
      name: string
      coordinates: {
        lat: number
        lng: number
      }
    }
    fileType: string
    fileSize: number
    fileName: string
  }>
  status: "draft" | "submitted" | "in-review" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  images: string[]
  submitter: {
    id: string
    name: string
    organization: string
    avatar?: string
    contact: {
      email: string
      phone?: string
      whatsapp?: string
    }
    region: string
    ward: string
  }
}

export type ProjectMetricField = {
  id: string
  label: string
  type: "number" | "text" | "select"
  unit?: string
  options?: string[]
  tooltip?: string
  icon?: string
  validation?: {
    min?: number
    max?: number
    required?: boolean
    pattern?: string
  }
}
