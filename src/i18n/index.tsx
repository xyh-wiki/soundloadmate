import React, { createContext, useContext, useMemo, useState } from 'react';
import { availableLocales, Locale, translations } from './translations';

const STORAGE_KEY = 'soundloadmate_lang';

const detectLanguage = (): Locale => {
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && availableLocales.includes(stored)) return stored;
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const short = lang.split('-')[0] as Locale;
    if (availableLocales.includes(short)) return short;
  }
  return 'en';
};

type I18nContextValue = {
  locale: Locale;
  t: <K extends keyof (typeof translations)['en']>(key: K) => (typeof translations)['en'][K];
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => detectLanguage());

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<I18nContextValue>(() => {
    const t = <K extends keyof (typeof translations)['en']>(key: K) => translations[locale][key];
    return { locale, t, setLocale };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};

export { availableLocales, translations };
