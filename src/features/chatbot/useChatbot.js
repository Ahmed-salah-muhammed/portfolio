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
        let replyText = null;

        // 1. Attempt serverless / local dev endpoint
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: query, history: messages, lang }),
          });

          if (response.ok) {
            const data = await response.json().catch(() => null);
            if (data?.reply) {
              replyText = data.reply;
            }
          }
        } catch (apiErr) {
          console.warn('API endpoint call failed, trying client fallback:', apiErr);
        }

        // 2. If endpoint failed, attempt direct client call if VITE_GEMINI_API_KEY is available
        if (!replyText) {
          const clientKey = import.meta.env.VITE_GEMINI_API_KEY;
          const clientModel = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';
          if (clientKey) {
            try {
              const directRes = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${clientModel}:generateContent?key=${clientKey}`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    contents: [
                      {
                        role: 'user',
                        parts: [
                          {
                            text: `You are Salah AI on Ahmed Salah's portfolio (Full-stack GIS Solution Engineer & Urban Planner, ITI Intake 46, Cairo Univ Honors, AWS Certified, creator of ArcGIS Pro Salah MCP, TrafficIQ, ITI Branch Viewer, Precision Agriculture). Respond politely, concisely, and helpfully in ${lang === 'ar' ? 'Arabic' : 'English'}.\n\nUser Question: ${query}`,
                          },
                        ],
                      },
                    ],
                  }),
                },
              );

              if (directRes.ok) {
                const directData = await directRes.json().catch(() => null);
                replyText = directData?.candidates?.[0]?.content?.parts?.[0]?.text;
              }
            } catch (directErr) {
              console.warn('Direct Gemini call failed:', directErr);
            }
          }
        }

        // 3. High-precision Local Knowledge Engine Fallback
        // If neither endpoint nor direct call returned a reply, ALWAYS deliver our verified knowledge answer!
        if (!replyText) {
          await new Promise((r) => setTimeout(r, 450));
          replyText = getLocalAnswer(query, lang);
        }

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
      } catch (err) {
        console.warn('Chat handler error, delivering local knowledge:', err);
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

