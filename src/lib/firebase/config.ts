import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';

// Check if we're running on the client side and not during build
const isBrowser = typeof window !== 'undefined';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase environment variables are defined
const hasValidConfig = () => {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
      !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 
      !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    console.warn('Firebase configuration is missing or incomplete');
    return false;
  }
  return true;
};

// Initialize Firebase conditionally
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let functions: Functions | undefined;

// Only initialize Firebase if we're in the browser
if (isBrowser) {
  try {
    if (hasValidConfig()) {
      // Check if Firebase is already initialized
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApp();
      }
      
      // Initialize Firebase services
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
      functions = getFunctions(app);
      
      console.log('Firebase initialized successfully');
    } else {
      console.warn('Firebase not initialized due to missing configuration');
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.warn('Firebase not initialized - running on server');
}

export { app, auth, db, storage, functions };
