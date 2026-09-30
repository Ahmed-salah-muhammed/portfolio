# MASTER PROMPT — Ahmed Salah Muhammed Portfolio (React + Vite, JavaScript)

> Paste this whole file into your AI coding assistant (Claude Code, Cursor, etc.) together with the docs folder
> (`DESIGN_SYSTEM.md`, `PORTFOLIO_REFERENCE.md`, `ARCHITECTURE.md`, `CONVENTIONS.md`, `SKILLS.md`, `TECH_STACK.md`, `ROADMAP.md`)
> my photo `my_personal_photo.png`, my CV `Ahmed_Salah_Muhammed_CV.pdf` (copy to `public/cv/`), and the data files `profile.js` + `projects.js` (copy to `src/data/`).

---

## 0. Your Role

You are a **senior frontend engineer and product designer**. You are building my personal portfolio website from scratch.
It must look like a premium, hand-crafted product — not a template. Every section should communicate one idea:

> **An urban planner turned GIS developer — where spatial engineering, full-stack, cloud and AI meet.**

Work in phases (Section 12). After each phase, stop, summarize what you built, list files created, and wait for my "continue".

**Hard rules**
- JavaScript only (`.jsx` / `.js`), no TypeScript.
- Never invent facts about me (numbers, clients, employers, dates, metrics). If something is missing, put a clearly marked placeholder like `TODO: confirm` in the data file — never in visible UI text without telling me.
- Never put secret keys in frontend code. Public keys go in `.env` via `import.meta.env.VITE_*`; real secrets go in a serverless function.
- All content lives in data files, never hard-coded inside components.
- **Source-of-truth order:** `profile.js` + `projects.js` (from my CV) → this prompt → other docs. `PORTFOLIO_REFERENCE.md` contains outdated facts (wrong education, example projects, skill percentages) — use it only for design/architecture ideas, never for facts about me.
- Never show my phone number or second email on the site.
- Client work (AlUla, KSA heritage) may be confidential: no screenshots unless the data file provides an image.

---

## 1. Who I Am

All details live in `src/data/profile.js` — read it; below is the short version for context.

- **Name:** Ahmed Salah Muhammed Muhammed (أحمد صلاح)
- **Title:** GIS Developer · Full-Stack Developer · **AWS Certified Cloud Practitioner**
- **Background:** Urban & Regional Planner — B.Sc. Cairo University (Environmental Planning & Sustainable Infrastructure, 2019–2024, ranked 5th in cohort) + ITI 9-Month Diploma in Geo-informatics (Intake 46, 2025–2026).
- **Location:** Cairo, Egypt — `30.0444° N, 31.2357° E` (use the coordinates as a visual motif in JetBrains Mono)
- **Experience:**
  - GIS Engineer — Etqaan Urban Planning Solutions (2025): national-scale Saudi projects — AlUla Old Town registration and the KSA urban-heritage initiative; ArcGIS Enterprise/Online admin, Survey123, Python automation, CityEngine/Twinmotion.
  - Environmental Analyst — Project Consultant Group (2024): GIS & remote sensing for EIA across Egyptian sites.
  - Urban Planner & GIS Analyst — Project Consultant Group (2023): Riyadh flood simulation, Al-Nammas urban GIS.
- **Publication:** co-author, AUJES 2025 — New Delta land suitability via bio-economy mapping & remote sensing.
- **Story:** I started as an urban & environmental planner using GIS to answer real planning questions (floods, heritage, land suitability). Working on Saudi national projects pushed me into enterprise GIS and automation; ITI turned me into a developer. Now I build spatial software — WebGIS apps, geospatial backends, cloud deployments, and AI agents (MCP) that operate ArcGIS and QGIS.
- **Three pillars** (from `PROFILE.pillars` — use in hero, about, skills): GIS & Spatial Engineering · Full-Stack & Cloud · AI & Automation.
- **Languages:** Arabic (native), English (professional working proficiency)
- **Links:** email `ahmedsalah219013@gmail.com`, GitHub, LinkedIn (`linkedin.com/in/ahmedsallah`), X, Facebook — all in `PROFILE.links`.

---

## 2. Tech Stack (locked)

