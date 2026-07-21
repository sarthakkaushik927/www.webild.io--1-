import {
  firestoreDb,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from '../config/firebase.js';

const PRODUCTS_PATH = 'products';
const DATABASE_URL = process.env.FIREBASE_DATABASE_URL?.replace(/\/$/, '');

function normalizeProduct(id, data = {}) {
  return {
    id,
    ...data,
    image_url: data.image_url || data.imageUrl || null,
    imageUrl: data.imageUrl || data.image_url || null,
    tags: data.tags || (data.tag ? [data.tag] : []),
    category_id: data.category_id ?? null,
    is_available: data.is_available ?? true,
    created_at: data.created_at || data.createdAt || null,
  };
}

function sortProducts(products) {
  return products.sort((a, b) => {
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
    return bTime - aTime;
  });
}

async function getRealtimeProducts() {
  const products = await realtimeRequest(PRODUCTS_PATH);
  if (!products) return [];

  return Object.entries(products).map(([id, data]) => normalizeProduct(id, data));
}

async function realtimeRequest(path, options = {}) {
  if (!DATABASE_URL) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${DATABASE_URL}/${path}.json`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Realtime Database request failed: ${response.status}`);
    }

    return response.status === 204 ? null : await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export class ProductModel {
  static getCollectionRef() {
    return collection(firestoreDb, 'products');
  }

  static async getAll() {
    const [firestoreResult, realtimeResult] = await Promise.allSettled([
      getDocs(this.getCollectionRef()),
      getRealtimeProducts(),
    ]);

    const productsById = new Map();
    if (realtimeResult.status === 'fulfilled') {
      realtimeResult.value.forEach((product) => productsById.set(product.id, product));
    }

    if (firestoreResult.status === 'fulfilled') {
      firestoreResult.value.docs.forEach((d) => {
        productsById.set(d.id, normalizeProduct(d.id, d.data()));
      });
    }

    return sortProducts([...productsById.values()]);
  }

  static async getById(id) {
    try {
      const docRef = doc(firestoreDb, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return normalizeProduct(docSnap.id, docSnap.data());
      }
    } catch (error) {
      console.warn(`Firestore product lookup failed for ${id}:`, error.message);
    }

    const realtimeProduct = await realtimeRequest(`${PRODUCTS_PATH}/${id}`);
    if (realtimeProduct) {
      return normalizeProduct(id, realtimeProduct);
    }

    return null;
  }

  static async create(data) {
    const created = await realtimeRequest(PRODUCTS_PATH, {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const id = created?.name || doc(this.getCollectionRef()).id;
    const payload = normalizeProduct(id, {
      ...data,
      imageUrl: data.imageUrl || data.image_url || null,
      image_url: data.image_url || data.imageUrl || null,
      created_at: new Date().toISOString(),
    });
    const docRef = doc(firestoreDb, 'products', id);

    await realtimeRequest(`${PRODUCTS_PATH}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    await setDoc(docRef, payload).catch((error) => {
      console.warn(`Firestore product create mirror failed for ${id}:`, error.message);
    });

    return payload;
  }

  static async update(id, data) {
    const docRef = doc(firestoreDb, 'products', id);
    const payload = normalizeProduct(id, {
      ...data,
      imageUrl: data.imageUrl || data.image_url || null,
      image_url: data.image_url || data.imageUrl || null,
      updated_at: new Date().toISOString(),
    });

    await realtimeRequest(`${PRODUCTS_PATH}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    await setDoc(docRef, payload, { merge: true }).catch((error) => {
      console.warn(`Firestore product update mirror failed for ${id}:`, error.message);
    });

    return payload;
  }

  static async delete(id) {
    await Promise.allSettled([
      deleteDoc(doc(firestoreDb, 'products', id)),
      realtimeRequest(`${PRODUCTS_PATH}/${id}`, { method: 'DELETE' }),
    ]);
    return { id };
  }
}
