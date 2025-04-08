import { User, ImpactProject, SDGGoal } from "@/types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Amina Hassan",
    email: "amina@example.com",
    role: "community",
    avatar: "https://ui-avatars.com/api/?name=Amina+Hassan&background=14B8A6&color=fff",
    location: "Kibera, Nairobi",
    bio: "Community leader focused on plastic waste management",
    joinedAt: "2023-01-15",
    metrics: {
      totalImpact: 1500,
      fundingReceived: 2500,
    },
  },
  {
    id: "2",
    name: "John Makundi",
    email: "john@example.com",
    role: "community",
    avatar: "https://ui-avatars.com/api/?name=John+Makundi&background=14B8A6&color=fff",
    location: "Arusha",
    bio: "Youth organizer for environmental projects",
    joinedAt: "2023-02-20",
    metrics: {
      totalImpact: 2200,
      fundingReceived: 3500,
    },
  },
  {
    id: "3",
    name: "Green Future Fund",
    email: "invest@greenfuture.com",
    role: "investor",
    avatar: "https://ui-avatars.com/api/?name=Green+Future&background=14B8A6&color=fff",
    location: "Global",
    bio: "Impact investment fund focused on climate action",
    joinedAt: "2023-01-01",
    metrics: {
      fundingGiven: 50000,
    },
  },
  {
    id: "4",
    name: "EcoVerify Solutions",
    email: "verify@ecoverify.com",
    role: "verifier",
    avatar: "https://ui-avatars.com/api/?name=Eco+Verify&background=14B8A6&color=fff",
    location: "East Africa",
    bio: "Environmental impact verification experts",
    joinedAt: "2023-01-10",
    metrics: {
      projectsVerified: 45,
    },
  },
]

export const mockProjects: ImpactProject[] = [
  {
    id: "1",
    title: "Kibera Plastic Collection Initiative",
    description: "Community-led plastic waste collection and recycling program in Kibera, focusing on empowering local youth while cleaning the environment. Our initiative has created jobs and improved local environmental conditions.",
    createdAt: "2024-01-15",
    creator: mockUsers[0],
    location: "Kibera, Nairobi",
    impactType: ["waste-management", "community-engagement"],
    sdgGoals: [11, 12, 13],
    metrics: {
      wastePlasticKg: 500,
      peopleImpacted: 200,
    },
    status: "verified",
    verificationDetails: {
      verifier: mockUsers[3],
      verifiedAt: "2024-02-01",
      comments: "Excellent documentation and community engagement",
      score: 4.8,
    },
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2613&q=80",
      },
    ],
    funding: {
      received: 2500,
      target: 5000,
      investors: [mockUsers[2]],
    },
  },
  {
    id: "2",
    title: "Arusha Youth Environmental Program",
    description: "Youth-led initiative combining environmental education with practical waste collection activities. We organize weekly clean-ups and workshops to raise awareness about sustainable practices.",
    createdAt: "2024-02-01",
    creator: mockUsers[1],
    location: "Arusha, Tanzania",
    impactType: ["education", "waste-management"],
    sdgGoals: [4, 11, 13],
    metrics: {
      wastePlasticKg: 300,
      peopleImpacted: 150,
    },
    status: "pending",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
      },
    ],
    funding: {
      received: 1500,
      target: 3000,
      investors: [],
    },
  },
  {
    id: "3",
    title: "Coastal Cleanup Network",
    description: "Organizing regular beach cleanups along the Tanzanian coast, protecting marine life and promoting sustainable tourism. We work with local communities and businesses to ensure long-term impact.",
    createdAt: "2024-03-01",
    creator: mockUsers[1],
    location: "Dar es Salaam, Tanzania",
    impactType: ["waste-management", "marine-conservation"],
    sdgGoals: [14, 15],
    metrics: {
      wastePlasticKg: 800,
      peopleImpacted: 300,
    },
    status: "verified",
    verificationDetails: {
      verifier: mockUsers[3],
      verifiedAt: "2024-03-15",
      comments: "Strong impact metrics and community participation",
      score: 4.5,
    },
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
      },
    ],
    funding: {
      received: 4000,
      target: 6000,
      investors: [mockUsers[2]],
    },
  },
]

export const sdgGoals: SDGGoal[] = [
  {
    id: 11,
    title: "Sustainable Cities and Communities",
    description: "Make cities inclusive, safe, resilient and sustainable",
    icon: "🏘️",
  },
  {
    id: 12,
    title: "Responsible Consumption and Production",
    description: "Ensure sustainable consumption and production patterns",
    icon: "♻️",
  },
  {
    id: 13,
    title: "Climate Action",
    description: "Take urgent action to combat climate change and its impacts",
    icon: "🌍",
  },
  {
    id: 14,
    title: "Life Below Water",
    description: "Conserve and sustainably use the world's oceans, seas and marine resources",
    icon: "🐠",
  },
  {
    id: 15,
    title: "Life on Land",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems",
    icon: "🌳",
  },
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
