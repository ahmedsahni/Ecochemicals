"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, CheckCircle, Sparkles, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BrochureShowcase() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const highlights = [
    {
      title: t('brochureShowcase.f1Title'),
      desc: t('brochureShowcase.f1Desc'),
      color: 'text-cyan-400',
      glow: 'from-cyan-500/10',
    },
    {
      title: t('brochureShowcase.f2Title'),
      desc: t('brochureShowcase.f2Desc'),
      color: 'text-emerald-400',
      glow: 'from-emerald-500/10',
    },
    {
      title: t('brochureShowcase.f3Title'),
      desc: t('brochureShowcase.f3Desc'),
      color: 'text-blue-400',
      glow: 'from-blue-500/10',
    },
  ];

  return (
    <section id="brochure" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden border-t border-slate-200">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-100/80 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-600 tracking-widest uppercase">{t('brochureShowcase.tag')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900"
          >
            {t('brochureShowcase.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {t('brochureShowcase.titleGlow')}
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive Brochure Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center"
          >
            <div 
              onClick={() => setIsOpen(true)}
              className="relative group cursor-pointer max-w-[360px] w-full rounded-2xl overflow-hidden border border-slate-200 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 bg-white p-2"
            >
              {/* Overlay on hover */}
              <div className="absolute inset-2 rounded-xl bg-slate-900/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 z-20">
                <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-3 text-cyan-400">
                  <Eye className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold text-white tracking-wide">{t('brochureShowcase.viewFull')}</span>
              </div>

              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                <img 
                  src="/images/brochure.jpg" 
                  alt="ECO Chemicals Cleanex Brochure" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-200/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Right: Key Highlights */}
          <div className="lg:col-span-7 space-y-6">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-6 rounded-2xl glass-panel border border-slate-200 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden"
              >
                {/* Glow background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative z-10 flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-cyan-400 group-hover:scale-110 transition-transform">
                    {idx === 0 ? <Sparkles className="w-5 h-5" /> : idx === 1 ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <CheckCircle className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5 tracking-wide group-hover:text-cyan-600 transition-colors uppercase text-xs font-black tracking-widest text-cyan-400">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal — stays dark for contrast */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()} // Prevent close on clicking modal
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-xl overflow-hidden aspect-[3/4] max-h-[85vh]">
                <img 
                  src="/images/brochure.jpg" 
                  alt="Cleanex Brochure Full View" 
                  className="w-full h-full object-contain bg-slate-950"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
