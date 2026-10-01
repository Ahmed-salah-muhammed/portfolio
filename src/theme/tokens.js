// Design tokens — the single place every colour, size and shadow comes from.
//
// v2, after Ahmed's review of the first build:
// - Text colours are neutral slate, not purple-grey: tinted body text next to an
//   indigo accent made ordinary copy read like hyperlinks.
// - The accent is reserved for buttons and a few deliberate highlights.
// - Spacing runs on MUI's 8px unit (v1 used 4px, which halved every padding/margin).

export const COLORS = {
  light: {
    background: '#ffffff',
    backgroundAlt: '#f8fafc', // alternating sections
    surface: '#ffffff', // cards
    surfaceMuted: '#f1f5f9', // tags, image placeholders
    border: '#e2e8f0',
    borderStrong: '#cbd5e1',
    primary: '#5b5df4',
    primaryHover: '#4b4de0',
    primarySoft: '#eef0ff',
    onPrimary: '#ffffff',
    text: '#0f172a',
    textMuted: '#475569',
    textSubtle: '#64748b',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    info: '#2563eb',
  },
  dark: {
    background: '#0b1120',
    backgroundAlt: '#0f172a',
    surface: '#111a2e',
    surfaceMuted: '#1a2438',
    border: '#1e293b',
    borderStrong: '#334155',
    primary: '#4338ca',
    primaryHover: '#3730a3',
    primarySoft: 'rgba(67, 56, 202, 0.2)',
    onPrimary: '#ffffff',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    textSubtle: '#64748b',
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
};

export const FONTS = {
  display: '"Plus Jakarta Sans", "Cairo", system-ui, sans-serif',
  body: '"Inter", "Cairo", system-ui, sans-serif',
};

export const RADIUS = {
  sm: 6,
  base: 10, // buttons, inputs
  lg: 16, // cards
  xl: 24, // hero photo, large panels
  pill: 9999,
};

export const LAYOUT = {
  containerMax: 1200,
  navHeight: 58,
};

export const SHADOWS = {
  card: '0 1px 2px rgba(15, 23, 42, 0.04)',
  cardHover: '0 16px 40px rgba(15, 23, 42, 0.08)',
  cardDark: 'none',
  cardHoverDark: '0 16px 40px rgba(0, 0, 0, 0.35)',
};

export const MOTION = {
  base: 0.4,
  ease: [0.22, 1, 0.36, 1],
  stagger: 0.08,
};

// Project disciplines: filter dots, card badges and map symbols all use these.
export const PROJECT_TYPE_COLORS = {
  fullstack: '#4648d4',
  gis: '#10b981',
  ai: '#f59e0b',
};
