export function readPreference(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
export function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Preferences are optional when storage is unavailable. */
  }
}
export function resolveMode(search, saved = "visual") {
  const explicit = new URLSearchParams(search).get("mode");
  return ["visual", "terminal"].includes(explicit) ? explicit : saved;
}
