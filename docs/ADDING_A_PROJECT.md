# Adding a project

Adding a project is a **data change only** — no component is touched. The card, the
detail page, the filters, the map pin and the prev/next navigation are all generated
from one object in [`src/data/projects.js`](../src/data/projects.js).

## The 4 steps

### 1. Copy the template

Copy `PROJECT_TEMPLATE` (top of `projects.js`) to the end of the `PROJECTS` array and
give it the **next free `id`**. The id is the project's permanent number
(`formatProjectNumber(16)` → `"16"`); never reuse or change one.

### 2. Fill it in

| Field | Notes |
|---|---|
| `slug` | kebab-case, unique. The URL is `/projects/16/your-slug`. |
| `title`, `summary` | `summary` is 1–2 sentences — it's the card text (clamped to 3 lines). |
| `description`, `problem`, `approach`, `role` | The case study on the detail page. Any field left empty or containing `TODO` is hidden. |
| `category` | Values from `PROJECT_CATEGORIES` (`GIS`, `AI`, `Web`, `Backend`, `3D`). |
| `projectType` *(optional)* | `'fullstack'`, `'gis'` or `'ai'` — the colour on the card and map. If omitted it is derived from `category` (see `getProjectType` in `src/data/projectTypes.js`). |
| `stack` | Technologies as tags. |
| `links` | `live`, `code`, `codeBackend`, `storymap`, `video` — only the ones you set are shown. |
| `location` | `{ lat, lng, label }` puts the project on the **Projects Map** and enables "Show on map". |
| `metrics` | `{ label, value, verified: true }` — only `verified: true` metrics are ever displayed. |
| `type: 'client'` + `client`, `period` | For confidential client work: shows a "Client project" label and the period instead of a code link. **No image unless the client allows it.** |
| `featured`, `featuredRank` *(optional)* | `featured: true` makes a project lead the default "Featured first" order; `featuredRank` (1, 2, 3…) sets the order among the featured ones. Keep it to about three — they are the first page of the home Projects section. Today: 1 → project 01, 2 → 19, 3 → 12. |
| `published` | `published: false` keeps it a hidden draft — drafts never render anywhere. |

### 3. Add images and videos

Put images under `public/images/projects/{slug}/` (16:9, ~1600 px wide, `.webp`) and
demo clips under `public/videos/projects/{slug}/`, then reference them from the data:

```js
image: '/images/projects/your-slug/cover.webp',
gallery: ['/images/projects/your-slug/1.webp', '/images/projects/your-slug/2.webp'],
videos: [
  {
    src: '/videos/projects/your-slug/demo.mp4',
    poster: '/images/projects/your-slug/poster.webp', // still shown before play
    title: 'One line under the player',               // optional
  },
],
```

A missing or `null` cover is fine — the card shows a generated placeholder (never a
broken image). An empty `gallery` hides the gallery section and no `videos` hides the
demo section. The cover is shown at 16:9 on cards and the detail page, so anything
important (titles, headers) should sit inside that frame.

**Video guidelines** — short screen recordings, H.264 mp4, no audio track, ≤ ~5 MB:

```bash
ffmpeg -i in.mp4 -an -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart demo.mp4
```

Before publishing any screen recording, scrub it for secrets (tokens, keys, client data) —
frame by frame around any settings/credential pages, not just at the start.

### 4. Check it

```bash
npm run dev
```

Open `/projects/16`. It should redirect to the canonical `/projects/16/your-slug`,
show on the home page explorer, and (if it has a `location`) on the map.

## Where things go (quick map)

| What | Where |
|---|---|
| The project object | end of the `PROJECTS` array in `src/data/projects.js` (copy `PROJECT_TEMPLATE`) |
| Next `id` | last id in the array + 1 (never reuse a number, even for a deleted project) |
| Cover + gallery images | `public/images/projects/{slug}/` (`cover.webp`, `1.webp`, …) |
| Demo clips | `public/videos/projects/{slug}/demo.mp4` + a poster in the images folder |
| Standalone videos (YouTube links or other clips) | `src/data/videos.js`, not `projects.js` |

Nothing else needs touching: the card, filters, search, pagination, the detail page, the
prev/next links, the Projects Map pin (if you set `location`) and the GitHub dashboard's
project matching (via `links.code`) all read that one object.

## When the list grows

Adding the 30th or the 100th project is the same four steps — no component or routing
change, because filtering, search, sorting and pagination already run over whatever is in
`PROJECTS`. What to watch as it grows:

- **Weight, not code.** Keep covers/gallery at ≤ ~150 KB each (`.webp`, ~1600 px wide) and
  clips at ≤ ~5–10 MB; images are lazy-loaded, clips only load when played.
- **Ids stay permanent.** URLs are `/projects/{id}/{slug}`, so an id is never changed or reused.
- **Drafts are free.** Keep unfinished ones as `published: false`; they never render anywhere.
- **Code changes are only needed for a genuinely new *kind* of thing** — a new category
  (add it to `PROJECT_CATEGORIES`) or a new project type colour (`src/data/projectTypes.js`).
  A single very large `projects.js` is fine into the low hundreds; if it ever gets unwieldy,
  split it into per-project files that `projects.js` imports and spreads into `PROJECTS`
  (the selectors and components would not change).

## Validation

In development the whole `PROJECTS` array is validated at startup by
[`src/data/projectSchema.js`](../src/data/projectSchema.js). A problem is logged to the
console with the **project number and the exact field** — duplicate `id`/`slug`, missing
`title`, malformed URL, unknown category, bad coordinates, and so on.
