import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getSkillIcon } from '../skillIcons.js';

// Selector for the dark colour scheme (the theme puts data-mui-color-scheme on <html>).
const DARK = '[data-mui-color-scheme="dark"] &';

// Relative luminance of a #rrggbb colour (0 = black, 1 = white).
const luminance = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const isHex = (c) => typeof c === 'string' && /^#[0-9a-f]{6}$/i.test(c);

/** On a white tile: only near-white brand colours need swapping for a dark one. */
const onLight = (hex) => {
  if (!isHex(hex)) return hex;
  const l = luminance(hex);
  if (l > 0.85) return '#1f2433';
  return hex;
};

/** On the dark tile: near-black brand colours (Express, MCP…) are lifted. */
const onDark = (hex) => {
  if (!isHex(hex)) return hex;
  const l = luminance(hex);
  if (l < 0.03) return '#ffffff';
  if (l < 0.18) return `color-mix(in srgb, ${hex} 55%, #ffffff)`;
  return hex;
};

function Glyph({ icon }) {
  if (icon.kind === 'path') {
    return (
      <Box component="svg" viewBox="0 0 24 24" aria-hidden sx={{ width: '56%', height: '56%' }}>
        <path d={icon.path} fill="var(--glyph)" />
      </Box>
    );
  }
  if (icon.kind === 'mui') {
    const { Icon } = icon;
    return <Icon aria-hidden sx={{ fontSize: 34, color: 'var(--glyph)' }} />;
  }
  return (
    <Typography
      component="span"
      aria-hidden
      sx={{
        fontFamily: (t) => t.tokens.FONTS.display,
        fontWeight: 800,
        fontSize: icon.label.length > 2 ? 17 : 21,
        letterSpacing: '-0.02em',
        color: 'var(--glyph)',
      }}
    >
      {icon.label}
    </Typography>
  );
}

export default function SkillTile({ name }) {
  const icon = getSkillIcon(name);

  return (
    <Box
      role="listitem"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.25,
        textAlign: 'center',
        '&:hover .skill-tile': { transform: 'translateY(-4px)' },
      }}
    >
      <Box
        className="skill-tile"
        sx={{
          '--glyph': onLight(icon.color),
          width: { xs: 60, md: 68 },
          height: { xs: 60, md: 68 },
          borderRadius: '16px',
          display: 'grid',
          placeItems: 'center',
          // Light mode: a white tile with a hairline border and a soft shadow.
          backgroundColor: '#ffffff',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(15, 23, 42, 0.05)',
          transition: 'transform .25s ease, box-shadow .25s ease',
          '&:hover': { boxShadow: '0 12px 24px rgba(15, 23, 42, 0.12)' },
          // Dark mode: the GitHub-style dark tile.
          [DARK]: {
            '--glyph': onDark(icon.color),
            backgroundColor: '#1f2433',
            borderColor: 'rgba(255, 255, 255, 0.06)',
            boxShadow: 'none',
            '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.35)' },
          },
        }}
      >
        <Glyph icon={icon} />
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          lineHeight: 1.3,
          maxWidth: 104,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}
