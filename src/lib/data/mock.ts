import type { User, SDGGoal } from "@/types"
import type { ImpactProject, Creator } from "@/types/project"
import type { Location } from "@/types"

export const mockLocations: Location[] = [
  {
    name: "Kibera, Nairobi",
    coordinates: {
      lat: -1.3136,
      lng: 36.7845
    }
  },
  {
    name: "Mombasa Beach",
    coordinates: {
      lat: -4.0435,
      lng: 39.6682
    }
  },
  {
    name: "Kisumu Lake Victoria",
    coordinates: {
      lat: -0.0917,
      lng: 34.7680
    }
  }
]

export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/john.jpg",
    role: "verifier" as const,
    bio: "Environmental enthusiast and waste management expert",
    location: mockLocations[0],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    metrics: {
      projectsVerified: 5,
      peopleImpacted: 250,
      wasteCollected: 1000,
      treesPlanted: 50
    },
    recentActivity: [
      {
        id: "a1",
        type: "project_verified",
        description: "Verified Community Beach Cleanup project",
        timestamp: "2024-03-15T10:00:00Z"
      },
      {
        id: "a2",
        type: "impact_achieved",
        description: "Reached 250 people impacted milestone",
        timestamp: "2024-03-10T15:30:00Z"
      }
    ],
    impactPoints: 1200
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/avatars/jane.jpg",
    role: "user" as const,
    bio: "Passionate about sustainable development",
    location: mockLocations[1],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
    metrics: {
      projectsVerified: 3,
      peopleImpacted: 100,
      wasteCollected: 500,
      treesPlanted: 20
    },
    recentActivity: [
      {
        id: "a3",
        type: "project_created",
        description: "Created Lake Victoria Cleanup project",
        timestamp: "2024-03-01T09:00:00Z"
      }
    ],
    impactPoints: 800
  }
]

export const mockSDGGoals: SDGGoal[] = [
  {
    id: 1,
    name: "No Poverty",
    description: "End poverty in all its forms everywhere",
    icon: "🎯"
  },
  {
    id: 2,
    name: "Zero Hunger",
    description: "End hunger, achieve food security and improved nutrition",
    icon: "🌾"
  },
  {
    id: 3,
    name: "Good Health and Well-being",
    description: "Ensure healthy lives and promote well-being for all",
    icon: "❤️"
  }
]

export const mockCreators: Creator[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/avatars/john.jpg",
    organization: "Ocean Guardians"
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/avatars/jane.jpg",
    organization: "Green Cities Kenya"
  }
]

export const mockProjects: ImpactProject[] = [
  {
    id: "1",
    title: "Community Beach Cleanup",
    description: "Monthly beach cleanup initiative in Mombasa",
    type: "waste-management",
    category: "Community",
    status: "verified",
    location: mockLocations[1],
    impactMetrics: {
      peopleImpacted: 500,
      wasteCollected: 2000,
      treesPlanted: 0
    },
    sdgGoals: [11, 13, 14],
    funding: {
      target: 5000,
      received: 3500
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    images: ["/projects/beach-cleanup.jpg"],
    evidence: [],
    creator: mockCreators[0]
  },
  {
    id: "2",
    title: "Urban Tree Planting",
    description: "Reforestation project in Kibera",
    type: "environmental",
    category: "Conservation",
    status: "pending",
    location: mockLocations[0],
    impactMetrics: {
      peopleImpacted: 1000,
      wasteCollected: 0,
      treesPlanted: 500
    },
    sdgGoals: [11, 13, 15],
    funding: {
      target: 10000,
      received: 2500
    },
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
    images: ["/projects/tree-planting.jpg"],
    evidence: [],
    creator: mockCreators[1]
  },
  {
    id: "3",
    title: "Lake Victoria Cleanup",
    description: "Water conservation and cleanup project",
    type: "environmental",
    category: "Conservation",
    status: "pending",
    location: mockLocations[2],
    impactMetrics: {
      peopleImpacted: 2000,
      wasteCollected: 5000,
      treesPlanted: 0
    },
    sdgGoals: [6, 14, 15],
    funding: {
      target: 15000,
      received: 7500
    },
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    images: ["/projects/lake-cleanup.jpg"],
    evidence: [],
    creator: mockCreators[1]
  }
] as const
