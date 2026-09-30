import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGithubProfile, GITHUB_USERNAME } from '@services/github/githubService.js';
import { readCache, writeCache } from '@services/github/githubCache.js';

/**
 * GitHub data with three layers of protection for the anonymous 60-requests/hour limit:
 *  1. React Query keeps a result fresh for an hour (see the QueryClient defaults);
 *  2. the last good response is persisted, so a reload within the hour makes no request
 *     and an older copy is shown instantly while a fresh one loads;
 *  3. if the request fails (rate limit, offline), the saved copy is returned with
 *     `stale: true` so the dashboard still renders and can say so.
 *
 * `enabled` lets the section wait until it is near the viewport before spending a request.
 */
export function useGithubData({ enabled }) {
  const [saved] = useState(readCache);

  return useQuery({
    queryKey: ['github', GITHUB_USERNAME],
    enabled,
    // A 403 is not going to fix itself in a second — retrying only burns the limit.
    retry: false,
    initialData: saved ? { ...saved.data, stale: false } : undefined,
    initialDataUpdatedAt: saved?.savedAt,
    queryFn: async () => {
      try {
        const data = await fetchGithubProfile();
        writeCache(data);
        return { ...data, stale: false };
      } catch (error) {
        const fallback = readCache();
        if (fallback) return { ...fallback.data, stale: true, staleReason: error };
        throw error;
      }
    },
  });
}

export default useGithubData;
