-- ============================================
-- ECOMMERCE SUPABASE SCHEMA
-- Migrated from Firebase (Firestore + RTDB)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'chef', 'waiter')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'rejected')),
  loyalty_coins INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Auto-create profile on auth user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
    'active'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;
CREATE POLICY "Categories are viewable by everyone" ON public.categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can insert categories" ON public.categories;
CREATE POLICY "Only admins can insert categories" ON public.categories
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can update categories" ON public.categories;
CREATE POLICY "Only admins can update categories" ON public.categories
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can delete categories" ON public.categories;
CREATE POLICY "Only admins can delete categories" ON public.categories
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 3. PRODUCTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can insert products" ON public.products;
CREATE POLICY "Only admins can insert products" ON public.products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can update products" ON public.products;
CREATE POLICY "Only admins can update products" ON public.products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can delete products" ON public.products;
CREATE POLICY "Only admins can delete products" ON public.products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 4. ORDERS
-- ============================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_token TEXT UNIQUE NOT NULL DEFAULT replace(replace(uuid_generate_v4()::text, '-', ''), '{}', ''),
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount DECIMAL(10,2) NOT NULL DEFAULT 0,
  loyalty_coins_used INTEGER NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  loyalty_coins_earned INTEGER NOT NULL DEFAULT 0,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Customers can view own orders" ON public.orders;
CREATE POLICY "Customers can view own orders" ON public.orders
  FOR SELECT USING (customer_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'chef', 'waiter')
    )
  );

DROP POLICY IF EXISTS "Anyone can create orders (guest checkout)" ON public.orders;
CREATE POLICY "Anyone can create orders (guest checkout)" ON public.orders
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;
CREATE POLICY "Admins can update all orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'chef')
    )
  );

-- ============================================
-- 5. ORDER ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Order items are viewable with order" ON public.order_items;
CREATE POLICY "Order items are viewable with order" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.customer_id = auth.uid()
           OR EXISTS (
             SELECT 1 FROM public.profiles
             WHERE id = auth.uid() AND role IN ('admin', 'chef', 'waiter')
           ))
    )
  );

DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;
CREATE POLICY "Anyone can insert order items" ON public.order_items
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update order items" ON public.order_items;
CREATE POLICY "Admins can update order items" ON public.order_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'chef')
    )
  );

-- ============================================
-- 6. CAROUSEL (Homepage banner)
-- ============================================
CREATE TABLE IF NOT EXISTS public.carousel (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  link_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.carousel ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Carousel is viewable by everyone" ON public.carousel;
CREATE POLICY "Carousel is viewable by everyone" ON public.carousel
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can insert carousel" ON public.carousel;
CREATE POLICY "Only admins can insert carousel" ON public.carousel
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can update carousel" ON public.carousel;
CREATE POLICY "Only admins can update carousel" ON public.carousel
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can delete carousel" ON public.carousel;
CREATE POLICY "Only admins can delete carousel" ON public.carousel
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 7. CMS SECTIONS (Hero, Features, Community, etc.)
-- ============================================
CREATE TABLE IF NOT EXISTS public.cms_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  content JSONB DEFAULT '{}'::jsonb,
  images TEXT[] DEFAULT '{}',
  faq_image TEXT,
  steps JSONB DEFAULT '[]'::jsonb,
  influencers JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.cms_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "CMS sections are viewable by everyone" ON public.cms_sections;
CREATE POLICY "CMS sections are viewable by everyone" ON public.cms_sections
  FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Only admins can view drafts" ON public.cms_sections;
CREATE POLICY "Only admins can view drafts" ON public.cms_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can insert cms_sections" ON public.cms_sections;
CREATE POLICY "Only admins can insert cms_sections" ON public.cms_sections
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can update cms_sections" ON public.cms_sections;
CREATE POLICY "Only admins can update cms_sections" ON public.cms_sections
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can delete cms_sections" ON public.cms_sections;
CREATE POLICY "Only admins can delete cms_sections" ON public.cms_sections
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 8. MEDIA (Media Library)
-- ============================================
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image',
  name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Media is viewable by everyone" ON public.media;
CREATE POLICY "Media is viewable by everyone" ON public.media
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can insert media" ON public.media;
CREATE POLICY "Only admins can insert media" ON public.media
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can update media" ON public.media;
CREATE POLICY "Only admins can update media" ON public.media
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can delete media" ON public.media;
CREATE POLICY "Only admins can delete media" ON public.media
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 9. SETTINGS
-- ============================================
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Settings are viewable by everyone" ON public.settings;
CREATE POLICY "Settings are viewable by everyone" ON public.settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can insert settings" ON public.settings;
CREATE POLICY "Only admins can insert settings" ON public.settings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can update settings" ON public.settings;
CREATE POLICY "Only admins can update settings" ON public.settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 10. INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_tracking_token ON public.orders(tracking_token);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_carousel_order ON public.carousel(display_order);
CREATE INDEX IF NOT EXISTS idx_cms_section_key ON public.cms_sections(section_key);

-- ============================================
-- 11. TRIGGERS for updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON public.categories;
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_carousel_updated_at ON public.carousel;
CREATE TRIGGER update_carousel_updated_at BEFORE UPDATE ON public.carousel
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_cms_sections_updated_at ON public.cms_sections;
CREATE TRIGGER update_cms_sections_updated_at BEFORE UPDATE ON public.cms_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 12. SEED DEFAULT DATA
-- ============================================
INSERT INTO public.cms_sections (section_key, title, subtitle, images, is_published) VALUES
  ('hero', 'Swad Sang Sehat - Taste with a Twist of Health!', '100% Fresh & Organic Foods',
   ARRAY[
     'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp',
     'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp',
     'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp',
     'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-5.webp',
     'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-6.webp'
   ], true)
ON CONFLICT (section_key) DO NOTHING;

INSERT INTO public.cms_sections (section_key, title, subtitle, faq_image, steps, is_published) VALUES
  ('craft', 'Health & Happiness with Kruxnut', 'At Kruxnut, we believe snacking should be smart, satisfying, and full of life.',
   'https://storage.googleapis.com/webild/default/templates/skincare-luxury/faq-image.webp',
   '[{"title":"Power of Protein","description":"Every bite gives you natural plant-based strength.","imageUrl":"https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-1.webp"},{"title":"Pure Ingredients","description":"No palm oil, no chemicals, no compromise.","imageUrl":"https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-2.webp"},{"title":"Eco Friendly","description":"Sustainability is at the heart of every Kruxnut creation.","imageUrl":"https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-3.webp"},{"title":"Energy & Joy","description":"Healthy snacking that fuels your day.","imageUrl":"https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp"}]', true)
ON CONFLICT (section_key) DO NOTHING;

INSERT INTO public.cms_sections (section_key, title, subtitle, influencers, is_published) VALUES
  ('community', 'Loved By Snack Enthusiasts Everywhere', 'Health-conscious foodies trust Kruxnut for their daily crunch.',
   '[{"name":"Amara Osei","videoUrl":"https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-amara.mp4"},{"name":"Chloe Marchand","videoUrl":"https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-chloe.mp4"},{"name":"Elena Vasquez","videoUrl":"https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-elena.mp4"}]', true)
ON CONFLICT (section_key) DO NOTHING;

INSERT INTO public.carousel (image_url, display_order, is_active) VALUES
  ('https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp', 0, true),
  ('https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp', 1, true),
  ('https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp', 2, true)
ON CONFLICT (id) DO NOTHING;
