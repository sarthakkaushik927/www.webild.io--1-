import { firestoreDb, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from '../config/firebase.js';

export class MediaModel {
  static getRef() {
    return collection(firestoreDb, 'media');
  }

  static async getAll() {
    const snapshot = await getDocs(this.getRef());
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  static async getById(id) {
    const docRef = doc(firestoreDb, 'media', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  }

  static async create(data) {
    const docRef = doc(this.getRef());
    await setDoc(docRef, data);
    return { id: docRef.id, ...data };
  }

  static async update(id, data) {
    const docRef = doc(firestoreDb, 'media', id);
    await updateDoc(docRef, data);
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() };
  }

  static async delete(id) {
    await deleteDoc(doc(firestoreDb, 'media', id));
    return { id };
  }
}
