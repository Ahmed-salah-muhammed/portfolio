# Ahmed Salah — Portfolio

Personal portfolio of **Ahmed Salah Muhammed**, Full-Stack & GIS developer.
React 19 · Vite · Material UI · ArcGIS Maps SDK for JavaScript 5.1 · Calcite.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve the production build
npm run lint
```

Requires Node 20.19+ (or 22.12+).

## Configuration

Copy `.env.example` to `.env`. Everything is optional — the site runs without it.

| Variable | Purpose |
|---|---|
| `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` | Enables the contact form. See [docs/EMAILJS_SETUP.md](docs/EMAILJS_SETUP.md). Without them the form offers a pre-filled `mailto:` link. |
| `VITE_ARCGIS_API_KEY` | Switches the maps to Esri's newer `arcgis/light-gray` / `dark-gray` basemaps. Without it the classic basemaps are used (no token needed). |

These are public identifiers, safe in a `VITE_` variable. Never put a private key in one.

## Editing content

All copy lives in `src/data/` — components contain none.

- **Profile, education, experience, skills, certifications:** `src/data/profile.js`
- **Certificate images (carousel):** `src/data/certificates.js` + `public/images/certificates/`
- **Projects:** `src/data/projects.js` — see [docs/ADDING_A_PROJECT.md](docs/ADDING_A_PROJECT.md)
- **Services:** `src/data/services.js`
- **Videos (YouTube links and self-hosted clips):** `src/data/videos.js` — the section and its nav link appear automatically (hidden while the list is empty)
- **GitHub section:** nothing to edit — it reads the account in `PROFILE.links.github` live. Repos linked from a published project in `projects.js` show that project's title and summary.

## Deploy (Netlify)

`netlify.toml` already sets the build command, the `dist` publish directory, the SPA
redirect (so `/projects/01/...` survives a refresh), long-lived caching for hashed
assets and security headers. Add the `VITE_*` variables in the Netlify UI and redeploy.

## Project layout

```
src/
├── app/         entry (main.jsx, App.jsx)
├── data/        all content + the project schema
├── features/    navbar, hero, education, skills, experience, credentials,
│                services, projects, projects-map, github, videos, contact, footer
├── hooks/       useDebounce, useNearViewport, useScrollSpy, …
├── layouts/     MainLayout
├── pages/       home, not-found   (projects pages live in features/projects)
├── providers/   Redux, React Query, MUI theme
├── routes/      AppRouter (assembles each feature's own routes)
├── services/    arcgis config, email
├── shared/      reusable UI (Section, Card, CenterTimeline, …)
├── store/       Redux (UI state only)
└── theme/       tokens.js is the single source for colours, radii, shadows
```

Architecture notes for contributors and AI assistants: [CLAUDE.md](CLAUDE.md).
