export type ImpactMetricType = {
  id: string
  name: string
  unit: string
  description: string
  category: "environmental" | "social" | "economic" | "other"
}

export type ImpactMetricValue = {
  metricId: string
  value: number
  unit: string
  timestamp: string
  evidence?: string[]
}

export interface ImpactProject {
  id: string
  title: string
  description: string
  location: {
    name: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  status: "pending" | "verified" | "rejected"
  createdAt: string
  updatedAt: string
  funding: {
    target: number
    received: number
  }
  impactMetrics: ImpactMetricValue[]
  category: string
  sdgGoals: number[]
  images: string[]
  creator: {
    id: string
    name: string
    avatar: string
  }
}
