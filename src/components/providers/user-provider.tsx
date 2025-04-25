"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { mockUsers } from "@/lib/data/mock"
import { mockSubmitter } from "@/lib/data/mock-submitter"
import { mockVerifier } from "@/lib/data/mock-verifier"
import type { User, UserRole } from "@/types"
import type { Verifier } from "@/types/verification"
import { onAuthStateChanged, Auth } from 'firebase/auth'
import { doc, getDoc, Firestore } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase/config'

// Define user types for the dashboard
export type UserType = "submitter" | "verifier" | "funder" | "admin"

interface UserContextType {
  userType: UserType
  setUserType: (type: UserType) => void
  user: User
  role: UserRole
  isSubmitter: boolean
  isVerifier: boolean
  isFunder: boolean
  isAdmin: boolean
  isAuthenticated: boolean
  isLoading: boolean
  firebaseUser: User | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
  initialUserType?: UserType
}

export function UserProvider({ 
  children, 
  initialUserType = "submitter" 
}: UserProviderProps) {
  // Try to get saved userType from localStorage if available
  const [userType, setUserType] = useState<UserType>(() => {
    if (typeof window !== 'undefined') {
      const savedUserType = localStorage.getItem('chatafisha-user-type')
      return (savedUserType as UserType) || initialUserType
    }
    return initialUserType
  })
  
  // Save userType to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatafisha-user-type', userType)
    }
  }, [userType])

  // Mock user data based on selected user type
  const getMockUser = (): User => {
    switch (userType) {
      case "submitter":
        return mockSubmitter
      case "verifier":
        // Convert Verifier type to User type
        return {
          id: mockVerifier.id,
          name: mockVerifier.name,
          email: mockVerifier.email,
          avatar: mockVerifier.avatar,
          role: "verifier" as UserRole,
          createdAt: mockVerifier.joinedAt,
          updatedAt: mockVerifier.joinedAt
        } as User
      case "funder":
        return {
          ...mockUsers[2],
          role: "funder" as UserRole
        } as User
      case "admin":
        return {
          ...mockUsers[3],
          role: "admin" as UserRole
        } as User
      default:
        return mockSubmitter
    }
  }

  const [mockUser, setMockUser] = useState<User>(getMockUser())

  // Update mock user when userType changes
  useEffect(() => {
    setMockUser(getMockUser())
  }, [userType])

  // Firebase authentication state
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [authError, setAuthError] = useState<Error | null>(null)

  // Listen for Firebase auth state changes
  useEffect(() => {
    // Check if auth is initialized before setting up listener
    if (!auth) {
      console.warn('Firebase Auth is not initialized. Using mock user data instead.');
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth as Auth,
      async (user) => {
        try {
          setIsLoading(true);
          
          if (user) {
            // Check if Firestore is initialized
            if (!db) {
              console.warn('Firestore is not initialized. Using minimal user data from Auth.');
              setFirebaseUser({
                id: user.uid,
                name: user.displayName || '',
                email: user.email || '',
                role: 'user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              } as User);
              setIsLoading(false);
              return;
            }

            // Get user data from Firestore
            const userDoc = await getDoc(doc(db as Firestore, 'users', user.uid));
            
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const firebaseUserData: User = {
                id: user.uid,
                name: userData.displayName || user.displayName || '',
                email: userData.email || user.email || '',
                role: userData.role || 'user',
                avatar: userData.avatar || user.photoURL || undefined,
                createdAt: userData.createdAt?.toDate?.() 
                  ? new Date(userData.createdAt.toDate()).toISOString() 
                  : new Date().toISOString(),
                updatedAt: userData.updatedAt?.toDate?.() 
                  ? new Date(userData.updatedAt.toDate()).toISOString() 
                  : new Date().toISOString(),
              };
              
              setFirebaseUser(firebaseUserData);
              
              // Update userType based on Firebase user role
              if (userData.role === 'submitter' || 
                  userData.role === 'verifier' || 
                  userData.role === 'funder' || 
                  userData.role === 'admin') {
                setUserType(userData.role as UserType);
              }
            } else {
              // If user document doesn't exist but auth does, create minimal user object
              setFirebaseUser({
                id: user.uid,
                name: user.displayName || '',
                email: user.email || '',
                role: 'user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              } as User);
            }
          } else {
            // No user is signed in
            setFirebaseUser(null);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          setAuthError(error as Error);
          // Fall back to mock user data on error
          setFirebaseUser(null);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Auth state change error:', error);
        setAuthError(error as Error);
        setIsLoading(false);
      }
    );
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Determine which user to use - Firebase user if available, otherwise mock user
  const user = firebaseUser || mockUser
  const role = user.role as UserRole

  // Role checks
  const isSubmitter = role === 'submitter' as UserRole
  const isVerifier = role === 'verifier' as UserRole
  const isFunder = role === 'funder' as UserRole
  const isAdmin = role === 'admin' as UserRole
  const isAuthenticated = !!firebaseUser

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        user,
        role,
        isSubmitter,
        isVerifier,
        isFunder,
        isAdmin,
        isAuthenticated,
        isLoading,
        firebaseUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
