import type { ImpactProject, ImpactMetric, ProjectSubmission } from "./project"

export type UserRole = 'user' | 'admin' | 'verifier' | 'submitter' | 'funder';

export interface UserMetrics {
  projectsVerified: number;
  peopleImpacted: number;
  wasteCollected: number;
  treesPlanted: number;
}

export interface UserSettings {
  emailNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface Location {
  name: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface VerificationEvidence {
  id: string
  type: "image" | "document" | "video"
  url: string
  description: string
  timestamp: string
  location: Location
}

export interface Funding {
  target: number
  received: number
  currency: string
  type: "grant" | "donation" | "investment"
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  bio?: string
  location?: Location
  createdAt: string
  updatedAt: string
  metrics?: UserMetrics
  settings?: UserSettings
}

export interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
  user: User
}

export interface SDGGoal {
  id: number
  name: string
  description: string
  icon: string
  color: string
}

export interface Notification {
  id: string
  type: "verification" | "funding" | "message" | "system"
  title: string
  message: string
  createdAt: string
  read: boolean
  link?: string
  user: User
}

export type { ImpactProject, ImpactMetric, ProjectSubmission }
