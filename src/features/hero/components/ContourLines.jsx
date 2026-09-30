import Box from '@mui/material/Box';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js';

/**
 * Topographic GIS Contour Lines (خطوط كنتور)
 * An elegant, faint topographic vector overlay spanning the Hero section.
 * Authentic cartographic styling with index contours, subtle elevation labels (GIS, AI, web, esri, develop),
 * and intermediate dashed contours with low opacity so it stays sophisticated and ethereal.
 */
export default function ContourLines() {
  const reduced = usePrefersReducedMotion();

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: { xs: 0.7, md: 0.95 },
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1440 680"
        preserveAspectRatio="none"
        sx={{
          width: '100%',
          height: '100%',
          display: 'block',
          color: 'var(--mui-palette-primary-main)',
          animation: reduced ? 'none' : 'contourDrift 40s ease-in-out infinite alternate',
          '@keyframes contourDrift': {
            '0%': { transform: 'scale(1) translateY(0px)' },
            '50%': { transform: 'scale(1.015) translateY(-6px)' },
            '100%': { transform: 'scale(1) translateY(2px)' },
          },
        }}
      >
        <defs>
          {/* Subtle horizontal gradient to softly fade edges */}
          <linearGradient id="contourFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.04" />
            <stop offset="15%" stopColor="currentColor" stopOpacity="0.14" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="85%" stopColor="currentColor" stopOpacity="0.14" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id="contourFaint" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.02" />
            <stop offset="25%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="75%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Intermediate faint dashed contours (representing minor contour intervals) */}
        <g stroke="url(#contourFaint)" strokeWidth="0.85" strokeDasharray="4 8" fill="none">
          <path d="M -40,70 C 260,130 460,40 650,100 C 830,160 1120,80 1480,130" />
          <path d="M -40,165 C 250,225 460,135 675,190 C 860,245 1140,165 1480,220" />
          <path d="M -40,270 C 230,310 455,235 680,285 C 890,335 1170,260 1480,295" />
          <path d="M -40,375 C 230,405 465,350 685,390 C 910,440 1190,365 1480,385" />
          <path d="M -40,485 C 245,510 485,460 710,500 C 930,545 1210,475 1480,500" />
          <path d="M -40,590 C 265,620 500,570 735,605 C 960,650 1235,590 1480,610" />
        </g>

        {/* Primary Index Contours (الخطوط الرئيسية) */}
        <g stroke="url(#contourFade)" strokeWidth="1.15" fill="none" strokeLinecap="round">
          {/* Contour 1: GIS */}
          <path d="M -40,115 C 260,185 480,85 640,145 C 820,205 1100,125 1480,175" />

          {/* Contour 2: AI */}
          <path d="M -40,215 C 240,265 460,180 690,235 C 880,285 1160,210 1480,255" />

          {/* Contour 3: web */}
          <path d="M -40,320 C 220,345 450,290 665,335 C 895,385 1180,315 1480,335" />

          {/* Contour 4: esri */}
          <path d="M -40,430 C 240,460 480,410 700,450 C 920,495 1200,425 1480,445" />

          {/* Contour 5: develop */}
          <path d="M -40,540 C 250,565 490,515 720,555 C 940,595 1220,535 1480,555" />

          {/* Contour 6: bottom baseline */}
          <path d="M -40,640 C 280,670 520,625 760,655 C 1000,685 1260,635 1480,645" />
        </g>

        {/* Cartographic Index Contour Elevation Labels (knockout pill + elevation text) */}
        <g
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.1em"
          fill="currentColor"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {/* Label 1: GIS */}
          <g transform="translate(650, 146)">
            <rect
              x="-24"
              y="-7"
              width="48"
              height="14"
              rx="4"
              fill="var(--mui-palette-background-default)"
              opacity="0.88"
            />
            <text y="0.5" opacity="0.45">GIS</text>
          </g>

          {/* Label 2: AI */}
          <g transform="translate(705, 237)">
            <rect
              x="-18"
              y="-7"
              width="36"
              height="14"
              rx="4"
              fill="var(--mui-palette-background-default)"
              opacity="0.88"
            />
            <text y="0.5" opacity="0.45">AI</text>
          </g>

          {/* Label 3: web */}
          <g transform="translate(668, 336)">
            <rect
              x="-24"
              y="-7"
              width="48"
              height="14"
              rx="4"
              fill="var(--mui-palette-background-default)"
              opacity="0.88"
            />
            <text y="0.5" opacity="0.45">web</text>
          </g>

          {/* Label 4: esri */}
          <g transform="translate(700, 452)">
            <rect
              x="-22"
              y="-7"
              width="44"
              height="14"
              rx="4"
              fill="var(--mui-palette-background-default)"
              opacity="0.88"
            />
            <text y="0.5" opacity="0.45">esri</text>
          </g>

          {/* Label 5: develop */}
          <g transform="translate(725, 557)">
            <rect
              x="-30"
              y="-7"
              width="60"
              height="14"
              rx="4"
              fill="var(--mui-palette-background-default)"
              opacity="0.88"
            />
            <text y="0.5" opacity="0.45">develop</text>
          </g>
        </g>
      </Box>
    </Box>
  );
}