| Area | Choice |
|---|---|
| Build | Vite + React 19 (JavaScript) |
| UI | **Material UI** (custom theme built from the design tokens) + Emotion. Do **not** also add Tailwind — one styling system only, plus global CSS variables for tokens. |
| Animation | Framer Motion (respect `prefers-reduced-motion`) |
| Routing | React Router v6.4+ (`createBrowserRouter`): `/` Home, `/projects` All projects, `/projects/:number/:slug?` Project details (e.g. `/projects/01/arcgis-pro-salah-mcp`), `*` 404 |
| State | Redux Toolkit (UI state: theme mode, chatbot open, filters) + TanStack React Query (GitHub API) |
| Forms | React Hook Form + Zod |
| Email | EmailJS (`@emailjs/browser`) |
| Maps | ArcGIS Maps SDK for JavaScript (map components) + Calcite — **lazy-loaded** only when the GIS section enters the viewport |
| Charts | Recharts (GitHub stats) |
| HTTP | Axios instance in `src/services/api` |
| Deploy | Netlify (with Netlify Functions for the AI chatbot proxy) |
| SEO | `react-helmet-async`, OG image, sitemap, robots.txt |

Path aliases in `vite.config.js`: `@` → `src`, `@services` → `src/services`.

---

## 3. Architecture & Conventions

Feature-based architecture, dependency direction: **shared → features → pages → layouts → app**. A feature may import from `shared`, never from another feature.

```
src/
├── app/            App.jsx, main.jsx
├── assets/         images (my photo → assets/images/ahmed.webp), svg patterns
├── data/           profile.js (profile, education, experience, publications, certifications, skills), projects.js, projectSchema.js, services.js, chatbotKnowledge.js
├── features/
│   ├── navbar/  hero/  about/  skills/  journey/  credentials/  projects/
│   ├── gis/     github/  services/  contact/  chatbot/  footer/
├── hooks/          useDebounce, useInView, useScrollSpy, useMediaQuery
├── layouts/        MainLayout
├── pages/          HomePage, ProjectsPage, ProjectDetailsPage, NotFoundPage
├── providers/      AppProviders (Redux, QueryClient, Theme, Helmet)
├── routes/         AppRouter
├── services/       api/, github/, email/, chatbot/
├── shared/components/ui/   AppButton, AppCard, AppChip, AppModal, AppDrawer, SectionHeader, GlassPanel, GisPattern
├── store/          index.js, slices/uiSlice.js
└── theme/          tokens.js, palette.js, typography.js, components.js, index.js
netlify/functions/  chat.js
```

Each feature folder: `components/`, `hooks/` (if needed), `index.js` (public exports only).

Naming: **PascalCase** components · **camelCase** hooks & variables (hooks start with `use`) · **SCREAMING_SNAKE_CASE** constants.

---

## 4. Design System — "Precision & Flow"

Source of truth = `DESIGN_SYSTEM.md` front-matter tokens. The prose in that file mentions slightly different hex values (`#6366F1`, `#312E81`); **use the YAML tokens** and put every color in `theme/tokens.js` so it's changeable in one place.

**Colors (light)**
- Background `#F7F9FB` · Surface `#FFFFFF` · Surface-tint `#EEF2FF`
- Primary `#4648D4` · Primary-container `#6063EE` · Secondary `#5654A8` · Tertiary (violet) `#8127CF`
- Text `#191C1E` · Muted text `#464554` · Outline `#C7C4D7`
- Success `#4CAF50` · Warning `#F59E0B` · Error `#EF4444` · Info `#3B82F6`

**Colors (dark)** — Background `#0F172A` · Surface `#111827` · Card `#1E293B` · Border `#334155` · keep the indigo/violet accents (use `#C0C1FF` for primary text on dark).

**Typography**
- Display/headings: Plus Jakarta Sans 700/800, tight letter-spacing (−0.02em). display-lg 48/56 (mobile 36/44), headline-md 32/40, headline-sm 24/32.
- Body: Inter 400/500/600 — body-lg 18/28, body-md 16/24.
- Technical labels, coordinates, chips, code: JetBrains Mono 500, 12–14px, letter-spacing 0.05em.

**Shape & spacing** — 4px base unit; radius 8px (buttons/inputs), 16px (cards), 24px (large panels, photo squircle), pill for chips. Container 1280px, 12-col desktop / 8-col tablet / 1-col mobile, margins 80 / 24 / 16px.

