// src/features/chatbot/components/ChatbotFooter.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CHATBOT_CONFIG } from '../chatbotData.js';
import { useLanguage } from '@/i18n';

export default function ChatbotFooter({ isDark }) {
  const { lang } = useLanguage();

  return (
    <Box
      sx={{
        px: 2.25,
        py: 1.1,
        borderTop: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        backgroundColor: isDark ? '#111c30' : '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: '#10b981',
          boxShadow: '0 0 8px #10b981',
          flexShrink: 0,
        }}
      />
      <Typography
        variant="caption"
        noWrap
        sx={{
          color: isDark ? '#94a3b8' : '#64748b',
          fontSize: '0.73rem',
          fontWeight: 500,
          letterSpacing: 0.2,
        }}
      >
        {lang === 'ar' ? 'المساعد الذكي لبورتفوليو أحمد صلاح' : CHATBOT_CONFIG.subFooterLeft}
      </Typography>
    </Box>
  );
}

