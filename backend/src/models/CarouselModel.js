import { db, ref, get, set } from '../config/firebase.js';

export class CarouselModel {
  static getRef() {
    return ref(db, 'carousel');
  }

  static async get() {
    const snapshot = await get(this.getRef());
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return { images: [] };
  }

  static async update(data) {
    await set(this.getRef(), data);
    return data;
  }
}
