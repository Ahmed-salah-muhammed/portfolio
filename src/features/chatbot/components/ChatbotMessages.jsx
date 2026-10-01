// src/features/chatbot/components/ChatbotMessages.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { useLanguage } from '@/i18n';

function FormattedContent({ text, isUser, isError, isDark }) {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <Box sx={{ fontSize: '0.9rem', lineHeight: 1.6, wordBreak: 'break-word' }}>
      {lines.map((line, lineIdx) => {
        if (!line.trim()) {
          return <Box key={lineIdx} sx={{ height: 6 }} />;
        }

        const parts = [];
        let remaining = line;
        let key = 0;

        while (remaining.length > 0) {
          const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
          const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

          const linkIndex = linkMatch ? remaining.indexOf(linkMatch[0]) : -1;
          const boldIndex = boldMatch ? remaining.indexOf(boldMatch[0]) : -1;

          if (linkIndex === -1 && boldIndex === -1) {
            parts.push(<span key={key}>{remaining}</span>);
            break;
          }

          if (linkIndex !== -1 && (boldIndex === -1 || linkIndex < boldIndex)) {
            if (linkIndex > 0) {
              parts.push(<span key={key++}>{remaining.slice(0, linkIndex)}</span>);
            }
            parts.push(
              <Box
                key={key++}
                component="a"
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: isUser
                    ? '#ffffff'
                    : isError
                    ? 'inherit'
                    : isDark
                    ? '#38bdf8'
                    : 'primary.main',
                  fontWeight: 700,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  '&:hover': { opacity: 0.8 },
                }}
              >
                {linkMatch[1]}
              </Box>,
            );
            remaining = remaining.slice(linkIndex + linkMatch[0].length);
          } else {
            if (boldIndex > 0) {
              parts.push(<span key={key++}>{remaining.slice(0, boldIndex)}</span>);
            }
            parts.push(
              <strong key={key++} style={{ fontWeight: 700 }}>
                {boldMatch[1]}
              </strong>,
            );
            remaining = remaining.slice(boldIndex + boldMatch[0].length);
          }
        }

        return (
          <Typography
            key={lineIdx}
            component="p"
            variant="body2"
            sx={{
              m: 0,
              fontSize: 'inherit',
              lineHeight: 'inherit',
              color: 'inherit',
            }}
          >
            {parts}
          </Typography>
        );
      })}
    </Box>
  );
}

function TypingIndicator({ isDark }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.5 }}>
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
          display: 'grid',
          placeItems: 'center',
          color: '#ffffff',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
        }}
      >
        <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />
      </Box>

      <Box
        sx={{
          p: 1.5,
          borderRadius: '14px 14px 14px 4px',
          backgroundColor: isDark ? '#162238' : '#f1f5f9',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 0.6,
        }}
      >
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: isDark ? '#94a3b8' : '#64748b',
            animation: 'typingDot 1.4s infinite ease-in-out',
            animationDelay: '0s',
            '@keyframes typingDot': {
              '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: 0.4 },
              '40%': { transform: 'scale(1)', opacity: 1 },
            },
          }}
        />
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: isDark ? '#94a3b8' : '#64748b',
            animation: 'typingDot 1.4s infinite ease-in-out',
            animationDelay: '0.2s',
          }}
        />
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: isDark ? '#94a3b8' : '#64748b',
            animation: 'typingDot 1.4s infinite ease-in-out',
            animationDelay: '0.4s',
          }}
        />
      </Box>
    </Box>
  );
}

export default function ChatbotMessages({ isDark, messages, isTyping, endRef }) {
  const { isRTL } = useLanguage();

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: { xs: 2, sm: 2.5 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': { width: 5 },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.15)',
          borderRadius: 999,
        },
      }}
    >
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        const isError = msg.sender === 'error';

        if (isUser) {
          return (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isRTL ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                alignSelf: isRTL ? 'flex-start' : 'flex-end',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 1,
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1.25,
                    borderRadius: isRTL ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  <FormattedContent text={msg.text} isUser isDark={isDark} />
                </Box>

                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '10px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)',
                  }}
                >
                  <PersonRoundedIcon sx={{ fontSize: 20 }} />
                </Box>
              </Box>

              {msg.timestamp && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    px: 0.5,
                    color: isDark ? '#94a3b8' : '#64748b',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                  }}
                >
                  {msg.timestamp}
                </Typography>
              )}
            </Box>
          );
        }

        if (isError) {
          return (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isRTL ? 'flex-end' : 'flex-start',
                maxWidth: '92%',
                alignSelf: isRTL ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.25,
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '10px',
                    backgroundColor: isDark
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(239, 68, 68, 0.12)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ErrorOutlineRoundedIcon sx={{ fontSize: 20 }} />
                </Box>

                <Box
                  sx={{
                    px: 2,
                    py: 1.35,
                    borderRadius: isRTL ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    backgroundColor: isDark
                      ? 'rgba(239, 68, 68, 0.14)'
                      : 'rgba(254, 242, 242, 0.95)',
                    border: '1px solid',
                    borderColor: isDark
                      ? 'rgba(239, 68, 68, 0.45)'
                      : 'rgba(239, 68, 68, 0.45)',
                    color: isDark ? '#fca5a5' : '#dc2626',
                  }}
                >
                  <FormattedContent text={msg.text} isError isDark={isDark} />
                </Box>
              </Box>

              {msg.timestamp && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    px: 0.5,
                    color: isDark ? '#94a3b8' : '#64748b',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                  }}
                >
                  {msg.timestamp}
                </Typography>
              )}
            </Box>
          );
        }

        // Standard Bot Message
        return (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isRTL ? 'flex-end' : 'flex-start',
              maxWidth: '92%',
              alignSelf: isRTL ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.25,
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#ffffff',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
                }}
              >
                <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />
              </Box>

              <Box
                sx={{
                  px: 2,
                  py: 1.4,
                  borderRadius: isRTL ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  backgroundColor: isDark ? '#162238' : '#ffffff',
                  border: '1px solid',
                  borderColor: isDark
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.08)',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  boxShadow: isDark
                    ? '0 4px 14px rgba(0, 0, 0, 0.35)'
                    : '0 4px 14px rgba(15, 23, 42, 0.05)',
                }}
              >
                <FormattedContent text={msg.text} isDark={isDark} />
              </Box>
            </Box>

            {msg.timestamp && (
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  px: 0.5,
                  color: isDark ? '#94a3b8' : '#64748b',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                }}
              >
                {msg.timestamp}
              </Typography>
            )}
          </Box>
        );
      })}

      {isTyping && <TypingIndicator isDark={isDark} />}

      <div ref={endRef} />
    </Box>
  );
}
