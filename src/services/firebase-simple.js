import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration from earlier
const firebaseConfig = {
  apiKey: "AIzaSyBXF-T-5_3a_p5DLx6mtVcXU6oMpC5F488",
  authDomain: "al-shahbandar.firebaseapp.com",
  projectId: "al-shahbandar",
  storageBucket: "al-shahbandar.firebasestorage.app",
  messagingSenderId: "246101313051",
  appId: "1:246101313051:web:706ec12d5d23ec56eb9abe",
  measurementId: "G-3GQQHQN8QP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
