"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Droplet, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navbar.product'), href: '#product' },
    { name: t('navbar.howItWorks'), href: '#how-it-works' },
    { name: t('navbar.whyUs'), href: '#why-us' },
    { name: t('navbar.testimonials'), href: '#testimonials' },
    { name: t('navbar.contact'), href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'bg-transparent pt-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img src="/images/logo_icon.png" alt="Eco Chemicals Logo" className="w-full h-full object-contain" />
            </div>
            <div className="relative">
              <span className="block text-xl font-black text-slate-900 tracking-tight">
                <span className="text-orange-400">{language === 'ur' ? 'ایکو ' : 'ECO '}</span>
                <span className="text-blue-400">{language === 'ur' ? 'کیمیکلز' : 'Chemicals'}</span>
              </span>
              <span className="block text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase -mt-1">{t('navbar.logoSub')}</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/70 backdrop-blur-md px-2 py-1.5 rounded-full border border-slate-200">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-900/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-900/10 border border-slate-300 transition-all duration-200 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              {t('navbar.languageBtn')}
            </button>
            
            <motion.a 
              href="#contact" 
              className="relative group overflow-hidden rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-transform duration-300 group-hover:scale-105" />
              <div className="relative px-6 py-2.5 text-sm font-bold text-white flex items-center gap-2">
                {t('navbar.getQuote')}
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            </motion.a>
          </div>

          {/* Mobile Menu Btn */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-900/10 transition-colors relative z-50">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t-0 pb-6 pt-4 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                {link.name}
              </a>
            ))}
            <div className="h-px bg-slate-200 my-2" />
            <button 
              onClick={() => { toggleLanguage(); setIsOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:bg-slate-900/10 border border-slate-300 transition-all duration-200 mb-2 cursor-pointer"
            >
              <Globe className="w-5 h-5 text-blue-400" />
              {t('navbar.languageBtn')}
            </button>
            <a href="#contact" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl bg-blue-600 text-white font-bold text-center border border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              {t('navbar.getFreeQuote')}
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
