export interface ImpactProject {
  id: string
  title: string
  description: string
  location: string
  status: "pending" | "verified" | "rejected"
  createdAt: string
  updatedAt: string
  funding: {
    target: number
    received: number
  }
  impactMetrics: {
    peopleImpacted: number
    wasteCollected: number
    treesPlanted: number
  }
  category: string
  sdgGoals: number[]
  images: string[]
  creator: {
    id: string
    name: string
    avatar: string
  }
}
