import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs, orderBy, serverTimestamp, limit } from "firebase/firestore";
import { getDatabase, ref, get, set, push, update, remove } from "firebase/database";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  throw new Error("Missing Firebase configuration. Please check your environment variables.");
}

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);
const db = getDatabase(app);

export { firestoreDb, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs, orderBy, serverTimestamp, limit };
export { db, ref, get, set, push, update, remove };
