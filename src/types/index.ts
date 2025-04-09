export type UserRole = 'user' | 'admin' | 'verifier';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  location?: string;
  bio?: string;
  joinedAt: string;
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
