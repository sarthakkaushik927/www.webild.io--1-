import { db, ref, get, set } from '../config/firebase.js';

export class CraftModel {
  static getCollectionRef() {
    return ref(db, 'craft');
  }

  static async get() {
    const snapshot = await get(this.getCollectionRef());
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  }

  static async update(data) {
    await set(this.getCollectionRef(), data);
    return data;
  }
}
