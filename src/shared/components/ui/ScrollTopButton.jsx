import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useLanguage } from '@/i18n';

/** Floating button that returns to the top once the visitor has scrolled. */
export default function ScrollTopButton({ threshold = 600 }) {
  const [visible, setVisible] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  const label = t('footer.backToTop', 'Back to top');

  // Zoom needs a ref-able wrapper, so the fixed positioning lives on the Box.
  return (
    <Zoom in={visible}>
      <Box
        sx={{
          position: 'fixed',
          [isRTL ? 'right' : 'left']: { xs: 16, md: 24 },
          bottom: { xs: 16, md: 24 },
          zIndex: 1200,
        }}
      >
        <Tooltip title={label} placement={isRTL ? 'left' : 'right'}>
          <Fab
            color="primary"
            size="medium"
            aria-label={label}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{ boxShadow: '0 10px 24px rgba(70, 72, 212, 0.35)' }}
          >
            <KeyboardArrowUpRoundedIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Zoom>
  );
}
