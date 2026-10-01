// src/features/chatbot/useChatbot.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WELCOME_MESSAGES, getLocalAnswer, detectSuggestedAction } from './chatbotData.js';
import { useVoiceRecognition } from './useVoiceRecognition.js';

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export function useChatbot({ lang = 'en' } = {}) {
  const [messages, setMessages] = useState(() => {
    const welcomeText = WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en;
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        isWelcome: true,
        text: welcomeText,
        timestamp: formatTime(),
        action: detectSuggestedAction(welcomeText, '', lang),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Dynamically synchronize the welcome message when user switches site language
  // Pure derivation with zero setState in useEffect
  const displayedMessages = useMemo(() => {
    if (messages.length === 1 && messages[0].isWelcome) {
      const welcomeText = WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en;
      return [
        {
          ...messages[0],
          text: welcomeText,
          action: detectSuggestedAction(welcomeText, '', lang),
        },
      ];
    }
    return messages;
  }, [messages, lang]);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'nearest',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom(true);
  }, [displayedMessages, isTyping, scrollToBottom]);

  // Voice recognition integration
  const voice = useVoiceRecognition({
    lang,
    onResult: (spokenText) => {
      if (spokenText) {
        setInput(spokenText);
      }
    },
  });

  const sendMessage = useCallback(
    async (textToSend) => {
      const query = (textToSend ?? input).trim();
      if (!query || isTyping) return;

      if (voice.isListening) {
        voice.stopListening();
      }

      const userMsg = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: query,
        timestamp: formatTime(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query, history: messages, lang }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.reply) {
            const replyText = data.reply;
            const action = detectSuggestedAction(replyText, query, lang);
            setMessages((prev) => [
              ...prev,
              {
                id: `bot-${Date.now()}`,
                sender: 'bot',
                text: replyText,
                timestamp: formatTime(),
                action,
              },
            ]);
            return;
          }
        }

        const errorData = await response.json().catch(() => null);

        // If the serverless API key isn't configured in production yet or offline,
        // deliver the answer via our high-precision local knowledge engine
        if (errorData?.code === 'API_KEY_MISSING' || response.status === 503) {
          await new Promise((r) => setTimeout(r, 600));
          const localReply = getLocalAnswer(query, lang);
          const action = detectSuggestedAction(localReply, query, lang);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: localReply,
              timestamp: formatTime(),
              action,
            },
          ]);
          return;
        }

        // Show styled error card
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: 'error',
            text:
              errorData?.error ||
              (lang === 'ar'
                ? 'عذراً، لم أتمكن من الاتصال بالخادم. يرجى التحقق من الاتصال والمحاولة ثانية.'
                : "Sorry, I couldn't reach the server. Please check your connection and try again."),
            timestamp: formatTime(),
          },
        ]);
      } catch (err) {
        console.warn('Chat request failed, trying local engine:', err);
        // Fallback to local engine
        try {
          await new Promise((r) => setTimeout(r, 550));
          const localReply = getLocalAnswer(query, lang);
          const action = detectSuggestedAction(localReply, query, lang);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: localReply,
              timestamp: formatTime(),
              action,
            },
          ]);
        } catch (fallbackErr) {
          console.warn('Local fallback error:', fallbackErr);
          setMessages((prev) => [
            ...prev,
            {
              id: `err-${Date.now()}`,
              sender: 'error',
              text:
                lang === 'ar'
                  ? 'عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
                  : "Sorry, I couldn't reach the server. Please check your connection and try again.",
              timestamp: formatTime(),
            },
          ]);
        }
      } finally {
        setIsTyping(false);
      }
    },
    [input, isTyping, lang, messages, voice],
  );

  const resetChat = useCallback(() => {
    const welcomeText = WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en;
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        isWelcome: true,
        text: welcomeText,
        timestamp: formatTime(),
        action: detectSuggestedAction(welcomeText, '', lang),
      },
    ]);
    setInput('');
    setIsTyping(false);
    if (voice.isListening) {
      voice.stopListening();
    }
  }, [lang, voice]);

  return {
    messages: displayedMessages,
    input,
    setInput,
    isTyping,
    sendMessage,
    resetChat,
    messagesEndRef,
    voice,
  };
}

