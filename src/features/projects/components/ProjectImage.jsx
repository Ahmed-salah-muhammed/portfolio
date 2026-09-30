import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatProjectNumber } from '@/data/projects.js';

/**
 * Cover image with a generated fallback.
 *
 * Client projects have `image: null` on purpose (confidential), and most others point
 * at screenshots not yet added to public/images. Either way a card must never show a
 * broken image, so a failed load falls back to the same placeholder as a missing one:
 * faint contour lines, the project number and its first category, in neutral tones.
 */
export default function ProjectImage({ project, ratio = '16 / 9', sizes }) {
  const [failed, setFailed] = useState(false);

  if (!project.image || failed) {
    return (
      <Box
        aria-hidden
        sx={{
          position: 'relative',
          aspectRatio: ratio,
          width: '100%',
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: 'var(--mui-palette-surfaces-muted)',
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 400 225"
          preserveAspectRatio="xMidYMid slice"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M -20 ${40 + i * 28} C 60 ${18 + i * 28}, 140 ${72 + i * 26}, 220 ${44 + i * 28} S 380 ${14 + i * 30}, 440 ${52 + i * 26}`}
              fill="none"
              stroke="var(--mui-palette-surfaces-borderStrong)"
              strokeWidth="1"
              opacity="0.7"
            />
          ))}
        </Box>

        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography
            sx={{
              fontFamily: (t) => t.tokens.FONTS.display,
              fontWeight: 800,
              fontSize: { xs: 48, md: 60 },
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'text.disabled',
            }}
          >
            {formatProjectNumber(project.id)}
          </Typography>
          {project.category?.[0] && (
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'text.disabled',
                mt: 1,
              }}
            >
              {project.category[0]}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={project.image}
      alt={project.title}
      loading="lazy"
      decoding="async"
      sizes={sizes}
      onError={() => setFailed(true)}
      sx={{
        width: '100%',
        aspectRatio: ratio,
        objectFit: 'cover',
        display: 'block',
        transition: 'transform .5s ease',
      }}
    />
  );
}
