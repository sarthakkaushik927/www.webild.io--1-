import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://btdxbvlrvgjlqfngegpo.supabase.co';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'customer' | 'admin' | 'chef' | 'waiter';
  status: 'pending' | 'active' | 'rejected';
  loyalty_coins: number;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number;
  is_available: boolean;
  tags: string[] | null;
  display_order: number;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
};

export type CarouselItem = {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  link_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CmsSection = {
  id: string;
  section_key: string;
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
  images: string[];
  faq_image: string | null;
  steps: Record<string, unknown>[];
  influencers: Record<string, unknown>[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type MediaItem = {
  id: string;
  url: string;
  type: string;
  name: string;
  created_at: string;
};

export default supabase;
