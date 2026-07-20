import { db, ref, get, set, push, update, remove } from '../config/firebase.js';

export class ProductModel {
  static getCollectionRef() {
    return ref(db, 'products');
  }

  static async getAll() {
    const snapshot = await get(this.getCollectionRef());
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map(key => ({ id: key, ...data[key] }));
    }
    return [];
  }

  static async getById(id) {
    const productRef = ref(db, `products/${id}`);
    const snapshot = await get(productRef);
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    }
    return null;
  }

  static async create(data) {
    const newProductRef = push(this.getCollectionRef());
    await set(newProductRef, data);
    return { id: newProductRef.key, ...data };
  }

  static async update(id, data) {
    const productRef = ref(db, `products/${id}`);
    await update(productRef, data);
    return { id, ...data };
  }

  static async delete(id) {
    const productRef = ref(db, `products/${id}`);
    await remove(productRef);
    return { id };
  }
}
