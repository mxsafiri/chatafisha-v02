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
        console.log('Firebase app initialized successfully');
      } else {
        app = getApp();
        console.log('Using existing Firebase app');
      }
      
      // Initialize Firebase services
      try {
        auth = getAuth(app);
        console.log('Firebase Auth initialized successfully');
      } catch (authError) {
        console.error('Error initializing Firebase Auth:', authError);
      }
      
      try {
        db = getFirestore(app);
        console.log('Firestore initialized successfully');
      } catch (dbError) {
        console.error('Error initializing Firestore:', dbError);
      }
      
      try {
        storage = getStorage(app);
        console.log('Firebase Storage initialized successfully');
      } catch (storageError) {
        console.error('Error initializing Firebase Storage:', storageError);
      }
      
      try {
        functions = getFunctions(app);
        console.log('Firebase Functions initialized successfully');
      } catch (functionsError) {
        console.error('Error initializing Firebase Functions:', functionsError);
      }
      
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

// Helper functions to safely access Firebase services
const getFirebaseApp = (): FirebaseApp => {
  if (!app) {
    throw new Error('Firebase app not initialized');
  }
  return app;
};

const getFirebaseAuth = (): Auth => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }
  return auth;
};

const getFirebaseFirestore = (): Firestore => {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  return db;
};

const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage) {
    throw new Error('Firebase Storage not initialized');
  }
  return storage;
};

const getFirebaseFunctions = (): Functions => {
  if (!functions) {
    throw new Error('Firebase Functions not initialized');
  }
  return functions;
};

export { 
  app, 
  auth, 
  db, 
  storage, 
  functions,
  getFirebaseApp,
  getFirebaseAuth,
  getFirebaseFirestore,
  getFirebaseStorage,
  getFirebaseFunctions
};
