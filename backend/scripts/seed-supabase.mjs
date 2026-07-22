import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://btdxbvlrvgjlqfngegpo.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || ''
);

async function seed() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: { full_name: 'Admin', role: 'admin' },
  });

  if (authError && !authError.message.includes('already registered')) {
    console.error('Admin creation error:', authError);
  } else {
    console.log('Admin user created/verified:', authData?.user?.email);
  }

  const { data: existingAdmin } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'admin')
    .limit(1)
    .maybeSingle();

  if (!existingAdmin) {
    const { data: users } = await supabase.auth.admin.listUsers();
    const adminUser = users?.users?.find((u) => u.email === adminEmail);

    if (adminUser) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: adminUser.id,
          email: adminEmail,
          full_name: 'Admin',
          role: 'admin',
          status: 'active',
          loyalty_coins: 0,
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      } else {
        console.log('Admin profile created');
      }
    }
  }

  const { data: existingSections } = await supabase
    .from('cms_sections')
    .select('section_key')
    .in('section_key', ['hero', 'craft', 'community']);

  const existingKeys = new Set(existingSections?.map((s) => s.section_key) || []);

  const sectionsToInsert = [];
  if (!existingKeys.has('hero')) {
    sectionsToInsert.push({
      section_key: 'hero',
      title: 'Swad Sang Sehat - Taste with a Twist of Health!',
      subtitle: '100% Fresh & Organic Foods',
      images: [
        'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp',
        'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp',
        'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp',
        'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-5.webp',
        'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-6.webp',
      ],
      is_published: true,
    });
  }

  if (!existingKeys.has('craft')) {
    sectionsToInsert.push({
      section_key: 'craft',
      title: 'Health & Happiness with Kruxnut',
      subtitle: 'At Kruxnut, we believe snacking should be smart, satisfying, and full of life.',
      faq_image: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/faq-image.webp',
      steps: [
        { title: 'Power of Protein', description: 'Every bite gives you natural plant-based strength.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-1.webp' },
        { title: 'Pure Ingredients', description: 'No palm oil, no chemicals, no compromise.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-2.webp' },
        { title: 'Eco Friendly', description: 'Sustainability is at the heart of every Kruxnut creation.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-3.webp' },
        { title: 'Energy & Joy', description: 'Healthy snacking that fuels your day.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp' },
      ],
      is_published: true,
    });
  }

  if (!existingKeys.has('community')) {
    sectionsToInsert.push({
      section_key: 'community',
      title: 'Loved By Snack Enthusiasts Everywhere',
      subtitle: 'Health-conscious foodies trust Kruxnut for their daily crunch.',
      influencers: [
        { name: 'Amara Osei', videoUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-amara.mp4' },
        { name: 'Chloe Marchand', videoUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-chloe.mp4' },
        { name: 'Elena Vasquez', videoUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-elena.mp4' },
      ],
      is_published: true,
    });
  }

  if (sectionsToInsert.length > 0) {
    const { error: sectionError } = await supabase
      .from('cms_sections')
      .insert(sectionsToInsert);

    if (sectionError) {
      console.error('Section seed error:', sectionError);
    } else {
      console.log(`Seeded ${sectionsToInsert.length} CMS sections`);
    }
  }

  console.log('Seed completed');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
