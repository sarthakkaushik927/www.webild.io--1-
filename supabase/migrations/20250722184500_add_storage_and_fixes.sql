-- ============================================
-- ADD STORAGE POLICIES + SCHEMA FIXES
-- Step: 20250722184500
-- ============================================

-- ============================================
-- 1. STORAGE BUCKET + POLICIES
-- ============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('media', 'media', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/gif','video/mp4'])
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

CREATE POLICY "Public uploads are allowed" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media');

CREATE POLICY "Public updates are allowed" ON storage.objects
  FOR UPDATE USING (bucket_id = 'media');

CREATE POLICY "Public deletes are allowed" ON storage.objects
  FOR DELETE USING (bucket_id = 'media');

CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- ============================================
-- 2. PROFILE TRIGGER FIX: phone + always active for customers
-- ============================================
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
