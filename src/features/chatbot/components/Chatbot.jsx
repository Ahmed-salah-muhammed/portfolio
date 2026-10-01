// src/features/chatbot/components/Chatbot.jsx
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import { selectChatbotOpen, toggleChatbot } from '@/store/slices/uiSlice.js';
import { useLanguage } from '@/i18n';
import { useChatbot } from '../useChatbot.js';
import ChatbotHeader from './ChatbotHeader.jsx';
import ChatbotMessages from './ChatbotMessages.jsx';
import ChatbotQuickPrompts from './ChatbotQuickPrompts.jsx';
import ChatbotInput from './ChatbotInput.jsx';
import ChatbotFooter from './ChatbotFooter.jsx';
import ChatbotFab from './ChatbotFab.jsx';

export default function Chatbot() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectChatbotOpen);
  const { lang, isRTL } = useLanguage();

  const { mode, systemMode } = useColorScheme();
  const resolvedMode = (mode === 'system' ? systemMode : mode) ?? 'dark';
  const isDark = resolvedMode === 'dark';

  const {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    resetChat,
    messagesEndRef,
    voice,
  } = useChatbot({ lang });

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 26, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.93 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            sx={{
              position: 'fixed',
              bottom: { xs: 88, sm: 104 },
              [isRTL ? 'left' : 'right']: { xs: 16, sm: 30 },
              zIndex: 1240,
              width: { xs: 'calc(100vw - 32px)', sm: 420 },
              maxWidth: 440,
              height: { xs: 'calc(100dvh - 130px)', sm: 590 },
              maxHeight: 630,
              borderRadius: '22px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              color: isDark ? '#f8fafc' : '#0f172a',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.1)',
              boxShadow: isDark
                ? '0 24px 64px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08)'
                : '0 24px 64px rgba(15, 23, 42, 0.18), 0 4px 16px rgba(15, 23, 42, 0.08)',
            }}
          >
            <ChatbotHeader
              isDark={isDark}
              onReset={resetChat}
              onClose={() => dispatch(toggleChatbot())}
            />

            <ChatbotMessages
              isDark={isDark}
              messages={messages}
              isTyping={isTyping}
              endRef={messagesEndRef}
            />

            <ChatbotQuickPrompts
              isDark={isDark}
              onSelectPrompt={sendMessage}
            />

            <ChatbotInput
              isDark={isDark}
              input={input}
              setInput={setInput}
              onSend={sendMessage}
              voice={voice}
              disabled={isTyping}
            />

            <ChatbotFooter isDark={isDark} />
          </Box>
        )}
      </AnimatePresence>

      <ChatbotFab />
    </>
  );
}
