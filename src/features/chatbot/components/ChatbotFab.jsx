// src/features/chatbot/components/ChatbotFab.jsx
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
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
          ? 'تحدث مع Salah GeoAI'
          : 'Chat with Salah GeoAI'
      }
      placement="left"
    >
      <Box
        component="button"
        type="button"
        onClick={() => dispatch(toggleChatbot())}
        aria-label="Toggle AI Chatbot"
        sx={{
          position: 'fixed',
          bottom: { xs: 20, sm: 28 },
          [isRTL ? 'left' : 'right']: { xs: 20, sm: 28 },
          zIndex: 1250,
          width: 56,
          height: 56,
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #4f46e5 100%)',
          color: '#ffffff',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-3px) scale(1.04)',
            boxShadow: '0 12px 30px rgba(37, 99, 235, 0.45)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.96)',
          },
        }}
      >
        {isOpen ? (
          <CloseRoundedIcon sx={{ fontSize: 26 }} />
        ) : (
          <Box sx={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
            <SmartToyOutlinedIcon sx={{ fontSize: 28 }} />
            {/* Live pulsing dot */}
            <Box
              sx={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 9,
                height: 9,
                borderRadius: '50%',
                backgroundColor: '#10b981',
                border: '2px solid #ffffff',
                boxShadow: '0 0 8px #10b981',
              }}
            />
          </Box>
        )}
      </Box>
    </Tooltip>
  );
}
