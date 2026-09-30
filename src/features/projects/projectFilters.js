import { compareFeatured, getPublishedProjects } from '@/data/projects.js';
import { getProjectType } from '@/data/projectTypes.js';

export const SORTS = [
  { key: 'newest', label: 'Featured first' },
  { key: 'oldest', label: 'Oldest first' },
  { key: 'number', label: 'Project number' },
];

const matchesQuery = (project, query) => {
  if (!query) return true;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    project.title.toLowerCase().includes(needle) ||
    project.summary.toLowerCase().includes(needle) ||
    project.stack.some((tech) => tech.toLowerCase().includes(needle)) ||
    project.category.some((c) => c.toLowerCase().includes(needle))
  );
};

// Projects without a year sort after dated ones in either direction.
const byYear = (dir) => (a, b) => {
  if (a.year == null && b.year == null) return a.id - b.id;
  if (a.year == null) return 1;
  if (b.year == null) return -1;
  return dir * (a.year - b.year) || a.id - b.id;
};

// The default order: featured projects first (in their featuredRank order), then newest.
// "Oldest first" and "Project number" are explicit choices and ignore the featured flag.
const featuredThenNewest = (a, b) => {
  if (a.featured && b.featured) return compareFeatured(a, b);
  if (a.featured) return -1;
  if (b.featured) return 1;
  return byYear(-1)(a, b);
};

const SORTERS = {
  newest: featuredThenNewest,
  oldest: byYear(1),
  number: (a, b) => a.id - b.id,
};

/** Published projects filtered by discipline + search, then sorted. */
export function filterProjects({ type = 'all', query = '', sort = 'newest' } = {}) {
  return getPublishedProjects()
    .filter((p) => type === 'all' || getProjectType(p) === type)
    .filter((p) => matchesQuery(p, query))
    .sort(SORTERS[sort] ?? SORTERS.newest);
}

/** How many projects each discipline would show for the current search — for the chip counts. */
export function countByType(query = '') {
  const matching = getPublishedProjects().filter((p) => matchesQuery(p, query));
  const counts = { all: matching.length };
  matching.forEach((p) => {
    const t = getProjectType(p);
    counts[t] = (counts[t] ?? 0) + 1;
  });
  return counts;
}
