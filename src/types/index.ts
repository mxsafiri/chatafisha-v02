export type UserRole = 'community' | 'investor' | 'verifier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  location: string;
  bio: string;
  joinedAt: string;
  metrics?: {
    totalImpact?: number;
    projectsVerified?: number;
    fundingReceived?: number;
    fundingGiven?: number;
  };
}

export interface ImpactProject {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  creator: User;
  location: string;
  impactType: string[];
  sdgGoals: number[];
  metrics: {
    wastePlasticKg?: number;
    wasteOrganicKg?: number;
    treesPlanted?: number;
    peopleImpacted?: number;
    carbonOffset?: number;
  };
  status: 'pending' | 'verified' | 'declined';
  verificationDetails?: {
    verifier?: User;
    verifiedAt?: string;
    comments?: string;
    score?: number;
  };
  media: {
    type: 'image' | 'video';
    url: string;
  }[];
  funding: {
    received: number;
    target: number;
    investors: User[];
  };
}

export interface SDGGoal {
  id: number;
  title: string;
  description: string;
  icon: string;
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
