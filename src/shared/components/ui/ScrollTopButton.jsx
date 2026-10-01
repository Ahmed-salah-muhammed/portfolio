import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useLanguage } from '@/i18n';

/** Floating button that returns to the top once the visitor has scrolled. */
export default function ScrollTopButton({ threshold = 300 }) {
  const [visible, setVisible] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const getScrollTop = () =>
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement?.scrollTop ||
      document.body?.scrollTop ||
      0;

    const onScroll = () => {
      setVisible(getScrollTop() > threshold);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
  }, [threshold]);

  const label = t('footer.backToTop', 'Back to top');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (document.documentElement) {
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (document.body) {
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        [isRTL ? 'right' : 'left']: { xs: 20, sm: 30 },
        bottom: { xs: 22, sm: 30 },
        zIndex: 1200,
        transition: 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), visibility 0.28s',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(14px)',
        pointerEvents: visible ? 'auto' : 'none',
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      <Tooltip title={label} placement={isRTL ? 'left' : 'right'}>
        <Box
          component="button"
          type="button"
          aria-label={label}
          onClick={scrollToTop}
          sx={{
            width: { xs: 44, sm: 48 },
            height: { xs: 44, sm: 48 },
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.35)',
            outline: 'none',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'var(--mui-palette-primary-main)',
            color: '#ffffff',
            boxShadow: '0 10px 24px rgba(0, 0, 0, 0.3), 0 0 16px rgba(91, 93, 244, 0.25)',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              background: 'var(--mui-palette-primary-main)',
              opacity: visible ? 0.45 : 0.25,
              filter: 'blur(7px)',
              zIndex: -1,
              transition: 'opacity 0.25s ease',
            },
            '&:hover': {
              transform: 'scale(1.08) translateY(-2px)',
              backgroundColor: 'var(--mui-palette-primary-dark)',
              boxShadow: '0 14px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(91, 93, 244, 0.4)',
              '&::before': {
                opacity: 0.7,
              },
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <KeyboardArrowUpRoundedIcon sx={{ fontSize: 22, color: '#ffffff' }} />
        </Box>
      </Tooltip>
    </Box>
  );
}
