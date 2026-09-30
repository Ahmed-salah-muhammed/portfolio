// Vercel Serverless Function — returns the profile "activity overview" counts for a year:
//   GET /api/github-activity?year=last   (rolling 12 months, GitHub's default)
//   GET /api/github-activity?year=2025
//
// GitHub only exposes these numbers through its GraphQL API, which needs a token, so the token
// lives in Vercel Environment Variables (GITHUB_TOKEN) and never reaches browser code.

import process from 'node:process';

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

export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(501).json({ error: 'not-configured' });
  }

  const year = req.query?.year || 'last';
  if (year !== 'last' && !/^20\d{2}$/.test(year)) {
    return res.status(400).json({ error: 'bad-year' });
  }

  const { from, to } = rangeFor(year);

  try {
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

    if (!upstream.ok) {
      return res.status(502).json({ error: 'upstream', status: upstream.status });
    }

    const { data, errors } = await upstream.json();
    const collection = data?.user?.contributionsCollection;
    if (!collection) {
      return res.status(502).json({ error: 'upstream', detail: errors?.[0]?.message ?? 'no data' });
    }

    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return res.status(200).json({
      commits: collection.totalCommitContributions,
      pullRequests: collection.totalPullRequestContributions,
      issues: collection.totalIssueContributions,
      reviews: collection.totalPullRequestReviewContributions,
    });
  } catch (error) {
    return res.status(500).json({ error: 'internal', message: error.message });
  }
}
