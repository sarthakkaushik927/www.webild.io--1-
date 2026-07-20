import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, set, get } from "firebase/database";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

const imagesDir = path.join(process.cwd(), "frontend-perfect", "public", "images");
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith(".jpeg") || f.endsWith(".jpg"));

async function uploadImage(filePath: string, fileName: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);
  const storageRef = ref(storage, `products/${fileName}`);
  await uploadBytes(storageRef, fileBuffer, { contentType: "image/jpeg" });
  const url = await getDownloadURL(storageRef);
  return url;
}

async function createProduct(name: string, price: string, imageUrl: string, tag?: string): Promise<void> {
  const productsRef = dbRef(database, "products");
  const newProductRef = push(productsRef);
  await set(newProductRef, {
    name,
    price,
    imageUrl,
    tag: tag || "",
    description: "",
  });
  console.log(`Created product: ${name}`);
}

async function main() {
  console.log(`Found ${files.length} images to upload...`);
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const name = path.basename(file, path.extname(file));
    
    console.log(`Uploading: ${file}`);
    try {
      const imageUrl = await uploadImage(filePath, file);
      console.log(`  URL: ${imageUrl}`);
      
      await createProduct(name, "100", imageUrl, "50ml • Fresh");
      console.log(`  Product created`);
    } catch (error) {
      console.error(`  Error:`, error);
    }
  }
  
  console.log("\nDone!");
}

main().catch(console.error);
