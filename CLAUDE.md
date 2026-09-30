# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # production build → dist/
npm run preview   # serve dist/ (use this, not dev, to judge the ArcGIS maps' real speed)
npm run lint      # ESLint (flat config, React Hooks + React Compiler rules)
npm run format    # Prettier over src/
```

There is no test suite. Verify UI changes in a browser, and always check both colour schemes and at least 390 / 768 / 1440 px.

**Dev-server gotchas**
- The first dev load after a fresh start (or after adding a dependency) is slow: Vite pre-bundles `@arcgis/core`. Requests during that window fail with `504 (Outdated Optimize Dep)` — just reload. `vite --force` rebuilds the dep cache.
- The projects map takes ~8 s to draw its points even once loaded; a "Placing projects…" veil covers it.

## What this is

A React 19 + Vite portfolio for Ahmed Salah (Full-Stack & GIS developer), **JavaScript only — no TypeScript**. UI is **Material UI + Emotion only (no Tailwind)**. Deploys to Netlify ([netlify.toml](netlify.toml): SPA redirect, asset caching, security headers).

Home page order: Hero → Education → Skills → Experience → Certifications & Publications → Services → Projects (explorer) → Projects Map → GitHub → Videos → Contact. The nav is a floating rounded header with a scrolling contact/offer bar above it (8 links with Videos — verified to fit on one line at the 1200 px breakpoint; a ninth needs a re-check).

**Videos section** (`features/videos`, data in `src/data/videos.js`): one list holding YouTube entries `{ url, title, description? }` (lite embed — thumbnail from `i.ytimg.com`, player from `youtube-nocookie.com` only after a click) and self-hosted entries `{ src, poster, title, description?, featured? }` (`featured` spans the full row). The six YouTube videos are on Rafat Kamel's channel, not Ahmed's own, so the copy never says "my channel" and there is no channel button. With no valid entries the section and its nav link are hidden in production (`SHOW_VIDEOS`) and show a dev-only placeholder. The section is plain-background, so it sits next to GitHub without breaking the alt/plain rhythm of the others.

**Not built yet:** the AI chatbot (+ Netlify function) and sitemap/OG image/JSON-LD. `PORTFOLIO_MASTER_PROMPT.md` (in [docs/](docs/)) describes them.

## Source of truth for content

**Never invent facts about Ahmed** (numbers, employers, dates, metrics, certificates). All copy lives in `src/data/`, never in components:

| File | Holds |
|---|---|
| `profile.js` | `PROFILE`, `EDUCATION` (with `logos[]` + `description`), `EXPERIENCE`, `PUBLICATIONS`, `CERTIFICATIONS`, `SKILLS` |
| `projects.js` | `PROJECTS` + the selectors below |
| `certificates.js` | scanned certificates for the carousel (fields read off each certificate) |
| `services.js` | the six service cards |
| `projectTypes.js` | `fullstack` / `gis` / `ai` and `getProjectType()` |
| `projectSchema.js` | Zod schema; validates `PROJECTS` at dev startup (logs project number + field) |

Unconfirmed facts stay as `TODO` strings in the data; `utils/content.js` (`safeText`, `safeUrl`, `hasTodo`) hides them from the UI. The phone number and Gmail are shown publicly **at Ahmed's request**; the second email is not.

`docs/` holds the original spec bundle and stale mirrors (`docs/profile.js`, `docs/projects.js`, `docs/index.css`, `docs/visual_identity_blueprint.md` belong to other projects/older copies). **`src/data/` is the live copy.** `docs/DESIGN_SYSTEM.md`'s tokens are superseded by `src/theme/tokens.js`.

## The project blueprint

Adding a project = adding one object to `PROJECTS`; no component changes ([docs/ADDING_A_PROJECT.md](docs/ADDING_A_PROJECT.md)). Don't rename its fields.

- `id` is the permanent project number (`formatProjectNumber(1)` → `"01"`); URL `/projects/:number/:slug?` resolves **by number only** and redirects a missing/stale slug to the canonical path. Build URLs with `getProjectPath(project)`.
- Use the selectors (`getPublishedProjects`, `getFeaturedProjects`, `getProjectByNumber`, `getAdjacentProjects`, `getMappedProjects`, `getVisibleMetrics`), never inline filtering. `published: false` drafts must never render.
- Every detail-page block renders only when its data exists. Cards must never show a broken image: `ProjectImage` falls back to a generated placeholder when `image` is null **or fails to load**.
- **Media**: covers/galleries live in `public/images/projects/{slug}/` (`cover.webp`, `1.webp`, …; covers render at **16:9 everywhere**), demo clips in `public/videos/projects/{slug}/` via the optional `videos: [{ src, poster, title }]` field (`ProjectVideos`, no autoplay, no audio track). Real captures exist for #1, 4, 5, 6, 7, 8, 11, 12, 17 (SpotIn, from Ahmed's own screenshots), 19 (GeoGen AI graduation project: 2 of Ahmed's own screenshots + 13 from the live docs site in English + dark; he dropped the demo videos); #2/#3 are confidential (no images by design); #9, #10, #13–15 and #20 still use the placeholder (#20's app cannot run: its Esri API key returns 498 Invalid token). Before publishing any recording or screenshot, look for secrets and third parties' personal data (tokens, `.env`, other people's names/emails) — the ArcGIS video had a GitHub token page masked out, and one SpotIn screenshot was dropped and two blurred for a third party's name. Screenshots were taken from the real running apps — any "screenshot only" workaround (e.g. Esri tiles swapped in for a dead CARTO key) is not part of the shipped apps; never present them as something the apps do not do.
- Client projects (`type: 'client'`) show a "Client project" label and `period`, no code link, and no screenshot unless the client allows it.

## Architecture

Feature-based: **shared → features → pages → layouts → app**. A feature may import `shared`, never another feature (exceptions in practice: `footer`/`contact` reuse `navbar`'s `Monogram`/`NAV_LINKS`). Each feature exposes `index.js`.

- **Routing is colocated**: each feature/page owns a `routes.jsx` (`pages/home`, `pages/not-found`, `features/projects`); `routes/AppRouter.jsx` only concatenates them (catch-all last). Project pages are `React.lazy`.
- **Theme** (`src/theme/`): `tokens.js` is the only place colours/radii/shadows/layout numbers live. MUI runs with CSS variables + `data-mui-color-scheme`; extra palette slots are read as `var(--mui-palette-surfaces-*)` (`alt`, `muted`, `primarySoft`, `borderStrong`). Theme mode is owned by MUI's `useColorScheme` — **not** Redux. Typography is fluid (`clamp()`), spacing is MUI's default 8 px unit. Text colours are neutral slate on purpose — tinted body text looked like links.
- **Shared UI** (`shared/components/ui`): `Section` (uniform padding, centred title + accent bar; `alt` = alternate background), `Reveal` (fade-up on scroll, reduced-motion aware), `Card`, `Tag`, `IconTile`, `CenterTimeline` (centre-line layout, `dense` zig-zags; used by Experience, Education and Projects), `ErrorBoundary` (has `fallback`), `SocialLinks`, `ScrollTopButton`.
- **State**: Redux only for UI (`uiSlice`: mobile drawer, chatbot flag, `mapFocus` for "Show on map"); React Query (1 h `staleTime`, no refetch on focus) is used by the GitHub dashboard.
- **ArcGIS maps** (`features/projects-map`, `features/contact`): built on `@arcgis/map-components` (`<arcgis-map>`) + Calcite, **lazy-loaded** so the SDK never reaches the main bundle. Loading one map costs ~620 requests (≈470 tiny local SDK chunks + ~130 to Esri's CDN), so `useNearViewport('400px', { preloadAfter })` also mounts it in the background once the page has loaded and gone idle (projects map 600 ms after `load`, contact map 3.5 s; skipped on data-saver / 2g) — it is already drawn when scrolled to, and the first paint is never delayed. The Projects Map clusters nearby points (`featureReduction` cluster, slate symbol set through `symbol`, **not** `renderer` — a cluster renderer also repaints single projects and loses their discipline colours), has a Basemap Gallery (`arcgis-expand` + `LocalBasemapsSource` of keyless vector basemaps) and a small custom legend (the built-in legend adds a bulky "number of features" section once clustering is on). "Show on map" zooms to 12 so a project is out of its cluster. Shared setup in `src/services/arcgis/config.js` (`basemapFor`, `friendlyNavigation` — one-finger touch scrolls the page, wheel-zoom only after a click). Import ArcGIS modules with the `.js` extension (`@arcgis/core/Graphic.js`). Point labels must use a font Esri hosts (`Noto Sans`); an unhosted font like `Arial` bold stalls the layer view for many seconds. Without `VITE_ARCGIS_API_KEY` maps use the classic no-token basemaps.
- **Skills icons**: `features/skills/skillIcons.js` maps every skill name in `profile.js` to a `simple-icons` logo, an Esri Calcite glyph (`esriGlyphs.js`, generated by `scripts/extract-calcite-icons.mjs`), an MUI icon, or a text tile; unknown skills fall back to initials. Tiles are white in light mode and dark in dark mode.
- **GitHub dashboard** (`features/github`): anonymous GitHub REST API via the Axios instance in `services/api`, fetched through React Query **only once the section nears the viewport**. Two requests (profile + repos); the anonymous limit is 60/hour per IP, so `useGithubData` persists the last good response in localStorage (reload within the hour = zero requests; on a failure or rate limit the saved copy is shown with a notice). Language data is each repo's *primary* language (no per-repo calls). Repos that back a **published** portfolio project (matched by the URLs in `projects.js` `links.code` / `codeBackend`) render with the project's own title/summary plus live GitHub data — most raw repos have no or throwaway descriptions. Forks and the profile-README repo are excluded; stars/followers are deliberately not headline stats (tiny numbers). The donut is Recharts, `React.lazy`-loaded; the legend list is its text alternative. When testing, mock `https://api.github.com/**` with Playwright rather than hitting the live API repeatedly. **Contributions** (`ContributionsCard`, first block of the section, independent of the repo data): a GitHub-style year heatmap (SVG, GitHub's greens, year pills — the current year maps to the rolling "last year") from the public mirror `github-contributions-api.jogruber.de` (CORS open, no secret; total matches the profile). The "activity overview" radar (commits / PRs / issues / code review shares) needs GitHub's GraphQL API, so it comes from the Netlify function `netlify/functions/github-activity.mjs` which reads `GITHUB_TOKEN` from the environment ([docs/GITHUB_ACTIVITY_SETUP.md](docs/GITHUB_ACTIVITY_SETUP.md)); without it (or in plain `npm run dev`) the fetch resolves to `null` and the radar is simply not rendered. GitHub's public events API was tried first and is useless here (a handful of events, no commit counts). MUI gotcha hit here: never destructure `theme.applyStyles` — it needs its `this` (a crash inside a section is swallowed by the `ErrorBoundary`, which then removes the whole section).
- **Projects order**: `featured: true` + optional `featuredRank` lead the default "Featured first" order (today: 01 → 19 → 12 are the first page); the other sorts ignore it. `getFeaturedProjects` returns them in rank order.
- **Contact** (`features/contact`): side by side (lg+) both columns stretch to one bottom line — the map card grows (`flex: 1`, `minHeight`) and the message box fills the form card; React Hook Form + Zod, honeypot field, 60 s localStorage cooldown, EmailJS via `services/email/emailService.js`. With no `VITE_EMAILJS_*` env vars the form degrades to a pre-filled `mailto:` link. Setup: [docs/EMAILJS_SETUP.md](docs/EMAILJS_SETUP.md).
- `@services` → `src/services`, `@` → `src` (aliases in `vite.config.js` and `jsconfig.json`).

## Conventions

PascalCase components, camelCase hooks (`use*`) and variables, SCREAMING_SNAKE_CASE constants. Comments explain *why*. Respect `prefers-reduced-motion`. Never add a secret to frontend code — only public keys go in `VITE_*` variables (see `.env.example`).
