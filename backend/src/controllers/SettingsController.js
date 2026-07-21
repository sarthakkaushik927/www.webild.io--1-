import { firestoreDb, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, query, orderBy } from '../config/firebase.js';

const SETTINGS_REF = doc(firestoreDb, 'settings', 'site');
const API_CONFIGS_REF = collection(firestoreDb, 'api_configs');

export class SettingsController {
  static async getSettings(req, res) {
    try {
      const docSnap = await getDoc(SETTINGS_REF);
      if (docSnap.exists()) {
        return res.json(docSnap.data());
      }
      return res.json({ whatsapp_number: '', whatsapp_message: '' });
    } catch (error) {
      console.error('Failed to load settings:', error);
      res.status(200).json({ whatsapp_number: '', whatsapp_message: '' });
    }
  }

  static async updateSettings(req, res) {
    try {
      const { whatsapp_number, whatsapp_message } = req.body;
      await setDoc(SETTINGS_REF, {
        whatsapp_number,
        whatsapp_message: whatsapp_message || 'Hi, I have a question about your products.',
      });
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to save settings:', error);
      res.status(500).json({ error: 'Failed to save settings' });
    }
  }

  static async getApiConfigs(req, res) {
    try {
      const q = query(API_CONFIGS_REF, orderBy('updated_at', 'desc'));
      const snapshot = await getDocs(q);
      const configs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      return res.json(configs);
    } catch (error) {
      console.error('Failed to load API configs:', error);
      res.status(500).json({ error: 'Failed to load API configs' });
    }
  }

  static async createApiConfig(req, res) {
    try {
      const config = req.body;
      const docRef = doc(API_CONFIGS_REF);
      const payload = { ...config, updated_at: new Date().toISOString() };
      await setDoc(docRef, payload);
      res.status(201).json({ id: docRef.id, ...payload });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateApiConfig(req, res) {
    try {
      const { id } = req.params;
      const config = req.body;
      const docRef = doc(firestoreDb, 'api_configs', id);
      await updateDoc(docRef, { ...config, updated_at: new Date().toISOString() });
      const docSnap = await getDoc(docRef);
      res.json({ id: docSnap.id, ...docSnap.data() });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteApiConfig(req, res) {
    try {
      const { id } = req.params;
      await deleteDoc(doc(firestoreDb, 'api_configs', id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
