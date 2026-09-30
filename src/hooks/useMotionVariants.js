import { useMemo } from 'react';
import { MOTION } from '@/theme/tokens.js';
import usePrefersReducedMotion from './usePrefersReducedMotion.js';

const STILL = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/** Fade + 20px rise. Collapses to a no-op when the visitor prefers reduced motion. */
export function useMotionVariants() {
  const reduced = usePrefersReducedMotion();

  return useMemo(() => {
    if (reduced) return { item: STILL, reduced: true };
    return {
      reduced: false,
      item: {
        hidden: { opacity: 0, y: 20 },
        visible: (delay = 0) => ({
          opacity: 1,
          y: 0,
          transition: { duration: MOTION.base, ease: MOTION.ease, delay },
        }),
      },
    };
  }, [reduced]);
}

export default useMotionVariants;
