"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('eco-chemicals-lang');
    if (storedLang === 'en' || storedLang === 'ur') {
      setLanguage(storedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ur' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('eco-chemicals-lang', nextLang);
  };

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        // Fallback to English if not found
        let fallback = translations['en'];
        for (const fallbackKey of keys) {
          if (fallback && fallback[fallbackKey] !== undefined) {
            fallback = fallback[fallbackKey];
          } else {
            return path; // Return the path if key completely missing
          }
        }
        return fallback;
      }
    }
    return result;
  };

  const dir = language === 'ur' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
