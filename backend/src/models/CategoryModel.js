import { firestoreDb, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, query, orderBy } from '../config/firebase.js';

export class CategoryModel {
  static getCollectionRef() {
    return collection(firestoreDb, 'categories');
  }

  static async getAll() {
    const q = query(this.getCollectionRef(), orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  static async create(data) {
    const docRef = doc(this.getCollectionRef());
    const payload = { ...data, created_at: new Date().toISOString() };
    await setDoc(docRef, payload);
    return { id: docRef.id, ...payload };
  }

  static async update(id, data) {
    const docRef = doc(firestoreDb, 'categories', id);
    await updateDoc(docRef, { ...data, updated_at: new Date().toISOString() });
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() };
  }

  static async delete(id) {
    await deleteDoc(doc(firestoreDb, 'categories', id));
    return { id };
  }
}
