const DATABASE_URL = process.env.FIREBASE_DATABASE_URL?.replace(/\/$/, '');

export async function realtimeRequest(path) {
  if (!DATABASE_URL) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${DATABASE_URL}/${path}.json`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Realtime Database request failed: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}
