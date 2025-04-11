export type VerificationStatus = "pending" | "verified" | "flagged" | "rejected"

export interface Verifier {
  id: string
  name: string
  avatar: string
  email: string
  role: "verifier"
  stats: {
    totalVerifications: number
    approved: number
    flagged: number
    rejected: number
  }
  badges: string[]
  reputation: number
  joinedAt: string
}

export interface VerificationComment {
  id: string
  content: string
  createdAt: string
  verifierId: string
  verifierName: string
  verifierAvatar: string
}

export interface VerificationEvidence {
  id: string
  type: "image" | "video" | "document"
  url: string
  caption?: string
  metadata: {
    timestamp: string
    location?: {
      lat: number
      lng: number
    }
    deviceInfo?: {
      model?: string
      os?: string
    }
    fileInfo: {
      size: number
      type: string
      hash?: string
    }
  }
}

export interface VerificationMetric {
  id: string
  metricId: string
  value: number
  unit: string
  timestamp: string
  status: VerificationStatus
  verifiedValue?: number
  verifierNotes?: string
  evidence: string[]
}

export interface VerificationSubmission {
  id: string
  projectId: string
  title: string
  description: string
  submittedBy: {
    id: string
    name: string
    avatar: string
    organization: string
  }
  type: string
  status: VerificationStatus
  evidence: VerificationEvidence[]
  location: {
    name: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  submittedAt: string
  verifiedAt?: string
  verifiedBy?: {
    id: string
    name: string
    avatar: string
  }
  comments: VerificationComment[]
  impactMetrics: VerificationMetric[]
  tags: string[]
}
