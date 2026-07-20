import fs from "fs";
import path from "path";

const ADMIN_TOKEN = "umbra-admin-secret-2024";
const API_BASE = "http://localhost:8080";

const imagesDir = path.join(process.cwd(), "..", "frontend-perfect", "public", "images");
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith(".jpeg") || f.endsWith(".jpg"));

async function createProduct(name, price, imageUrl, tag, description) {
  const response = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ADMIN_TOKEN}`,
    },
    body: JSON.stringify({
      name,
      price,
      imageUrl,
      tag,
      description,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed: ${response.status} ${text}`);
  }

  return response.json();
}

async function main() {
  console.log(`Found ${files.length} images. Creating products via admin API...`);

  for (const file of files) {
    const name = path.basename(file, path.extname(file));
    const imageUrl = `/images/${file}`;

    console.log(`Creating: ${name}`);
    try {
      const product = await createProduct(
        name,
        "",
        imageUrl,
        "50ml • Fresh",
        `Luxury fragrance product. Handcrafted with rare essences and noble raw materials for a lasting impression.`
      );
      console.log(`  Done: ${product.id}`);
    } catch (error) {
      console.error(`  Error:`, error.message);
    }
  }

  console.log("\nAll products created!");
}

main().catch(console.error);
