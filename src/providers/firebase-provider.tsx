'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { User } from '@/types';
import { getUserById } from '@/lib/firebase/services/users';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  error: null,
});

export const useFirebase = () => useContext(FirebaseContext);

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        try {
          setLoading(true);
          
          if (firebaseUser) {
            // Get user data from Firestore
            const userData = await getUserById(firebaseUser.uid);
            
            if (userData) {
              setUser(userData);
            } else {
              // If user document doesn't exist but auth does, create minimal user object
              setUser({
                id: firebaseUser.uid,
                email: firebaseUser.email || '',
                name: firebaseUser.displayName || '',
                role: 'user',
              });
            }
          } else {
            setUser(null);
          }
        } catch (err) {
          console.error('Error in auth state change:', err);
          setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
          setLoading(false);
        }
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, loading, error }}>
      {children}
    </FirebaseContext.Provider>
  );
};
