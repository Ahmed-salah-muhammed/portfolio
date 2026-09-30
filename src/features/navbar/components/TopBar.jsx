import Box from '@mui/material/Box';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import { PROFILE } from '@/data/profile.js';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js';
import { useLanguage } from '@/i18n';

const itemSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  whiteSpace: 'nowrap',
  color: 'inherit',
  textDecoration: 'none',
  fontSize: 13,
  fontWeight: 500,
  '&:hover': { opacity: 0.85 },
};

function ContactItems({ hidden = false }) {
  const { email, phone, phoneIntl, offer } = PROFILE.contact ?? {};
  const { t } = useLanguage();

  return (
    <Box
      aria-hidden={hidden || undefined}
      sx={{ display: 'inline-flex', alignItems: 'center', gap: { xs: 3, md: 5 }, pr: { xs: 3, md: 5 } }}
    >
      {offer && (
        <Box component="span" sx={{ ...itemSx, fontWeight: 700 }}>
          <CardGiftcardRoundedIcon sx={{ fontSize: 16 }} />
          {t('topbar.offer', offer)}
        </Box>
      )}
      {email && (
        <Box component="a" href={`mailto:${email}`} tabIndex={hidden ? -1 : 0} sx={itemSx}>
          <EmailOutlinedIcon sx={{ fontSize: 16 }} />
          {email}
        </Box>
      )}
      {phone && (
        <Box component="a" href={`tel:${phoneIntl ?? phone}`} tabIndex={hidden ? -1 : 0} sx={itemSx}>
          <PhoneOutlinedIcon sx={{ fontSize: 16 }} />
          {phone}
        </Box>
      )}
    </Box>
  );
}

/**
 * Slim announcement bar above the header: the offer, email and phone, drifting slowly
 * from right to left. Hovering pauses it; with reduced motion it simply sits still.
 */
export default function TopBar() {
  const reduced = usePrefersReducedMotion();

  return (
    <Box
      role="region"
      aria-label="Quick contact"
      sx={{
        height: { xs: 30, md: 34 },
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      {reduced ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
          <ContactItems />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            width: 'max-content',
            animation: 'topbarDrift 45s linear infinite',
            '&:hover': { animationPlayState: 'paused' },
            '@keyframes topbarDrift': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-50%)' },
            },
          }}
        >
          {/* Two identical halves: when the first has scrolled out, the loop restarts seamlessly. */}
          {[0, 1].map((half) => (
            <Box key={half} sx={{ display: 'flex' }}>
              {[0, 1, 2].map((i) => (
                <ContactItems key={i} hidden={half === 1 || i > 0} />
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
