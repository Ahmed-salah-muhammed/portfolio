// src/features/chatbot/components/ChatbotFab.jsx
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { selectChatbotOpen, toggleChatbot } from '@/store/slices/uiSlice.js';
import { useLanguage } from '@/i18n';

export default function ChatbotFab() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectChatbotOpen);
  const { lang, isRTL } = useLanguage();

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

          // Gentle floating bounce ("بيتنطط براحه كدا")
          animation: isOpen ? 'none' : 'gentleFloat 3.4s ease-in-out infinite',
          '@keyframes gentleFloat': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-9px)' },
          },

          // Outer glowing boundary ring
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #d946ef 100%)',
            opacity: isOpen ? 0.4 : 0.85,
            filter: 'blur(6px)',
            zIndex: -1,
            animation: 'haloPulse 2.8s ease-in-out infinite alternate',
            '@keyframes haloPulse': {
              '0%': { transform: 'scale(0.96)', opacity: 0.6 },
              '100%': { transform: 'scale(1.08)', opacity: 0.95 },
            },
          },

          '&:hover': {
            animationPlayState: 'paused',
            '& .fab-inner': {
              transform: 'scale(1.06)',
              boxShadow: '0 12px 32px rgba(99, 102, 241, 0.55)',
            },
            '&::before': {
              filter: 'blur(9px)',
              opacity: 1,
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
            background: 'linear-gradient(135deg, #0284c7 0%, #4338ca 50%, #7e22ce 100%)',
            border: '2px solid rgba(255, 255, 255, 0.65)',
            boxShadow: '0 8px 24px rgba(67, 56, 202, 0.45)',
            display: 'grid',
            placeItems: 'center',
            color: '#ffffff',
            position: 'relative',
            transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {isOpen ? (
            <CloseRoundedIcon sx={{ fontSize: 28 }} />
          ) : (
            <Box sx={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
              <AutoAwesomeRoundedIcon
                sx={{
                  fontSize: 30,
                  filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
                }}
              />
              {/* Online pulsing green orb */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  border: '2.5px solid #ffffff',
                  boxShadow: '0 0 10px #10b981',
                  animation: 'dotBlink 2s infinite ease-in-out',
                  '@keyframes dotBlink': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.25)', boxShadow: '0 0 14px #34d399' },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Tooltip>
  );
}
