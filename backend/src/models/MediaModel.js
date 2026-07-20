import { db, ref, get, set, update, remove, push } from '../config/firebase.js';

export class MediaModel {
  static getRef() {
    return ref(db, 'media');
  }

  static async getAll() {
    const snapshot = await get(this.getRef());
    if (snapshot.exists()) {
      return Object.keys(snapshot.val()).map(key => ({ id: key, ...snapshot.val()[key] }));
    }
    return [];
  }

  static async getById(id) {
    const mediaRef = ref(db, `media/${id}`);
    const snapshot = await get(mediaRef);
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    }
    return null;
  }

  static async create(data) {
    const newMediaRef = push(this.getRef());
    await set(newMediaRef, data);
    return { id: newMediaRef.key, ...data };
  }

  static async update(id, data) {
    const mediaRef = ref(db, `media/${id}`);
    await update(mediaRef, data);
    return { id, ...data };
  }

  static async delete(id) {
    const mediaRef = ref(db, `media/${id}`);
    await remove(mediaRef);
    return { id };
  }
}
