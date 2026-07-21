import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPutAuth } from '../utils/api';
import { adminAuthService } from '../services/adminAuthService';

type HeroContent = {
  title: string;
  subtitle: string;
  images: string[];
};

type CraftStep = {
  title: string;
  description: string;
  imageUrl: string;
};

type CraftContent = {
  title: string;
  subtitle: string;
  faqImage?: string;
  steps: CraftStep[];
};

type CommunityInfluencer = {
  name: string;
  videoUrl: string;
};

type CommunityContent = {
  title: string;
  subtitle: string;
  influencers: CommunityInfluencer[];
};

const defaultHero: HeroContent = {
  title: 'Swad Sang Sehat — Taste with a Twist of Health!',
  subtitle: '100% Fresh & Organic Foods',
  images: [
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-5.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-6.webp',
  ],
};

const defaultCraft: CraftContent = {
  title: 'Health & Happiness with Kruxnut 🌿',
  subtitle: 'At Kruxnut, we believe snacking should be smart, satisfying, and full of life.',
  faqImage: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/faq-image.webp',
  steps: [
    { title: 'Power of Protein', description: 'Every bite gives you natural plant-based strength.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-1.webp' },
    { title: 'Pure Ingredients', description: 'No palm oil, no chemicals, no compromise.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-2.webp' },
    { title: 'Eco Friendly', description: 'Sustainability is at the heart of every Kruxnut creation.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-3.webp' },
    { title: 'Energy & Joy', description: 'Healthy snacking that fuels your day.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp' },
  ],
};

