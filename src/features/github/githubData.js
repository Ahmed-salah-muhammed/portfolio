import { getPublishedProjects } from '@/data/projects.js';

// GitHub's own "linguist" colours, so the chart reads like the profile page.
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  'Jupyter Notebook': '#da5b0b',
  Java: '#b07219',
  Shell: '#89e051',
};
const FALLBACK_COLORS = ['#4648d4', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6', '#64748b'];
const MAX_SLICES = 6; // beyond this the smallest languages fold into "Other"

export const languageColor = (name, index = 0) =>
  LANGUAGE_COLORS[name] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];

const byPushedDesc = (a, b) => new Date(b.pushedAt) - new Date(a.pushedAt);

/** "https://github.com/user/Repo(.git)" → "repo" (lower-cased for matching), or null. */
const repoKeyFromUrl = (url) => {
  if (typeof url !== 'string' || !url.includes('github.com')) return null;
  const parts = new URL(url).pathname.split('/').filter(Boolean);
  return parts[1] ? parts[1].replace(/\.git$/i, '').toLowerCase() : null;
};

/** Which published project (if any) each repo backs: repo key → { project, role }. */
const projectsByRepo = () => {
  const map = new Map();
  getPublishedProjects().forEach((project) => {
    [
      ['code', 'main'],
      ['codeBackend', 'backend'],
    ].forEach(([field, role]) => {
      const key = repoKeyFromUrl(project.links?.[field]);
      if (key) map.set(key, { project, role });
    });
  });
  return map;
};

const summariseLanguages = (repos) => {
  const counts = new Map();
  repos.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const head = sorted.slice(0, sorted.length > MAX_SLICES + 1 ? MAX_SLICES : sorted.length);
  const tail = sorted.slice(head.length);

  const slices = head.map(([name, count], i) => ({ name, count, color: languageColor(name, i) }));
  if (tail.length) {
    slices.push({
      name: 'Other',
      count: tail.reduce((sum, [, c]) => sum + c, 0),
      color: '#94a3b8',
    });
  }
  const total = slices.reduce((sum, s) => sum + s.count, 0);
  return { slices: slices.map((s) => ({ ...s, percent: Math.round((s.count / total) * 100) })), total, distinct: sorted.length };
};

/**
 * Everything the dashboard renders, from one API payload.
 *
 * Forks are excluded throughout (they are other people's code), and so is the profile
 * README repo (named after the user). "Featured" are repos that back a *published*
 * portfolio project — those get the project's own vetted title and summary rather
 * than a throwaway repo description.
 */
export function deriveDashboard({ user, repos }) {
  const own = repos.filter((r) => !r.isFork);
  const content = own
    .filter((r) => r.name.toLowerCase() !== user.login.toLowerCase())
    .sort(byPushedDesc);

  const backing = projectsByRepo();
  const featured = content
    .filter((r) => backing.has(r.name.toLowerCase()))
    .map((r) => ({ ...r, ...backing.get(r.name.toLowerCase()) }));

  const languages = summariseLanguages(own);
  const lastPush = own.length ? [...own].sort(byPushedDesc)[0].pushedAt : null;

  return {
    stats: {
      publicRepos: user.publicRepos,
      languages: languages.distinct,
      lastPush,
      since: user.createdAt ? new Date(user.createdAt).getFullYear() : null,
    },
    languages,
    featured,
    recent: content.slice(0, 6),
    profileUrl: user.htmlUrl,
  };
}
