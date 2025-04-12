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
    icon: "💰",
    color: "#E5243B"
  },
  {
    id: 2,
    name: "Zero Hunger",
    description: "End hunger, achieve food security and improved nutrition",
    icon: "🌾",
    color: "#DDA63A"
  },
  {
    id: 3,
    name: "Good Health and Well-being",
    description: "Ensure healthy lives and promote well-being for all",
    icon: "❤️",
    color: "#4C9F38"
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
    title: "Community Beach Cleanup",
    description: "Weekly beach cleanup initiative to remove plastic waste from Mombasa Beach",
    type: "waste-management",
    category: "community",
    projectType: "cleanup",
    startDate: "2024-03-01T00:00:00Z",
    isRecurring: true,
    recurringInterval: "weekly",
    location: mockLocations[1],
    impactMetrics: [
      {
        id: "m1",
        name: "Waste Collected",
        unit: "kg",
        value: 500,
        type: "environmental",
        verifiedAt: "2024-03-15T10:00:00Z",
        verifiedBy: "1"
      },
      {
        id: "m2",
        name: "Volunteers Engaged",
        unit: "people",
        value: 25,
        type: "social"
      }
    ],
    sdgGoals: [14, 15, 17], // Life Below Water, Life on Land, Partnerships
    funding: {
      target: 5000,
      received: 3000,
      currency: "USD",
      type: "grant"
    },
    evidence: [
      {
        id: "e1",
        type: "image",
        url: "/images/beach-cleanup-1.jpg",
        description: "Team collecting plastic waste",
        timestamp: "2024-03-08T09:00:00Z",
        location: mockLocations[1],
        fileType: "image/jpeg",
        fileSize: 1024000,
        fileName: "beach-cleanup-1.jpg"
      }
    ],
    images: [
      "/images/beach-cleanup-1.jpg",
      "/images/beach-cleanup-2.jpg"
    ],
    status: "submitted",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    submitter: {
      id: "2",
      name: "Jane Smith",
      organization: "EcoWarriors Kenya",
      avatar: "/avatars/jane.jpg",
      contact: {
        email: "jane@ecowarriors.org",
        phone: "+254700000000",
        whatsapp: "+254700000000"
      },
      region: "Coast",
      ward: "Nyali"
    }
  }
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
