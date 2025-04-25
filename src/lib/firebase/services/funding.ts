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
  increment,
} from 'firebase/firestore';
import { db } from '../config';

const FUNDING_COLLECTION = 'funding';
const PROJECTS_COLLECTION = 'projects';
const USERS_COLLECTION = 'users';

export interface FundingTransaction {
  id: string;
  projectId: string;
  funderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  transactionDate: string;
  notes?: string;
}

/**
 * Fund a project
 * This creates a funding transaction and updates the project's funding amount
 */
export const fundProject = async (
  projectId: string,
  funderId: string,
  amount: number,
  currency: string,
  notes?: string
): Promise<string> => {
  try {
    // Create funding transaction
    const fundingData = {
      projectId,
      funderId,
      amount,
      currency,
      status: 'completed',
      transactionDate: new Date().toISOString(),
      notes,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, FUNDING_COLLECTION), fundingData);
    
    // Update project's funding amount
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, {
      'funding.received': increment(amount),
      'funding.currency': currency,
      updatedAt: serverTimestamp(),
    });
    
    // Update funder's total funded amount
    const funderRef = doc(db, USERS_COLLECTION, funderId);
    await updateDoc(funderRef, {
      'funderProfile.totalFunded': increment(amount),
      updatedAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error funding project:', error);
    throw error;
  }
};

/**
 * Get funding transactions for a project
 */
export const getProjectFunding = async (
  projectId: string,
  pageSize = 10,
  lastVisible?: DocumentSnapshot
): Promise<{ transactions: FundingTransaction[]; lastVisible: DocumentSnapshot | null }> => {
  try {
    let constraints: any[] = [
      where('projectId', '==', projectId),
      where('status', '==', 'completed'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    ];
    
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }
    
    const q = query(collection(db, FUNDING_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);
    
    const transactions: FundingTransaction[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({
        id: doc.id,
        projectId: data.projectId,
        funderId: data.funderId,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        transactionDate: data.transactionDate,
        notes: data.notes,
      });
    });
    
    const newLastVisible = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[querySnapshot.docs.length - 1] 
      : null;
    
    return { transactions, lastVisible: newLastVisible };
  } catch (error) {
    console.error('Error getting project funding:', error);
    throw error;
  }
};

/**
 * Get funding transactions by funder
 */
export const getFunderTransactions = async (
  funderId: string,
  pageSize = 10,
  lastVisible?: DocumentSnapshot
): Promise<{ transactions: FundingTransaction[]; lastVisible: DocumentSnapshot | null }> => {
  try {
    let constraints: any[] = [
      where('funderId', '==', funderId),
      where('status', '==', 'completed'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    ];
    
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }
    
    const q = query(collection(db, FUNDING_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);
    
    const transactions: FundingTransaction[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({
        id: doc.id,
        projectId: data.projectId,
        funderId: data.funderId,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        transactionDate: data.transactionDate,
        notes: data.notes,
      });
    });
    
    const newLastVisible = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[querySnapshot.docs.length - 1] 
      : null;
    
    return { transactions, lastVisible: newLastVisible };
  } catch (error) {
    console.error('Error getting funder transactions:', error);
    throw error;
  }
};

/**
 * Get total funding amount for a project
 */
export const getProjectTotalFunding = async (projectId: string): Promise<{
  total: number;
  currency: string;
  transactionsCount: number;
}> => {
  try {
    const q = query(
      collection(db, FUNDING_COLLECTION),
      where('projectId', '==', projectId),
      where('status', '==', 'completed')
    );
    
    const querySnapshot = await getDocs(q);
    
    let total = 0;
    let currency = '';
    let transactionsCount = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      total += data.amount;
      currency = data.currency; // Assuming all transactions use the same currency
      transactionsCount++;
    });
    
    return { total, currency, transactionsCount };
  } catch (error) {
    console.error('Error getting project total funding:', error);
    throw error;
  }
};

/**
 * Get funding statistics for a funder
 */
export const getFunderStats = async (funderId: string): Promise<{
  totalFunded: number;
  projectsSupported: number;
  latestTransaction?: {
    projectId: string;
    amount: number;
    date: string;
  };
}> => {
  try {
    const q = query(
      collection(db, FUNDING_COLLECTION),
      where('funderId', '==', funderId),
      where('status', '==', 'completed'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    let totalFunded = 0;
    const projectIds = new Set<string>();
    let latestTransaction;
    
    if (querySnapshot.docs.length > 0) {
      const latestDoc = querySnapshot.docs[0];
      const latestData = latestDoc.data();
      latestTransaction = {
        projectId: latestData.projectId,
        amount: latestData.amount,
        date: latestData.transactionDate,
      };
    }
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalFunded += data.amount;
      projectIds.add(data.projectId);
    });
    
    return {
      totalFunded,
      projectsSupported: projectIds.size,
      latestTransaction,
    };
  } catch (error) {
    console.error('Error getting funder stats:', error);
    throw error;
  }
};
