# Visual Identity & Design System Blueprint: GeoGen AI (CompassAI)

This document serves as a comprehensive visual identity, brand guidelines, and design system blueprint for GeoGen AI (internally referencing elements of the CompassAI framework). It outlines the core visual principles, design tokens, and components needed to replicate or extend the project's interface.

---

## 1. Brand Personality & Vibe

GeoGen AI represents the next generation of geospatial intelligence. It bridges the gap between complex GIS databases and natural language interfaces, designed specifically for GIS professionals, developers, and project managers.

- **Aesthetic Profile:** Dark-optimized, tech-forward, high-precision, and scientific.
- **Keywords:** Cyber-Technical, Geospatial Precision, Minimalist, Fluid-Interactive, Encapsulated Workspace.
- **Tone & Mood:** Authoritative, secure, and cutting-edge. It evokes the feeling of a clean control center where heavy-duty geospatial queries are executed with absolute accuracy.

---

## 2. Color Palette

The color system is optimized for a dark-first user interface with light mode compatibility. It uses a **unified, high-contrast primary blue theme** across all modules and engine interfaces to maintain a cohesive and focused brand identity.

```
       #FFFFFF (Light Bg)         #09090B (Dark Bg)         #3B82F6 (Primary Blue)
      ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
      │                  │       │                  │       │                  │
      └──────────────────┘       └──────────────────┘       └──────────────────┘
       #F8FAFC (Light Card)       #18181B (Dark Card)       #2563EB (Deep Blue Accent)
      ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
      │                  │       │                  │       │                  │
      └──────────────────┘       └──────────────────┘       └──────────────────┘
```

### 2.1 Core Palette

| Color Role                           | Light Mode Hex | Dark Mode Hex | Usage Context                                                                      |
| :----------------------------------- | :------------- | :------------ | :--------------------------------------------------------------------------------- |
| **Primary Bg (`--prim`)**            | `#FFFFFF`      | `#09090B`     | Core page backgrounds (default canvas).                                            |
| **Secondary Bg (`--sec`)**           | `#F8FAFC`      | `#18181B`     | Sidebars, main workspace wrappers, inner panels.                                   |
| **Primary Brand Accent (`--thr`)**   | `#3B82F6`      | `#3B82F6`     | Active tab highlights, main CTA buttons, "AI" text indicators, and focused states. |
| **Deep Blue Accent (`--thr-hover`)** | `#2563EB`      | `#2563EB`     | Hover states for primary buttons, deep accents, and interactive links.             |
| **Muted Text / Border (`--for`)**    | `#52525B`      | `#A1A1AA`     | Body copy, secondary headlines, scrollbar tracks.                                  |

### 2.2 Unified Module Themes

Unlike fragmented multi-color systems, GeoGen AI strictly enforces the **Primary Brand Blue (`#3B82F6`)** across all dedicated core modules to ensure visual continuity:

- **MapTalk (Engine 01 - ChatBot):** Powered by Primary Blue. Represents natural language interaction and geospatial chatting.
- **SpecReviewer (Engine 02 - EditData):** Powered by Primary Blue. Inherits the same visual system for viewing datasets and managing the isolated "V-LAYER" structures.
- **DocuQuery (Engine 03 - RagBot):** Powered by Primary Blue. Utilizes identical brand colors for displaying extracted knowledge bases and RAG references.
- **Premium Tiers:** Uses an elevated glowing blue shadow effect (`dark:shadow-[0_0_30px_rgba(59,130,246,0.3)]`) to distinguish advanced features.

### 2.3 Status Colors

- **Success / Active:** `#10B981` (Emerald Green) used strictly for functional validation, active status lights, or success alerts.
- **Warning:** `#F59E0B` (Amber) reserved for system alerts, pending integrations, and expiring keys.
- **Error / Danger:** `#EF4444` (Red) used for failed queries, critical errors, or limit exhaustion.
- **Card Glassmorphism:** Solid overlays using `bg-slate-900/[0.8]` combined with `backdrop-blur-xl`.

---

## 3. Typography & Fonts

Typography combines clean geometric sans-serif headings with high-readability Arabic/Latin body weights, prioritizing structural hierarchy and legibility.

### 3.1 Font Families

- **Headings Font (H1, H2, H3):** `"Montserrat"`, sans-serif (and `"Cairo"` for localized/Arabic rendering).
- **Body & Interface Text:** `"Noto Kufi Arabic"`, sans-serif (with fallback to `"Cairo"` / `"Montserrat"`).
- **Technical / Data Text:** `"Inter"`, sans-serif. Used for badges, analytics logs, and table contents.
- **Decorative Text:** `"Lateef"`, sans-serif (for specific decorative layers).

### 3.2 Typography Scale

