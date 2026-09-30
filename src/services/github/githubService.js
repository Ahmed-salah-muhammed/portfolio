import { githubApi } from '@services/api';
import { PROFILE } from '@/data/profile.js';

/** "https://github.com/Ahmed-salah-muhammed" → "Ahmed-salah-muhammed" */
export const GITHUB_USERNAME = new URL(PROFILE.links.github).pathname.split('/').filter(Boolean)[0];

/** GitHub's anonymous limit (60 requests/hour per IP) was hit. `resetAt` is a Date or null. */
export class GithubRateLimitError extends Error {
  constructor(resetAt) {
    super('GitHub rate limit reached');
    this.name = 'GithubRateLimitError';
    this.resetAt = resetAt;
  }
}

const toRateLimitError = (error) => {
  const res = error.response;
  const exhausted = res?.headers?.['x-ratelimit-remaining'] === '0';
  if (res && (res.status === 403 || res.status === 429) && exhausted) {
    const reset = Number(res.headers['x-ratelimit-reset']);
    return new GithubRateLimitError(reset ? new Date(reset * 1000) : null);
  }
  return error;
};

// Keep only what the dashboard uses, so the cached copy in localStorage stays small.
const pickUser = (u) => ({
  login: u.login,
  htmlUrl: u.html_url,
  publicRepos: u.public_repos,
  followers: u.followers,
  createdAt: u.created_at,
});

const pickRepo = (r) => ({
  id: r.id,
  name: r.name,
  description: r.description,
  htmlUrl: r.html_url,
  homepage: r.homepage,
  language: r.language,
  stars: r.stargazers_count,
  forks: r.forks_count,
  isFork: r.fork,
  archived: r.archived,
  pushedAt: r.pushed_at,
  topics: r.topics ?? [],
});

/**
 * Two requests total: the profile and the (up to 100) public repos, newest push first.
 * Language data comes from each repo's primary language rather than the per-repo
 * /languages endpoint, which would cost one extra request per repository.
 */
export async function fetchGithubProfile(username = GITHUB_USERNAME) {
  try {
    const [user, repos] = await Promise.all([
      githubApi.get(`/users/${username}`),
      githubApi.get(`/users/${username}/repos`, {
        params: { per_page: 100, sort: 'pushed', type: 'owner' },
      }),
    ]);
    return { user: pickUser(user.data), repos: repos.data.map(pickRepo), fetchedAt: Date.now() };
  } catch (error) {
    throw toRateLimitError(error);
  }
}
