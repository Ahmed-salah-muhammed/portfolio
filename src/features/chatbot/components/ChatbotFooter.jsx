// src/features/chatbot/components/ChatbotFooter.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import { CHATBOT_CONFIG } from '../chatbotData.js';
import { useLanguage } from '@/i18n';

export default function ChatbotFooter() {
  const { lang } = useLanguage();

  return (
    <Box
      sx={{
        px: 2.25,
        py: 1.2,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(16, 20, 29, 0.75)'
            : 'rgba(248, 250, 252, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
      }}
    >
      {/* Left indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            boxShadow: '0 0 8px #3b82f6',
            flexShrink: 0,
          }}
        />
        <Typography
          variant="caption"
          noWrap
          sx={{
            color: 'text.secondary',
            fontSize: '0.72rem',
            fontWeight: 500,
          }}
        >
          {lang === 'ar' ? 'مساعد التوثيق الذكي' : CHATBOT_CONFIG.subFooterLeft}
        </Typography>
      </Box>

      {/* Middle emblem */}
      <HubRoundedIcon sx={{ fontSize: 15, color: 'text.disabled', flexShrink: 0 }} />

      {/* Right brand support */}
      <Typography
        variant="caption"
        noWrap
        sx={{
          color: 'text.secondary',
          fontSize: '0.72rem',
          fontWeight: 600,
        }}
      >
        {lang === 'ar' ? 'مدعوم بنواة Geo-GenAI' : CHATBOT_CONFIG.subFooterRight}
      </Typography>
    </Box>
  );
}
