import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GITHUB_USERNAME } from '@services/github/githubService.js';
import { fetchContributions } from '@services/github/contributionsService.js';
import { fetchActivityBreakdown } from '@services/github/activityService.js';

/**
 * The contribution calendar for "last" (rolling 12 months) or a calendar year.
 * Kept fresh for an hour by the QueryClient defaults; the previous year stays on screen
 * while the next one loads so switching years never blanks the card.
 */
export function useContributions({ enabled, year }) {
  return useQuery({
    queryKey: ['github-contributions', GITHUB_USERNAME, year],
    enabled,
    retry: 1,
    placeholderData: keepPreviousData,
    queryFn: () => fetchContributions(year),
  });
}

/** Commits / pull requests / issues / reviews for the same period, or null when unavailable. */
export function useActivityBreakdown({ enabled, year }) {
  return useQuery({
    queryKey: ['github-activity', GITHUB_USERNAME, year],
    enabled,
    retry: false,
    placeholderData: keepPreviousData,
    queryFn: () => fetchActivityBreakdown(year),
  });
}