**Depth** — no harsh borders. Cards use indigo-tinted ambient shadow `0 8px 30px rgba(49,46,129,0.08)`. Glassmorphism for navbar, chatbot and floating panels: `backdrop-filter: blur(18–20px)`, translucent surface, 1px translucent white border.

**GIS visual motifs (this is the signature — use tastefully)**
- 48×48px coordinate grid background with radial indigo spotlight.
- SVG topographic contour lines, node-link networks, and lat/long tick marks at 5–10% opacity behind sections.
- Coordinate readouts in mono font (e.g. section labels like `// 02 — SKILLS · 30.04°N`).
- Hover: `translateY(-4px)` + stronger shadow; images zoom 1.05 inside cards.

Light/dark toggle in navbar, default follows system, choice remembered in `localStorage` (wrapped in try/catch).

---

## 5. Page Sections (single-page Home, in this order)

Inspiration: my old site (`https://dapper-syrniki-294d52.netlify.app/`) had Home → About → Services → Projects → Contact + a floating chatbot. Keep that friendly flow, but upgrade everything to the new identity.

### 5.1 Navbar
Sticky glass bar. Logo = "AS" monogram + "Ahmed Salah Muhammed". Links with scroll-spy active indicator: About, Experience, Projects, GIS Lab, Contact. Theme toggle, "Download CV" button (`PROFILE.links.cv`). Mobile: drawer.

### 5.2 Hero — "Spatial Intelligence Node"
- Left: mono eyebrow `GIS DEVELOPER · FULL-STACK · AWS CERTIFIED`, headline "Hi, I'm Ahmed Salah Muhammed" + a rotating/typed line cycling: *"I build WebGIS platforms." / "I connect AI agents to ArcGIS." / "I turn spatial data into planning decisions."*, short 2-line intro, buttons: **View Projects** (primary) and **Let's Talk** (ghost).
- Right: my photo in a 24px-radius squircle frame, with an animated SVG ring of orbiting nodes (GIS · Web · AI) connected by thin lines, and a small glass "location card" showing `Cairo, EG · 30.0444°N 31.2357°E` with a pulsing green dot (available for work).
- Background: coordinate grid + faint contour lines + subtle parallax on mouse move (disabled on reduced motion/mobile).
- Row of 3 stat chips at the bottom from `PROFILE.stats`. Small AWS badge chip near the title.

### 5.3 About
`PROFILE.summary`, the 3 pillars as cards with icons, `PROFILE.focusAreas` as chips, and the two `EDUCATION` entries (show GPA, rank and graduation grade for Cairo University). Keep the old-site spirit "Better Solutions · Better Experience" as a small tagline.

### 5.4 Skills
Tabs by `SKILLS[].category` (GIS & Geospatial · Development · Cloud (AWS) · AI & Automation · Foundations). Each skill = chip with icon where one exists. **No percentage bars** — instead, under each tab show 1–2 "used in" links to projects whose `stack` contains those skills.

### 5.5 Experience & Journey (timeline)
Vertical timeline merging `EXPERIENCE` and `EDUCATION`, newest first: ITI (2025–26) → Etqaan (2025) → Cairo University graduation (2024) → Project Consultant Group (2024, 2023) → Cairo University start (2019). Each node looks like a map pin; experience cards show role, company, type, dates, highlights, and links to `relatedProjects`. A small "view on map" action flies the GIS Lab map to that entry's `sites`.

### 5.5b Credentials
- **Publication card** from `PUBLICATIONS` (authors with my name bolded, journal, year, DOI button when `url` exists).
- **Certifications** from `CERTIFICATIONS`, grouped by `group` (Cloud · GIS · Development · AI · Leadership). The AWS certification (`featured: true`) is a large highlighted card with validity dates; others are compact rows. "View all certificates" button uses `PROFILE.links.certificates` when set.

### 5.6 Services
Refresh the old services into 6 glass cards (from `services.js`): WebGIS & Full-Stack Development · Enterprise GIS Administration (ArcGIS Enterprise / Online, Survey123 field apps) · Spatial Analysis, Flood & Environmental Studies · 3D Urban Visualization & Digital Twins (CityEngine, Twinmotion) · GIS Automation & AI Agents (ArcPy, MCP, n8n) · Cloud GIS on AWS.

