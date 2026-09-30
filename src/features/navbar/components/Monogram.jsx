import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PROFILE } from '@/data/profile.js';
import { useLanguage } from '@/i18n';

export default function Monogram({ showName = true }) {
  const { lang } = useLanguage();
  const short = lang === 'ar' ? (PROFILE.shortNameAr ?? PROFILE.shortName) : PROFILE.shortName;
  const full = lang === 'ar' ? (PROFILE.nameAr ?? PROFILE.name) : PROFILE.name;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.15 }}>
      <Box
        sx={{
          width: { xs: 32, sm: 34 },
          height: { xs: 32, sm: 34 },
          borderRadius: '8px',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          fontFamily: (t) => t.tokens.FONTS.display,
          fontWeight: 800,
          fontSize: 13.5,
          flexShrink: 0,
        }}
      >
        AS
      </Box>
      {showName && (
        <>
          {/* Mobile view: two-part name (الثنائي) */}
          <Typography
            component="span"
            sx={{
              fontFamily: (t) => t.tokens.FONTS.display,
              fontWeight: 700,
              fontSize: { xs: 14.5, sm: 15 },
              letterSpacing: '-0.01em',
              color: 'text.primary',
              whiteSpace: 'nowrap',
              display: { xs: 'inline', md: 'none' },
            }}
          >
            {short}
          </Typography>
          {/* Laptop / Desktop view: three-part name (ثلاثي) */}
          <Typography
            component="span"
            sx={{
              fontFamily: (t) => t.tokens.FONTS.display,
              fontWeight: 700,
              fontSize: 15.5,
              letterSpacing: '-0.01em',
              color: 'text.primary',
              whiteSpace: 'nowrap',
              display: { xs: 'none', md: 'inline' },
            }}
          >
            {full}
          </Typography>
        </>
      )}
    </Box>
  );
}
