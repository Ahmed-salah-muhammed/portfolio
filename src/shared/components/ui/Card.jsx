import Box from '@mui/material/Box';

/**
 * The one card surface used across the site: solid background, hairline border,
 * real padding. `interactive` adds the hover lift and cursor spotlight for cards that respond to the pointer.
 */
export default function Card({ children, interactive = false, spotlight = true, sx, ...rest }) {
  const handleMouseMove = (e) => {
    if (!spotlight && !interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Box
      onMouseMove={handleMouseMove}
      sx={{
        position: 'relative',
        height: '100%',
        p: { xs: 3, md: 4, xl: 5 },
        borderRadius: (t) => `${t.tokens.RADIUS.lg}px`,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: (t) => (t.palette.mode === 'dark' ? t.tokens.SHADOWS.cardDark : t.tokens.SHADOWS.card),
        transition: 'transform .3s ease, box-shadow .3s ease, border-color .3s ease',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.4s ease',
          background: (t) =>
            t.palette.mode === 'dark'
              ? 'radial-gradient(350px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(56, 189, 248, 0.12), transparent 80%)'
              : 'radial-gradient(350px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(70, 72, 212, 0.07), transparent 80%)',
        },
        '&:hover::before': {
          opacity: 1,
        },
        ...(interactive && {
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'var(--mui-palette-surfaces-borderStrong)',
            boxShadow: (t) =>
              t.palette.mode === 'dark' ? t.tokens.SHADOWS.cardHoverDark : t.tokens.SHADOWS.cardHover,
          },
        }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
