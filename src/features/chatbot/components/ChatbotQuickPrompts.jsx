// src/features/chatbot/components/ChatbotQuickPrompts.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { QUICK_PROMPTS } from '../chatbotData.js';
import { useLanguage } from '@/i18n';

const ICONS = {
  memory: MemoryRoundedIcon,
  layers: LayersRoundedIcon,
  creditCard: CreditCardRoundedIcon,
  map: MapRoundedIcon,
};

export default function ChatbotQuickPrompts({ onSelectPrompt }) {
  const { lang } = useLanguage();

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 2.25 },
        pb: 1.25,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {QUICK_PROMPTS.map((item) => {
        const IconComponent = ICONS[item.icon] || MemoryRoundedIcon;
        const label = lang === 'ar' && item.labelAr ? item.labelAr : item.label;
        const query = lang === 'ar' && item.queryAr ? item.queryAr : item.query;

        return (
          <Box
            key={item.id}
            component="button"
            type="button"
            onClick={() => onSelectPrompt(query)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.65,
              borderRadius: '999px',
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.12)',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#161d28' : '#ffffff',
              color: 'text.secondary',
              fontSize: '0.78rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: 'primary.main',
                borderColor: 'primary.main',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(37, 99, 235, 0.12)'
                    : 'rgba(37, 99, 235, 0.08)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <IconComponent sx={{ fontSize: 16, color: 'inherit' }} />
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: 'inherit', color: 'inherit' }}>
              {label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
