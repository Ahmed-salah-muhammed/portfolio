// src/features/chatbot/components/ChatbotInput.jsx
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useLanguage } from '@/i18n';

export default function ChatbotInput({
  isDark,
  input,
  setInput,
  onSend,
  voice,
  disabled,
}) {
  const { lang, isRTL } = useLanguage();
  const { isListening, isSupported, startListening, stopListening } = voice;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const placeholderText = isListening
    ? lang === 'ar'
      ? 'جاري الاستماع... تحدّث الآن'
      : 'Listening... Speak now'
    : lang === 'ar'
    ? 'اسأل عن أحمد، مشاريع الـ GIS، أو التوظيف...'
    : 'Ask about Ahmed, GIS projects, or hiring...';

  return (
    <Box sx={{ px: { xs: 2, sm: 2.25 }, pb: 1.5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: '4px 6px 4px 16px',
          borderRadius: '999px',
          backgroundColor: isDark ? '#162238' : '#ffffff',
          border: '1.5px solid',
          borderColor: isListening
            ? '#f87171'
            : isDark
            ? 'rgba(255, 255, 255, 0.16)'
            : 'rgba(0, 0, 0, 0.12)',
          boxShadow: isListening
            ? '0 0 0 3px rgba(248, 113, 113, 0.25), 0 0 16px rgba(248, 113, 113, 0.35)'
            : isDark
            ? '0 4px 14px rgba(0, 0, 0, 0.35)'
            : '0 4px 14px rgba(15, 23, 42, 0.05)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Box
          component="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          disabled={disabled}
          sx={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: isDark ? '#f8fafc' : '#0f172a',
            fontSize: '0.88rem',
            fontFamily: 'inherit',
            lineHeight: 1.5,
            direction: isRTL ? 'rtl' : 'ltr',
            '&::placeholder': {
              color: isListening ? '#f87171' : isDark ? '#94a3b8' : '#64748b',
              opacity: isListening ? 1 : 0.85,
              fontStyle: isListening ? 'italic' : 'normal',
              transition: 'color .2s ease',
            },
          }}
        />

        {/* Microphone Button */}
        {isSupported && (
          <Tooltip
            title={
              isListening
                ? lang === 'ar'
                  ? 'إيقاف الاستماع'
                  : 'Stop listening'
                : lang === 'ar'
                ? 'إدخال صوتي'
                : 'Voice input'
            }
          >
            <IconButton
              size="small"
              onClick={handleMicClick}
              aria-label="Voice input"
              sx={{
                p: 0.75,
                borderRadius: '50%',
                color: isListening ? '#ef4444' : isDark ? '#94a3b8' : '#64748b',
                backgroundColor: isListening
                  ? 'rgba(239, 68, 68, 0.16)'
                  : 'transparent',
                transition: 'all .2s ease',
                animation: isListening ? 'micPulse 1.5s infinite ease-in-out' : 'none',
                '@keyframes micPulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.15)', backgroundColor: 'rgba(239, 68, 68, 0.28)' },
                },
                '&:hover': {
                  color: isListening ? '#ef4444' : isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isListening
                    ? 'rgba(239, 68, 68, 0.22)'
                    : isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.06)',
                },
              }}
            >
              {isListening ? (
                <MicOffRoundedIcon sx={{ fontSize: 20 }} />
              ) : (
                <MicRoundedIcon sx={{ fontSize: 20 }} />
              )}
            </IconButton>
          </Tooltip>
        )}

        {/* Send Button */}
        <Tooltip title={lang === 'ar' ? 'إرسال' : 'Send'}>
          <span>
            <IconButton
              size="small"
              onClick={() => onSend()}
              disabled={disabled || (!input.trim() && !isListening)}
              aria-label="Send message"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'var(--mui-palette-primary-main)',
                color: 'var(--mui-palette-primary-contrastText)',
                boxShadow: isDark
                  ? '0 2px 8px rgba(129, 140, 248, 0.35)'
                  : '0 2px 8px rgba(70, 72, 212, 0.35)',
                transition: 'all .2s ease',
                '&:hover': {
                  backgroundColor: 'var(--mui-palette-primary-dark)',
                  transform: 'scale(1.05)',
                },
                '&.Mui-disabled': {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.08)',
                  color: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                  boxShadow: 'none',
                },
              }}
            >
              <SendRoundedIcon
                sx={{
                  fontSize: 18,
                  transform: isRTL ? 'scaleX(-1)' : 'none',
                }}
              />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}
