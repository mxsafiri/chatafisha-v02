import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config';
import { Project } from '@/types/project';

const PROJECTS_COLLECTION = 'projects';

/**
 * Get all projects with pagination
 */
export const getProjects = async (
  lastVisible?: DocumentSnapshot,
  pageSize = 10,
  filters?: Record<string, any>
): Promise<{ projects: Project[]; lastVisible: DocumentSnapshot | null }> => {
  try {
    let projectQuery = collection(db, PROJECTS_COLLECTION);
    let constraints: any[] = [orderBy('createdAt', 'desc'), limit(pageSize)];

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          constraints.push(where(key, '==', value));
        }
      });
    }

    // Apply pagination if lastVisible is provided
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    const q = query(projectQuery, ...constraints);
    const querySnapshot = await getDocs(q);

    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as Project);
    });

    const newLastVisible = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[querySnapshot.docs.length - 1] 
      : null;

    return { projects, lastVisible: newLastVisible };
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
};

/**
 * Get a project by ID
 */
export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const projectDoc = await getDoc(doc(db, PROJECTS_COLLECTION, id));
    
    if (!projectDoc.exists()) {
      return null;
    }
    
    const data = projectDoc.data();
    return {
      id: projectDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || new Date(),
      updatedAt: data.updatedAt?.toDate?.() || new Date(),
    } as Project;
  } catch (error) {
    console.error('Error getting project by ID:', error);
    throw error;
  }
};

/**
 * Create a new project
 */
export const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  try {
    const projectData = {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), projectData);
    
    return {
      id: docRef.id,
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Update an existing project
 */
export const updateProject = async (id: string, project: Partial<Project>): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    
    await updateDoc(projectRef, {
      ...project,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

/**
 * Delete a project
 */
export const deleteProject = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

/**
 * Upload project image
 */
export const uploadProjectImage = async (
  projectId: string, 
  file: File
): Promise<string> => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${projectId}_${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `projects/${projectId}/images/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading project image:', error);
    throw error;
  }
};

/**
 * Delete project image
 */
export const deleteProjectImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract the path from the URL
    const url = new URL(imageUrl);
    const path = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
    const imageRef = ref(storage, path);
    
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting project image:', error);
    throw error;
  }
};
