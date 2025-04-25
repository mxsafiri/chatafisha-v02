import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config';
import { User } from '@/types';

const USERS_COLLECTION = 'users';

/**
 * Get a user by ID
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, id));
    
    if (!userDoc.exists()) {
      return null;
    }
    
    const data = userDoc.data();
    return {
      id: userDoc.id,
      email: data.email || '',
      name: data.displayName || '',
      role: data.role || 'user',
      profileImage: data.profileImage || null,
      bio: data.bio || null,
      metrics: data.metrics || null,
    } as User;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
};

/**
 * Get users by role
 */
export const getUsersByRole = async (role: string, limit = 10): Promise<User[]> => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      where('role', '==', role),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(q);
    
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        id: doc.id,
        email: data.email || '',
        name: data.displayName || '',
        role: data.role || 'user',
        profileImage: data.profileImage || null,
        bio: data.bio || null,
        metrics: data.metrics || null,
      } as User);
    });
    
    return users;
  } catch (error) {
    console.error('Error getting users by role:', error);
    throw error;
  }
};

/**
 * Update a user profile
 */
export const updateUserProfile = async (
  userId: string, 
  userData: Partial<User>
): Promise<void> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Upload user profile image
 */
export const uploadProfileImage = async (
  userId: string, 
  file: File
): Promise<string> => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `profile_${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `users/${userId}/profile/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Update user document with new profile image URL
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      profileImage: downloadURL,
      updatedAt: serverTimestamp(),
    });
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

/**
 * Delete user profile image
 */
export const deleteProfileImage = async (userId: string, imageUrl: string): Promise<void> => {
  try {
    // Extract the path from the URL
    const url = new URL(imageUrl);
    const path = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
    const imageRef = ref(storage, path);
    
    await deleteObject(imageRef);
    
    // Update user document to remove profile image URL
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      profileImage: null,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error deleting profile image:', error);
    throw error;
  }
};

/**
 * Update user metrics
 */
export const updateUserMetrics = async (
  userId: string, 
  metrics: Record<string, any>
): Promise<void> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    
    await updateDoc(userRef, {
      metrics,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user metrics:', error);
    throw error;
  }
};
