import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDYCeEIrYWqxZJe7l491wyi6PI6lI5y2n8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kruxnut-f9fbc.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://kruxnut-f9fbc-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kruxnut-f9fbc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kruxnut-f9fbc.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1004016160518",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1004016160518:web:e57f93ac99658f20901887",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
