import Box from '@mui/material/Box';
import {
  siDotnet,
  siReact,
  siPython,
  siPostgresql,
  siArcgis,
  siNodedotjs,
} from 'simple-icons';
import { ESRI_GLYPHS } from '@/features/skills/esriGlyphs.js';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js';

/**
 * Pointy-topped regular hexagon SVG path with softly rounded corners.
 */
function hexPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const angle = ((60 * i - 90) * Math.PI) / 180;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    pts.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  return `${pts.join(' ')} Z`;
}

// Coordinate space: 400x400 (matching PhotoOrbit exact coordinate space).
// Ahmed's photo is centered at x=200, width=72% (x from ~56 to ~344, silhouette edges ~140..325).
// All hexagons are placed at cx >= 310 (for upper shoulder) and cx >= 350 (for mid/lower body),
// guaranteeing ZERO overlap with Ahmed's cutout portrait.
const FILLED_HEXES = [
  // ── COLUMN 1 (Inner right - gracefully skirting the silhouette with safe clearance) ──
  {
    id: 'portal',
    name: 'ArcGIS Enterprise & Portal',
    cx: 310,
    cy: 55,
    r: 21,
    gradient: 'gradPortal',
    kind: 'esri',
    glyph: ESRI_GLYPHS.portal,
    floatGroup: 'floatC',
  },
  {
    id: 'arcgis-pro',
    name: 'ArcGIS Pro',
    cx: 338,
    cy: 115,
    r: 22,
    gradient: 'gradArcgis',
    kind: 'si',
    path: siArcgis.path,
    floatGroup: 'floatA',
  },
  {
    id: 'react',
    name: 'React',
    cx: 352,
    cy: 178,
    r: 22,
    gradient: 'gradReact',
    kind: 'si',
    path: siReact.path,
    floatGroup: 'floatB',
  },
  {
    id: 'survey123',
    name: 'ArcGIS Survey123',
    cx: 356,
    cy: 242,
    r: 22,
    gradient: 'gradSurvey123',
    kind: 'esri',
    glyph: ESRI_GLYPHS.arcgisSurvey123,
    floatGroup: 'floatC',
  },
  {
    id: 'dotnet',
    name: '.NET / C#',
    cx: 350,
    cy: 304,
    r: 23,
    gradient: 'gradDotnet',
    kind: 'si',
    path: siDotnet.path,
    floatGroup: 'floatA',
  },
  {
    id: 'dashboards',
    name: 'ArcGIS Dashboards',
    cx: 336,
    cy: 365,
    r: 21,
    gradient: 'gradDashboards',
    kind: 'esri',
    glyph: ESRI_GLYPHS.dashboard,
    floatGroup: 'floatB',
  },

  // ── COLUMN 2 (Middle right column, staggered honeycomb lattice) ──
  {
    id: 'quickcapture',
    name: 'ArcGIS QuickCapture',
    cx: 374,
    cy: 78,
    r: 21,
    gradient: 'gradQuickcapture',
    kind: 'esri',
    glyph: ESRI_GLYPHS.arcgisQuickcapture,
    floatGroup: 'floatB',
  },
  {
    id: 'python',
    name: 'Python / ArcPy',
    cx: 395,
    cy: 140,
    r: 22,
    gradient: 'gradPython',
    kind: 'si',
    path: siPython.path,
    floatGroup: 'floatC',
  },
  {
    id: 'postgis',
    name: 'PostgreSQL / PostGIS',
    cx: 404,
    cy: 204,
    r: 23,
    gradient: 'gradPostgis',
    kind: 'si',
    path: siPostgresql.path,
    floatGroup: 'floatA',
  },
  {
    id: 'field-maps',
    name: 'ArcGIS Field Maps',
    cx: 398,
    cy: 268,
    r: 22,
    gradient: 'gradFieldMaps',
    kind: 'esri',
    glyph: ESRI_GLYPHS.mapPin,
    floatGroup: 'floatC',
  },
  {
    id: 'experience-builder',
    name: 'Experience Builder',
    cx: 382,
    cy: 332,
    r: 21,
    gradient: 'gradExb',
    kind: 'esri',
    glyph: ESRI_GLYPHS.apps,
    floatGroup: 'floatA',
  },

  // ── COLUMN 3 (Outer right flank) ──
  {
    id: 'nodejs',
    name: 'Node.js',
    cx: 442,
    cy: 168,
    r: 20,
    gradient: 'gradNode',
    kind: 'si',
    path: siNodedotjs.path,
    floatGroup: 'floatB',
  },
];

