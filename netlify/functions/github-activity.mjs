// Netlify Function — returns the profile "activity overview" counts for a year:
//   GET /.netlify/functions/github-activity?year=last   (rolling 12 months, GitHub's default)
//   GET /.netlify/functions/github-activity?year=2025
//
// GitHub only exposes these numbers through its GraphQL API, which needs a token, so the token
// lives here as an environment variable and never reaches browser code. Setup:
// docs/GITHUB_ACTIVITY_SETUP.md. Without GITHUB_TOKEN this answers 501 and the site just hides the radar.

const LOGIN = process.env.GITHUB_LOGIN || 'Ahmed-salah-muhammed';

const QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
      }
    }
  }
`;

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

/** GraphQL accepts at most one year per request. */
function rangeFor(year) {
  const now = new Date();
  if (year === 'last') {
    const from = new Date(now);
    from.setUTCFullYear(now.getUTCFullYear() - 1);
    return { from, to: now };
  }
  const y = Number(year);
  const to = new Date(Date.UTC(y, 11, 31, 23, 59, 59));
  return { from: new Date(Date.UTC(y, 0, 1)), to: to > now ? now : to };
}

export default async (request) => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return json({ error: 'not-configured' }, 501);

  const year = new URL(request.url).searchParams.get('year') ?? 'last';
  if (year !== 'last' && !/^20\d{2}$/.test(year)) return json({ error: 'bad-year' }, 400);

  const { from, to } = rangeFor(year);
  const upstream = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio-github-activity',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { login: LOGIN, from: from.toISOString(), to: to.toISOString() },
    }),
  });

  if (!upstream.ok) return json({ error: 'upstream', status: upstream.status }, 502);

  const { data, errors } = await upstream.json();
  const collection = data?.user?.contributionsCollection;
  if (!collection) return json({ error: 'upstream', detail: errors?.[0]?.message ?? 'no data' }, 502);

  return json(
    {
      commits: collection.totalCommitContributions,
      pullRequests: collection.totalPullRequestContributions,
      issues: collection.totalIssueContributions,
      reviews: collection.totalPullRequestReviewContributions,
    },
    200,
    // The counts change slowly; let Netlify's CDN and browsers keep them for an hour.
    { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  );
};
