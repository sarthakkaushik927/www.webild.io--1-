import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set, push, get } from "firebase/database";
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
const database = getDatabase(app);

async function seedMedia() {
  const mediaRef = dbRef(database, "media");
  const snapshot = await get(mediaRef);
  const existing = snapshot.exists() ? snapshot.val() : {};
  
  const imagesDir = path.join(process.cwd(), "..", "frontend-perfect", "public", "images");
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith(".jpeg") || f.endsWith(".jpg"));
  
  let added = 0;
  for (const file of files) {
    const url = `/images/${file}`;
    const name = path.basename(file, path.extname(file));
    
    if (!existing[file]) {
      const newMediaRef = push(mediaRef);
      await set(newMediaRef, {
        url,
        title: name,
        description: "Product image",
        section: "product",
        createdAt: Date.now(),
      });
      added++;
    }
  }
  
  console.log(`Media: added ${added} new items`);
}

async function seedCarousel() {
  const carouselRef = dbRef(database, "carousel");
  const snapshot = await get(carouselRef);
  if (!snapshot.exists()) {
    await set(carouselRef, {
      images: [
        "https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-1.webp",
        "https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp",
        "https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp"
      ]
    });
    console.log("Carousel: seeded default images");
  } else {
    console.log("Carousel: already exists, skipping");
  }
}

async function seedCraft() {
  const craftRef = dbRef(database, "craft");
  const snapshot = await get(craftRef);
  if (!snapshot.exists()) {
    await set(craftRef, {
      title: "The Art Behind Our Fragrances",
      subtitle: "Each perfume is meticulously composed with rare essences and noble raw materials.",
      steps: [
        {
          title: "Rare Ingredient Sourcing",
          description: "We source precious essences from sustainable fields worldwide.",
          imageUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-1.webp"
        },
        {
          title: "Master Perfumers",
          description: "Every composition is crafted by world-renowned noses.",
          imageUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-2.webp"
        },
        {
          title: "Lasting Sillage",
          description: "Our concentrated formulas are designed for exceptional longevity.",
          imageUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-3.webp"
        }
      ]
    });
    console.log("Craft: seeded default content");
  } else {
    console.log("Craft: already exists, skipping");
  }
}

async function seedCommunity() {
  const communityRef = dbRef(database, "community");
  const snapshot = await get(communityRef);
  if (!snapshot.exists()) {
    await set(communityRef, {
      title: "Worn By Those Who Set The Standard",
      subtitle: "The women shaping culture choose UMBRA as their signature.",
      influencers: [
        {
          name: "Amara Osei",
          videoUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-amara.mp4"
        },
        {
          name: "Chloe Marchand",
          videoUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-chloe.mp4"
        },
        {
          name: "Elena Vasquez",
          videoUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-elena.mp4"
        }
      ]
    });
    console.log("Community: seeded default content");
  } else {
    console.log("Community: already exists, skipping");
  }
}

async function main() {
  console.log("Seeding database...");
  await seedMedia();
  await seedCarousel();
  await seedCraft();
  await seedCommunity();
  console.log("Done!");
}

main().catch(console.error);
