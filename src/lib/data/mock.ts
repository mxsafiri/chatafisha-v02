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
  },
  {
    name: "Lamu Island",
    coordinates: {
      lat: -2.2697,
      lng: 40.9025
    }
  },
  {
    name: "Kakamega Forest",
    coordinates: {
      lat: 0.2827,
      lng: 34.8511
    }
  },
  {
    name: "Nairobi National Park",
    coordinates: {
      lat: -1.3652,
      lng: 36.8473
    }
  },
  {
    name: "Amboseli National Park",
    coordinates: {
      lat: -2.6527,
      lng: 37.2606
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
  },
  {
    id: "2",
    title: "Kakamega Forest Reforestation Project",
    description: "Large-scale reforestation initiative to restore native forest cover and create carbon sinks in Western Kenya",
    type: "environmental",
    category: "reforestation",
    projectType: "tree-planting",
    startDate: "2023-09-15T00:00:00Z",
    isRecurring: true,
    recurringInterval: "monthly",
    location: mockLocations[4],
    impactMetrics: [
      {
        id: "m3",
        name: "Trees Planted",
        unit: "trees",
        value: 25000,
        type: "environmental",
        verifiedAt: "2024-02-20T14:30:00Z",
        verifiedBy: "1"
      },
      {
        id: "m4",
        name: "Carbon Offset",
        unit: "tonnes CO2",
        value: 1250,
        type: "environmental",
        verifiedAt: "2024-02-20T14:30:00Z",
        verifiedBy: "1"
      },
      {
        id: "m5",
        name: "Land Restored",
        unit: "hectares",
        value: 120,
        type: "environmental"
      },
      {
        id: "m6",
        name: "Local Jobs Created",
        unit: "jobs",
        value: 45,
        type: "economic"
      },
      {
        id: "m7",
        name: "People Impacted",
        unit: "people",
        value: 2800,
        type: "social"
      }
    ],
    sdgGoals: [13, 15, 8], // Climate Action, Life on Land, Decent Work
    funding: {
      target: 75000,
      received: 52000,
      currency: "USD",
      type: "grant"
    },
    evidence: [
      {
        id: "e2",
        type: "image",
        url: "/images/reforestation-1.jpg",
        description: "Community tree planting day",
        timestamp: "2024-01-15T10:00:00Z",
        location: mockLocations[4],
        fileType: "image/jpeg",
        fileSize: 1548000,
        fileName: "reforestation-1.jpg"
      },
      {
        id: "e3",
        type: "document",
        url: "/documents/carbon-assessment.pdf",
        description: "Carbon sequestration assessment report",
        timestamp: "2024-02-10T14:00:00Z",
        location: mockLocations[4],
        fileType: "application/pdf",
        fileSize: 2450000,
        fileName: "carbon-assessment.pdf"
      }
    ],
    images: [
      "/images/reforestation-1.jpg",
      "/images/reforestation-2.jpg",
      "/images/reforestation-3.jpg"
    ],
    status: "approved",
    createdAt: "2023-09-01T00:00:00Z",
    updatedAt: "2024-02-20T14:30:00Z",
    submitter: {
      id: "3",
      name: "David Omondi",
      organization: "Green Future Initiative",
      avatar: "/avatars/david.jpg",
      contact: {
        email: "david@greenfuture.org",
        phone: "+254711234567",
        whatsapp: "+254711234567"
      },
      region: "Western",
      ward: "Kakamega Central"
    }
  },
  {
    id: "3",
    title: "Lamu Island Solar Microgrid",
    description: "Community-owned solar microgrid providing clean energy access to remote coastal communities",
    type: "environmental",
    category: "energy",
    projectType: "renewable-energy",
    startDate: "2023-11-01T00:00:00Z",
    isRecurring: false,
    location: mockLocations[3],
    impactMetrics: [
      {
        id: "m8",
        name: "Households Connected",
        unit: "households",
        value: 350,
        type: "social",
        verifiedAt: "2024-03-05T11:15:00Z",
        verifiedBy: "2"
      },
      {
        id: "m9",
        name: "Carbon Offset",
        unit: "tonnes CO2",
        value: 780,
        type: "environmental",
        verifiedAt: "2024-03-05T11:15:00Z",
        verifiedBy: "2"
      },
      {
        id: "m10",
        name: "Energy Generated",
        unit: "kWh/month",
        value: 12500,
        type: "environmental"
      },
      {
        id: "m11",
        name: "People Impacted",
        unit: "people",
        value: 1750,
        type: "social"
      },
      {
        id: "m12",
        name: "Diesel Generators Replaced",
        unit: "generators",
        value: 45,
        type: "environmental"
      }
    ],
    sdgGoals: [7, 11, 13], // Affordable and Clean Energy, Sustainable Cities, Climate Action
    funding: {
      target: 120000,
      received: 95000,
      currency: "USD",
      type: "investment"
    },
    evidence: [
      {
        id: "e4",
        type: "image",
        url: "/images/solar-1.jpg",
        description: "Solar panel installation",
        timestamp: "2024-01-20T09:30:00Z",
        location: mockLocations[3],
        fileType: "image/jpeg",
        fileSize: 1845000,
        fileName: "solar-1.jpg"
      },
      {
        id: "e5",
        type: "video",
        url: "/videos/community-testimonial.mp4",
        description: "Community testimonials about impact",
        timestamp: "2024-02-15T16:00:00Z",
        location: mockLocations[3],
        fileType: "video/mp4",
        fileSize: 24500000,
        fileName: "community-testimonial.mp4"
      }
    ],
    images: [
      "/images/solar-1.jpg",
      "/images/solar-2.jpg",
      "/images/solar-3.jpg"
    ],
    status: "approved",
    createdAt: "2023-10-15T00:00:00Z",
    updatedAt: "2024-03-05T11:15:00Z",
    submitter: {
      id: "4",
      name: "Amina Hassan",
      organization: "Coastal Energy Solutions",
      avatar: "/avatars/amina.jpg",
      contact: {
        email: "amina@coastalenergy.org",
        phone: "+254722987654",
        whatsapp: "+254722987654"
      },
      region: "Coast",
      ward: "Lamu East"
    }
  },
  {
    id: "4",
    title: "Nairobi Waste-to-Energy Facility",
    description: "Converting urban waste into clean energy while reducing landfill pressure and creating green jobs",
    type: "waste-management",
    category: "energy",
    projectType: "waste-management",
    startDate: "2023-08-01T00:00:00Z",
    isRecurring: false,
    location: mockLocations[5],
    impactMetrics: [
      {
        id: "m13",
        name: "Waste Processed",
        unit: "tonnes/month",
        value: 850,
        type: "environmental",
        verifiedAt: "2024-04-10T13:45:00Z",
        verifiedBy: "1"
      },
      {
        id: "m14",
        name: "Energy Generated",
        unit: "MWh/month",
        value: 320,
        type: "environmental",
        verifiedAt: "2024-04-10T13:45:00Z",
        verifiedBy: "1"
      },
      {
        id: "m15",
        name: "Carbon Offset",
        unit: "tonnes CO2",
        value: 2100,
        type: "environmental"
      },
      {
        id: "m16",
        name: "Jobs Created",
        unit: "jobs",
        value: 75,
        type: "economic"
      },
      {
        id: "m17",
        name: "People Impacted",
        unit: "people",
        value: 25000,
        type: "social"
      }
    ],
    sdgGoals: [7, 9, 11, 12], // Clean Energy, Industry Innovation, Sustainable Cities, Responsible Consumption
    funding: {
      target: 350000,
      received: 275000,
      currency: "USD",
      type: "investment"
    },
    evidence: [
      {
        id: "e6",
        type: "image",
        url: "/images/waste-energy-1.jpg",
        description: "Facility operations",
        timestamp: "2024-03-05T11:00:00Z",
        location: mockLocations[5],
        fileType: "image/jpeg",
        fileSize: 2145000,
        fileName: "waste-energy-1.jpg"
      },
      {
        id: "e7",
        type: "document",
        url: "/documents/emissions-report.pdf",
        description: "Emissions reduction verification report",
        timestamp: "2024-04-01T09:30:00Z",
        location: mockLocations[5],
        fileType: "application/pdf",
        fileSize: 3250000,
        fileName: "emissions-report.pdf"
      }
    ],
    images: [
      "/images/waste-energy-1.jpg",
      "/images/waste-energy-2.jpg",
      "/images/waste-energy-3.jpg"
    ],
    status: "approved",
    createdAt: "2023-07-15T00:00:00Z",
    updatedAt: "2024-04-10T13:45:00Z",
    submitter: {
      id: "5",
      name: "James Mwangi",
      organization: "Urban Sustainability Partners",
      avatar: "/avatars/james.jpg",
      contact: {
        email: "james@urbansustainability.co.ke",
        phone: "+254733456789",
        whatsapp: "+254733456789"
      },
      region: "Nairobi",
      ward: "Embakasi"
    }
  },
  {
    id: "5",
    title: "Amboseli Sustainable Water Management",
    description: "Community-led water conservation and management system supporting both wildlife and local communities",
    type: "environmental",
    category: "water",
    projectType: "water-sanitation",
    startDate: "2023-10-01T00:00:00Z",
    isRecurring: true,
    recurringInterval: "quarterly",
    location: mockLocations[6],
    impactMetrics: [
      {
        id: "m18",
        name: "Water Conserved",
        unit: "million liters/year",
        value: 125,
        type: "environmental",
        verifiedAt: "2024-03-25T10:30:00Z",
        verifiedBy: "2"
      },
      {
        id: "m19",
        name: "People with Water Access",
        unit: "people",
        value: 8500,
        type: "social",
        verifiedAt: "2024-03-25T10:30:00Z",
        verifiedBy: "2"
      },
      {
        id: "m20",
        name: "Land Protected",
        unit: "hectares",
        value: 3500,
        type: "environmental"
      },
      {
        id: "m21",
        name: "Carbon Sequestered",
        unit: "tonnes CO2",
        value: 850,
        type: "environmental"
      },
      {
        id: "m22",
        name: "Wildlife Supported",
        unit: "species",
        value: 35,
        type: "environmental"
      }
    ],
    sdgGoals: [6, 13, 15], // Clean Water and Sanitation, Climate Action, Life on Land
    funding: {
      target: 180000,
      received: 120000,
      currency: "USD",
      type: "grant"
    },
    evidence: [
      {
        id: "e8",
        type: "image",
        url: "/images/water-1.jpg",
        description: "Water conservation infrastructure",
        timestamp: "2024-02-10T08:45:00Z",
        location: mockLocations[6],
        fileType: "image/jpeg",
        fileSize: 1845000,
        fileName: "water-1.jpg"
      },
      {
        id: "e9",
        type: "video",
        url: "/videos/water-management.mp4",
        description: "Community water management practices",
        timestamp: "2024-03-15T14:30:00Z",
        location: mockLocations[6],
        fileType: "video/mp4",
        fileSize: 28500000,
        fileName: "water-management.mp4"
      }
    ],
    images: [
      "/images/water-1.jpg",
      "/images/water-2.jpg",
      "/images/water-3.jpg"
    ],
    status: "approved",
    createdAt: "2023-09-15T00:00:00Z",
    updatedAt: "2024-03-25T10:30:00Z",
    submitter: {
      id: "6",
      name: "Sarah Kimani",
      organization: "Maasai Conservation Trust",
      avatar: "/avatars/sarah.jpg",
      contact: {
        email: "sarah@maasaiconservation.org",
        phone: "+254744123456",
        whatsapp: "+254744123456"
      },
      region: "Rift Valley",
      ward: "Kajiado South"
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