### 5.7 Projects — Cards + Numbered Detail Pages

`src/data/projects.js` is already written (I'll provide it). **Do not rename its fields.** Every project follows the exact same blueprint, so adding a new project = adding one object to the array, with zero component changes.

**A. Project numbering (the project's identity everywhere)**
- `id` is the permanent project number. Display it zero-padded with a helper `formatProjectNumber(id)` → `"01"`, `"02"`, … `"13"`.
- The number appears in: the card's top-left corner, the URL, the detail page header, the browser tab title, and the prev/next navigation.
- Numbers never change once assigned; new projects take the next number.

**B. Routing**
- Canonical URL: `/projects/:number/:slug` → e.g. `/projects/01/arcgis-pro-salah-mcp`.
- The page is resolved **by number only**. If the slug is missing or wrong (`/projects/1`, `/projects/01/old-name`), redirect with `replace` to the canonical URL. Unknown or unpublished number → friendly "Project not found" state with a link back to `/projects`.
- Helper `getProjectPath(project)` builds the URL; never hand-write project URLs in components.
- `ProjectDetailsPage` is lazy-loaded. On navigation: scroll to top, update `<title>` to `"01 · ArcGIS Pro Salah MCP — Ahmed Salah Muhammed"`, and set per-project meta description + OG image via react-helmet-async.
- Sticky breadcrumb bar at the top of the detail page (glass style): `Home / Projects / 01 — ArcGIS Pro Salah MCP`, with the number in JetBrains Mono.

**C. Where cards appear**
- Home page Projects section: the `featured` projects (large cards) + "View all projects →" button to `/projects`.
- `/projects` page: all published projects with filter chips (`PROJECT_CATEGORIES`), debounced search (title, summary, stack), and a result count. Filter + search are kept in the URL query string (`?category=GIS&q=arcpy`) so filtered views are shareable and survive back navigation.

**D. `ProjectCard` blueprint (one component for every project)**
- Whole card is one link (`<Link>` to `getProjectPath`), keyboard focusable, visible focus ring.
- Top row: number badge `01` (mono, primary tint) + category chips.
- Cover image (16:9, lazy, zoom 1.05 on hover). If `image` is null, render a generated placeholder: GIS contour pattern + the project number large + first category — never a broken image.
- Title (headline-sm, 2 lines max), summary (body-md, 3 lines max, ellipsis).
- Up to 4 stack chips + `+N` chip for the rest.
- Footer: year · small icons for available links (code / live / story map) — clicking these opens the external link without triggering the card navigation (`stopPropagation`).
- Hover: lift -4px + stronger indigo shadow; "View project →" arrow slides in.
- Featured variant = same component with `variant="featured"` (wider, bigger image). No duplicated card code.

**E. `ProjectDetailsPage` blueprint (same layout for every project)**
Build it from small section components in `features/projects/components/details/`. Each section renders **only if its data exists**, so a project with fewer fields still looks complete:

1. `ProjectHeader` — large number `01`, title (display-lg), summary, category chips, year, role, and action buttons (Live demo / Source code / Story map / Video / Backend code — only those present in `links`).
2. `ProjectCover` — main image in a rounded-xl frame with ambient shadow (or the generated placeholder).
3. `ProjectMetrics` — stat cards from `getVisibleMetrics(project)` only (verified metrics).
4. `ProjectOverview` — `description`.
5. `ProjectChallengeApproach` — two side-by-side glass panels: **The Challenge** (`problem`) and **The Approach** (`approach`); stacked on mobile.
6. `ProjectStack` — all stack chips.
7. `ProjectGallery` — image grid with a lightbox (keyboard arrows + Esc).
8. `ProjectLocation` — small lazy-loaded ArcGIS map with one pin when `location` exists, plus coordinates in mono.
9. `ProjectNav` — Previous / Next project cards (by number, published only, wrap around) + "Back to all projects".
- Hide any field that still contains `TODO` from the UI, and in development only, log a console warning listing the TODO fields of the current project.

**F. Adding a new project (must stay this easy)**
- `projects.js` exports `PROJECT_TEMPLATE` (every field with its empty default). To add a project: copy the template, fill it, give it the next `id`, set `published: true`.
- `projectSchema.js` holds a **Zod schema** of the blueprint. In development, validate the whole `PROJECTS` array at startup and show a clear console error naming the project number and the invalid field (duplicate id, duplicate slug, missing title, bad URL, etc.).
- Write `docs/ADDING_A_PROJECT.md` with the 4-step checklist (copy template → fill → add images to `public/images/projects/{slug}/` → check `/projects/{number}`).

**G. Content**
- The file contains 15 published projects (4 featured → 2×2 grid on Home) and 3 unpublished drafts (`published: false`) — never render drafts.
- Projects with `type: 'client'` show a "Client work · {client}" badge and `period` instead of a code link.
- Only metrics with `verified: true` are shown.

### 5.8 GIS Lab (live map showcase) — the "wow" section
- Lazy-loaded ArcGIS map (dark basemap in dark mode, light-gray in light mode) centered on Egypt.
- Two layers: **Projects** (pins from `getMappedProjects()` — AlUla, KSA, New Delta, Salloum, El Gouna, Assiut, Cairo…) and **Work sites** (from `EXPERIENCE[].sites` — Riyadh, Al-Nammas, Damietta…). Click a pin → glass popup with summary + "Open project" / "View experience". Initial extent covers Egypt and Saudi Arabia.
- Small Calcite-styled side panel: layer toggle, "fly to" buttons, and a live coordinate readout of the cursor in JetBrains Mono.
- Graceful fallback: static map image + list if the SDK fails or on very slow connections.

### 5.9 GitHub Dashboard
React Query fetch from `https://api.github.com/users/Ahmed-salah-muhammed` and `/repos` (cache 1h, handle rate limits). Show: pinned/top repos cards (stars, language, updated), language breakdown chart (Recharts), total repos. Skeleton loaders + error state.

### 5.10 Contact
See Section 7. Left: friendly text (keep the old "I'm always excited to connect…" tone), email, socials, location. Right: the form.

### 5.11 Footer
Monogram, short tagline, quick links, socials, "Built with React · Vite · ArcGIS", `© {currentYear} Ahmed Salah Muhammed`, back-to-top button.

---

## 6. AI Chatbot — "Ask Ahmed's Assistant"

My old site had a small floating chatbot ("How can I help u?"). Rebuild it as a polished assistant.

**UI**
- Floating glass button bottom-right (indigo gradient, subtle pulse on first visit only). Opens a 380×560 glass panel (full-screen sheet on mobile).
- Header: my small avatar + "Ahmed's Assistant" + green "online" dot.
- Welcome message + suggestion chips: *"What does Ahmed do?"*, *"Show me GIS projects"*, *"What's his tech stack?"*, *"How can I hire him?"*.
- Typing indicator, markdown-light rendering, auto-scroll, Enter to send, Esc to close, accessible (focus trap, aria labels).
- Replies can include action buttons: "Open project", "Go to Contact", "Download CV" — these scroll/navigate on the site.
- Supports Arabic and English (detect RTL text and set `dir="auto"` per message).

**Brain (two modes, same interface — `services/chatbot/`)**
1. **Default — local knowledge mode (free, no API):** `chatbotKnowledge.js` with intents (keywords in English + Arabic, e.g. "projects/مشاريع", "contact/تواصل", "skills/مهارات", "gis", "ai", "cv") mapped to answers built from `profile.js` and `projects.js` (experience, education, certifications, publication, projects). Fallback answer suggests the chips or the contact form.
2. **Optional — LLM mode:** if `VITE_CHATBOT_MODE=llm`, the frontend calls `/.netlify/functions/chat`. That function holds the API key (Claude or Gemini) in Netlify environment variables, builds a system prompt from my profile/projects/skills data, limits the bot to talking about me and my work, caps message length and rate-limits per IP. **Never call the LLM API directly from the browser.**

Store the conversation in Redux for the session only.

---

## 7. Contact Form → my Gmail

Messages must arrive in **ahmedsalah219013@gmail.com**, and I must be able to hit "Reply" and answer the sender directly.

- Fields: Name (required, 2–60), Email (required, valid), Subject (optional, max 100), Message (required, 10–2000). Zod schema + React Hook Form, inline errors, character counter.
- Honeypot hidden field + simple client-side cooldown (1 message / 60s) against spam.
- Send with EmailJS `emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey })` from `services/email/emailService.js`.
- Env vars in `.env` (and `.env.example` committed without values):
  ```
  VITE_EMAILJS_SERVICE_ID=
  VITE_EMAILJS_TEMPLATE_ID=
  VITE_EMAILJS_PUBLIC_KEY=
  ```
- Template params: `from_name`, `from_email`, `subject`, `message`, `sent_at`, `reply_to` (= sender email).
- States: idle → sending (button spinner, disabled) → success (animated check + "Thanks, I'll reply soon") → error (message + "email me directly" mailto link).
- Also write `docs/EMAILJS_SETUP.md` explaining: create EmailJS account → add Gmail service with ahmedsalah219013@gmail.com → create template with **To Email** = my Gmail and **Reply-To** = `{{reply_to}}` → copy the 3 IDs into `.env` and into Netlify environment variables. Optionally a second auto-reply template to the sender.

---

## 8. Data Files (single source of truth)

`src/data/profile.js`, `skills.js`, `projects.js`, `experience.js`, `services.js`, `chatbotKnowledge.js`.
Project blueprint (fixed — see 5.7): `id (project number), slug, title, category[], type?, client?, period?, summary, description, problem, approach, role, stack[], image, gallery[], links { live, code, codeBackend?, storymap, video }, location { lat, lng, label } | null, metrics[{ label, value, verified }], verified, featured, published, year`. Use the selectors exported from `projects.js` (`getPublishedProjects`, `getFeaturedProjects`, `getProjectByNumber`, `getProjectPath`, `getAdjacentProjects`, `getMappedProjects`, `getVisibleMetrics`, `formatProjectNumber`) instead of filtering in components.

---

## 9. Quality Bar

- **Responsive:** perfect at 360px, 768px, 1024px, 1440px. No horizontal scroll.
- **Accessibility:** semantic landmarks, keyboard navigable, visible focus rings (indigo), alt text, WCAG AA contrast in both themes, `prefers-reduced-motion` respected.
- **Performance:** Lighthouse ≥ 90 on all four. Code-split per section with `React.lazy` + `Suspense`; ArcGIS & Recharts loaded only when needed; images in WebP/AVIF with `loading="lazy"` and width/height set; fonts via Google Fonts with `display=swap` and preconnect.
- **SEO:** title "Ahmed Salah Muhammed — GIS Solution Engineer & Full-Stack Developer", meta description, Open Graph + Twitter card with an OG image, JSON-LD `Person` schema, sitemap.xml, robots.txt, favicon set.
- **Code:** ESLint + Prettier, no unused code, small focused components, comments only where they explain *why*.
- **Errors:** an ErrorBoundary around each lazy section so one broken section never breaks the page.

---

## 10. Micro-interactions & Motion

Section reveal on scroll (fade + 16px rise, stagger children 60ms), card hover lift, button hover lift, animated underline for nav links, smooth scroll with navbar offset, animated counters for stats, cursor-follow spotlight on the hero grid (desktop only). Keep all durations 150–450ms, easing `[0.22, 1, 0.36, 1]`.

---

## 11. Deployment

Netlify: `netlify.toml` with build `npm run build`, publish `dist`, functions dir `netlify/functions`, SPA redirect `/* /index.html 200`, security headers, long cache for hashed assets. README with setup, env vars, and scripts.

---

## 12. Delivery Phases (stop after each one)

1. **Foundation:** Vite setup, aliases, folder structure, theme tokens (light/dark), providers, Redux store, React Query, router, MainLayout, shared UI components, GIS background patterns.
2. **Navbar, Hero, Footer.**
3. **About, Skills, Experience & Journey, Credentials, Services.**
4. **Projects:** `ProjectCard`, featured section on Home, `/projects` page with URL-synced filters, numbered `ProjectDetailsPage` with all blueprint sections, Zod validation, `ADDING_A_PROJECT.md`.
5. **GIS Lab** map, **GitHub Dashboard**.
6. **Contact (EmailJS)** + setup doc.
7. **Chatbot** (local mode first, then optional Netlify function).
8. **Polish:** performance, SEO, accessibility audit, deployment files, README.

Start with **Phase 1** now.
