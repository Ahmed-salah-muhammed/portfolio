import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import useMotionVariants from '@/hooks/useMotionVariants.js';

const MotionBox = motion.create(Box);

/**
 * Every home-page section goes through this so they all share one rhythm:
 * the same vertical padding, the same centred header (title, accent bar, subtitle),
 * and the same gap before the content. `alt` switches to the alternate background
 * with hairline borders, which is what visually separates one section from the next.
 */
export default function Section({ id, title, subtitle, alt = false, children, sx }) {
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      sx={{
        position: 'relative',
        py: { xs: 9, sm: 11, md: 14, xl: 16 },
        backgroundColor: alt ? 'var(--mui-palette-surfaces-alt)' : 'background.default',
        // Lets children (e.g. timeline nodes) cut a ring out of whatever background they sit on.
        '--section-bg': alt
          ? 'var(--mui-palette-surfaces-alt)'
          : 'var(--mui-palette-background-default)',
        borderBlock: alt ? '1px solid' : 'none',
        borderColor: 'divider',
        ...sx,
      }}
    >
      <Container>
        {title && (
          <Reveal sx={{ textAlign: 'center', maxWidth: 820, mx: 'auto', mb: { xs: 6, md: 8, xl: 9 } }}>
            <Typography variant="h2" component="h2" id={`${id}-title`}>
              {title}
            </Typography>
            <Box
              aria-hidden
              sx={{
                width: 56,
                height: 4,
                borderRadius: 4,
                backgroundColor: 'primary.main',
                mx: 'auto',
                mt: 2.5,
              }}
            />
            {subtitle && (
              <Typography variant="body1" sx={{ color: 'text.secondary', mt: 3 }}>
                {subtitle}
              </Typography>
            )}
          </Reveal>
        )}

        {children}
      </Container>
    </Box>
  );
}

/**
 * Fades an element up as it scrolls into view, once. Triggers on the first visible
 * pixel so tall elements can never get stuck hidden; respects reduced motion.
 */
export function Reveal({ children, delay = 0, sx, ...rest }) {
  const { item, reduced } = useMotionVariants();

  return (
    <MotionBox
      variants={item}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      custom={delay}
      sx={sx}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}
