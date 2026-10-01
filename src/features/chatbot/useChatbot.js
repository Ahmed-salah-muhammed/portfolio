// src/features/chatbot/useChatbot.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { WELCOME_MESSAGES, getLocalAnswer } from './chatbotData.js';
import { useVoiceRecognition } from './useVoiceRecognition.js';

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export function useChatbot({ lang = 'en' } = {}) {
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en,
      timestamp: formatTime(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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
  }, [messages, isTyping, scrollToBottom]);

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
            setMessages((prev) => [
              ...prev,
              {
                id: `bot-${Date.now()}`,
                sender: 'bot',
                text: data.reply,
                timestamp: formatTime(),
              },
            ]);
            return;
          }
        }

        const errorData = await response.json().catch(() => null);

        // If the serverless API key isn't configured in production yet,
        // deliver the answer via our high-precision local knowledge engine
        if (errorData?.code === 'API_KEY_MISSING' || response.status === 503) {
          await new Promise((r) => setTimeout(r, 650));
          const localReply = getLocalAnswer(query, lang);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: localReply,
              timestamp: formatTime(),
            },
          ]);
          return;
        }

        // Show the exact styled error card from design
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: 'error',
            text:
              errorData?.error ||
              "Sorry, I couldn't reach the server. Please check your connection and try again.",
            timestamp: formatTime(),
          },
        ]);
      } catch (err) {
        console.warn('Chat request failed, trying local engine:', err);
        // If completely offline or network error, fallback to local engine
        try {
          await new Promise((r) => setTimeout(r, 600));
          const localReply = getLocalAnswer(query, lang);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: localReply,
              timestamp: formatTime(),
            },
          ]);
        } catch (fallbackErr) {
          console.warn('Local fallback error:', fallbackErr);
          setMessages((prev) => [
            ...prev,
            {
              id: `err-${Date.now()}`,
              sender: 'error',
              text: "Sorry, I couldn't reach the server. Please check your connection and try again.",
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
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en,
        timestamp: formatTime(),
      },
    ]);
    setInput('');
    setIsTyping(false);
    if (voice.isListening) {
      voice.stopListening();
    }
  }, [lang, voice]);

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    resetChat,
    messagesEndRef,
    voice,
  };
}
