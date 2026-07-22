import { supabase } from '../lib/supabase.js';

export class SettingsController {
  static async getSettings(req, res) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'site')
        .single();

      if (error || !data) {
        return res.json({ whatsapp_number: '', whatsapp_message: '' });
      }

      return res.json(data.value || { whatsapp_number: '', whatsapp_message: '' });
    } catch (error) {
      console.error('Failed to load settings:', error);
      res.status(200).json({ whatsapp_number: '', whatsapp_message: '' });
    }
  }

  static async updateSettings(req, res) {
    try {
      const { whatsapp_number, whatsapp_message } = req.body;

      const { data, error } = await supabase
        .from('settings')
        .upsert({
          key: 'site',
          value: {
            whatsapp_number,
            whatsapp_message: whatsapp_message || 'Hi, I have a question about your products.',
          },
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' })
        .select()
        .single();

      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to save settings:', error);
      res.status(500).json({ error: 'Failed to save settings' });
    }
  }

  static async getApiConfigs(req, res) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      const configs = (data || []).map(item => ({
        id: item.id,
        key: item.key,
        value: item.value,
        updated_at: item.updated_at,
      }));
      return res.json(configs);
    } catch (error) {
      console.error('Failed to load API configs:', error);
      res.status(500).json({ error: 'Failed to load API configs' });
    }
  }

  static async createApiConfig(req, res) {
    try {
      const config = req.body;
      const { data: result, error } = await supabase
        .from('settings')
        .insert([{ ...config, updated_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateApiConfig(req, res) {
    try {
      const { id } = req.params;
      const config = req.body;

      const { data: result, error } = await supabase
        .from('settings')
        .update({ ...config, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteApiConfig(req, res) {
    try {
      const { id } = req.params;
      const { error } = await supabase
        .from('settings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
