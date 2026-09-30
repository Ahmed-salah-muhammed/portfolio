import axios from 'axios';

// One place to configure HTTP. Only the public GitHub API is used from the browser,
// and it is called anonymously — no token ever ships in frontend code.
export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000,
  // Accept is a CORS-safelisted header, so this adds no preflight request.
  headers: { Accept: 'application/vnd.github+json' },
});
