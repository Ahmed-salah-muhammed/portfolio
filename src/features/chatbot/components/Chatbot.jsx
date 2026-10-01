// src/features/chatbot/components/Chatbot.jsx
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
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
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            sx={{
              position: 'fixed',
              bottom: { xs: 84, sm: 96 },
              [isRTL ? 'left' : 'right']: { xs: 16, sm: 28 },
              zIndex: 1240,
              width: { xs: 'calc(100vw - 32px)', sm: 420 },
              maxWidth: 440,
              height: { xs: 'calc(100dvh - 120px)', sm: 590 },
              maxHeight: 620,
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#10141d' : '#ffffff',
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.08)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 24px 56px rgba(0, 0, 0, 0.55), 0 4px 16px rgba(0, 0, 0, 0.3)'
                  : '0 24px 56px rgba(15, 23, 42, 0.16), 0 4px 16px rgba(15, 23, 42, 0.06)',
            }}
          >
            <ChatbotHeader
              onReset={resetChat}
              onClose={() => dispatch(toggleChatbot())}
            />

            <ChatbotMessages
              messages={messages}
              isTyping={isTyping}
              endRef={messagesEndRef}
            />

            <ChatbotQuickPrompts onSelectPrompt={sendMessage} />

            <ChatbotInput
              input={input}
              setInput={setInput}
              onSend={sendMessage}
              voice={voice}
              disabled={isTyping}
            />

            <ChatbotFooter />
          </Box>
        )}
      </AnimatePresence>

      <ChatbotFab />
    </>
  );
}
