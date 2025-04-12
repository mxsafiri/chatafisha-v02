import type { User, SDGGoal } from "@/types"
import type { ImpactMetric, ProjectSubmission } from "@/types/project"
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

export const mockMetrics: ImpactMetric[] = [
  {
    id: "m1",
    name: "Waste Collected",
    unit: "kg",
    value: 100,
    type: "environmental",
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "m2",
    name: "People Trained",
    unit: "people",
    value: 25,
    type: "social",
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "m3",
    name: "Trees Planted",
    unit: "trees",
    value: 50,
    type: "environmental",
    createdAt: "2025-01-01T00:00:00Z",
  },
]

export const mockProjects: ProjectSubmission[] = [
  {
    id: "1",
    title: "Community Waste Collection",
    description: "Weekly waste collection and recycling program in Mombasa",
    projectType: "waste-management",
    startDate: "2025-01-01",
    isRecurring: true,
    recurringInterval: "weekly",
    location: {
      name: "Mombasa",
      coordinates: {
        lat: -4.0435,
        lng: 39.6682,
      },
    },
    impactMetrics: mockMetrics,
    evidence: [
      {
        id: "e1",
        type: "image",
        description: "Team collecting waste",
        url: "/mock/waste-collection.jpg",
        timestamp: "2025-01-01T10:00:00Z",
        location: {
          name: "Mombasa Beach",
          coordinates: {
            lat: -4.0435,
            lng: 39.6682,
          },
        },
        fileType: "image/jpeg",
        fileSize: 1024000,
        fileName: "waste-collection.jpg",
      },
    ],
    status: "submitted",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    submitter: {
      id: "user1",
      name: "John Doe",
      organization: "EcoTeam",
      contact: {
        email: "john@ecoteam.org",
      },
      region: "Coast",
      ward: "Nyali",
    },
  },
]

export const mockVerifications: any[] = [
  {
    id: "1",
    projectId: "1",
    verifierId: "1",
    title: "Community Beach Cleanup Verification",
    description: "Monthly beach cleanup initiative in Mombasa",
    status: "pending",
    metrics: {
      peopleImpacted: 100,
      wasteCollected: 500,
      treesPlanted: 20
    },
    evidence: [
      {
        id: "1",
        type: "image",
        url: "/images/evidence1.jpg",
        description: "Beach cleanup in progress",
        timestamp: "2024-03-15T10:00:00Z",
        location: {
          name: "Mombasa Beach",
          coordinates: { lat: -4.0435, lng: 39.6682 }
        }
      }
    ],
    submittedAt: "2024-03-15T10:00:00Z",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    submittedBy: {
      id: "1",
      name: "John Doe",
      avatar: "/avatars/john.jpg"
    },
    location: mockLocations[0],
    tags: ["beach-cleanup", "waste-management", "community"],
    metadata: {
      peopleInvolved: 25,
      wasteCollected: 500,
      treesPlanted: 20,
      location: "Mombasa Beach",
      duration: "4 hours"
    }
  },
  {
    id: "2",
    projectId: "2",
    verifierId: "2",
    title: "Tree Planting Initiative Verification",
    description: "Tree planting activity in Karura Forest",
    status: "approved",
    metrics: {
      peopleImpacted: 50,
      wasteCollected: 200,
      treesPlanted: 10
    },
    evidence: [
      {
        id: "2",
        type: "image",
        url: "/images/evidence2.jpg",
        description: "Tree planting activity",
        timestamp: "2024-03-10T15:30:00Z",
        location: {
          name: "Karura Forest",
          coordinates: { lat: -1.2306, lng: 36.8219 }
        }
      }
    ],
    submittedAt: "2024-03-10T15:30:00Z",
    createdAt: "2024-03-10T15:30:00Z",
    updatedAt: "2024-03-10T15:30:00Z",
    submittedBy: {
      id: "2",
      name: "Jane Smith",
      avatar: "/avatars/jane.jpg"
    },
    location: mockLocations[1],
    tags: ["tree-planting", "environmental", "community"],
    metadata: {
      peopleInvolved: 15,
      wasteCollected: 0,
      treesPlanted: 10,
      location: "Karura Forest",
      duration: "3 hours"
    }
  }
]
