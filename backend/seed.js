async function seed() {
  const body = {
    title: "Health & Happiness with Kruxnut 🌿",
    subtitle: "At Kruxnut, we believe snacking should be smart, satisfying, and full of life. Our philosophy blends nutrition, taste, and care for nature — creating a better world, one snack at a time.",
    steps: [
      {
        title: "Power of Protein",
        description: "Every bite gives you natural plant-based strength to keep you active all day long.",
        imageUrl: "/images/9.jpeg"
      },
      {
        title: "Pure Ingredients",
        description: "We choose only the finest natural ingredients — no palm oil, no chemicals, no compromise.",
        imageUrl: "/images/WhatsApp Image 2026-07-18 at 22.47.52.jpeg"
      },
      {
        title: "Eco Friendly",
        description: "From packaging to production — sustainability is at the heart of every Kruxnut creation.",
        imageUrl: "/images/WhatsApp Image 2026-07-18 at 22.47.53.jpeg"
      },
      {
        title: "Energy & Joy",
        description: "Healthy snacking that fuels your day — bringing happiness with every handful.",
        imageUrl: "/images/WhatsApp Image 2026-07-18 at 22.47.54 (1).jpeg"
      }
    ]
  };

  try {
    const res = await fetch("http://localhost:8080/api/craft", {
      method: "PUT",
      headers: {
        "Authorization": "Bearer umbra-admin-secret-2024",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    console.log("Seeded craft:", await res.text());
  } catch (err) {
    console.error("Error seeding:", err);
  }
}

seed();
