import { apiGet, apiPut, apiPostAuth, apiPutAuth, apiDeleteAuth } from '../utils/api';
import { get, ref } from 'firebase/database';
import { realtimeDb } from '../lib/firebase';

export interface SiteSettings {
  whatsapp_number: string;
  whatsapp_message?: string;
}

export interface ApiConfig {
  id?: string;
  name: string;
  key: string;
  value?: string;
  updated_at?: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp_number: '',
  whatsapp_message: 'Hi, I have a question about your products.',
};

async function getRealtimeSettings(): Promise<SiteSettings> {
  const snapshot = await get(ref(realtimeDb, 'settings'));
  if (!snapshot.exists()) return DEFAULT_SETTINGS;

  return { ...DEFAULT_SETTINGS, ...(snapshot.val() as Partial<SiteSettings>) };
}

export const settingsService = {
  async getWhatsAppNumber(): Promise<string> {
    try {
      const data = await apiGet<SiteSettings>('/api/settings/settings');
      return data.whatsapp_number || '';
    } catch (err) {
      const data = await getRealtimeSettings();
      return data.whatsapp_number || '';
    }
  },

  async updateWhatsAppNumber(phone: string, message?: string) {
    try {
      await apiPut('/api/settings/settings', {
        whatsapp_number: phone,
        whatsapp_message: message || 'Hi, I have a question about your products.',
      });
    } catch (err) {
      console.error('Failed to update WhatsApp number:', err);
      throw err;
    }
  },

  async getSettings(): Promise<SiteSettings | null> {
    try {
      const data = await apiGet<SiteSettings>('/api/settings/settings');
      return data || DEFAULT_SETTINGS;
    } catch (err) {
      return getRealtimeSettings();
    }
  },
};

export const apiConfigService = {
  async getAll() {
    try {
      const data = await apiGet<ApiConfig[]>('/api/settings/api-configs');
      return data || [];
    } catch (err) {
      console.error('Failed to load API configs:', err);
      return [];
    }
  },

  async getByName(name: string) {
    try {
      const all = await this.getAll();
      return all.find(c => c.name === name) || null;
    } catch (err) {
      console.error('Failed to load API config by name:', err);
      return null;
    }
  },

  async save(config: ApiConfig) {
    try {
      const token = (await import('../services/adminAuthService')).adminAuthService.getToken();
      if (!token) throw new Error('Admin session missing');

      if (config.id) {
        const updated = await apiPutAuth<ApiConfig>(`/api/settings/api-configs/${config.id}`, config, token);
        return updated;
      }
      const created = await apiPostAuth<ApiConfig>('/api/settings/api-configs', config, token);
      return created;
    } catch (err) {
      console.error('Failed to save API config:', err);
      throw err;
    }
  },

  async delete(id: string) {
    try {
      const token = (await import('../services/adminAuthService')).adminAuthService.getToken();
      if (!token) throw new Error('Admin session missing');
      await apiDeleteAuth(`/api/settings/api-configs/${id}`, token);
    } catch (err) {
      console.error('Failed to delete API config:', err);
      throw err;
    }
  },
};
