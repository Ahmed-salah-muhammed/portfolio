import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import CropLandscapeOutlinedIcon from '@mui/icons-material/CropLandscapeOutlined';
import { CERTIFICATE_GALLERY } from '@/data/certificates.js';
import { formatMonth } from '@/utils/date.js';
import { safeUrl } from '@/utils/content.js';
import { useLanguage } from '@/i18n';

const GROUP_ORDER = ['Cloud', 'GIS', 'Development', 'AI', 'Leadership'];

const arrowSx = {
  width: 48,
  height: 48,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  color: 'text.primary',
  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.14)',
  '&:hover': { backgroundColor: 'background.paper', borderColor: 'primary.main', color: 'primary.main' },
  '&.Mui-disabled': { opacity: 0, pointerEvents: 'none' },
  transition: 'opacity .2s, border-color .2s, color .2s',
};

const pillToggleSx = {
  flexWrap: 'wrap',
  gap: 1,
  '& .MuiToggleButtonGroup-grouped': {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: '999px !important',
    ml: '0 !important',
    px: 2,
    py: 0.75,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 14,
    color: 'text.secondary',
  },
  '& .Mui-selected': {
    color: 'primary.main !important',
    borderColor: 'primary.main !important',
    backgroundColor: 'var(--mui-palette-surfaces-primarySoft) !important',
  },
};

function CertImage({ cert, onOpen, ratio }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onOpen}
      aria-label={`Open certificate: ${cert.title}`}
      sx={{
        position: 'relative',
        display: 'block',
        width: '100%',
        p: 0,
        border: 0,
        cursor: 'zoom-in',
        aspectRatio: ratio,
        overflow: 'hidden',
        backgroundColor: 'var(--mui-palette-surfaces-muted)',
        '&:hover .cert-zoom': { opacity: 1 },
      }}
    >
      <Box
        component="img"
        src={cert.image}
        alt={`${cert.title} certificate`}
        loading="lazy"
        decoding="async"
        // Absolutely placed so every frame keeps its ratio, whatever the scan's shape.
        sx={{
          position: 'absolute',
          inset: 12,
          width: 'calc(100% - 24px)',
          height: 'calc(100% - 24px)',
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.14))',
        }}
      />
      <Box
        className="cert-zoom"
        aria-hidden
        sx={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          width: 36,
          height: 36,
          borderRadius: '10px',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          opacity: 0,
          transition: 'opacity .2s',
        }}
      >
        <ZoomInRoundedIcon fontSize="small" />
      </Box>
    </Box>
  );
}

