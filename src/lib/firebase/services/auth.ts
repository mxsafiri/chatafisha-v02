import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  Auth,
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { auth, db } from '../config';
import type { User, UserRole } from '@/types';

// Helper function to check if Firebase is initialized
const isFirebaseInitialized = () => {
  if (!auth || !db) {
    console.warn('Firebase is not initialized. Check your environment variables.');
    return false;
  }
  return true;
};

// Helper function to get a typed Firebase Auth instance
const getAuth = (): Auth => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }
  return auth;
};

// Helper function to get a typed Firestore instance
const getDb = (): Firestore => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  return db;
};

/**
 * Sign up a new user with email and password
 * @param email User email
 * @param password User password
 * @param displayName User display name
 * @param role User role (submitter, verifier, funder, admin)
 * @returns User object
 */
export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  role: UserRole = 'submitter'
): Promise<User> => {
  if (!isFirebaseInitialized()) {
    throw new Error('Firebase is not initialized');
  }

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    const firebaseUser = userCredential.user;

    // Update user profile with display name
    if (firebaseUser) {
      await updateProfile(firebaseUser, { displayName });
    }

    // Create user document in Firestore
    const userData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName,
      role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(getDb(), 'users', firebaseUser.uid), userData);

    // Return user data
    return {
      id: firebaseUser.uid,
      name: displayName,
      email: firebaseUser.email || '',
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Sign in a user with email and password
 * @param email User email
 * @param password User password
 * @returns User object
 */
export const signIn = async (email: string, password: string): Promise<User> => {
  if (!isFirebaseInitialized()) {
    throw new Error('Firebase is not initialized');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    const firebaseUser = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(getDb(), 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User document not found');
    }

    const userData = userDoc.data();

    // Update last login timestamp
    await updateDoc(doc(getDb(), 'users', firebaseUser.uid), {
      lastLogin: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Return user data
    return {
      id: firebaseUser.uid,
      name: userData.displayName || firebaseUser.displayName || '',
      email: userData.email || firebaseUser.email || '',
      role: userData.role || 'user',
      createdAt: userData.createdAt?.toDate?.() 
        ? new Date(userData.createdAt.toDate()).toISOString() 
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Sign in a user with Google
 * @param role Optional role to assign if this is a new user
 * @returns User object
 */
export const signInWithGoogle = async (role: UserRole = 'submitter'): Promise<User> => {
  if (!isFirebaseInitialized()) {
    throw new Error('Firebase is not initialized');
  }

  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(getAuth(), provider);
    const firebaseUser = userCredential.user;

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(getDb(), 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        avatar: firebaseUser.photoURL,
      };

      await setDoc(doc(getDb(), 'users', firebaseUser.uid), userData);

      // Return new user data
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        role,
        avatar: firebaseUser.photoURL || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else {
      // Update existing user's last login
      const userData = userDoc.data();
      
      await updateDoc(doc(getDb(), 'users', firebaseUser.uid), {
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Return existing user data
      return {
        id: firebaseUser.uid,
        name: userData.displayName || firebaseUser.displayName || '',
        email: userData.email || firebaseUser.email || '',
        role: userData.role || 'user',
        avatar: userData.avatar || firebaseUser.photoURL || undefined,
        createdAt: userData.createdAt?.toDate?.() 
          ? new Date(userData.createdAt.toDate()).toISOString() 
          : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  if (!isFirebaseInitialized()) {
    throw new Error('Firebase is not initialized');
  }

  try {
    await firebaseSignOut(getAuth());
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Send a password reset email
 * @param email User email
 */
export const resetPassword = async (email: string): Promise<void> => {
  if (!isFirebaseInitialized()) {
    throw new Error('Firebase is not initialized');
  }

  try {
    await sendPasswordResetEmail(getAuth(), email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

/**
 * Get the current user data
 * @returns User object or null if not signed in
 */
export const getCurrentUser = async (): Promise<User | null> => {
  if (!isFirebaseInitialized()) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (firebaseUser) => {
        unsubscribe();
        
        if (!firebaseUser) {
          resolve(null);
          return;
        }

        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(getDb(), 'users', firebaseUser.uid));
          
          if (!userDoc.exists()) {
            resolve({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              role: 'user',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            return;
          }

          const userData = userDoc.data();

          // Return user data
          resolve({
            id: firebaseUser.uid,
            name: userData.displayName || firebaseUser.displayName || '',
            email: userData.email || firebaseUser.email || '',
            role: userData.role || 'user',
            avatar: userData.avatar || firebaseUser.photoURL || undefined,
            createdAt: userData.createdAt?.toDate?.() 
              ? new Date(userData.createdAt.toDate()).toISOString() 
              : new Date().toISOString(),
            updatedAt: userData.updatedAt?.toDate?.() 
              ? new Date(userData.updatedAt.toDate()).toISOString() 
              : new Date().toISOString(),
          });
        } catch (error) {
          console.error('Error getting current user:', error);
          reject(error);
        }
      },
      reject
    );
  });
};

/**
 * Update a user's role
 * @param userId User ID
 * @param role New role
 */
export const updateUserRole = async (userId: string, role: UserRole): Promise<void> => {
  if (!isFirebaseInitialized()) {
    throw new Error('Firebase is not initialized');
  }

  try {
    await updateDoc(doc(getDb(), 'users', userId), {
      role,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

/**
 * Check if a user has a specific role
 * @param user User object
 * @param role Role to check
 * @returns Boolean indicating if user has the role
 */
export const hasRole = (user: User | null, role: UserRole): boolean => {
  if (!user) return false;
  return user.role === role;
};
