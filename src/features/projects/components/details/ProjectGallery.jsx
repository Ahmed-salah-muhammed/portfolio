import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Typography from '@mui/material/Typography';
import { useLanguage } from '@/i18n';

/**
 * Image grid with a keyboard-navigable lightbox.
 *
 * Renders only when `gallery` has paths, so adding images in projects.js needs no component
 * changes. Tiles are wide (most shots are screen captures); with an odd count the first tile
 * spans the full row so the grid never ends on an orphan.
 */
export default function ProjectGallery({ project }) {
  const { t } = useLanguage();
  const images = project.gallery ?? [];
  const [openAt, setOpenAt] = useState(null);
  const isOpen = openAt !== null;

  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback(
    (delta) => setOpenAt((i) => (i === null ? null : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, step]);

  if (images.length === 0) return null;

  return (
    <Box>
      <Typography variant="h3" component="h2" sx={{ mb: 1 }}>
        {t('project.gallery', 'Gallery')}
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' },
        }}
      >
        {images.map((src, index) => {
          const wide = index === 0 && images.length > 1 && images.length % 2 === 1;
          return (
            <Box
              key={src}
              component="button"
              onClick={() => setOpenAt(index)}
              aria-label={`Open image ${index + 1} of ${images.length}`}
              sx={{
                p: 0,
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'zoom-in',
                borderRadius: (t) => `${t.tokens.RADIUS.lg}px`,
                overflow: 'hidden',
                backgroundColor: 'background.paper',
                gridColumn: { sm: wide ? 'span 2' : 'auto' },
                '&:hover img': { transform: 'scale(1.03)' },
              }}
            >
              <Box
                component="img"
                src={src}
                alt={`${project.title} — ${index + 1}`}
                loading="lazy"
                sx={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: { xs: '16 / 10', sm: wide ? '21 / 9' : '16 / 10' },
                  objectFit: 'cover',
                  objectPosition: 'top',
                  transition: 'transform .4s ease',
                }}
              />
            </Box>
          );
        })}
      </Box>

      <Modal open={isOpen} onClose={close} aria-label={`${project.title} gallery`}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            p: { xs: 2, md: 6 },
            outline: 'none',
          }}
        >
          <IconButton
            onClick={close}
            aria-label="Close gallery"
            sx={{ position: 'absolute', top: 16, right: 16, color: '#fff' }}
          >
            <CloseRoundedIcon />
          </IconButton>

          {images.length > 1 && (
            <>
              <IconButton
                onClick={() => step(-1)}
                aria-label="Previous image"
                sx={{ position: 'absolute', left: 12, color: '#fff' }}
              >
                <ChevronLeftRoundedIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => step(1)}
                aria-label="Next image"
                sx={{ position: 'absolute', right: 12, color: '#fff' }}
              >
                <ChevronRightRoundedIcon fontSize="large" />
              </IconButton>
            </>
          )}

          {isOpen && (
            <Box
              component="img"
              src={images[openAt]}
              alt={`${project.title} — ${openAt + 1}`}
              sx={{ maxWidth: '100%', maxHeight: '86vh', borderRadius: 2, objectFit: 'contain' }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}
