// Import Firebase config
import { auth, db, storage, functions } from '../config';

// Import service functions
import { 
  signUp, 
  signIn, 
  signInWithGoogle, 
  signOut, 
  resetPassword, 
  getCurrentUser, 
  updateUserRole, 
  hasRole 
} from './auth';

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  deleteProjectImage
} from './projects';

import {
  getVerifications,
  getVerification,
  createVerification,
  submitForVerification,
  assignVerification,
  updateVerification,
  uploadVerificationEvidence
} from './verification';

import {
  fundProject,
  getProjectFunding,
  getFunderTransactions,
  getProjectTotalFunding,
  getFunderStats
} from './funding';

// Create service objects with Firebase services
export const authService = {
  // Auth functions
  signUp,
  signIn,
  signInWithGoogle,
  signOut,
  resetPassword,
  getCurrentUser,
  updateUserRole,
  hasRole,
  // Firebase Auth instance
  auth
};

export const projectsService = {
  // Project functions
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  deleteProjectImage,
  // Firebase instances
  db,
  storage
};

export const verificationService = {
  // Verification functions
  getVerifications,
  getVerification,
  createVerification,
  submitForVerification,
  assignVerification,
  updateVerification,
  uploadVerificationEvidence,
  // Firebase instances
  db,
  storage
};

export const fundingService = {
  // Funding functions
  fundProject,
  getProjectFunding,
  getFunderTransactions,
  getProjectTotalFunding,
  getFunderStats,
  // Firebase instances
  db,
  functions
};
