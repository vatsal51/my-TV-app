const DEFAULT_TTL_MS = 5 * 60 * 1000;

function getStorage() {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage;
  } catch (error) {
    console.warn("Cache storage unavailable:", error);
    return null;
  }
}

export function getCachedData(key, ttlMs = DEFAULT_TTL_MS) {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const rawValue = storage.getItem(key);
    if (!rawValue) return null;

    const cached = JSON.parse(rawValue);
    if (cached.expiresAt && Date.now() > cached.expiresAt) {
      storage.removeItem(key);
      return null;
    }

    return cached.value;
  } catch (error) {
    console.warn("Failed to read cache:", error);
    return null;
  }
}

export function setCachedData(key, value, ttlMs = DEFAULT_TTL_MS) {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(
      key,
      JSON.stringify({
        value,
        expiresAt: Date.now() + ttlMs,
      }),
    );
  } catch (error) {
    console.warn("Failed to write cache:", error);
  }
}