// Atmospheric hollow hexagons creating honeycomb lattice depth on the outer flank
const WIREFRAME_HEXES = [
  { cx: 285, cy: 25, r: 15, group: 'floatA' },
  { cx: 345, cy: 30, r: 16, group: 'floatB' },
  { cx: 410, cy: 35, r: 15, group: 'floatC' },
  { cx: 440, cy: 95, r: 15, group: 'floatA' },
  { cx: 450, cy: 230, r: 15, group: 'floatC' },
  { cx: 435, cy: 295, r: 15, group: 'floatB' },
  { cx: 375, cy: 388, r: 16, group: 'floatA' },
  { cx: 320, cy: 415, r: 15, group: 'floatC' },
];

export default function HexTechMatrix() {
  const reduced = usePrefersReducedMotion();

  return (
    <Box
      component="svg"
      viewBox="0 0 400 400"
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
        opacity: { xs: 0.32, md: 0.38 },
        transition: 'opacity 0.4s ease',
        // Micro-animations for gentle floating
        '& .float-group-a': {
          animation: reduced ? 'none' : 'hexFloatA 6.5s ease-in-out infinite alternate',
        },
        '& .float-group-b': {
          animation: reduced ? 'none' : 'hexFloatB 7.5s ease-in-out infinite alternate',
        },
        '& .float-group-c': {
          animation: reduced ? 'none' : 'hexFloatC 8.5s ease-in-out infinite alternate',
        },
        '@keyframes hexFloatA': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-5px)' },
        },
        '@keyframes hexFloatB': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(5px)' },
        },
        '@keyframes hexFloatC': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-3px)' },
        },
        '& .hex-interactive': {
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease, opacity 0.3s ease',
          cursor: 'default',
          pointerEvents: 'auto',
          opacity: 0.85,
          '&:hover': {
            opacity: 1,
            transform: 'scale(1.15)',
            filter: 'drop-shadow(0 6px 14px rgba(99, 102, 241, 0.45))',
          },
        },
      }}
    >
      <defs>
        {/* Soft, natural drop shadow */}
        <filter id="hexShadowSoft" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.18" floodColor="#0f172a" />
        </filter>

        {/* Brand Gradients */}
        <linearGradient id="gradSurvey123" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <linearGradient id="gradQuickcapture" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>

        <linearGradient id="gradDashboards" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>

        <linearGradient id="gradFieldMaps" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>

        <linearGradient id="gradArcgis" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        <linearGradient id="gradPortal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <linearGradient id="gradExb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="gradDotnet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#512bd4" />
        </linearGradient>

        <linearGradient id="gradPython" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>

        <linearGradient id="gradReact" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>

        <linearGradient id="gradPostgis" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        <linearGradient id="gradNode" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>

      {/* ── 1. BACKGROUND HOLLOW / WIREFRAME HEXAGONS ── */}
      <g stroke="currentColor" fill="none" strokeWidth="1.2" strokeLinejoin="round" opacity="0.12">
        {WIREFRAME_HEXES.map((hex, i) => (
          <path
            key={`wire-${i}`}
            d={hexPath(hex.cx, hex.cy, hex.r)}
            className={`float-group-${hex.group === 'floatA' ? 'a' : hex.group === 'floatB' ? 'b' : 'c'}`}
            style={{ transformOrigin: `${hex.cx}px ${hex.cy}px` }}
          />
        ))}
      </g>

      {/* ── 2. FILLED BRANDED HEXAGONS (Shifted to right, zero portrait overlap) ── */}
      {FILLED_HEXES.map((hex) => {
        const groupClass =
          hex.floatGroup === 'floatA'
            ? 'float-group-a'
            : hex.floatGroup === 'floatB'
              ? 'float-group-b'
              : 'float-group-c';

        // Scale & center the 24x24 icon inside the hexagon
        const iconSize = hex.r * 0.94;
        const iconOffset = -iconSize / 2;

        return (
          <g
            key={hex.id}
            className={`${groupClass} hex-interactive`}
            style={{ transformOrigin: `${hex.cx}px ${hex.cy}px` }}
          >
            {/* Hexagon Body */}
            <path
              d={hexPath(hex.cx, hex.cy, hex.r)}
              fill={`url(#${hex.gradient})`}
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.1"
              strokeLinejoin="round"
              filter="url(#hexShadowSoft)"
              opacity="0.9"
            />

            {/* Subtle facet highlight */}
            <path
              d={hexPath(hex.cx, hex.cy - 0.8, hex.r * 0.91)}
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* Centered White Icon */}
            <g
              transform={`translate(${hex.cx + iconOffset}, ${hex.cy + iconOffset}) scale(${iconSize / 24})`}
              fill="#ffffff"
            >
              {hex.kind === 'esri' && <path d={hex.glyph} />}
              {hex.kind === 'si' && <path d={hex.path} />}
            </g>

            {/* Native SVG tooltip on hover */}
            <title>{hex.name}</title>
          </g>
        );
      })}
    </Box>
  );
}
