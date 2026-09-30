import Box from '@mui/material/Box';

/** Rounded square that holds a section icon — the only place the accent tints a surface. */
export default function IconTile({ icon: Icon, size = 52, sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '14px',
        display: 'grid',
        placeItems: 'center',
        color: 'primary.main',
        backgroundColor: 'var(--mui-palette-surfaces-primarySoft)',
        ...sx,
      }}
    >
      <Icon sx={{ fontSize: size * 0.48 }} />
    </Box>
  );
}
