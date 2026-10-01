// src/features/chatbot/components/ChatbotHeader.jsx
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import { CHATBOT_CONFIG } from '../chatbotData.js';
import { useLanguage } from '@/i18n';

export default function ChatbotHeader({ onReset, onClose }) {
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
        borderColor: 'divider',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(16, 20, 29, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Brand & Badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #4f46e5 100%)',
            display: 'grid',
            placeItems: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
            flexShrink: 0,
          }}
        >
          <SmartToyOutlinedIcon sx={{ fontSize: 22 }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              fontSize: '1.05rem',
              color: 'text.primary',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {CHATBOT_CONFIG.name}
          </Typography>

          <Box
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: '6px',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(59, 130, 246, 0.18)'
                  : 'rgba(59, 130, 246, 0.12)',
              color: '#3b82f6',
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(59, 130, 246, 0.35)'
                  : 'rgba(59, 130, 246, 0.25)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            {CHATBOT_CONFIG.badge}
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
              color: 'text.secondary',
              p: 0.75,
              borderRadius: '8px',
              transition: 'all .2s ease',
              '&:hover': {
                color: 'text.primary',
                backgroundColor: 'action.hover',
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
              color: 'text.secondary',
              p: 0.75,
              borderRadius: '8px',
              transition: 'all .2s ease',
              '&:hover': {
                color: 'text.primary',
                backgroundColor: 'action.hover',
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
