import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js';
import { MOTION } from '@/theme/tokens.js';
import { ROTATING_LINES, ROTATING_LINES_AR } from '../heroContent.js';
import { useLanguage } from '@/i18n';

const MotionSpan = motion.create('span');

export default function RotatingLine() {
  const reduced = usePrefersReducedMotion();
  const { lang } = useLanguage();
  const lines = lang === 'ar' ? ROTATING_LINES_AR : ROTATING_LINES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % lines.length), 3400);
    return () => clearInterval(id);
  }, [reduced, lines.length]);

  const activeIndex = index % lines.length;

  // Fixed height so nothing below shifts when a longer line swaps in.
  return (
    <Box
      aria-live="polite"
      sx={{
        minHeight: { xs: 64, sm: 48, lg: 56 },
        fontFamily: (t) => t.tokens.FONTS.display,
        fontWeight: 700,
        fontSize: 'clamp(1.35rem, 1.05rem + 1.1vw, 2.25rem)',
        lineHeight: 1.35,
        letterSpacing: '-0.01em',
        color: 'primary.main',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <MotionSpan
          key={`${lang}-${activeIndex}`}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: MOTION.ease }}
          style={{ display: 'inline-block' }}
        >
          {lines[activeIndex]}
        </MotionSpan>
      </AnimatePresence>
    </Box>
  );
}
