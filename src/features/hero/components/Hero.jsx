import { useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { PROFILE } from '@/data/profile.js';
import { LAYOUT } from '@/theme/tokens.js';
import { Reveal, SocialLinks } from '@/shared/components/ui';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js';
import { INTRO, INTRO_AR } from '../heroContent.js';
import RotatingLine from './RotatingLine.jsx';
import PhotoOrbit from './PhotoOrbit.jsx';
import { useLanguage } from '@/i18n';

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const glowRef = useRef(null);
  const glowEnabled = finePointer && !reduced;
  const { lang, t, isRTL } = useLanguage();

  // A faint glow that follows the cursor. Written straight to CSS variables so
  // mouse movement never re-renders React; kept deliberately subtle.
  const onMouseMove = useCallback(
    (event) => {
      const el = glowRef.current;
      if (!glowEnabled || !el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
      el.style.opacity = '1';
    },
    [glowEnabled],
  );

  const onMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Box
      component="section"
      id="home"
      onMouseMove={glowEnabled ? onMouseMove : undefined}
      onMouseLeave={glowEnabled ? onMouseLeave : undefined}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        minHeight: { lg: `min(calc(100vh - ${LAYOUT.navHeight}px), 980px)` },
        pt: { xs: 5, sm: 7, md: 8 },
        pb: { xs: 9, md: 12 },
      }}
    >
      {glowEnabled && (
        <Box
          ref={glowRef}
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity .4s ease',
            background:
              'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--mui-palette-primary-main) 7%, transparent), transparent 70%)',
          }}
        />
      )}

      <Container sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            alignItems: 'center',
            gap: { xs: 7, md: 6, lg: 10 },
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
          }}
        >
          <Reveal sx={{ order: { xs: 2, md: 1 } }}>
            {PROFILE.availableForWork && (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.75,
                  py: 0.75,
                  mb: { xs: 2.5, md: 3.5 },
                  borderRadius: 999,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'success.main' }}
                />
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {lang === 'ar' ? 'متاح للعمل والمشاريع' : 'Available for work'}
                </Typography>
              </Box>
            )}

            <Typography
              variant="subtitle1"
              component="p"
              sx={{ color: 'text.secondary', fontWeight: 500, mb: 1 }}
            >
              {lang === 'ar' ? 'أهلاً بك، أنا' : "Hello, I'm"}
            </Typography>

            <Typography variant="h1" component="h1" sx={{ mb: { xs: 2, md: 2.5 } }}>
              {lang === 'ar' ? PROFILE.nameAr : PROFILE.shortName}
            </Typography>

            <RotatingLine />

            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 640, mt: { xs: 2, md: 3 } }}
            >
              {lang === 'ar' ? INTRO_AR : INTRO}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                mt: { xs: 4, md: 5 },
                '& .MuiButton-root': { flex: { xs: '1 1 auto', sm: '0 0 auto' } },
              }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={
                  <ArrowForwardRoundedIcon
                    sx={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}
                  />
                }
                onClick={() => scrollTo('projects')}
              >
                {t('hero.exploreBtn', 'View Projects')}
              </Button>
              <Button variant="outlined" size="large" href={PROFILE.links.cv} download>
                {t('hero.downloadCV', 'Download CV')}
              </Button>
            </Box>

            <Box sx={{ mt: { xs: 3, md: 4 }, [isRTL ? 'mr' : 'ml']: -1 }}>
              <SocialLinks />
            </Box>
          </Reveal>

          <Reveal delay={0.1} sx={{ order: { xs: 1, md: 2 } }}>
            <PhotoOrbit />
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
