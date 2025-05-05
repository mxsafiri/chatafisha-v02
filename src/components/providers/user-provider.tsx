"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { mockUsers } from "@/lib/data/mock"
import { mockSubmitter } from "@/lib/data/mock-submitter"
import { mockVerifier } from "@/lib/data/mock-verifier"
import type { User, UserRole } from "@/types"
import type { Verifier } from "@/types/verification"
import { getUserData } from "@/actions/auth"

// DEMO MODE FLAG - Set to true to bypass authentication for demo purposes
const DEMO_MODE = true;

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
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(DEMO_MODE)
  const [thirdwebUser, setThirdwebUser] = useState<User | null>(null)

  // Update mock user when userType changes
  useEffect(() => {
    setMockUser(getMockUser())
  }, [userType])

  // Attempt to get thirdweb user data when not in demo mode
  useEffect(() => {
    const fetchThirdwebUser = async () => {
      if (!DEMO_MODE) {
        try {
          setIsLoading(true)
          const userData = await getUserData()
          
          if (userData) {
            setThirdwebUser({
              id: userData.id,
              name: userData.address ? `${userData.address.slice(0, 6)}...${userData.address.slice(-4)}` : "Unknown User",
              email: "",
              role: userData.role as UserRole,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            } as User)
            setIsAuthenticated(true)
            
            // Set userType based on role from thirdweb
            if (userData.role) {
              setUserType(userData.role as UserType)
            }
          } else {
            setThirdwebUser(null)
            setIsAuthenticated(false)
          }
        } catch (error) {
          console.error("Error fetching thirdweb user data:", error)
          setThirdwebUser(null)
          setIsAuthenticated(false)
        } finally {
          setIsLoading(false)
        }
      } else {
        // In demo mode, we're already authenticated with mock data
        setIsLoading(false)
      }
    }
    
    fetchThirdwebUser()
  }, [])

  // Determine which user object to use (thirdweb or mock)
  const user = DEMO_MODE ? mockUser : (thirdwebUser || mockUser)
  
  // Compute role-based flags
  const role = user.role
  const isSubmitter = role === "submitter"
  const isVerifier = role === "verifier"
  const isFunder = role === "funder"
  const isAdmin = role === "admin"

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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
