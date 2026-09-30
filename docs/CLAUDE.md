# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state: spec only, no app yet

There is **no `package.json`, no `src/`, no Vite project** in this repo yet — it is a spec + content bundle for a portfolio site that has not been scaffolded. What exists:

- [PORTFOLIO_MASTER_PROMPT.md](PORTFOLIO_MASTER_PROMPT.md) — the full build specification (stack, architecture, every page section, delivery phases). Read this first for any build work; everything else is a fragment of it.
- [profile.js](profile.js) and [projects.js](projects.js) — finished content data files. They belong at `src/data/profile.js` and `src/data/projects.js` (their own header comments say so); copy them there when scaffolding rather than rewriting them.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — YAML front-matter design tokens ("Precision & Flow"). The **YAML tokens win** over the prose later in that same file, which quotes different hex values.
- [ARCHITECTURE.md](ARCHITECTURE.md), [CONVENTIONS.md](CONVENTIONS.md), [ROADMAP.md](ROADMAP.md), [SKILLS.md](SKILLS.md), [TECH_STACK.md](TECH_STACK.md) — one-page summaries, all restated more precisely in the master prompt.
- `my_personal_photo.png` → `src/assets/images/`, `Ahmed_Salah_Muhammed_CV.pdf` → `public/cv/`.

No build, lint, or test commands exist yet. Once scaffolded (`npm create vite@latest . -- --template react`), the standard Vite scripts apply: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`. The master prompt specifies Netlify deploy (`npm run build` → `dist`, functions in `netlify/functions`).

## Files that do NOT describe this project

- **[index.css](index.css)** is a leftover from a different project: Tailwind v4 (`@import "tailwindcss"`), Montserrat/Noto Kufi fonts, a blue `--thr: #3b82f6` palette. The locked stack for this portfolio is **Material UI + Emotion with no Tailwind**, and the palette is indigo/violet. Do not carry this file into `src/` unless the user explicitly changes the stack decision.
- **[visual_identity_blueprint.md](visual_identity_blueprint.md)** is the design system of *GeoGen AI / CompassAI*, a separate product. Useful as inspiration only — its colors and fonts are not this site's.
- **`PORTFOLIO_REFERENCE.md`** is referenced by the master prompt but is absent. The prompt warns it contains outdated facts anyway (wrong education, example projects, skill percentages).

## Source-of-truth order for facts

`profile.js` + `projects.js` (built from the CV) → `PORTFOLIO_MASTER_PROMPT.md` → the other docs. Never invent facts about Ahmed — numbers, clients, employers, dates, metrics. Missing information goes into the data file as a `TODO: confirm` marker, never into visible UI copy without flagging it. Phone number and second email stay off the public site; AlUla / KSA client work is confidential (no screenshots unless the data file supplies an image).

## The project blueprint (the core design constraint)

`projects.js` is the whole Projects feature's schema, and the UI is built so that **adding a project = adding one object to `PROJECTS`, with zero component changes**. Do not rename its fields.

- `id` is the permanent project number, displayed zero-padded (`formatProjectNumber(1)` → `"01"`) in the card badge, the URL, the detail header, the tab title, and prev/next nav. Numbers are never reused or changed.
- Canonical URL `/projects/:number/:slug` (e.g. `/projects/01/arcgis-pro-salah-mcp`), resolved **by number only** — a missing or stale slug redirects (`replace`) to the canonical path. Always build URLs with `getProjectPath(project)`.
- Currently: ids 1–15 published (4 of them `featured`), ids 16–18 drafts with `published: false` that must never render. `PROJECT_TEMPLATE` (`id: 0`) is the copy-me blueprint for new entries.
- Components consume the exported selectors — `getPublishedProjects`, `getFeaturedProjects`, `getProjectByNumber`, `getAdjacentProjects`, `getMappedProjects`, `getVisibleMetrics`, `getProjectsByCategory` — rather than filtering `PROJECTS` inline. Only metrics with `verified: true` are rendered; fields still containing `TODO` are hidden from the UI.
- Detail pages are assembled from per-field section components, each rendering only when its data exists, so a sparse project still looks complete.

`profile.js` exports `PROFILE`, `EDUCATION`, `EXPERIENCE`, `PUBLICATIONS`, `CERTIFICATIONS`, `SKILLS` and drives About, Skills, the Journey timeline, Credentials, and the chatbot's local knowledge base.

## Planned architecture

Feature-based, dependency direction **shared → features → pages → layouts → app**. A feature may import from `shared`, never from another feature; each feature folder exposes its public API through `index.js`. Naming: PascalCase components, camelCase hooks (`use*`) and variables, SCREAMING_SNAKE_CASE constants. Path aliases `@` → `src`, `@services` → `src/services`. See section 3 of the master prompt for the full tree.

Locked stack choices worth remembering: React 19 + Vite, **JavaScript only — no TypeScript**, MUI (themed from `theme/tokens.js`) + Emotion, Framer Motion, React Router `createBrowserRouter`, Redux Toolkit for UI state + TanStack Query for the GitHub API, React Hook Form + Zod, EmailJS for contact, Recharts, and the ArcGIS Maps SDK **lazy-loaded** only when the GIS section enters the viewport.

Secrets: public keys go in `.env` as `import.meta.env.VITE_*`; real secrets (the chatbot LLM key) live in a Netlify function, never in browser code. The chatbot defaults to a free local-knowledge mode built from the data files, with the LLM proxy behind `VITE_CHATBOT_MODE=llm`.

## Working style the spec asks for

The master prompt defines 8 delivery phases (section 12) and asks the assistant to **stop after each phase**, summarize what was built and list the files created, then wait for "continue" — follow that unless the user says otherwise.
