"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, MessageSquare, Calculator, Package, UserCheck } from 'lucide-react';
import TextReveal from './TextReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function HowItWorks() {
  const { t, language } = useLanguage();

  const steps = [
    {
      number: language === 'ur' ? "۰۱" : "01",
      icon: MessageSquare,
      title: t('howItWorks.step1Title'),
      desc: t('howItWorks.step1Desc'),
      color: 'text-blue-400',
    },
    {
      number: language === 'ur' ? "۰۲" : "02",
      icon: Calculator,
      title: t('howItWorks.step2Title'),
      desc: t('howItWorks.step2Desc'),
      color: 'text-cyan-400',
    },
    {
      number: language === 'ur' ? "۰۳" : "03",
      icon: Package,
      title: t('howItWorks.step3Title'),
      desc: t('howItWorks.step3Desc'),
      color: 'text-emerald-400',
    },
    {
      number: language === 'ur' ? "۰۴" : "04",
      icon: UserCheck,
      title: t('howItWorks.step4Title'),
      desc: t('howItWorks.step4Desc'),
      color: 'text-orange-400',
    },
  ];

  return (
    <section id="how-it-works" className="relative bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4"
          >
            <Settings className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">{t('howItWorks.tag')}</span>
          </motion.div>
          <TextReveal 
            text={t('howItWorks.title')} 
            className="text-4xl sm:text-5xl font-black text-slate-900" 
          />
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-orange-500 w-[90%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.15 }}
                  className="relative group"
                >
                  <div className="glass-panel p-8 rounded-3xl relative z-10 border border-slate-200 hover:border-blue-500/50 transition-colors">
                    {/* Node marker */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-slate-200 group-hover:border-blue-500 flex items-center justify-center transition-colors z-20">
                      <span className="text-sm font-black text-slate-900">{step.number}</span>
                    </div>

                    <div className="mt-6 flex flex-col items-center text-center">
                      <Icon className={`w-8 h-8 ${step.color} mb-4`} />
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
