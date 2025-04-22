import type { Verifier } from "@/types/verification"

export const mockVerifier: Verifier = {
  id: "v1",
  name: "John Doe",
  avatar: "/avatars/john.jpg",
  email: "john@example.com",
  role: "verifier",
  stats: {
    totalVerifications: 42,
    approved: 36,
    flagged: 4,
    rejected: 2
  },
  badges: ["Expert Verifier", "Environmental Specialist", "Community Leader"],
  reputation: 4.8,
  joinedAt: "2024-01-15T00:00:00Z"
}
