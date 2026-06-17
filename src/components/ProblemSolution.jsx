"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Activity, Flame, Wind } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProblemSolution() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} id="about-problem" className="relative py-24 bg-white overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwb2x5Z29uIHBvaW50cz0iMCAwIDEgMCAxIDQwIDAgNDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiLz48cG9seWdvbiBwb2ludHM9IjAgMCA0MCAwIDQwIDEgMCAxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDEiLz48L3N2Zz4=')] opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-50 mb-4"
          >
            <Activity className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold text-orange-300 tracking-widest uppercase">{t('problemSolution.tag')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight"
          >
            {t('problemSolution.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t('problemSolution.titleGlow')}
            </span>
          </motion.h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ─── LEFT: The Problem ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-orange-500 text-orange-400 text-xs font-black uppercase tracking-widest">
              <AlertTriangle className="w-4 h-4" /> {t('problemSolution.threatTag')}
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{t('problemSolution.threatTitle')}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {t('problemSolution.threatDesc')}
              </p>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-500/10">
                <Flame className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">{t('problemSolution.sporesTitle')}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{t('problemSolution.sporesDesc')}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl bg-slate-100 border border-slate-200">
                <Wind className="w-6 h-6 text-slate-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">{t('problemSolution.suffocationTitle')}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{t('problemSolution.suffocationDesc')}</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* ─── CENTER: Comparison Visual ─── */}
          <motion.div
            style={{ y: yParallax }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col items-center"
          >
            {/* Visual Container */}
            <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)] border border-slate-300 select-none bg-slate-200">
              
              {/* Clean side (right) — real pads photo */}
              <div className="absolute inset-0">
                <img src="/images/pads.png" alt="Clean cooling pads" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-200/60 to-transparent mix-blend-overlay" />
                <div className={`absolute bottom-4 ${language === 'ur' ? 'left-4 text-left' : 'right-4 text-right'}`}>
                  <span className="inline-block px-3 py-1 bg-blue-600/20 border border-blue-500/50 text-blue-300 text-[10px] font-black tracking-widest rounded-lg backdrop-blur-md">{t('problemSolution.cleanTag')}</span>
                  <p className="text-xs font-black text-white mt-1 uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('problemSolution.maxAirflow')}</p>
                </div>
              </div>

              {/* Clogged side (left, width = sliderPos) */}
              <div
                className={`absolute inset-y-0 left-0 overflow-hidden ${language === 'ur' ? 'border-l-2' : 'border-r-2'} border-cyan-400 shadow-[2px_0_15px_rgba(34,211,238,0.5)]`}
                style={{ width: `${sliderPos}%` }}
              >
                {/* Clogged — same pads photo but with heavy amber/red colour grading overlay */}
                <img src="/images/pads.png" alt="Clogged cooling pads" className="absolute inset-0 w-full h-full object-cover" style={{ width: '320px', maxWidth: 'none' }} />
                <div className="absolute inset-0 bg-orange-800/70 mix-blend-multiply" style={{ width: '320px' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-orange-900/50 to-orange-600/30" style={{ width: '320px' }} />
                <div className={`absolute bottom-4 ${language === 'ur' ? 'right-4 text-right' : 'left-4'}`} style={{ width: '100px' }}>
                  <span className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/50 text-orange-300 text-[10px] font-black tracking-widest rounded-lg backdrop-blur-md">{t('problemSolution.cloggedTag')}</span>
                  <p className="text-xs font-black text-white mt-1 uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('problemSolution.blockedAir')}</p>
                </div>
              </div>

              {/* Slider handle */}
              <div
                className="absolute top-0 bottom-0 w-px bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                  <span className="text-cyan-400 font-black text-xs tracking-tighter">||</span>
                </div>
              </div>
            </div>

            {/* Range Input */}
            <div className="mt-8 w-full max-w-[280px]">
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={e => setSliderPos(Number(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-slate-200 rounded-full cursor-pointer"
              />
              <p className="text-center text-[10px] text-slate-500 font-bold mt-3 uppercase tracking-[0.2em]">
                {t('problemSolution.dragAnalyze')}
              </p>
            </div>
          </motion.div>

          {/* ─── RIGHT: The Solution ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-blue-500 text-blue-400 text-xs font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> {t('problemSolution.solutionTag')}
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{t('problemSolution.solutionTitle')}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {t('problemSolution.solutionDesc')}
              </p>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-4 p-4 rounded-2xl glass-panel">
                <ShieldCheck className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">{t('problemSolution.scaleTitle')}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{t('problemSolution.scaleDesc')}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-2xl glass-panel">
                <ShieldCheck className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">{t('problemSolution.pathogenTitle')}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{t('problemSolution.pathogenDesc')}</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
