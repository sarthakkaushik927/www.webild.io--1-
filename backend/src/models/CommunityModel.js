import { db, ref, get, set } from '../config/firebase.js';

export class CommunityModel {
  static getCollectionRef() {
    return ref(db, 'community');
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
