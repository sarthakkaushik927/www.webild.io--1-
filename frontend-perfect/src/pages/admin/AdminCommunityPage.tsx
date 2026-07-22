import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPutAuth } from '../../utils/api';
import { adminAuthService } from '../../services/adminAuthService';
import AdminNavbar from '../../components/AdminNavbar';
import type { Influencer } from '../../components/Community';

type CommunityContent = {
  title: string;
  subtitle: string;
  influencers: Influencer[];
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

export default function AdminCommunityPage() {
  const navigate = useNavigate();
  const [community, setCommunity] = useState<CommunityContent>(defaultCommunity);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [infName, setInfName] = useState('');
  const [infVideo, setInfVideo] = useState('');

  useEffect(() => {
    if (!adminAuthService.isAuthenticated()) {
      navigate('/admin');
      return;
    }
    apiGet<CommunityContent>('/api/community')
      .then((data) => {
        if (data?.title) {
          setCommunity({
            title: data.title || defaultCommunity.title,
            subtitle: data.subtitle || defaultCommunity.subtitle,
            influencers: Array.isArray(data.influencers) && data.influencers.length > 0 ? data.influencers : defaultCommunity.influencers,
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
      await apiPutAuth('/api/community', {
        title: community.title,
        subtitle: community.subtitle,
        influencers: community.influencers,
      }, token);
      showToast('Community saved', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save community', 'error');
    } finally {
      setSaving(false);
    }
  };

  const openAdd = () => {
    setEditingIdx(null);
    setInfName('');
    setInfVideo('');
    setModalOpen(true);
  };

  const openEdit = (idx: number) => {
    const inf = community.influencers[idx];
    setEditingIdx(idx);
    setInfName(inf.name);
    setInfVideo(inf.videoUrl);
    setModalOpen(true);
  };

  const saveModal = async () => {
    const inf = { name: infName, videoUrl: infVideo };
    if (!inf.name || !inf.videoUrl) {
      showToast('Name and video URL are required', 'error');
      return;
    }
    setSaving(true);
    try {
      const token = adminAuthService.getToken() || '';
      const updated = editingIdx !== null
        ? community.influencers.map((item, i) => i === editingIdx ? inf : item)
        : [...community.influencers, inf];
      setCommunity({ ...community, influencers: updated });
      await apiPutAuth('/api/community', {
        title: community.title,
        subtitle: community.subtitle,
        influencers: updated,
      }, token);
      showToast('Influencer saved', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save influencer', 'error');
    } finally {
      setSaving(false);
      setModalOpen(false);
    }
  };

  const deleteItem = (idx: number) => {
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
        <h2 className="text-3xl font-light text-black mb-8">Community Section</h2>
        <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-4">
          <input value={community.title} onChange={(e) => setCommunity({ ...community, title: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section title" />
          <input value={community.subtitle} onChange={(e) => setCommunity({ ...community, subtitle: e.target.value })} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black" placeholder="Section subtitle" />
          <div className="space-y-2">
            {community.influencers.map((inf, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-black/5 rounded-lg">
                <div className="w-12 h-12 rounded bg-black/5 flex items-center justify-center text-xs text-gray-500">Video</div>
                <span className="flex-1 text-sm text-gray-600 truncate">{inf.name}</span>
                <button onClick={() => openEdit(idx)} className="text-xs px-2 py-1 bg-black/5 rounded hover:bg-black/10">Edit</button>
                <button onClick={() => deleteItem(idx)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Delete</button>
              </div>
            ))}
          </div>
          <button onClick={openAdd} className="text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80">+ Add Influencer</button>
          <button onClick={save} disabled={saving} className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-black/80 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Community'}
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">{editingIdx !== null ? 'Edit Influencer' : 'Add Influencer'}</h3>
            <input value={infName} onChange={(e) => setInfName(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black mb-3" placeholder="Name" />
            <input value={infVideo} onChange={(e) => setInfVideo(e.target.value)} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black mb-4" placeholder="Video URL" />
            <div className="flex gap-2">
              <button type="button" onClick={saveModal} className="flex-1 bg-black text-white py-2 rounded-lg">Save</button>
              <button type="button" onClick={() => setModalOpen(false)} className="flex-1 bg-black/5 text-black py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
