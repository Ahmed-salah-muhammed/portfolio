// src/features/chatbot/components/ChatbotHeader.jsx
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { CHATBOT_CONFIG } from '../chatbotData.js';
import { useLanguage } from '@/i18n';

export default function ChatbotHeader({ isDark, onReset, onClose }) {
  const { lang } = useLanguage();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2.25,
        py: 1.75,
        borderBottom: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        backgroundColor: isDark ? '#111c30' : '#ffffff',
      }}
    >
      {/* Brand & Badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            backgroundColor: 'var(--mui-palette-primary-main)',
            color: 'var(--mui-palette-primary-contrastText)',
            display: 'grid',
            placeItems: 'center',
            boxShadow: isDark
              ? '0 4px 14px rgba(129, 140, 248, 0.35)'
              : '0 4px 14px rgba(70, 72, 212, 0.35)',
            flexShrink: 0,
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 22 }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              fontSize: '1.08rem',
              color: isDark ? '#f8fafc' : '#0f172a',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {CHATBOT_CONFIG.name}
          </Typography>

          <Box
            sx={{
              px: 1,
              py: 0.3,
              borderRadius: '6px',
              backgroundColor: isDark
                ? 'rgba(129, 140, 248, 0.16)'
                : 'rgba(70, 72, 212, 0.1)',
              color: isDark ? '#a5b4fc' : '#4648d4',
              border: '1px solid',
              borderColor: isDark
                ? 'rgba(129, 140, 248, 0.35)'
                : 'rgba(70, 72, 212, 0.25)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            {lang === 'ar' ? 'المساعد الذكي' : CHATBOT_CONFIG.badge}
          </Box>
        </Box>
      </Box>

      {/* Action Icons: Reset & Close */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title={lang === 'ar' ? 'إعادة بدء المحادثة' : 'Restart conversation'}>
          <IconButton
            size="small"
            onClick={onReset}
            aria-label="Restart conversation"
            sx={{
              color: isDark ? '#94a3b8' : '#64748b',
              p: 0.75,
              borderRadius: '8px',
              transition: 'all .2s ease',
              '&:hover': {
                color: isDark ? '#f8fafc' : '#0f172a',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                transform: 'rotate(-45deg)',
              },
            }}
          >
            <RotateLeftRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title={lang === 'ar' ? 'إغلاق الشات' : 'Close chat'}>
          <IconButton
            size="small"
            onClick={onClose}
            aria-label="Close chat"
            sx={{
              color: isDark ? '#94a3b8' : '#64748b',
              p: 0.75,
              borderRadius: '8px',
              transition: 'all .2s ease',
              '&:hover': {
                color: isDark ? '#f8fafc' : '#0f172a',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
