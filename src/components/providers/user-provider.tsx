"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { mockUsers } from "@/lib/data/mock"
import { mockSubmitter } from "@/lib/data/mock-submitter"
import { mockVerifier } from "@/lib/data/mock-verifier"
import type { User, UserRole } from "@/types"
import type { Verifier } from "@/types/verification"

// Define user types for the dashboard
export type UserType = "submitter" | "verifier" | "funder" | "admin"

interface UserContextType {
  userType: UserType
  setUserType: (type: UserType) => void
  user: User
  role: UserRole
  isSubmitter: boolean
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
      console.log('User type set to:', userType)
    }
  }, [userType])
  
  // Get the appropriate user based on the userType
  let user: User
  let role: UserRole
  
  switch(userType) {
    case "submitter":
      user = mockSubmitter
      role = "user"
      break
    case "verifier":
      // Convert Verifier type to User type with required properties
      const verifierUser: User = {
        ...mockVerifier,
        createdAt: mockVerifier.joinedAt,
        updatedAt: mockVerifier.joinedAt,
        role: "verifier"
      }
      user = verifierUser
      role = "verifier"
      break
    case "admin":
      user = {
        ...mockUsers[0],
        role: "admin" as UserRole
      }
      role = "admin"
      break
    case "funder":
    default:
      user = {
        ...mockUsers[1],
        role: "user" as UserRole
      }
      role = "user"
      break
  }
  
  // Determine if user is a project submitter
  const isSubmitter = userType === "submitter"
  
  const value = {
    userType,
    setUserType,
    user,
    role,
    isSubmitter
  }
  
  // Debug output
  useEffect(() => {
    console.log('UserProvider initialized with:', { userType, role, isSubmitter })
  }, [userType, role, isSubmitter])
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
