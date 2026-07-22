import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPutAuth } from '../utils/api';
import { adminAuthService } from '../services/adminAuthService';
import AdminNavbar from '../components/AdminNavbar';
import { uploadService } from '../services/uploadService';
import { useCmsRevision } from '../hooks/useCmsRevision';

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

type CarouselContent = {
  images: string[];
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

const defaultCarousel: CarouselContent = {
  images: [
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp',
  ],
};

function DropZone({ onFiles, accept = 'image/*', multiple = true }: { onFiles: (urls: string[]) => void; accept?: string; multiple?: boolean }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadService.uploadImage(file);
        urls.push(url.url);
      }
      onFiles(urls);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${dragOver ? 'border-black bg-black/5' : 'border-black/20 hover:border-black/40'}`}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.currentTarget.value = '';
        }}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <div className="text-center">
        <p className="text-sm font-medium text-black">{uploading ? 'Uploading...' : 'Drop images here or click to browse'}</p>
        <p className="text-xs text-gray-500 mt-1">You can select multiple files</p>
      </div>
    </div>
  );
}

export default function AdminContent() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState<HeroContent>(defaultHero);
  const [craft, setCraft] = useState<CraftContent>(defaultCraft);
  const [community, setCommunity] = useState<CommunityContent>(defaultCommunity);
  const [carousel, setCarousel] = useState<CarouselContent>(defaultCarousel);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [heroModalOpen, setHeroModalOpen] = useState(false);
  const [editingHeroIdx, setEditingHeroIdx] = useState<number | null>(null);
  const [heroImageUrl, setHeroImageUrl] = useState('');

  const [carouselModalOpen, setCarouselModalOpen] = useState(false);
  const [editingCarouselIdx, setEditingCarouselIdx] = useState<number | null>(null);
  const [carouselImageUrl, setCarouselImageUrl] = useState('');

  const [stepModalOpen, setStepModalOpen] = useState(false);
  const [editingStepIdx, setEditingStepIdx] = useState<number | null>(null);
  const [stepTitle, setStepTitle] = useState('');
  const [stepDesc, setStepDesc] = useState('');
  const [stepImage, setStepImage] = useState('');

  const [influencerModalOpen, setInfluencerModalOpen] = useState(false);
  const [editingInfluencerIdx, setEditingInfluencerIdx] = useState<number | null>(null);
  const [infName, setInfName] = useState('');
  const [infVideo, setInfVideo] = useState('');

  useEffect(() => {
    if (!adminAuthService.isAuthenticated()) {
      navigate('/admin');
      return;
    }

    Promise.all([
      apiGet<HeroContent>('/api/hero'),
      apiGet<CraftContent>('/api/craft'),
      apiGet<CommunityContent>('/api/community'),
      apiGet<CarouselContent>('/api/carousel'),
    ])
      .then(([heroData, craftData, communityData, carouselData]) => {
        if (heroData?.images) {
          setHero({
            title: heroData.title || defaultHero.title,
            subtitle: heroData.subtitle || defaultHero.subtitle,
            images: Array.isArray(heroData.images) && heroData.images.length > 0 ? heroData.images : defaultHero.images,
          });
        }
        if (craftData?.steps) {
          setCraft({
            title: craftData.title || defaultCraft.title,
            subtitle: craftData.subtitle || defaultCraft.subtitle,
            faqImage: craftData.faqImage || defaultCraft.faqImage,
            steps: Array.isArray(craftData.steps) && craftData.steps.length > 0 ? craftData.steps : defaultCraft.steps,
          });
        }
        if (communityData?.influencers) {
          setCommunity({
            title: communityData.title || defaultCommunity.title,
            subtitle: communityData.subtitle || defaultCommunity.subtitle,
            influencers: Array.isArray(communityData.influencers) && communityData.influencers.length > 0 ? communityData.influencers : defaultCommunity.influencers,
          });
        }
        if (carouselData?.images) {
          setCarousel({
            images: Array.isArray(carouselData.images) && carouselData.images.length > 0 ? carouselData.images : [],
          });
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

  const getToken = () => {
    const token = adminAuthService.getToken();
    if (!token) throw new Error('Admin session missing');
    return token;
  };

  const { bump } = useCmsRevision();

  const saveAll = async () => {
    setSaving(true);
    try {
      const token = getToken();
      await Promise.all([
        apiPutAuth('/api/hero', { title: hero.title, subtitle: hero.subtitle, images: hero.images }, token),
        apiPutAuth('/api/craft', { title: craft.title, subtitle: craft.subtitle, faqImage: craft.faqImage, steps: craft.steps }, token),
        apiPutAuth('/api/community', { title: community.title, subtitle: community.subtitle, influencers: community.influencers }, token),
        apiPutAuth('/api/carousel', { images: carousel.images }, token),
      ]);
      bump();
      showToast('Content saved successfully', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to save content', 'error');
    } finally {
      setSaving(false);
    }
  };

  const openHeroAdd = () => {
    setEditingHeroIdx(null);
    setHeroImageUrl('');
    setHeroModalOpen(true);
  };

  const openHeroEdit = (idx: number) => {
    setEditingHeroIdx(idx);
    setHeroImageUrl(hero.images[idx] || '');
    setHeroModalOpen(true);
  };

  const saveHeroModal = async () => {
    const url = heroImageUrl.trim();
    if (!url) return;
    setSaving(true);
    try {
      const token = getToken();
      const updated = editingHeroIdx !== null
        ? hero.images.map((img, i) => i === editingHeroIdx ? url : img)
        : [...hero.images, url];
      setHero({ ...hero, images: updated });
      await apiPutAuth('/api/hero', { title: hero.title, subtitle: hero.subtitle, images: updated }, token);
        showToast('Hero image updated', 'success');
        bump();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save hero', 'error');
    } finally {
      setSaving(false);
      setHeroModalOpen(false);
    }
  };

  const deleteHero = (idx: number) => {
    setHero({ ...hero, images: hero.images.filter((_, i) => i !== idx) });
  };

  const openCarouselAdd = () => {
    setEditingCarouselIdx(null);
    setCarouselImageUrl('');
    setCarouselModalOpen(true);
  };

  const openCarouselEdit = (idx: number) => {
    setEditingCarouselIdx(idx);
    setCarouselImageUrl(carousel.images[idx] || '');
    setCarouselModalOpen(true);
  };

  const saveCarouselModal = async () => {
    const url = carouselImageUrl.trim();
    if (!url) return;
    setSaving(true);
    try {
      const token = getToken();
      let updated;
      if (editingCarouselIdx !== null) {
        const next = [...carousel.images];
        next[editingCarouselIdx] = url;
        updated = next;
        setCarousel({ ...carousel, images: updated });
      } else {
        updated = [...carousel.images, url];
        setCarousel({ ...carousel, images: updated });
      }
      await apiPutAuth('/api/carousel', { images: updated }, token);
        showToast('Carousel updated', 'success');
        bump();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save carousel', 'error');
    } finally {
      setSaving(false);
      setCarouselModalOpen(false);
    }
  };

  const deleteCarousel = (idx: number) => {
    setCarousel({ ...carousel, images: carousel.images.filter((_, i) => i !== idx) });
  };

  const openStepAdd = () => {
    setEditingStepIdx(null);
    setStepTitle('');
    setStepDesc('');
    setStepImage('');
    setStepModalOpen(true);
  };

  const openStepEdit = (idx: number) => {
    const step = craft.steps[idx];
    setEditingStepIdx(idx);
    setStepTitle(step.title);
    setStepDesc(step.description);
    setStepImage(step.imageUrl);
    setStepModalOpen(true);
  };

  const saveStepModal = async () => {
    const step = { title: stepTitle, description: stepDesc, imageUrl: stepImage };
    if (!step.title || !step.imageUrl) {
      showToast('Title and image are required', 'error');
      return;
    }
    setSaving(true);
    try {
      const token = getToken();
      const updated = editingStepIdx !== null
        ? craft.steps.map((s, i) => i === editingStepIdx ? step : s)
        : [...craft.steps, step];
      setCraft({ ...craft, steps: updated });
      await apiPutAuth('/api/craft', {
        title: craft.title,
        subtitle: craft.subtitle,
        faqImage: craft.faqImage || '',
        steps: updated,
      }, token);
        showToast('Step saved', 'success');
        bump();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save step', 'error');
    } finally {
      setSaving(false);
      setStepModalOpen(false);
    }
  };

  const deleteStep = (idx: number) => {
    setCraft({ ...craft, steps: craft.steps.filter((_, i) => i !== idx) });
  };

  const openInfluencerAdd = () => {
    setEditingInfluencerIdx(null);
    setInfName('');
    setInfVideo('');
    setInfluencerModalOpen(true);
  };

  const openInfluencerEdit = (idx: number) => {
    const inf = community.influencers[idx];
    setEditingInfluencerIdx(idx);
    setInfName(inf.name);
    setInfVideo(inf.videoUrl);
    setInfluencerModalOpen(true);
  };

  const saveInfluencerModal = async () => {
    const inf = { name: infName, videoUrl: infVideo };
    if (!inf.name || !inf.videoUrl) {
      showToast('Name and video URL are required', 'error');
      return;
    }
    setSaving(true);
    try {
      const token = getToken();
      const updated = editingInfluencerIdx !== null
        ? community.influencers.map((item, i) => i === editingInfluencerIdx ? inf : item)
        : [...community.influencers, inf];
      setCommunity({ ...community, influencers: updated });
      await apiPutAuth('/api/community', {
        title: community.title,
        subtitle: community.subtitle,
        influencers: updated,
      }, token);
        showToast('Influencer saved', 'success');
        bump();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save influencer', 'error');
    } finally {
      setSaving(false);
      setInfluencerModalOpen(false);
    }
  };

  const deleteInfluencer = (idx: number) => {
    setCommunity({ ...community, influencers: community.influencers.filter((_, i) => i !== idx) });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-xl text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <AdminNavbar />

      <div className="pt-32 px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-light text-black mb-8">Manage Homepage Content</h2>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Hero Section</h3>
              <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">Locked</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Hero title and subtitle are locked and cannot be changed. Manage hero images below.</p>
            <div className="space-y-2">
              {hero.images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-black/5 rounded-lg">
                  <img src={img} alt="" className="w-12 h-12 rounded object-cover" />
                  <span className="flex-1 text-sm text-gray-600 truncate">{img}</span>
                  <button onClick={() => openHeroEdit(idx)} className="text-xs px-2 py-1 bg-black/5 rounded hover:bg-black/10">Edit</button>
                  <button onClick={() => deleteHero(idx)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Delete</button>
                </div>
              ))}
            </div>
            <button onClick={openHeroAdd} className="mt-4 text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80">+ Add Hero Image</button>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Carousel / Banner Slider</h3>
            </div>
            <div className="space-y-2">
              {carousel.images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-black/5 rounded-lg">
                  <img src={img} alt="" className="w-12 h-12 rounded object-cover" />
                  <span className="flex-1 text-sm text-gray-600 truncate">{img}</span>
                  <button onClick={() => openCarouselEdit(idx)} className="text-xs px-2 py-1 bg-black/5 rounded hover:bg-black/10">Edit</button>
                  <button onClick={() => deleteCarousel(idx)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Delete</button>
                </div>
              ))}
            </div>
            <button onClick={openCarouselAdd} className="mt-4 text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80">+ Add Carousel Image</button>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Why Choose Us / Features</h3>
            </div>
            <div className="space-y-4 mb-4">
              <input value={craft.title} onChange={(e) => setCraft({ ...craft, title: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section title" />
              <input value={craft.subtitle} onChange={(e) => setCraft({ ...craft, subtitle: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section subtitle" />
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">FAQ Image:</span>
                <input value={craft.faqImage || ''} onChange={(e) => setCraft({ ...craft, faqImage: e.target.value })} className="flex-1 bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="FAQ image URL" />
              </div>
            </div>
            <div className="space-y-2">
              {craft.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-black/5 rounded-lg">
                  <img src={step.imageUrl} alt="" className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">{step.title}</p>
                    <p className="text-xs text-gray-500 truncate">{step.description}</p>
                  </div>
                  <button onClick={() => openStepEdit(idx)} className="text-xs px-2 py-1 bg-black/5 rounded hover:bg-black/10">Edit</button>
                  <button onClick={() => deleteStep(idx)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Delete</button>
                </div>
              ))}
            </div>
            <button onClick={openStepAdd} className="mt-4 text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80">+ Add Step</button>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Community Section</h3>
            </div>
            <div className="space-y-4 mb-4">
              <input value={community.title} onChange={(e) => setCommunity({ ...community, title: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section title" />
              <input value={community.subtitle} onChange={(e) => setCommunity({ ...community, subtitle: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section subtitle" />
            </div>
            <div className="space-y-2">
              {community.influencers.map((inf, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-black/5 rounded-lg">
                  <video src={inf.videoUrl} className="w-12 h-12 rounded object-cover" />
                  <span className="flex-1 text-sm text-gray-600 truncate">{inf.name}</span>
                  <button onClick={() => openInfluencerEdit(idx)} className="text-xs px-2 py-1 bg-black/5 rounded hover:bg-black/10">Edit</button>
                  <button onClick={() => deleteInfluencer(idx)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Delete</button>
                </div>
              ))}
            </div>
            <button onClick={openInfluencerAdd} className="mt-4 text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80">+ Add Influencer</button>
          </div>

          <button type="button" onClick={saveAll} disabled={saving} className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save All Content'}
          </button>
        </div>
      </div>

      {heroModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4">{editingHeroIdx !== null ? 'Edit Hero Image' : 'Add Hero Image'}</h3>
            <DropZone
              accept="image/*"
              multiple={false}
              onFiles={async (urls) => {
                if (urls[0]) setHeroImageUrl(urls[0]);
              }}
            />
            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-1">Or paste image URL</label>
              <input value={heroImageUrl} onChange={(e) => setHeroImageUrl(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="https://..." />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={saveHeroModal} className="flex-1 bg-black text-white py-2 rounded-lg">Save</button>
              <button type="button" onClick={() => setHeroModalOpen(false)} className="flex-1 bg-black/5 text-black py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {carouselModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4">{editingCarouselIdx !== null ? 'Edit Carousel Image' : 'Add Carousel Image'}</h3>
            <DropZone
              accept="image/*"
              multiple={false}
              onFiles={async (urls) => {
                if (urls[0]) setCarouselImageUrl(urls[0]);
              }}
            />
            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-1">Or paste image URL</label>
              <input value={carouselImageUrl} onChange={(e) => setCarouselImageUrl(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="https://..." />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={saveCarouselModal} className="flex-1 bg-black text-white py-2 rounded-lg">Save</button>
              <button type="button" onClick={() => setCarouselModalOpen(false)} className="flex-1 bg-black/5 text-black py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {stepModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4">{editingStepIdx !== null ? 'Edit Step' : 'Add Step'}</h3>
            <input value={stepTitle} onChange={(e) => setStepTitle(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black mb-3" placeholder="Title" />
            <input value={stepDesc} onChange={(e) => setStepDesc(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black mb-3" placeholder="Description" />
            <DropZone
              accept="image/*"
              multiple={false}
              onFiles={async (urls) => {
                if (urls[0]) setStepImage(urls[0]);
              }}
            />
            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-1">Or paste image URL</label>
              <input value={stepImage} onChange={(e) => setStepImage(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="https://..." />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={saveStepModal} className="flex-1 bg-black text-white py-2 rounded-lg">Save</button>
              <button type="button" onClick={() => setStepModalOpen(false)} className="flex-1 bg-black/5 text-black py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {influencerModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4">{editingInfluencerIdx !== null ? 'Edit Influencer' : 'Add Influencer'}</h3>
            <input value={infName} onChange={(e) => setInfName(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black mb-3" placeholder="Name" />
            <input value={infVideo} onChange={(e) => setInfVideo(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black mb-4" placeholder="Video URL" />
            <div className="flex gap-2">
              <button type="button" onClick={saveInfluencerModal} className="flex-1 bg-black text-white py-2 rounded-lg">Save</button>
              <button type="button" onClick={() => setInfluencerModalOpen(false)} className="flex-1 bg-black/5 text-black py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
