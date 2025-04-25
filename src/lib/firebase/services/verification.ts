import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config';
import { VerificationSubmission } from '@/types/verification';

const VERIFICATIONS_COLLECTION = 'verifications';
const PROJECTS_COLLECTION = 'projects';

/**
 * Get verification submissions with pagination
 */
export const getVerifications = async (
  status?: string,
  lastVisible?: DocumentSnapshot,
  pageSize = 10
): Promise<{ verifications: VerificationSubmission[]; lastVisible: DocumentSnapshot | null }> => {
  try {
    let constraints: any[] = [orderBy('createdAt', 'desc'), limit(pageSize)];
    
    // Add status filter if provided
    if (status) {
      constraints.push(where('status', '==', status));
    }
    
    // Add pagination if lastVisible is provided
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }
    
    const q = query(collection(db, VERIFICATIONS_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);
    
    const verifications: VerificationSubmission[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      verifications.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as VerificationSubmission);
    });
    
    const newLastVisible = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[querySnapshot.docs.length - 1] 
      : null;
    
    return { verifications, lastVisible: newLastVisible };
  } catch (error) {
    console.error('Error getting verifications:', error);
    throw error;
  }
};

/**
 * Get verification submissions by project ID
 */
export const getVerificationsByProject = async (projectId: string): Promise<VerificationSubmission[]> => {
  try {
    const q = query(
      collection(db, VERIFICATIONS_COLLECTION),
      where('projectId', '==', projectId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const verifications: VerificationSubmission[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      verifications.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as VerificationSubmission);
    });
    
    return verifications;
  } catch (error) {
    console.error('Error getting verifications by project:', error);
    throw error;
  }
};

/**
 * Get verification submissions by verifier ID
 */
export const getVerificationsByVerifier = async (verifierId: string): Promise<VerificationSubmission[]> => {
  try {
    const q = query(
      collection(db, VERIFICATIONS_COLLECTION),
      where('verifierId', '==', verifierId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const verifications: VerificationSubmission[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      verifications.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as VerificationSubmission);
    });
    
    return verifications;
  } catch (error) {
    console.error('Error getting verifications by verifier:', error);
    throw error;
  }
};

/**
 * Get pending verifications for verifiers to review
 */
export const getPendingVerifications = async (
  pageSize = 10,
  lastVisible?: DocumentSnapshot
): Promise<{ verifications: VerificationSubmission[]; lastVisible: DocumentSnapshot | null }> => {
  try {
    let constraints: any[] = [
      where('status', '==', 'pending'),
      orderBy('createdAt', 'asc'),
      limit(pageSize)
    ];
    
    // Add pagination if lastVisible is provided
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }
    
    const q = query(collection(db, VERIFICATIONS_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);
    
    const verifications: VerificationSubmission[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      verifications.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as VerificationSubmission);
    });
    
    const newLastVisible = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[querySnapshot.docs.length - 1] 
      : null;
    
    return { verifications, lastVisible: newLastVisible };
  } catch (error) {
    console.error('Error getting pending verifications:', error);
    throw error;
  }
};

/**
 * Get a verification by ID
 */
export const getVerificationById = async (id: string): Promise<VerificationSubmission | null> => {
  try {
    const verificationDoc = await getDoc(doc(db, VERIFICATIONS_COLLECTION, id));
    
    if (!verificationDoc.exists()) {
      return null;
    }
    
    const data = verificationDoc.data();
    return {
      id: verificationDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || new Date(),
      updatedAt: data.updatedAt?.toDate?.() || new Date(),
    } as VerificationSubmission;
  } catch (error) {
    console.error('Error getting verification by ID:', error);
    throw error;
  }
};

/**
 * Create a new verification submission
 */
export const createVerification = async (
  verification: Omit<VerificationSubmission, 'id'>
): Promise<VerificationSubmission> => {
  try {
    const verificationData = {
      ...verification,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, VERIFICATIONS_COLLECTION), verificationData);
    
    return {
      id: docRef.id,
      ...verification,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating verification:', error);
    throw error;
  }
};

/**
 * Submit a project for verification
 * This creates a verification request and updates the project status
 */
export const submitProjectForVerification = async (
  projectId: string,
  submitterId: string,
  metrics: any[],
  evidence: any[]
): Promise<string> => {
  try {
    // Create verification submission
    const verificationData = {
      projectId,
      submitterId,
      metrics,
      evidence,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, VERIFICATIONS_COLLECTION), verificationData);
    
    // Update project status to 'in-review'
    await updateDoc(doc(db, PROJECTS_COLLECTION, projectId), {
      status: 'in-review',
      updatedAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error submitting project for verification:', error);
    throw error;
  }
};

/**
 * Assign a verification to a verifier
 */
export const assignVerification = async (
  verificationId: string,
  verifierId: string
): Promise<void> => {
  try {
    await updateDoc(doc(db, VERIFICATIONS_COLLECTION, verificationId), {
      verifierId,
      status: 'assigned',
      assignedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error assigning verification:', error);
    throw error;
  }
};

/**
 * Update a verification submission
 */
export const updateVerification = async (
  id: string, 
  verification: Partial<VerificationSubmission>
): Promise<void> => {
  try {
    const verificationRef = doc(db, VERIFICATIONS_COLLECTION, id);
    
    await updateDoc(verificationRef, {
      ...verification,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating verification:', error);
    throw error;
  }
};

/**
 * Complete a verification (approve or reject)
 * This updates both the verification and the project status
 */
export const completeVerification = async (
  verificationId: string,
  projectId: string,
  status: 'approved' | 'rejected',
  feedback: string,
  verifiedMetrics?: any[]
): Promise<void> => {
  try {
    // Update verification status
    await updateDoc(doc(db, VERIFICATIONS_COLLECTION, verificationId), {
      status,
      feedback,
      verifiedMetrics,
      verifiedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // Update project status based on verification result
    await updateDoc(doc(db, PROJECTS_COLLECTION, projectId), {
      status: status === 'approved' ? 'verified' : 'rejected',
      feedback,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error completing verification:', error);
    throw error;
  }
};

/**
 * Upload verification evidence
 */
export const uploadVerificationEvidence = async (
  verificationId: string,
  file: File,
  evidenceType: string
): Promise<string> => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${evidenceType}_${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `verifications/${verificationId}/evidence/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading verification evidence:', error);
    throw error;
  }
};

/**
 * Get verification statistics for a verifier
 */
export const getVerifierStats = async (verifierId: string): Promise<{
  total: number;
  approved: number;
  rejected: number;
  pending: number;
}> => {
  try {
    const q = query(
      collection(db, VERIFICATIONS_COLLECTION),
      where('verifierId', '==', verifierId)
    );
    
    const querySnapshot = await getDocs(q);
    
    let total = 0;
    let approved = 0;
    let rejected = 0;
    let pending = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      total++;
      
      if (data.status === 'approved') {
        approved++;
      } else if (data.status === 'rejected') {
        rejected++;
      } else if (data.status === 'pending' || data.status === 'assigned') {
        pending++;
      }
    });
    
    return { total, approved, rejected, pending };
  } catch (error) {
    console.error('Error getting verifier stats:', error);
    throw error;
  }
};
