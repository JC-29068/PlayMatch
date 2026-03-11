import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

// MATCHES
export const getMatches = async () => {
  const q = query(collection(db, 'matches'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createMatch = async (matchData: any) => {
  return await addDoc(collection(db, 'matches'), {
    ...matchData,
    createdAt: serverTimestamp()
  });
};

// COMMUNITY POSTS
export const getPosts = async () => {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createPost = async (postData: any) => {
  return await addDoc(collection(db, 'posts'), {
    ...postData,
    createdAt: serverTimestamp()
  });
};