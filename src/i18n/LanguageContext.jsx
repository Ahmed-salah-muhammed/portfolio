import { useEffect, useState, useMemo } from 'react';
import { TRANSLATIONS } from './translations.js';
import { LanguageContext } from './context.js';

const STORAGE_KEY = 'as-portfolio-lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      return window.localStorage.getItem(STORAGE_KEY) || 'en';
    } catch {
      return 'en';
    }
  });

  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage unavailable
    }
  }, [lang, isRTL]);

  const toggleLanguage = () => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (newLang) => {
    if (newLang === 'en' || newLang === 'ar') {
      setLangState(newLang);
    }
  };

  const t = useMemo(() => {
    return (key, fallback = '') => {
      const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return dict[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;
    };
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      isRTL,
      toggleLanguage,
      setLanguage,
      t,
    }),
    [lang, isRTL, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export default LanguageProvider;
