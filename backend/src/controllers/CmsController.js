import { supabase } from '../lib/supabase.js';

export class CmsController {
  static async getAll(req, res) {
    try {
      const { data, error } = await supabase
        .from('cms_sections')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      res.json(data || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getByKey(req, res) {
    try {
      const { key } = req.params;
      const { data, error } = await supabase
        .from('cms_sections')
        .select('*')
        .eq('section_key', key)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: 'Section not found' });
      }

      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const sectionData = {
        ...req.body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('cms_sections')
        .insert([sectionData])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { key } = req.params;
      const updates = {
        ...req.body,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('cms_sections')
        .update(updates)
        .eq('section_key', key)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Section not found' });
        }
        throw error;
      }

      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { key } = req.params;
      const { error } = await supabase
        .from('cms_sections')
        .delete()
        .eq('section_key', key);

      if (error) throw error;
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
