'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  hasRole: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          setIsLoading(true);
          
          if (firebaseUser) {
            // Get user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUser({
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
            } else {
              // If user document doesn't exist but auth does, create minimal user object
              setUser({
                id: firebaseUser.uid,
                name: firebaseUser.displayName || '',
                email: firebaseUser.email || '',
                role: 'user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              });
            }
          } else {
            setUser(null);
          }
        } catch (err) {
          console.error('Error in auth state change:', err);
          setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
          setIsLoading(false);
        }
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Helper function to check if user has a specific role
  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user,
      error,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
