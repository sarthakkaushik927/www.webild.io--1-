import { Router } from 'express';
import { firestoreDb, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, orderBy } from '../config/firebase.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const q = query(collection(firestoreDb, 'profiles'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/pending', async (req, res) => {
  try {
    const q = query(collection(firestoreDb, 'profiles'), where('status', '==', 'pending'), orderBy('created_at', 'asc'));
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userSnap = await getDoc(doc(firestoreDb, 'profiles', id));
    if (userSnap.exists()) {
      return res.json({ id: userSnap.id, ...userSnap.data() });
    }
    return res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userSnap = await getDoc(doc(firestoreDb, 'profiles', id));
    if (!userSnap.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }
    const existing = userSnap.data();
    await updateDoc(doc(firestoreDb, 'profiles', id), { ...existing, ...req.body, updated_at: new Date().toISOString() });
    res.json({ id, ...existing, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const userSnap = await getDoc(doc(firestoreDb, 'profiles', id));
    if (!userSnap.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = userSnap.data();
    await updateDoc(doc(firestoreDb, 'profiles', id), { ...user, status: 'approved', updated_at: new Date().toISOString() });
    res.json({ id, ...user, status: 'approved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const userSnap = await getDoc(doc(firestoreDb, 'profiles', id));
    if (!userSnap.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = userSnap.data();
    await updateDoc(doc(firestoreDb, 'profiles', id), { ...user, status: 'rejected', updated_at: new Date().toISOString() });
    res.json({ id, ...user, status: 'rejected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const profilesRef = collection(firestoreDb, 'profiles');
    const docRef = doc(profilesRef);
    const profileData = {
      ...req.body,
      id: docRef.id,
      created_at: new Date().toISOString(),
    };
    await setDoc(docRef, profileData);
    res.status(201).json(profileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
