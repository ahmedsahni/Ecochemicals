"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Crosshair } from 'lucide-react';
import TextReveal from './TextReveal';
import { useLanguage } from '@/context/LanguageContext';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const container = useRef(null);
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={container} id="home" className="relative min-h-[100vh] flex items-center pt-24 overflow-hidden">

      {/* Light Background */}
      <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0 bg-slate-50">
        {/* Farm Background Image — reduced opacity for light bg */}
        <div
          className="absolute inset-0 bg-[url('/images/farm_bg.png')] bg-cover bg-center opacity-[0.10] mix-blend-multiply pointer-events-none"
        />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwb2x5Z29uIHBvaW50cz0iMCAwIDEgMCAxIDQwIDAgNDAiIGZpbGw9InJnYmEoMCwwLDAsMC4wMykiLz48cG9seWdvbiBwb2ludHM9IjAgMCA0MCAwIDQwIDEgMCAxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9zdmc+')] opacity-40" />
        {/* Soft brand-colored radial glows */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-emerald-100/80 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-100/80 rounded-full blur-[120px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* ─── LEFT: Typography ─── */}
        <motion.div style={{ opacity: opacityText }} className={language === 'ur' ? 'text-center lg:text-right' : 'text-center lg:text-left'}>
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-500/30 shadow-sm mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700 tracking-[0.2em] uppercase">{t('hero.badge')}</span>
            </div>
          </motion.div>

          <TextReveal
            text={t('hero.title')}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.2] tracking-tight mb-6"
          />

          <motion.p {...fadeUp(0.2)} className="text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 font-medium">
            {language === 'ur' ? (
              <>
                سائنسی طور پر تیار کردہ جو کیلشیم سکیل کو جمنے سے روکتا ہے، <span className="text-slate-700 font-bold border-b border-emerald-500/50">ایسپرجیلس فیومیگیٹس</span> جراثیم کا خاتمہ کرتا ہے اور پیڈز کو صاف رکھتا ہے۔ پاکستان کے چوٹی کے پولٹری فارمز کا واحد قابلِ اعتماد اور کاغذی پیڈز کے لیے محفوظ کیمیکل جو پیڈز کو دھونے کے لیے استعمال ہوتا ہے۔
              </>
            ) : (
              <>
                Scientifically formulated to prevent calcium scaling, eradicate <span className="text-slate-700 font-bold border-b border-emerald-500/50">Aspergillus fumigatus</span>, and sanitize cooling pads. The only cellulose-safe chemical trusted by Pakistan's top poultry integrations for preventative pad washing.
              </>
            )}
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <a href="#product" className="relative group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-emerald-600 transition-all duration-300 group-hover:bg-emerald-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_infinite]" />
              <span className="relative text-white font-bold text-base flex items-center gap-2">
                {t('hero.calcDosage')} <ArrowRight className={`w-5 h-5 ${language === 'ur' ? 'rotate-180' : ''}`} />
              </span>
            </a>

            <a href="#why-us" className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-bold text-base rounded-xl transition-all shadow-sm">
              {t('hero.viewLabSpecs')}
            </a>
          </motion.div>

          {/* Specs mini-row */}
          <motion.div {...fadeUp(0.4)} className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center gap-8 justify-center lg:justify-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('hero.material')}</span>
              </div>
              <span className="text-sm font-bold text-slate-600">{t('hero.celluloseSafe')}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-blue-500">
                <Crosshair className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('hero.efficacy')}</span>
              </div>
              <span className="text-sm font-bold text-slate-600">{t('hero.fungiKill')}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-cyan-600">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('hero.actionTime')}</span>
              </div>
              <span className="text-sm font-bold text-slate-600">{t('hero.fastActing')}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: Can Showcase ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          style={{ y: yImage, scale: scaleImage }}
          className="relative flex justify-center items-center py-10"
        >
          {/* Soft glow backdrop */}
          <div className="absolute w-[280px] sm:w-[350px] h-[350px] bg-emerald-200/60 rounded-full blur-[80px] animate-pulse-glow" />
          <div className="absolute w-[200px] h-[200px] bg-blue-200/60 rounded-full blur-[60px]" />

          <div className="relative float-anim">
            {/* The Canister */}
            <img
              src="/images/can.png"
              alt="Cleanex 25L Canister"
              className="relative z-20 w-[240px] sm:w-[320px] lg:w-[360px] h-auto object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.15)] filter contrast-110"
            />

            {/* Scanning line */}
            <div className="absolute inset-0 z-30 pointer-events-none rounded-[3rem] overflow-hidden mix-blend-overlay">
               <div className="w-full h-1 bg-emerald-400/30 blur-[2px] absolute top-0 animate-[scan_4s_ease-in-out_infinite]" />
            </div>

            {/* 25L badge */}
            <div className={`absolute -top-4 ${language === 'ur' ? '-right-6' : '-left-6'} z-40 w-24 h-24 rounded-2xl bg-white border border-emerald-500/40 shadow-[0_4px_20px_rgba(110,167,62,0.15)] flex flex-col items-center justify-center rotate-[-6deg]`}>
              <div className="absolute inset-0 bg-emerald-50 rounded-2xl" />
              <span className="text-[9px] text-emerald-600 font-black tracking-[0.2em] uppercase leading-none mb-1 relative z-10">{t('hero.vol')}</span>
              <span className="text-3xl font-black text-slate-900 leading-none relative z-10">{language === 'ur' ? '۲۵' : '25'}<span className="text-emerald-500">{language === 'ur' ? 'لیٹر' : 'L'}</span></span>
            </div>

            {/* Brand pill */}
            <div className={`absolute -bottom-2 ${language === 'ur' ? '-left-2' : '-right-2'} z-40 bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-lg flex items-center gap-2`}>
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-700 tracking-widest uppercase">{t('hero.brand')}</span>
            </div>
          </div>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { top: 5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          95% { top: 95%; opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
    </section>
  );
}
