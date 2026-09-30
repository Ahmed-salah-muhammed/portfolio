import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PROFILE } from '@/data/profile.js';

export default function Monogram({ showName = true }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: '10px',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          fontFamily: (t) => t.tokens.FONTS.display,
          fontWeight: 800,
          fontSize: 15,
          flexShrink: 0,
        }}
      >
        AS
      </Box>
      {showName && (
        <Typography
          component="span"
          sx={{
            fontFamily: (t) => t.tokens.FONTS.display,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '-0.01em',
            color: 'text.primary',
            whiteSpace: 'nowrap',
            // The full name does not fit beside the menu on small phones.
            display: { xs: 'none', sm: 'inline' },
          }}
        >
          {PROFILE.shortName}
        </Typography>
      )}
    </Box>
  );
}
