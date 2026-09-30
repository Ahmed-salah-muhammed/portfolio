import Box from '@mui/material/Box';
import ahmedCutout from '@/assets/images/ahmed-cutout.webp';
import { PROFILE } from '@/data/profile.js';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js';
import { ORBIT_NODES } from '../heroContent.js';
import HexTechMatrix from './HexTechMatrix.jsx';

// Three nodes evenly spaced on a slowly turning ring around the photo — Web · GIS · AI.
const SIZE = 400; // SVG coordinate space (square)
const C = SIZE / 2;
const R = 182; // ring radius
const NODE_R = 22;
const NODE_ANGLES = [-90, 30, 150];
const DURATION = '40s';

const polar = (angle) => {
  const rad = (angle * Math.PI) / 180;
  return { x: C + R * Math.cos(rad), y: C + R * Math.sin(rad) };
};

const layerSx = (reduced) => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  overflow: 'visible',
  pointerEvents: 'none',
  animation: reduced ? 'none' : `orbitSpin ${DURATION} linear infinite`,
  '@keyframes orbitSpin': { to: { transform: 'rotate(360deg)' } },
});

/**
 * Layers, back to front:
 *   0. HexTechMatrix — floating Esri & Dev honeycomb icons, shifted to the right, faint & ethereal;
 *   1. a circular glow centred on the head that fades out gradually;
 *   2. the dashed ring and connecting lines spinning OVER the background hexagons;
 *   3. the cut-out portrait (background removed), its lower edge fading into the page;
 *   4. the three nodes (Web · GIS · AI), above the portrait so they stay visible the whole way round.
 */
export default function PhotoOrbit() {
  const reduced = usePrefersReducedMotion();
  const points = NODE_ANGLES.map(polar);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 300, sm: 350, md: 390, lg: 430, xl: 460 },
        aspectRatio: '1 / 1',
        mx: 'auto',
      }}
    >
      {/* 0 — Esri & Dev Hexagonal Honeycomb Matrix (all the way in the back) */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <HexTechMatrix />
      </Box>

      {/* 1 — glow behind the head */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '92%',
          aspectRatio: '1 / 1',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--mui-palette-primary-main) 34%, transparent) 0%, color-mix(in srgb, var(--mui-palette-primary-main) 18%, transparent) 32%, color-mix(in srgb, var(--mui-palette-primary-main) 6%, transparent) 55%, transparent 72%)',
        }}
      />

      {/* 2 — ring + links (spinning OVER the hex matrix) */}
      <Box
        component="svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
        sx={{
          ...layerSx(reduced),
          zIndex: 2,
        }}
      >
        <circle
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke="var(--mui-palette-primary-main)"
          strokeWidth="1.25"
          strokeDasharray="4 8"
          opacity="0.45"
        />
        {points.map((p, i) => {
          const next = points[(i + 1) % points.length];
          return (
            <line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke="var(--mui-palette-primary-main)"
              strokeWidth="1"
              opacity="0.18"
            />
          );
        })}
      </Box>

      {/* 3 — the portrait, positioned so the head sits at the centre of the glow */}
      <Box
        component="img"
        src={ahmedCutout}
        alt={PROFILE.name}
        width={840}
        height={919}
        fetchPriority="high"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '12%',
          width: '72%',
          height: 'auto',
          transform: 'translateX(-50%)',
          zIndex: 3,
          // The cut edge at the bottom of the shirt dissolves into the page.
          maskImage: 'linear-gradient(to bottom, #000 72%, transparent 98%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 72%, transparent 98%)',
        }}
      />

      {/* 4 — nodes, above the portrait; labels counter-rotate to stay upright */}
      <Box
        component="svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
        sx={{
          ...layerSx(reduced),
          zIndex: 4,
        }}
      >
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={NODE_R}
              fill="var(--mui-palette-background-paper)"
              stroke="var(--mui-palette-primary-main)"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.18))' }}
            />
            <text
              x={p.x}
              y={p.y + 4.5}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
              fill="var(--mui-palette-primary-main)"
              style={
                reduced
                  ? undefined
                  : {
                      animation: `orbitCounter ${DURATION} linear infinite`,
                      transformOrigin: `${p.x}px ${p.y}px`,
                      transformBox: 'view-box',
                    }
              }
            >
              {ORBIT_NODES[i]}
            </text>
          </g>
        ))}
        <style>{'@keyframes orbitCounter { to { transform: rotate(-360deg); } }'}</style>
      </Box>
    </Box>
  );
}
