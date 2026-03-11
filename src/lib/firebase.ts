import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5Wl9HWeyVGR58j4AiFcpYVd6j2A10Hvk",
  authDomain: "playmatch-92334.firebaseapp.com",
  projectId: "playmatch-92334",
  storageBucket: "playmatch-92334.firebasestorage.app",
  messagingSenderId: "430665289990",
  appId: "1:430665289990:web:5e60a4e7c7600a5d3e4e87"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);