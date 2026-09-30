import axios from 'axios';
import { GITHUB_USERNAME } from './githubService.js';

// GitHub only serves the contribution calendar through its GraphQL API, which needs a token.
// This free public mirror reads the same calendar from the public profile, so no secret is
// needed in the browser. If it is ever down the dashboard simply hides the heatmap.
const CALENDAR_API = 'https://github-contributions-api.jogruber.de/v4';

/**
 * One year of daily contribution counts.
 * `year` is "last" (the rolling 12 months GitHub shows by default) or a calendar year like 2025.
 * Returns { year, total, days: [{ date: "2025-10-03", count, level: 0–4 }] }, oldest day first.
 */
export async function fetchContributions(year = 'last', username = GITHUB_USERNAME) {
  const { data } = await axios.get(`${CALENDAR_API}/${username}`, {
    params: { y: year },
    timeout: 15000,
  });

  const days = (data.contributions ?? []).map(({ date, count, level }) => ({ date, count, level }));
  const total = Object.values(data.total ?? {})[0] ?? days.reduce((sum, d) => sum + d.count, 0);
  return { year: String(year), total, days };
}
