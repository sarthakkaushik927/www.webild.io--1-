import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiConfigService, settingsService, type ApiConfig } from '../services/settingsService';
import { adminAuthService } from '../services/adminAuthService';

export default function AdminApiKeys() {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState<ApiConfig[]>([]);
  const [saving, setSaving] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const [form, setForm] = useState({
    payment_api_key: '',
    payment_api_secret: '',
    logistics_api_key: '',
    logistics_api_url: '',
    whatsapp_api_key: '',
    whatsapp_api_url: '',
    other_api_notes: '',
  });

  useEffect(() => {
    checkAuth();
    loadConfigs();
    loadWhatsApp();
  }, []);

  const checkAuth = async () => {
    if (!adminAuthService.isAuthenticated()) {
      navigate('/admin');
      return;
    }
  };

  const loadConfigs = async () => {
    try {
      const allConfigs = await apiConfigService.getAll();
      setConfigs(allConfigs);
      
      const map: Record<string, string> = {};
      allConfigs.forEach((c: ApiConfig) => { map[c.name] = c.key || c.value || ''; });
      
      setForm({
        payment_api_key: map['payment_api_key'] || '',
        payment_api_secret: map['payment_api_secret'] || '',
        logistics_api_key: map['logistics_api_key'] || '',
        logistics_api_url: map['logistics_api_url'] || '',
        whatsapp_api_key: map['whatsapp_api_key'] || '',
        whatsapp_api_url: map['whatsapp_api_url'] || '',
        other_api_notes: map['other_api_notes'] || '',
      });
    } catch (err) {
      console.error('Failed to load API configs:', err);
    }
  };

  const loadWhatsApp = async () => {
    try {
      const settings = await settingsService.getSettings();
      if (settings) {
        setWhatsappNumber(settings.whatsapp_number);
        setWhatsappMessage(settings.whatsapp_message || '');
      }
    } catch (err) {
      console.error('Failed to load WhatsApp settings:', err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const entries = [
        { name: 'payment_api_key', key: form.payment_api_key, value: form.payment_api_secret },
        { name: 'logistics_api_key', key: form.logistics_api_key, value: form.logistics_api_url },
        { name: 'whatsapp_api_key', key: form.whatsapp_api_key, value: form.whatsapp_api_url },
        { name: 'other_api_notes', key: form.other_api_notes },
      ];

      for (const entry of entries) {
        const existing = configs.find(c => c.name === entry.name);
        if (existing) {
          await apiConfigService.save({ ...existing, key: entry.key, value: entry.value });
        } else {
          await apiConfigService.save({ name: entry.name, key: entry.key, value: entry.value });
        }
      }

      await settingsService.updateWhatsAppNumber(whatsappNumber, whatsappMessage);
      showToast('Settings saved successfully', 'success');
      loadConfigs();
      loadWhatsApp();
    } catch (err) {
      showToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="w-full bg-white border-b border-black/10 flex flex-col md:flex-row justify-between items-center fixed top-0 z-40 px-6 py-4">
        <div className="flex items-center gap-8 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-black tracking-widest">KRUXNUT CMS</h1>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => navigate('/admin/dashboard')} className="text-sm font-medium text-gray-500 hover:text-black">Dashboard</button>
            <button onClick={() => navigate('/admin/orders')} className="text-sm font-medium text-gray-500 hover:text-black">Orders</button>
            <button className="text-sm font-medium text-black border-b-2 border-black">API Keys</button>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-black">View Site</button>
          <button onClick={() => { adminAuthService.logout(); navigate('/admin'); }} className="text-sm text-red-600 hover:text-red-800">Logout</button>
        </div>
      </div>

      <div className="pt-32 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-light text-black mb-8">Manage API Keys</h2>
        <p className="text-gray-600 mb-6">Configure third-party integrations. Keys are stored securely in Firestore.</p>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4">Payment Gateway (Razorpay)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Key ID</label>
                <input
                  type="text"
                  value={form.payment_api_key}
                  onChange={(e) => setForm({ ...form, payment_api_key: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                  placeholder="rzp_test_..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Key Secret</label>
                <input
                  type="password"
                  value={form.payment_api_secret}
                  onChange={(e) => setForm({ ...form, payment_api_secret: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                  placeholder="••••••••••••••••"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4">Logistics / Shipping API</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">API Key</label>
                <input
                  type="text"
                  value={form.logistics_api_key}
                  onChange={(e) => setForm({ ...form, logistics_api_key: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">API URL / Endpoint</label>
                <input
                  type="text"
                  value={form.logistics_api_url}
                  onChange={(e) => setForm({ ...form, logistics_api_url: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                  placeholder="https://api.logistics.com/v1"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4">WhatsApp Business API</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">API Key / Access Token</label>
                <input
                  type="text"
                  value={form.whatsapp_api_key}
                  onChange={(e) => setForm({ ...form, whatsapp_api_key: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">API URL / Phone Number ID</label>
                <input
                  type="text"
                  value={form.whatsapp_api_url}
                  onChange={(e) => setForm({ ...form, whatsapp_api_url: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4">Other Third-Party APIs</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Notes / Additional API Keys</label>
              <textarea
                value={form.other_api_notes}
                onChange={(e) => setForm({ ...form, other_api_notes: e.target.value })}
                rows={4}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                placeholder="Enter any additional API keys or configuration notes here..."
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <h3 className="text-lg font-medium mb-4">WhatsApp Contact Button</h3>
            <p className="text-sm text-gray-600 mb-4">Configure the floating WhatsApp contact button shown on the public website.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">WhatsApp Number (with country code)</label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 font-mono text-sm"
                  placeholder="e.g. 919876543210"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Default Message</label>
                <input
                  type="text"
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 text-sm"
                  placeholder="Hi, I have a question..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-black text-white font-medium py-4 rounded-xl hover:bg-black/80 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save API Keys'}
          </button>
        </form>
      </div>
    </div>
  );
}
