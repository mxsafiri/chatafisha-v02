import type { Verifier, VerificationSubmission } from "@/types/verification"
import { defaultImpactMetrics } from "./impact-metrics"

export const mockVerifier: Verifier = {
  id: "v1",
  name: "John Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  email: "john@example.com",
  role: "verifier",
  stats: {
    totalVerifications: 150,
    approved: 120,
    flagged: 20,
    rejected: 10,
  },
  badges: ["Expert Verifier", "Environmental Specialist"],
  reputation: 4.8,
  joinedAt: "2024-01-01T00:00:00Z",
}

export const mockVerificationSubmissions: VerificationSubmission[] = [
  {
    id: "vs1",
    projectId: "p1",
    title: "Community Beach Cleanup",
    description: "Monthly beach cleanup initiative in Mombasa",
    submittedBy: {
      id: "u1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      organization: "Ocean Guardians"
    },
    type: "waste-management",
    status: "pending",
    evidence: [
      {
        id: "e1",
        type: "image",
        url: "https://source.unsplash.com/random/800x600/?beach-cleanup",
        caption: "Volunteers collecting plastic waste",
        metadata: {
          timestamp: "2025-04-11T08:00:00Z",
          location: {
            lat: -4.0435,
            lng: 39.6682
          },
          deviceInfo: {
            model: "iPhone 15",
            os: "iOS 17"
          },
          fileInfo: {
            size: 2048576,
            type: "image/jpeg",
            hash: "sha256:abc123"
          }
        }
      }
    ],
    location: {
      name: "Nyali Beach, Mombasa",
      coordinates: {
        lat: -4.0435,
        lng: 39.6682
      }
    },
    submittedAt: "2025-04-11T08:00:00Z",
    comments: [],
    impactMetrics: [
      {
        id: "im1",
        metricId: "waste_collected",
        value: 250,
        unit: "kg",
        timestamp: "2025-04-11T08:00:00Z",
        status: "pending",
        evidence: ["e1"]
      },
      {
        id: "im2",
        metricId: "people_impacted",
        value: 50,
        unit: "count",
        timestamp: "2025-04-11T08:00:00Z",
        status: "pending",
        evidence: ["e1"]
      }
    ],
    tags: ["beach-cleanup", "plastic-waste", "community"]
  },
  {
    id: "vs2",
    projectId: "p2",
    title: "Urban Tree Planting Initiative",
    description: "Reforestation project in Nairobi's urban areas",
    submittedBy: {
      id: "u2",
      name: "David Kimani",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      organization: "Green Cities Kenya"
    },
    type: "environmental",
    status: "pending",
    evidence: [
      {
        id: "e2",
        type: "image",
        url: "https://source.unsplash.com/random/800x600/?tree-planting",
        caption: "Community tree planting event",
        metadata: {
          timestamp: "2025-04-10T10:00:00Z",
          location: {
            lat: -1.2921,
            lng: 36.8219
          },
          deviceInfo: {
            model: "Samsung Galaxy S24",
            os: "Android 15"
          },
          fileInfo: {
            size: 1548576,
            type: "image/jpeg",
            hash: "sha256:def456"
          }
        }
      }
    ],
    location: {
      name: "Karura Forest, Nairobi",
      coordinates: {
        lat: -1.2921,
        lng: 36.8219
      }
    },
    submittedAt: "2025-04-10T10:00:00Z",
    comments: [],
    impactMetrics: [
      {
        id: "im3",
        metricId: "trees_planted",
        value: 100,
        unit: "count",
        timestamp: "2025-04-10T10:00:00Z",
        status: "pending",
        evidence: ["e2"]
      },
      {
        id: "im4",
        metricId: "co2_reduced",
        value: 2000,
        unit: "kg",
        timestamp: "2025-04-10T10:00:00Z",
        status: "pending",
        evidence: ["e2"]
      }
    ],
    tags: ["tree-planting", "urban-forest", "climate-action"]
  }
]