function CertDetails({ cert, large = false }) {
  const { t } = useLanguage();
  const date = formatMonth(cert.date);
  const verify = safeUrl(cert.verifyUrl);

  return (
    <Box sx={{ p: large ? { xs: 3, md: 5 } : { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.04em' }}>
        {cert.group}
      </Typography>
      <Typography
        variant={large ? 'h3' : 'h4'}
        component="h3"
        sx={{
          mt: 0.75,
          fontSize: large ? undefined : 17,
          display: '-webkit-box',
          WebkitLineClamp: large ? 3 : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {cert.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, mt: 1 }}>
        {cert.issuer}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
        {[date, cert.detail].filter(Boolean).join(' · ')}
      </Typography>

      {verify && (
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            href={verify}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="text"
            startIcon={<VerifiedOutlinedIcon />}
            sx={{ ml: -1 }}
          >
            {t('credentials.verify', 'Verify')}
          </Button>
        </Box>
      )}
    </Box>
  );
}

function Slide({ cert, onOpen, single }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: single ? { xs: 'column', md: 'row' } : 'column',
        borderRadius: (t) => `${t.tokens.RADIUS.lg}px`,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ flex: single ? { md: '0 0 62%' } : 'none' }}>
        <CertImage cert={cert} onOpen={onOpen} ratio={single ? '16 / 11' : '4 / 3'} />
      </Box>
      <CertDetails cert={cert} large={single} />
    </Box>
  );
}

/**
 * Scroll-snap carousel of scanned certificates. Two views: three at a time (default)
 * or one large certificate at a time. Arrows sit over the carousel's edges; keyboard
 * arrows and touch swipe work too, and any certificate opens full size in a lightbox.
 */
export default function CertificateCarousel() {
  const { lang, t, isRTL } = useLanguage();
  const [group, setGroup] = useState('All');
  const [view, setView] = useState('three');
  const [openIndex, setOpenIndex] = useState(null);
  const [scroll, setScroll] = useState({ start: true, end: false, index: 0 });
  const trackRef = useRef(null);
  const single = view === 'one';

  const groupLabelKey = {
    All: 'credentials.filterAll',
    Cloud: 'credentials.filterCloud',
    GIS: 'credentials.filterGIS',
    Development: 'credentials.filterDev',
    AI: 'credentials.filterAI',
    Leadership: 'credentials.filterLeadership',
  };

  const groups = useMemo(
    () => ['All', ...GROUP_ORDER.filter((g) => CERTIFICATE_GALLERY.some((c) => c.group === g))],
    [],
  );
  const items = useMemo(
    () => (group === 'All' ? CERTIFICATE_GALLERY : CERTIFICATE_GALLERY.filter((c) => c.group === group)),
    [group],
  );

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild;
    const step = slide ? slide.getBoundingClientRect().width + 24 : el.clientWidth;
    const scrollPos = Math.abs(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScroll({
      start: scrollPos <= 6,
      end: scrollPos >= maxScroll - 6,
      index: Math.min(items.length - 1, Math.round(scrollPos / step)),
    });
  }, [items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    el.scrollTo({ left: 0 });
    const raf = requestAnimationFrame(measure);
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [items, view, measure, isRTL]);

  // Scroll leftwards
  const scrollLeftDir = () => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild;
    const step = single && slide ? slide.getBoundingClientRect().width + 24 : el.clientWidth * 0.9;
    el.scrollBy({ left: -step, behavior: 'smooth' });
  };

  // Scroll rightwards
  const scrollRightDir = () => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild;
    const step = single && slide ? slide.getBoundingClientRect().width + 24 : el.clientWidth * 0.9;
    el.scrollBy({ left: step, behavior: 'smooth' });
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollRightDir();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollLeftDir();
    }
  };

  const open = openIndex === null ? null : items[openIndex];
  const step = (dir) => setOpenIndex((i) => (i + dir + items.length) % items.length);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
          mb: { xs: 3, md: 4 },
        }}
      >
        <ToggleButtonGroup
          value={group}
          exclusive
          onChange={(_, v) => v && setGroup(v)}
          aria-label="Filter certificates"
          sx={pillToggleSx}
        >
          {groups.map((g) => (
            <ToggleButton key={g} value={g}>
              {t(groupLabelKey[g], g)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} aria-live="polite">
            {single
              ? `${Math.min(scroll.index + 1, items.length)} / ${items.length}`
              : `${items.length} ${t('credentials.certificatesCount', 'certificates')}`}
          </Typography>
          <ToggleButtonGroup
            value={view}
            exclusive
            size="small"
            onChange={(_, v) => v && setView(v)}
            aria-label="Carousel view"
            sx={{
              '& .MuiToggleButton-root': { px: 1.5, borderColor: 'divider', color: 'text.secondary', borderRadius: '10px' },
              '& .Mui-selected': {
                color: 'primary.main !important',
                backgroundColor: 'var(--mui-palette-surfaces-primarySoft) !important',
              },
            }}
          >
            <ToggleButton value="three" aria-label="Show three at a time">
              <Tooltip title={lang === 'ar' ? 'عرض ثلاثة معاً' : 'Three at a time'}>
                <ViewWeekOutlinedIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="one" aria-label="Show one at a time">
              <Tooltip title={lang === 'ar' ? 'عرض فردي' : 'One at a time'}>
                <CropLandscapeOutlinedIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* The arrows sit over the carousel's left and right edges. */}
      <Box sx={{ position: 'relative' }}>
        <IconButton
          aria-label={isRTL ? t('credentials.nextCert', 'Next certificates') : t('credentials.prevCert', 'Previous certificates')}
          onClick={scrollLeftDir}
          disabled={isRTL ? scroll.end : scroll.start}
          sx={{
            ...arrowSx,
            position: 'absolute',
            zIndex: 2,
            top: single ? { xs: '30%', md: '50%' } : '32%',
            left: { xs: 6, md: -24 },
            transform: 'translateY(-50%)',
          }}
        >
          <ChevronLeftRoundedIcon />
        </IconButton>
        <IconButton
          aria-label={isRTL ? t('credentials.prevCert', 'Previous certificates') : t('credentials.nextCert', 'Next certificates')}
          onClick={scrollRightDir}
          disabled={isRTL ? scroll.start : scroll.end}
          sx={{
            ...arrowSx,
            position: 'absolute',
            zIndex: 2,
            top: single ? { xs: '30%', md: '50%' } : '32%',
            right: { xs: 6, md: -24 },
            transform: 'translateY(-50%)',
          }}
        >
          <ChevronRightRoundedIcon />
        </IconButton>

        <Box
          ref={trackRef}
          key={view}
          role="region"
          aria-roledescription="carousel"
          aria-label="Certificates — use the arrow keys to move"
          tabIndex={0}
          onKeyDown={onKeyDown}
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: single
              ? '100%'
              : {
                  xs: '85%',
                  sm: 'calc((100% - 24px) / 2)',
                  md: 'calc((100% - 48px) / 3)',
                },
            gap: 3,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            pb: 1,
            // Hide the scrollbar; arrows, keys and swipe do the scrolling.
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            '& > *': { scrollSnapAlign: 'start' },
            '&:focus-visible': { outlineOffset: 6 },
          }}
        >
          {items.map((cert, i) => (
            <Slide key={cert.id} cert={cert} single={single} onOpen={() => setOpenIndex(i)} />
          ))}
        </Box>
      </Box>

      {single && (
        <Box sx={{ mt: 2.5, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          {items.map((cert, i) => (
            <Box
              key={cert.id}
              component="button"
              type="button"
              aria-label={`Go to certificate ${i + 1}`}
              onClick={() => {
                const el = trackRef.current;
                const slide = el?.children[i];
                if (el && slide) el.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
              }}
              sx={{
                width: i === scroll.index ? 22 : 8,
                height: 8,
                p: 0,
                border: 0,
                borderRadius: 999,
                cursor: 'pointer',
                backgroundColor: i === scroll.index ? 'primary.main' : 'var(--mui-palette-surfaces-borderStrong)',
                transition: 'width .25s, background-color .25s',
              }}
            />
          ))}
        </Box>
      )}

      <Dialog
        open={Boolean(open)}
        onClose={() => setOpenIndex(null)}
        maxWidth="lg"
        fullWidth
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
        slotProps={{ paper: { sx: { borderRadius: '20px', overflow: 'hidden' } } }}
      >
        {open && (
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ backgroundColor: 'var(--mui-palette-surfaces-muted)', p: { xs: 1.5, md: 3 } }}>
              <Box
                component="img"
                src={open.image}
                alt={`${open.title} certificate`}
                sx={{ display: 'block', width: '100%', maxHeight: '72vh', objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="h4" component="h2">
                  {open.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  {[open.issuer, formatMonth(open.date), open.detail].filter(Boolean).join(' · ')}
                </Typography>
              </Box>
              <IconButton
                aria-label={t('credentials.prevCert', 'Previous certificate')}
                onClick={() => step(isRTL ? 1 : -1)}
                sx={arrowSx}
              >
                <ChevronLeftRoundedIcon sx={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </IconButton>
              <IconButton
                aria-label={t('credentials.nextCert', 'Next certificate')}
                onClick={() => step(isRTL ? -1 : 1)}
                sx={arrowSx}
              >
                <ChevronRightRoundedIcon sx={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </IconButton>
            </Box>
            <IconButton
              aria-label="Close"
              onClick={() => setOpenIndex(null)}
              sx={{
                position: 'absolute',
                top: 12,
                [isRTL ? 'left' : 'right']: 12,
                ...arrowSx,
                width: 40,
                height: 40,
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
