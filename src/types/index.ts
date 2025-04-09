export type UserRole = 'user' | 'admin' | 'verifier';

export interface UserMetrics {
  projectsVerified: number;
  peopleImpacted: number;
  wasteCollected: number;
  treesPlanted: number;
  totalProjects: number;
  fundingReceived: number;
  fundingGiven: number;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  language: string;
  currency: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location: string;
  joinedAt: string;
  metrics: UserMetrics;
  recentActivity: Activity[];
  settings?: UserSettings;
}

export interface Activity {
  id: string;
  type: "project_created" | "project_verified" | "impact_achieved" | "funding_received";
  title: string;
  description: string;
  date: string;
  projectId?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "pending" | "verified" | "rejected";
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  location: string;
  images: string[];
  funding: {
    received: number;
    target: number;
  };
  metrics: {
    peopleImpacted: number;
    wasteCollected: number;
    treesPlanted: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ImpactProject {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  updatedAt: string;
  funding: {
    target: number;
    received: number;
  };
  impactMetrics: {
    peopleImpacted: number;
    wasteCollected: number;
    treesPlanted: number;
  };
  category: string;
  sdgGoals: number[];
  images: string[];
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface SDGGoal {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export interface Notification {
  id: string;
  type: 'verification' | 'funding' | 'message' | 'system';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  link?: string;
}
