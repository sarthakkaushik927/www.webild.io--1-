import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const email = process.env.ADMIN_BOOTSTRAP_EMAIL || 'admin@kruxnut.com';
const password = process.env.ADMIN_BOOTSTRAP_PASSWORD || 'KruxnutAdmin@2026!';
const fullName = process.env.ADMIN_BOOTSTRAP_NAME || 'Kruxnut Admin';

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Missing Firebase config. Check backend/.env');
}

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

async function createAuthUser() {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    if (payload?.error?.message === 'EMAIL_EXISTS') {
      throw new Error(`Auth user already exists for ${email}. Use a new bootstrap email or delete the existing Firebase Auth user first.`);
    }

    throw new Error(payload?.error?.message || 'Failed to create auth user');
  }

  return payload.localId;
}

async function main() {
  const uid = await createAuthUser();

  await setDoc(doc(firestore, 'profiles', uid), {
    id: uid,
    email,
    full_name: fullName,
    phone: null,
    role: 'admin',
    status: 'approved',
    loyalty_coins: 0,
    createdAt: serverTimestamp(),
  }, { merge: true });

  console.log('Admin bootstrap complete');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});