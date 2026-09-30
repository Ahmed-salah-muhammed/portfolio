// The "activity overview" numbers GitHub shows on a profile (commits, pull requests, issues,
// code reviews) are only available through GitHub's authenticated GraphQL API. A tiny Netlify
// function (netlify/functions/github-activity.mjs) holds the token server-side and returns just
// those four counts — see docs/GITHUB_ACTIVITY_SETUP.md. Until that is configured (or in plain
// `npm run dev`) this resolves to null and the dashboard simply leaves the radar out.

const ENDPOINTS = ['/api/github-activity', '/.netlify/functions/github-activity'];
const COUNT_KEYS = ['commits', 'pullRequests', 'issues', 'reviews'];

export async function fetchActivityBreakdown(year = 'last') {
  for (const endpoint of ENDPOINTS) {
    try {
      const response = await fetch(`${endpoint}?year=${encodeURIComponent(year)}`, {
        headers: { Accept: 'application/json' },
      });
      if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        if (COUNT_KEYS.every((key) => Number.isFinite(data[key]))) {
          return Object.fromEntries(COUNT_KEYS.map((key) => [key, data[key]]));
        }
      }
    } catch {
      // try next endpoint
    }
  }
  return null;
}
