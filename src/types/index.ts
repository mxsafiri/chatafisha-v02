import type { ImpactProject } from "./project"

export type UserRole = 'user' | 'admin' | 'verifier';

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
  metrics: UserMetrics
  recentActivity: Activity[]
  settings?: UserSettings
  impactPoints: number
}

export interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
}

export interface SDGGoal {
  id: number
  name: string
  description: string
  icon: string
}

export interface Notification {
  id: string;
  type: "verification" | "funding" | "message" | "system";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  link?: string;
}

export type { ImpactProject }
