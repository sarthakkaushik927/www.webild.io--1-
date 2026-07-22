import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPutAuth } from '../../utils/api';
import { adminAuthService } from '../../services/adminAuthService';
import AdminNavbar from '../../components/AdminNavbar';
import { uploadService } from '../../services/uploadService';
import type { CraftStep } from '../../components/Craft';

type CraftContent = {
  title: string;
  subtitle: string;
  faqImage?: string;
  steps: CraftStep[];
  faq?: Array<{ q: string; a: string }>;
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
  faq: [
    { q: 'What makes Kruxnut snacks different from other brands?', a: 'Our snacks are made using 100% natural ingredients with no artificial flavors, no palm oil, and no chemicals. Every product is roasted to perfection for extra crunch and nutrition.' },
    { q: 'Are your products suitable for people with allergies?', a: 'We clearly label all allergens on our packaging. Our products may contain nuts and seeds. Please check individual product labels for specific allergen information.' },
    { q: 'How fresh are your products?', a: 'All Kruxnut products are freshly prepared and packed. We ensure minimal shelf time and use premium packaging to lock in freshness and crunch for every bite.' },
    { q: 'Do you offer free shipping?', a: 'Yes! We offer free shipping on all orders above ₹500. Orders are typically dispatched within 24 hours and delivered within 3-5 business days.' },
    { q: 'Are your snacks healthy for weight management?', a: 'Absolutely! Our roasted nuts and makhanas are rich in protein, fiber, and essential nutrients — making them an ideal alternative to chips and junk food for weight management and heart health.' },
    { q: 'Where can I buy Kruxnut products?', a: 'You can order directly from our website or find us on major e-commerce platforms. For bulk orders, please contact us at Care@kruxnut.com.' },
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

export default function AdminFeaturesPage() {
  const navigate = useNavigate();
  const [craft, setCraft] = useState<CraftContent>(defaultCraft);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [stepModalOpen, setStepModalOpen] = useState(false);
  const [editingStepIdx, setEditingStepIdx] = useState<number | null>(null);
  const [stepTitle, setStepTitle] = useState('');
  const [stepDesc, setStepDesc] = useState('');
  const [stepImage, setStepImage] = useState('');

  useEffect(() => {
    if (!adminAuthService.isAuthenticated()) {
      navigate('/admin');
      return;
    }
    apiGet<CraftContent>('/api/craft')
      .then((data) => {
        if (data?.title) {
          setCraft({
            title: data.title || defaultCraft.title,
            subtitle: data.subtitle || defaultCraft.subtitle,
            faqImage: data.faqImage || defaultCraft.faqImage,
            steps: Array.isArray(data.steps) && data.steps.length > 0 ? data.steps : defaultCraft.steps,
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
      await apiPutAuth('/api/craft', {
        title: craft.title,
        subtitle: craft.subtitle,
        faqImage: craft.faqImage || '',
        steps: craft.steps,
      }, token);
      showToast('Features saved', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save features', 'error');
    } finally {
      setSaving(false);
    }
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
      const token = adminAuthService.getToken() || '';
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

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-xl text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <AdminNavbar />
      <div className="pt-32 px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-light text-black mb-8">Why Choose Us / Features</h2>
        <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-4">
          <input value={craft.title} onChange={(e) => setCraft({ ...craft, title: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section title" />
          <input value={craft.subtitle} onChange={(e) => setCraft({ ...craft, subtitle: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section subtitle" />
          <div className="flex items-start gap-3">
            <span className="text-sm text-gray-500 mt-2">FAQ Image:</span>
            <div className="flex-1">
              <input value={craft.faqImage || ''} onChange={(e) => setCraft({ ...craft, faqImage: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="FAQ image URL" />
              <div className="mt-2">
                <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/5 rounded-lg cursor-pointer hover:bg-black/10 transition-colors">
                  <span className="text-xs text-gray-600">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const url = await uploadService.uploadImage(file);
                        setCraft({ ...craft, faqImage: url.url });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                </label>
                {craft.faqImage && (
                  <img src={craft.faqImage} alt="FAQ preview" className="mt-2 w-24 h-24 object-cover rounded" />
                )}
              </div>
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
          <button onClick={openStepAdd} className="text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80">+ Add Step</button>
          <button onClick={save} disabled={saving} className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Features'}
          </button>
        </div>
      </div>

      {stepModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4">{editingStepIdx !== null ? 'Edit Step' : 'Add Step'}</h3>
            <input value={stepTitle} onChange={(e) => setStepTitle(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black mb-3" placeholder="Title" />
            <input value={stepDesc} onChange={(e) => setStepDesc(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black mb-3" placeholder="Description" />
            <DropZone onFiles={(urls) => { if (urls[0]) setStepImage(urls[0]); }} />
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
    </div>
  );
}