| Heading              | Size                                                               | Line Height             | Font Weight / Style   | Casing         |
| :------------------- | :----------------------------------------------------------------- | :---------------------- | :-------------------- | :------------- |
| **h1 (Page/Title)**  | `text-4xl` (`2.25rem` / `36px`) to `text-5xl` (`3rem` / `48px`)    | `1.2`                   | Bold or Black, Italic | Sentence Case  |
| **h2 (Section)**     | `text-2xl` (`1.5rem` / `24px`) or `text-3xl` (`1.875rem` / `30px`) | `1.3`                   | Semibold or Bold      | Sentence Case  |
| **h3 (Card Header)** | `text-lg` (`1.125rem` / `18px`) or `text-base` (`1rem` / `16px`)   | `1.4`                   | Bold                  | Title/Sentence |
| **body (Main Text)** | `text-[16px]`                                                      | `leading-7` (`1.75rem`) | Regular, Font-Sec     | Sentence Case  |
| **caption / badges** | `text-[13px]`                                                      | `leading-none`          | Medium, Font-Thr      | Uppercase      |

---

## 4. Design Patterns & Layout System

### 4.1 Grid & Spacing Scale

The layout uses a standard spacing system driven by spacing tokens:

- **Inner Padding:** Content views use `p-4` on mobile, scaling to `p-8` (`md:p-8`) on desktop.
- **Element Gaps:** Layout grids use `gap-6` or `gap-8` for dashboard widgets and layout tables.
- **Margins:** Sections are demarcated with bottom margins: `mb-16` for main headers, `mb-10` for horizontal rules, and `mb-4` for minor paragraph splits.

### 4.2 Main Layout Structure

- **Encapsulated Panel:** The application utilizes a unique containment wrapper. The sidebar (`w-64`) remains flush with the left viewport, while the main content panel resides inside an offset container featuring rounded left corners (`md:rounded-tl-2xl md:rounded-bl-2xl`) and a thick, stylized border (`border-2 border-for/13`), framing the viewport as a dedicated workspace console.

### 4.3 Borders & Radii

- **Panels / Cards:** Large modules utilize `rounded-3xl` (`24px`) or `rounded-2xl` (`16px`) corners.
- **Buttons & Inputs:** Form fields and action buttons use `rounded-xl` (`12px`) or `rounded-lg` (`8px`).
- **Borders:** Subtle `1px` borders (`border-slate-200 dark:border-white/10`) separate modules.

### 4.4 Shadows & Elevation

- **Standard Cards:** Flat designs are elevated using minimal `shadow-sm` or `shadow-md`.
- **Interactive / Plan Glows:** Cohesive Blue neon drop shadows are applied to highlighted components:
    - _Primary Glow Shadow:_ `shadow-[0_0_12px_rgba(59,130,246,0.4)]` (Blue)
    - _Highlighted Card Focus:_ `dark:shadow-[0_0_30px_rgba(59,130,246,0.2)]` (Blue)

---

## 5. Imagery, Icons & Motion

### 5.1 Iconography Style

- **Library:** Material-UI Outlined icons or Lucide icons are used exclusively to maintain consistency.
- **Stroke & Fill:** Icons feature slim, outlined profiles (`stroke-width: 1.5` or `stroke-width: 2`). Filled icons are reserved strictly for active toggle indicators.
- **Scale:** Standard sizes include `16px` (inside buttons/lists) and `32px` to `48px` (inside illustration headers).

### 5.2 Illustration & Imagery

- **Tech Plates:** Card layouts place outline-style icons over subtle vector backgrounds.
- **Gradient Overlays:** Cards use subtle hover states, such as `bg-gradient-to-br from-thr/10 to-transparent`, creating a localized blue glow effect.
- **Logo Treatment:** SVG graphics (e.g., `/Logo/geogen-logo-white.svg`) adjust to themes dynamically (inverted to dark in light modes using `invert`).

### 5.3 Micro-interactions & Motion

- **Hover Glows:** Input fields and buttons feature a dynamic blue gradient hover ring driven by mouse coordinate detection:
    ```javascript
    radial-gradient(100px circle at mouseX mouseY, #3b82f6, transparent 80%)
    ```
- **Infinite Loops:** Primary CTA buttons sweep a glowing blue gradient along their border boundary dynamically (`MovingBorder` uses Framer Motion's `useAnimationFrame` to translate a gradient mask along a rect vector).
- **Haptic / Click Feedback:** Interactive buttons scale down slightly on click (`active:scale-95` or `active:scale-[0.98]`).
- **Transitions:** Standard animations run on a `200ms` or `300ms` window: `transition-all duration-200` or `duration-300` using ease-in-out.

---

## 6. Content & Copywriting Guidelines

- **Tone:** Highly professional, technical, data-centric, and security-focused.
- **Voice:** Direct, active, and precise. Avoid overly verbose explanations; prioritize lists, bullet points, and code syntax references.
- **Branding Syntax:**
    - Always use camelCase or explicit capitalization for technologies: `GeoJSON`, `SHP`, `ArcGIS`, `V-LAYER`.
    - Use bold headers followed by a brief summary to demarcate feature breakdowns:
        > **🔒 The V-LAYER Innovation:** Isolates all upcoming attribute changes within a virtual memory cache. Live production databases remain untouched until administrator review.

Use MUI , TailwindCSS, and Framer Motion for all UI components, ensuring a consistent and responsive design system across the application.
