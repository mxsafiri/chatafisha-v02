import type { User } from "@/types"
import type { ProjectSubmission } from "@/types/project"
import { mockProjects } from "@/lib/data/mock"
import { mockLocations } from "@/lib/data/mock"

export const mockSubmitter: User = {
  id: "s1",
  name: "Sarah Johnson",
  email: "sarah@ecowarriors.org",
  avatar: "/avatars/sarah.jpg",
  role: "user",
  bio: "Environmental activist and community organizer focused on waste management solutions in coastal regions.",
  location: mockLocations[1], // Mombasa Beach
  createdAt: "2024-01-10T00:00:00Z",
  updatedAt: "2024-04-15T00:00:00Z",
  metrics: {
    projectsVerified: 0,
    peopleImpacted: 1250,
    wasteCollected: 3500,
    treesPlanted: 150
  },
  settings: {
    emailNotifications: true,
    theme: "system",
    language: "en"
  }
}

// Filter projects submitted by this user
export const submitterProjects = mockProjects.filter(
  project => project.submitter.id === "2" // Using ID from mock data
)

// Create verification status data for the submitter's projects
export const submitterVerifications = submitterProjects.map(project => ({
  projectId: project.id,
  projectTitle: project.title,
  status: project.status,
  submittedAt: project.createdAt,
  lastUpdated: project.updatedAt,
  verifierFeedback: project.status === "rejected" 
    ? "The evidence provided does not sufficiently demonstrate the claimed impact. Please provide additional documentation."
    : project.status === "approved"
    ? "All evidence verified and impact metrics confirmed. Great work!"
    : "",
  nextSteps: project.status === "rejected"
    ? "Resubmit with additional evidence"
    : project.status === "in-review"
    ? "Awaiting verifier review"
    : project.status === "submitted"
    ? "Waiting to be assigned to a verifier"
    : "Project verified successfully",
  assignedVerifier: project.status === "in-review" || project.status === "approved" ? {
    id: "1",
    name: "John Doe",
    avatar: "/avatars/john.jpg"
  } : null
}))

// Create impact metrics summary
export const submitterImpactSummary = {
  totalProjects: submitterProjects.length,
  verifiedProjects: submitterProjects.filter(p => p.status === "approved").length,
  pendingProjects: submitterProjects.filter(p => ["submitted", "in-review"].includes(p.status)).length,
  rejectedProjects: submitterProjects.filter(p => p.status === "rejected").length,
  totalFunding: submitterProjects.reduce((sum, p) => sum + p.funding.received, 0),
  targetFunding: submitterProjects.reduce((sum, p) => sum + p.funding.target, 0),
  impactMetrics: {
    wasteCollected: submitterProjects.reduce((sum, p) => {
      const wasteMetric = p.impactMetrics.find(m => m.name === "Waste Collected")
      return sum + (wasteMetric ? wasteMetric.value : 0)
    }, 0),
    peopleImpacted: submitterProjects.reduce((sum, p) => {
      const peopleMetric = p.impactMetrics.find(m => m.name === "Volunteers Engaged" || m.name === "People Impacted")
      return sum + (peopleMetric ? peopleMetric.value : 0)
    }, 0),
    treesPlanted: submitterProjects.reduce((sum, p) => {
      const treesMetric = p.impactMetrics.find(m => m.name === "Trees Planted")
      return sum + (treesMetric ? treesMetric.value : 0)
    }, 0)
  },
  monthlyProgress: [
    { month: "Jan", projects: 1, funding: 1000, impact: 50 },
    { month: "Feb", projects: 1, funding: 1500, impact: 75 },
    { month: "Mar", projects: 2, funding: 2500, impact: 125 },
    { month: "Apr", projects: 1, funding: 2000, impact: 100 },
    { month: "May", projects: 2, funding: 3000, impact: 150 },
    { month: "Jun", projects: 1, funding: 2500, impact: 125 }
  ]
}
