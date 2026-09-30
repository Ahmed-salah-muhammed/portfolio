// The last successful GitHub response is kept in localStorage so that:
//  - a reload within the hour costs no API request (anonymous limit: 60/hour per IP);
//  - if GitHub is rate-limiting or down, the dashboard still shows the last known data.
// Storage can be unavailable (private mode, blocked), so nothing here may ever throw.

const KEY = 'as-github-cache-v1';

export const readCache = () => {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    return savedAt && data?.repos ? { savedAt, data } : null;
  } catch {
    return null;
  }
};

export const writeCache = (data) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    /* quota or storage unavailable — caching is best-effort */
  }
};
