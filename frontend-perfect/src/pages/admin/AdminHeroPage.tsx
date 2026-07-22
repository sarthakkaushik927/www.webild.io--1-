import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPutAuth } from '../../utils/api';
import { adminAuthService } from '../../services/adminAuthService';
import AdminNavbar from '../../components/AdminNavbar';
import { uploadService } from '../../services/uploadService';

type HeroContent = {
  title: string;
  subtitle: string;
  images: string[];
};

const defaultHero: HeroContent = {
  title: 'Swad Sang Sehat - Taste with a Twist of Health!',
  subtitle: '100% Fresh & Organic Foods',
  images: [
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-5.webp',
    'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-6.webp',
  ],
};

function DropZone({ onFiles }: { onFiles: (urls: string[]) => void }) {
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
        accept="image/*"
        multiple
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

export default function AdminHeroPage() {
  const navigate = useNavigate();
  const [hero, setHero] = useState<HeroContent>(defaultHero);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!adminAuthService.isAuthenticated()) {
      navigate('/admin');
      return;
    }
    apiGet<HeroContent>('/api/hero')
      .then((data) => {
        if (data?.images) {
          setHero({
            title: data.title || defaultHero.title,
            subtitle: data.subtitle || defaultHero.subtitle,
            images: Array.isArray(data.images) && data.images.length > 0 ? data.images : defaultHero.images,
          });
        }
      })
      .catch(console.error);
  }, [navigate]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const save = async () => {
    setSaving(true);
    try {
      const token = adminAuthService.getToken() || '';
      const updated = hero.images;
      await apiPutAuth('/api/hero', { title: hero.title, subtitle: hero.subtitle, images: updated }, token);
      showToast('Hero saved', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save hero', 'error');
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
      <AdminNavbar />
      <div className="pt-32 px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-light text-black mb-8">Hero Section</h2>
        <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Hero Images</h3>
            <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">Locked</span>
          </div>
          <p className="text-sm text-gray-500">Hero title and subtitle are locked and cannot be changed. Manage images below.</p>
          <div className="space-y-2">
            {hero.images.map((img, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-black/5 rounded-lg">
                <img src={img} alt="" className="w-12 h-12 rounded object-cover" />
                <input
                  value={img}
                  onChange={(e) => {
                    const updated = [...hero.images];
                    updated[idx] = e.target.value;
                    setHero({ ...hero, images: updated });
                  }}
                  className="flex-1 bg-transparent border border-black/10 rounded px-2 py-1 text-sm text-black outline-none focus:border-black/30"
                />
                <button onClick={() => setHero({ ...hero, images: hero.images.filter((_, i) => i !== idx) })} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Delete</button>
              </div>
            ))}
          </div>
          <DropZone
            onFiles={(urls) => setHero({ ...hero, images: [...hero.images, ...urls] })}
          />
          <button onClick={save} disabled={saving} className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Hero'}
          </button>
        </div>
      </div>
    </div>
  );
}
