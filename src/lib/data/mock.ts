import type { User, Project, SDGGoal } from "@/types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    bio: "Environmental enthusiast working on sustainable solutions",
    location: "Nairobi, Kenya",
    joinedAt: "2024-01-01T00:00:00Z",
    metrics: {
      projectsVerified: 12,
      peopleImpacted: 5000,
      wasteCollected: 2500,
      treesPlanted: 150,
      totalProjects: 8,
      fundingReceived: 25000,
      fundingGiven: 5000
    },
    recentActivity: [
      {
        id: "1",
        type: "project_verified",
        title: "Project Verified",
        description: "Verified Ocean Cleanup Initiative",
        date: "2025-04-09T10:00:00Z",
        projectId: "1"
      },
      {
        id: "2",
        type: "impact_achieved",
        title: "Impact Milestone",
        description: "Reached 5,000 people impacted",
        date: "2025-04-08T15:00:00Z"
      },
      {
        id: "3",
        type: "funding_received",
        title: "Funding Received",
        description: "Received $10,000 for Community Garden",
        date: "2025-04-07T09:00:00Z",
        projectId: "2"
      }
    ]
  }
]

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Ocean Cleanup Initiative",
    description: "A project aimed at cleaning up ocean waste and protecting marine life through community engagement and sustainable practices.",
    status: "verified",
    creator: {
      id: "1",
      name: "John Doe",
      avatar: "https://avatars.githubusercontent.com/u/1?v=4"
    },
    location: "Mombasa, Kenya",
    images: [
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f",
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f"
    ],
    funding: {
      received: 15000,
      target: 30000
    },
    metrics: {
      peopleImpacted: 1000,
      wasteCollected: 500,
      treesPlanted: 50
    },
    createdAt: "2025-03-01T00:00:00Z",
    updatedAt: "2025-04-09T10:00:00Z"
  },
  {
    id: "2",
    title: "Community Garden",
    description: "Creating sustainable food sources through community gardens in urban areas.",
    status: "pending",
    creator: {
      id: "1",
      name: "John Doe",
      avatar: "https://avatars.githubusercontent.com/u/1?v=4"
    },
    location: "Nairobi, Kenya",
    images: [
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f"
    ],
    funding: {
      received: 7500,
      target: 10000
    },
    metrics: {
      peopleImpacted: 250,
      wasteCollected: 100,
      treesPlanted: 25
    },
    createdAt: "2025-04-01T00:00:00Z",
    updatedAt: "2025-04-09T09:30:00Z"
  }
]

export const mockNotifications = [
  {
    id: "1",
    type: "verification",
    title: "Project Verified",
    message: "Your project 'Kibera Plastic Collection' has been verified",
    createdAt: "2024-03-01T10:00:00Z",
    read: false,
    link: "/dashboard/projects/1",
  },
  {
    id: "2",
    type: "funding",
    title: "New Funding Received",
    message: "Green Future Fund has funded your project with $2,500",
    createdAt: "2024-02-28T15:30:00Z",
    read: true,
    link: "/dashboard/funding/1",
  },
]

export const sdgGoals: SDGGoal[] = [
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
  },
  {
    id: 6,
    name: "Clean Water and Sanitation",
    description: "Ensure availability and sustainable management of water and sanitation",
    icon: "💧"
  },
  {
    id: 11,
    name: "Sustainable Cities and Communities",
    description: "Make cities inclusive, safe, resilient and sustainable",
    icon: "🏙️"
  },
  {
    id: 12,
    name: "Responsible Consumption and Production",
    description: "Ensure sustainable consumption and production patterns",
    icon: "♻️"
  },
  {
    id: 13,
    name: "Climate Action",
    description: "Take urgent action to combat climate change and its impacts",
    icon: "🌍"
  },
  {
    id: 14,
    name: "Life Below Water",
    description: "Conserve and sustainably use the oceans, seas and marine resources",
    icon: "🌊"
  },
  {
    id: 15,
    name: "Life on Land",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems",
    icon: "🌳"
  }
];
