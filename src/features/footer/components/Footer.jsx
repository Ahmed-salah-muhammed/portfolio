import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { PROFILE } from '@/data/profile.js';
import { SocialLinks } from '@/shared/components/ui';
import Monogram from '@/features/navbar/components/Monogram.jsx';
import { NAV_LINKS } from '@/features/navbar';

import { useLanguage } from '@/i18n';

const NAV_LABEL_KEYS = {
  hero: 'nav.overview',
  overview: 'nav.overview',
  education: 'nav.education',
  skills: 'nav.skills',
  experience: 'nav.experience',
  credentials: 'nav.credentials',
  services: 'nav.services',
  projects: 'nav.projects',
  'projects-map': 'nav.gisLab',
  github: 'nav.github',
  videos: 'nav.videos',
  contact: 'nav.contact',
};

export default function Footer() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goTo = (id) => {
    if (pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'var(--mui-palette-surfaces-alt)',
      }}
    >
      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box>
            <Monogram />
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', mt: 2, maxWidth: 360, lineHeight: 1.6 }}
            >
              {lang === 'ar'
                ? 'مطور نظم معلومات جغرافية وتطبيقات شاملة. ملتقى التخطيط العمراني، نظم GIS، السحابة والذكاء الاصطناعي.'
                : `${PROFILE.title}. ${PROFILE.tagline}`}
            </Typography>
          </Box>

          <Box
            component="nav"
            aria-label="Footer"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 1, md: 1.5 },
              ml: { xs: -1.5, md: 0 },
            }}
          >
            {NAV_LINKS.map((link) => (
              <Box
                key={link.id}
                component="button"
                onClick={() => goTo(link.id)}
                sx={{
                  background: 'none',
                  border: 0,
                  cursor: 'pointer',
                  font: 'inherit',
                  fontSize: 15,
                  fontWeight: 500,
                  px: 1.5,
                  py: 1,
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {t(NAV_LABEL_KEYS[link.id] ?? link.id, link.label)}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 5, md: 6 },
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {lang === 'ar'
              ? `© ${new Date().getFullYear()} ${PROFILE.name}، ${t('footer.copyright', 'جميع الحقوق محفوظة.')}`
              : `© ${new Date().getFullYear()} ${PROFILE.name}, ${t('footer.copyright', 'All rights reserved.')}`}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SocialLinks />
            <Tooltip title={t('footer.backToTop', 'Back to top')}>
              <IconButton
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label={t('footer.backToTop', 'Back to top')}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  color: 'text.secondary',
                }}
              >
                <KeyboardArrowUpRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
