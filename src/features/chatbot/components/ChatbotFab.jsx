// src/features/chatbot/components/ChatbotFab.jsx
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { selectChatbotOpen, toggleChatbot } from '@/store/slices/uiSlice.js';
import { useLanguage } from '@/i18n';

export default function ChatbotFab() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectChatbotOpen);
  const { lang, isRTL } = useLanguage();

  const { mode, systemMode } = useColorScheme();
  const resolvedMode = (mode === 'system' ? systemMode : mode) ?? 'dark';
  const isDark = resolvedMode === 'dark';

  return (
    <Tooltip
      title={
        isOpen
          ? lang === 'ar'
            ? 'إغلاق المساعد الذكي'
            : 'Close AI Assistant'
          : lang === 'ar'
          ? 'تحدث مع Salah AI'
          : 'Chat with Salah AI'
      }
      placement="left"
    >
      <Box
        component="button"
        type="button"
        onClick={() => dispatch(toggleChatbot())}
        aria-label="Toggle Salah AI Chatbot"
        sx={{
          position: 'fixed',
          bottom: { xs: 22, sm: 30 },
          [isRTL ? 'left' : 'right']: { xs: 20, sm: 30 },
          zIndex: 1250,
          width: { xs: 58, sm: 64 },
          height: { xs: 58, sm: 64 },
          borderRadius: '50%',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          p: 0,
          backgroundColor: 'transparent',
          display: 'grid',
          placeItems: 'center',

          // Gentle floating bounce
          animation: isOpen ? 'none' : 'gentleFloat 3.4s ease-in-out infinite',
          '@keyframes gentleFloat': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-8px)' },
          },

          // Outer glowing boundary ring - matching ScrollTopButton primary accent
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: -3,
            borderRadius: '50%',
            background: 'var(--mui-palette-primary-main)',
            opacity: isOpen ? 0.2 : isDark ? 0.45 : 0.4,
            filter: 'blur(7px)',
            zIndex: -1,
            animation: 'haloPulse 2.8s ease-in-out infinite alternate',
            '@keyframes haloPulse': {
              '0%': { transform: 'scale(0.96)', opacity: isDark ? 0.35 : 0.35 },
              '100%': { transform: 'scale(1.06)', opacity: isDark ? 0.6 : 0.55 },
            },
          },

          '&:hover': {
            animationPlayState: 'paused',
            '& .fab-inner': {
              transform: 'scale(1.05)',
              backgroundColor: 'var(--mui-palette-primary-dark)',
              boxShadow: isDark
                ? '0 12px 30px rgba(129, 140, 248, 0.45)'
                : '0 12px 30px rgba(70, 72, 212, 0.45)',
            },
            '&::before': {
              filter: 'blur(9px)',
              opacity: isDark ? 0.75 : 0.7,
            },
          },
          '&:active .fab-inner': {
            transform: 'scale(0.95)',
          },
        }}
      >
        <Box
          className="fab-inner"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            // Exact match to ScrollTopButton (<Fab color="primary">):
            // Light mode: #4648d4 with #ffffff icon
            // Dark mode: #818cf8 with #0b1120 icon
            backgroundColor: 'var(--mui-palette-primary-main)',
            color: 'var(--mui-palette-primary-contrastText)',
            boxShadow: isDark
              ? '0 10px 24px rgba(129, 140, 248, 0.35)'
              : '0 10px 24px rgba(70, 72, 212, 0.35)',
            border: isDark
              ? '2px solid rgba(255, 255, 255, 0.35)'
              : '2px solid rgba(255, 255, 255, 0.3)',
            display: 'grid',
            placeItems: 'center',
            position: 'relative',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {isOpen ? (
            <CloseRoundedIcon sx={{ fontSize: 28 }} />
          ) : (
            <AutoAwesomeRoundedIcon
              sx={{
                fontSize: 30,
                color: 'inherit',
                filter: isDark
                  ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25))'
                  : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
              }}
            />
          )}

          {/* Green indicator orb on the top-right corner of the circle */}
          {!isOpen && (
            <Box
              sx={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#10b981',
                border: '2.5px solid var(--mui-palette-primary-main)',
                boxShadow: '0 0 10px #10b981',
                zIndex: 2,
                animation: 'dotBlink 2s infinite ease-in-out',
                '@keyframes dotBlink': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.22)', boxShadow: '0 0 14px #34d399' },
                },
              }}
            />
          )}
        </Box>
      </Box>
    </Tooltip>
  );
}

