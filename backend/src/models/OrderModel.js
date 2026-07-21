import { firestoreDb, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, orderBy, limit } from '../config/firebase.js';

export class OrderModel {
  static getCollectionRef() {
    return collection(firestoreDb, 'orders');
  }

  static getItemsRef() {
    return collection(firestoreDb, 'order_items');
  }

  static async getAll() {
    const q = query(this.getCollectionRef(), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  static async getById(id) {
    const docRef = doc(firestoreDb, 'orders', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  }

  static async getByTrackingToken(token) {
    const q = query(this.getCollectionRef(), where('tracking_token', '==', token), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const d = snapshot.docs[0];
      return { id: d.id, ...d.data() };
    }
    return null;
  }

  static async create(orderData) {
    const docRef = doc(this.getCollectionRef());
    const payload = { ...orderData, created_at: new Date().toISOString() };
    await setDoc(docRef, payload);
    return { id: docRef.id, ...payload };
  }

  static async update(id, data) {
    const docRef = doc(firestoreDb, 'orders', id);
    await updateDoc(docRef, { ...data, updated_at: new Date().toISOString() });
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() };
  }

  static async getItemsByOrderId(orderId) {
    const q = query(this.getItemsRef(), where('order_id', '==', orderId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}
