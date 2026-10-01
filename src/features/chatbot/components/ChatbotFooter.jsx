// src/features/chatbot/components/ChatbotFooter.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { CHATBOT_CONFIG } from '../chatbotData.js';
import { useLanguage } from '@/i18n';

export default function ChatbotFooter({ isDark }) {
  const { lang } = useLanguage();

  return (
    <Box
      sx={{
        px: 2.25,
        py: 1.25,
        borderTop: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        backgroundColor: isDark ? '#111c30' : '#f8fafc',
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
            color: isDark ? '#94a3b8' : '#64748b',
            fontSize: '0.72rem',
            fontWeight: 500,
          }}
        >
          {lang === 'ar' ? 'المساعد الذكي لبورتفوليو أحمد صلاح' : CHATBOT_CONFIG.subFooterLeft}
        </Typography>
      </Box>

      {/* Middle emblem */}
      <AutoAwesomeRoundedIcon
        sx={{
          fontSize: 15,
          color: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
          flexShrink: 0,
        }}
      />

      {/* Right brand support */}
      <Typography
        variant="caption"
        noWrap
        sx={{
          color: isDark ? '#94a3b8' : '#64748b',
          fontSize: '0.72rem',
          fontWeight: 600,
        }}
      >
        {lang === 'ar' ? 'مدعوم بـ Gemini 2.5 Flash' : CHATBOT_CONFIG.subFooterRight}
      </Typography>
    </Box>
  );
}
