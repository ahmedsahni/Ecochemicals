"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Cpu, Beaker, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Product({ onCalculatorSubmit }) {
  const { t, language } = useLanguage();

  const specsList = [
    { label: t('product.specActiveMatrix'), value: t('product.specActiveMatrixVal') },
    { label: t('product.specTarget'), value: t('product.specTargetVal') },
    { label: t('product.specForm'), value: t('product.specFormVal') },
  ];

  const handleApply = () => {
    const summary = language === 'ur'
      ? "?????? ?????? ??? ???? ?????? ???? ?? ??? ?????? ??? ????? ?? ??? ??? ?????? ?? ????? ????? ???? ????? ????"
      : "Hello, I would like to request a quotation and recommended dosage guidelines for my poultry farm cooling pads.";
    if (onCalculatorSubmit) onCalculatorSubmit(summary);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="product" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-slate-50 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4"
          >
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">{t('product.tag')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900"
          >
            {t('product.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {t('product.titleGlow')}
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lab Specs Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <Beaker className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-wide">{t('product.specsTitle')}</h3>
                  <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">{t('product.specsSub')}</p>
                </div>
              </div>

              <div className="space-y-5">
                {specsList.map((spec, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-200 last:border-0 group">
                    <span className="flex items-center gap-2 text-[10px] font-black text-cyan-500 tracking-[0.2em] uppercase mb-1.5">
                      <div className="w-1 h-1 rounded-full bg-cyan-400" />
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <p className="text-xs text-orange-200/80 leading-relaxed font-medium">
                <strong className="text-orange-400">{t('product.hazardTitle')}</strong> {t('product.hazardDesc')}
              </p>
            </div>
          </motion.div>

          {/* Product Canister Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 bg-white border border-blue-500/20 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Cyber grid bg */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxwb2x5Z29uIHBvaW50cz0iMCAwIDEgMCAxIDIwIDAgMjAiIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjA1KSIvPjxwb2x5Z29uIHBvaW50cz0iMCAwIDIwIDAgMjAgMSAwIDEiIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjA1KSIvPjwvc3ZnPg==')] pointer-events-none opacity-20" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-100 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Product Badge */}
              <div className="flex items-center gap-2 mb-6 self-start">
                <Package className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t('product.specsTitle')}</span>
              </div>

              {/* Floating Canister Image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-6 relative group"
              >
                {/* Glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                <img
                  src="/images/can.png"
                  alt="Cleanex 25L HDPE Canister"
                  className="h-full object-contain relative z-10 filter drop-shadow-[0_10px_20px_rgba(59,130,246,0.3)]"
                />
              </motion.div>

              {/* Key Features from Brochure */}
              <div className="w-full grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-bold text-slate-600">{language === 'ur' ? '??? ??????? ?????' : 'Foaming Action'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-slate-600">{language === 'ur' ? '?????? ?? ??????? ??? ?????' : 'Safe Around Birds'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="relative z-10 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              {t('product.buttonText')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
