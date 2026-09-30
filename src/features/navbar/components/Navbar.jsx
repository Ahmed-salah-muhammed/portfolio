import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { PROFILE } from '@/data/profile.js';
import useScrollSpy from '@/hooks/useScrollSpy.js';
import { LAYOUT } from '@/theme/tokens.js';
import {
  openMobileNav,
  closeMobileNav,
  selectMobileNavOpen,
} from '@/store/slices/uiSlice.js';
import { NAV_LINKS, NAV_IDS } from '../navLinks.js';
import Monogram from './Monogram.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import NavDrawer from './NavDrawer.jsx';
import { useLanguage } from '@/i18n';

// Gap between the floating header and the viewport edges.
// Strings, not numbers: in `sx`, a bare number on `mt` is a spacing multiple (×8px).
const FLOAT_GAP = { xs: '6px', md: '8px' };

/**
 * Floating header: detached from the page edges with a margin on every side, fully
 * rounded, and pinned while scrolling. It picks up a shadow once the page moves.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const drawerOpen = useSelector(selectMobileNavOpen);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const { t, isRTL } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(NAV_IDS, LAYOUT.navHeight + 60);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Anchors only exist on the home page; from anywhere else, go home first.
  const goToSection = useCallback(
    (id) => {
      dispatch(closeMobileNav());
      if (!isHome) {
        navigate(`/#${id}`);
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [dispatch, isHome, navigate],
  );

  return (
    <>
      <a className="skip-link" href="#main">
        {isRTL ? 'تخطي إلى المحتوى' : 'Skip to content'}
      </a>

      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: FLOAT_GAP,
          zIndex: 1100,
          mt: FLOAT_GAP,
          mx: 'auto',
          px: { xs: 1, sm: 2, md: 3 },
          width: '100%',
          maxWidth: LAYOUT.containerMax,
        }}
      >
        <Box
          sx={{
            height: { xs: 56, md: 62 },
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            pl: { xs: 1.75, md: 2.25 },
            pr: { xs: 1, md: 1.5 },
            borderRadius: { xs: '14px', md: '18px' },
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor:
              'color-mix(in srgb, var(--mui-palette-background-paper) 86%, transparent)',
            backdropFilter: 'saturate(180%) blur(16px)',
            WebkitBackdropFilter: 'saturate(180%) blur(16px)',
            boxShadow: scrolled
              ? '0 12px 32px rgba(15, 23, 42, 0.10)'
              : '0 2px 8px rgba(15, 23, 42, 0.04)',
            transition: 'box-shadow .3s ease',
          }}
        >
          <Box
            component="button"
            onClick={() =>
              isHome ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/')
            }
            aria-label={`${PROFILE.name} — home`}
            sx={{ background: 'none', border: 0, p: 0, cursor: 'pointer', minWidth: 0 }}
          >
            <Monogram />
          </Box>

          <Box
            component="nav"
            aria-label="Main"
            sx={{
              ml: isRTL ? 0 : 'auto',
              mr: isRTL ? 'auto' : 0,
              display: { xs: 'none', lg: 'flex' },
              gap: 0.5,
            }}
          >
            {NAV_LINKS.map((link) => {
              const active = isHome && activeId === link.id;
              const label = t(`nav.${link.id}`, link.label);
              return (
                <Box
                  key={link.id}
                  component="button"
                  onClick={() => goToSection(link.id)}
                  aria-current={active ? 'true' : undefined}
                  sx={{
                    background: 'none',
                    border: 0,
                    cursor: 'pointer',
                    px: 1.75,
                    py: 1,
                    borderRadius: '10px',
                    font: 'inherit',
                    fontWeight: 500,
                    fontSize: 15,
                    color: active ? 'primary.main' : 'text.secondary',
                    backgroundColor: active
                      ? 'var(--mui-palette-surfaces-primarySoft)'
                      : 'transparent',
                    transition: 'color .2s, background-color .2s',
                    '&:hover': {
                      color: 'text.primary',
                      backgroundColor: active
                        ? 'var(--mui-palette-surfaces-primarySoft)'
                        : 'var(--mui-palette-surfaces-muted)',
                    },
                  }}
                >
                  {label}
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              ml: isRTL ? 0 : { xs: 'auto', lg: 1 },
              mr: isRTL ? { xs: 'auto', lg: 1 } : 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <LanguageToggle />
            <ThemeToggle />

            <Button
              variant="contained"
              href={PROFILE.links.cv}
              download
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, borderRadius: '12px' }}
            >
              {t('nav.downloadCV', 'Download CV')}
            </Button>

            <IconButton
              onClick={() => dispatch(openMobileNav())}
              aria-label="Open menu"
              sx={{ display: { lg: 'none' }, color: 'text.primary' }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <NavDrawer
        open={drawerOpen}
        onClose={() => dispatch(closeMobileNav())}
        onNavigate={goToSection}
        activeId={activeId}
      />
    </>
  );
}
