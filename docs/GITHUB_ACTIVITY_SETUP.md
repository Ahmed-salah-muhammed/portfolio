# GitHub activity radar — one-time setup

The GitHub section shows two GitHub-style visuals:

| Visual | Where the data comes from | Needs setup? |
|---|---|---|
| **Contribution heatmap** (with the year selector) | A free public mirror of your GitHub contribution calendar | No — works as is |
| **Activity overview radar** (commits / pull requests / issues / code review) | GitHub's GraphQL API, through the Netlify function `netlify/functions/github-activity.mjs` | **Yes — one token** |

GitHub only serves the radar's numbers to an authenticated request, so a token is unavoidable.
It lives in a Netlify environment variable, on the server side of the function — it is **never**
in the browser code or the repository. Until it is set the radar is simply left out (the
heatmap and everything else still show).

## Steps (about two minutes)

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens →
   Generate new token**.
   - Name: `portfolio-activity`
   - Expiration: 1 year (set a reminder to renew it)
   - Repository access: **Public repositories (read-only)**
   - Permissions: none needed
2. Copy the token once (GitHub shows it only once).
3. Netlify → your site → **Site configuration → Environment variables → Add a variable**
   - Key: `GITHUB_TOKEN`
   - Value: the token — mark it **Contains secret values**
   - (optional) `GITHUB_LOGIN` — only if the GitHub username ever changes; default is `Ahmed-salah-muhammed`
4. **Deploys → Trigger deploy → Clear cache and deploy site.**
5. Check it: open `https://YOUR-SITE.netlify.app/.netlify/functions/github-activity?year=last` —
   you should see four numbers: `{"commits":…,"pullRequests":…,"issues":…,"reviews":…}`.
   `{"error":"not-configured"}` means the variable is missing or the site was not redeployed.

Never paste the token into a chat, a commit or a screenshot. If it ever leaks, delete it on
GitHub and create a new one.

## Notes

- Responses are cached for an hour by Netlify's CDN, so visitors do not each hit GitHub's API.
- The radar shows each type's **share** of your contributions in the selected period, like the
  overview on your GitHub profile.
- Locally (`npm run dev`) the function does not exist, so the radar is hidden there; to preview
  it, run `npx netlify dev` with `GITHUB_TOKEN` in a local `.env` (already git-ignored).
- The heatmap comes from `github-contributions-api.jogruber.de`, a community service. If it is
  ever down, the card says so and links to your GitHub profile instead of breaking the page.
