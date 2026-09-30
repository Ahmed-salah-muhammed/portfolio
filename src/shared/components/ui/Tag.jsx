import Box from '@mui/material/Box';

/** Neutral, non-interactive label for skills and tech stacks. Never styled like a link. */
export default function Tag({ children, sx }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.5,
        py: 0.75,
        borderRadius: (t) => `${t.tokens.RADIUS.sm}px`,
        fontSize: 13.5,
        fontWeight: 500,
        lineHeight: 1.3,
        color: 'text.primary',
        backgroundColor: 'var(--mui-palette-surfaces-muted)',
        border: '1px solid',
        borderColor: 'divider',
        whiteSpace: 'nowrap',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
