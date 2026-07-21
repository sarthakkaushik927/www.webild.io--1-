import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDYCeEIrYWqxZJe7l491wyi6PI6lI5y2n8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kruxnut-f9fbc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kruxnut-f9fbc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kruxnut-f9fbc.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1004016160518",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1004016160518:web:e57f93ac99658f20901887",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'customer' | 'admin' | 'chef' | 'waiter';
  status: 'pending' | 'approved' | 'rejected';
  loyalty_coins: number;
  createdAt: Date;
};

export type Category = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: Date;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  image_url: string | null;
  is_available: boolean;
  tags: string[] | null;
  created_at: Date;
};

export type CartItem = {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string | null;
};

export type Order = {
  id: string;
  tracking_token: string;
  customer_id: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address: string;
  city: string;
  pincode: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  subtotal: number;
  discount: number;
  loyalty_coins_used: number;
  total: number;
  loyalty_coins_earned: number;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  notes: string | null;
  order_items?: any[];
  created_at: Date;
  updated_at: Date;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};