const defaultCommunity: CommunityContent = {
  title: 'Loved By Snack Enthusiasts Everywhere',
  subtitle: 'Health-conscious foodies trust Kruxnut for their daily crunch.',
  influencers: [
    { name: 'Amara Osei', videoUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-amara.mp4' },
    { name: 'Chloe Marchand', videoUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-chloe.mp4' },
    { name: 'Elena Vasquez', videoUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-elena.mp4' },
  ],
};

function linesToArray(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function AdminContent() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState<HeroContent>(defaultHero);
  const [craft, setCraft] = useState<CraftContent>(defaultCraft);
  const [community, setCommunity] = useState<CommunityContent>(defaultCommunity);
  const [heroImagesText, setHeroImagesText] = useState(defaultHero.images.join('\n'));
  const [craftStepsText, setCraftStepsText] = useState(defaultCraft.steps.map((step) => `${step.title}|${step.description}|${step.imageUrl}`).join('\n'));
  const [communityText, setCommunityText] = useState(defaultCommunity.influencers.map((inf) => `${inf.name}|${inf.videoUrl}`).join('\n'));
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!adminAuthService.isAuthenticated()) {
      navigate('/admin');
      return;
    }

    Promise.all([
      apiGet<HeroContent>('/api/hero'),
      apiGet<CraftContent>('/api/craft'),
      apiGet<CommunityContent>('/api/community'),
    ])
      .then(([heroData, craftData, communityData]) => {
        if (heroData?.title) {
          setHero({ title: heroData.title || defaultHero.title, subtitle: heroData.subtitle || defaultHero.subtitle, images: Array.isArray(heroData.images) && heroData.images.length > 0 ? heroData.images : defaultHero.images });
          setHeroImagesText((heroData.images && heroData.images.length > 0 ? heroData.images : defaultHero.images).join('\n'));
        }
        if (craftData?.title) {
          setCraft({ title: craftData.title || defaultCraft.title, subtitle: craftData.subtitle || defaultCraft.subtitle, faqImage: craftData.faqImage || defaultCraft.faqImage, steps: Array.isArray(craftData.steps) && craftData.steps.length > 0 ? craftData.steps : defaultCraft.steps });
          setCraftStepsText((craftData.steps && craftData.steps.length > 0 ? craftData.steps : defaultCraft.steps).map((step) => `${step.title}|${step.description}|${step.imageUrl}`).join('\n'));
        }
        if (communityData?.title) {
          setCommunity({ title: communityData.title || defaultCommunity.title, subtitle: communityData.subtitle || defaultCommunity.subtitle, influencers: Array.isArray(communityData.influencers) && communityData.influencers.length > 0 ? communityData.influencers : defaultCommunity.influencers });
          setCommunityText((communityData.influencers && communityData.influencers.length > 0 ? communityData.influencers : defaultCommunity.influencers).map((inf) => `${inf.name}|${inf.videoUrl}`).join('\n'));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = adminAuthService.getToken();
      if (!token) throw new Error('Admin session missing');

      const heroPayload = {
        title: hero.title,
        subtitle: hero.subtitle,
        images: linesToArray(heroImagesText),
      };

      const craftSteps = linesToArray(craftStepsText).map((line) => {
        const [title = '', description = '', imageUrl = ''] = line.split('|').map((part) => part.trim());
        return { title, description, imageUrl };
      }).filter((step) => step.title && step.description && step.imageUrl);

      const craftPayload = {
        title: craft.title,
        subtitle: craft.subtitle,
        faqImage: craft.faqImage || '',
        steps: craftSteps.length > 0 ? craftSteps : defaultCraft.steps,
      };

      const communityInfluencers = linesToArray(communityText).map((line) => {
        const [name = '', videoUrl = ''] = line.split('|').map((part) => part.trim());
        return { name, videoUrl };
      }).filter((item) => item.name && item.videoUrl);

      const communityPayload = {
        title: community.title,
        subtitle: community.subtitle,
        influencers: communityInfluencers.length > 0 ? communityInfluencers : defaultCommunity.influencers,
      };

      await apiPutAuth('/api/hero', heroPayload, token);
      await apiPutAuth('/api/craft', craftPayload, token);
      await apiPutAuth('/api/community', communityPayload, token);

      showToast('Content saved successfully', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to save content', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-xl text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <div className="w-full bg-white border-b border-black/10 flex flex-col md:flex-row justify-between items-center fixed top-0 z-40 px-6 py-4">
        <div className="flex items-center gap-8 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-black tracking-widest">KRUXNUT CMS</h1>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => navigate('/admin/dashboard')} className="text-sm font-medium text-gray-500 hover:text-black">Products</button>
            <button className="text-sm font-medium text-black border-b-2 border-black">Content</button>
            <button onClick={() => navigate('/admin/orders')} className="text-sm font-medium text-gray-500 hover:text-black">Orders</button>
            <button onClick={() => navigate('/admin/api-keys')} className="text-sm font-medium text-gray-500 hover:text-black">API Keys</button>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-black">View Site</button>
          <button onClick={() => { adminAuthService.logout(); navigate('/admin'); }} className="text-sm text-red-600 hover:text-red-800">Logout</button>
        </div>
      </div>

      <div className="pt-32 px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-light text-black mb-8">Manage Homepage Content</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-4">
            <h3 className="text-lg font-medium">Hero Section</h3>
            <input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Hero title" />
            <input value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Hero subtitle" />
            <textarea value={heroImagesText} onChange={(e) => setHeroImagesText(e.target.value)} rows={5} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black font-mono text-sm" placeholder="One image URL per line" />
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-4">
            <h3 className="text-lg font-medium">Why Choose Us / Features</h3>
            <input value={craft.title} onChange={(e) => setCraft({ ...craft, title: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section title" />
            <input value={craft.subtitle} onChange={(e) => setCraft({ ...craft, subtitle: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section subtitle" />
            <input value={craft.faqImage || ''} onChange={(e) => setCraft({ ...craft, faqImage: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="FAQ image URL" />
            <textarea value={craftStepsText} onChange={(e) => setCraftStepsText(e.target.value)} rows={8} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black font-mono text-sm" placeholder="One step per line: title|description|imageUrl" />
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-4">
            <h3 className="text-lg font-medium">Community Section</h3>
            <input value={community.title} onChange={(e) => setCommunity({ ...community, title: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Community title" />
            <input value={community.subtitle} onChange={(e) => setCommunity({ ...community, subtitle: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Community subtitle" />
            <textarea value={communityText} onChange={(e) => setCommunityText(e.target.value)} rows={6} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black font-mono text-sm" placeholder="One influencer per line: name|videoUrl" />
          </div>

          <button type="submit" disabled={saving} className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Content'}
          </button>
        </form>
      </div>
    </div>
  );
}
