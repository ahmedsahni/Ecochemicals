"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Snowflake, ShieldAlert, BadgeInfo, RefreshCw, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function WinterAdvisory() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('winter'); // 'winter' or 'guidelines'

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0F19] overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-3xl border border-red-500/30 relative overflow-hidden"
        >
          {/* Subtle animated border top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />
          
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: Icon & Title */}
            <div className="lg:col-span-5 text-center lg:text-left lg:sticky lg:top-8">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                {t('winterAdvisory.title')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                  {t('winterAdvisory.subtitle')}
                </span>
              </h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                {t('winterAdvisory.tagline')}
              </p>
            </div>

            {/* Right: Content with Tab switcher */}
            <div className="lg:col-span-7 space-y-6">
              {/* Premium Tab Switcher */}
              <div className="flex gap-2 p-1.5 bg-slate-950/60 backdrop-blur-sm rounded-2xl border border-slate-800/80 mb-2">
                <button
                  onClick={() => setActiveTab('winter')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 relative ${
                    activeTab === 'winter'
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {activeTab === 'winter' && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-gradient-to-r from-red-600/25 to-amber-500/25 border border-red-500/30 rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t('winterAdvisory.tabWinter')}</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('guidelines')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 relative ${
                    activeTab === 'guidelines'
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {activeTab === 'guidelines' && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-gradient-to-r from-red-600/25 to-amber-500/25 border border-red-500/30 rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t('winterAdvisory.tabGuidelines')}</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'winter' ? (
                  <motion.div
                    key="winter"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm relative group hover:border-red-500/30 transition-colors">
                      <div className={`absolute ${language === 'ur' ? '-right-3' : '-left-3'} -top-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-lg`}>
                        <Snowflake className="w-4 h-4 text-blue-400 group-hover:rotate-45 transition-transform duration-500" />
                      </div>
                      <p className="text-slate-300 leading-relaxed font-medium">
                        {language === 'ur' ? (
                          <>
                            یہ عام مشاہدہ ہے کہ سردیوں کے شروع میں کولنگ پیڈز کو اکثر دھوئے بغیر <strong className="text-white">۴ سے ۶ ماہ کے لیے بند کر دیا جاتا ہے</strong>۔ پیڈز کو صاف کیے بغیر بند کرنا انہیں مکمل طور پر تباہ کر دیتا ہے۔
                          </>
                        ) : (
                          <>
                            It is a common observation that at the onset of winter, cooling pads are often shut down for <strong className="text-white">4 to 6 months without being washed</strong>. Closing the pads without proper cleaning completely destroys them.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm relative group hover:border-amber-500/30 transition-colors">
                      <div className={`absolute ${language === 'ur' ? '-right-3' : '-left-3'} -top-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-lg`}>
                        <ShieldAlert className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-slate-300 leading-relaxed font-medium">
                        {language === 'ur' ? (
                          <>
                            اس ۴ سے ۶ ماہ کی بندش کے دوران، پیڈز کی بیرونی سطح اور سوراخوں کے اندر جمنے والا کیلشیم <strong className="text-amber-400">پتھر کی طرح سخت ہو جاتا ہے</strong>۔ پیڈز پر اس کی گرفت مستقل اور ناقابلِ علاج ہو جاتی ہے۔
                          </>
                        ) : (
                          <>
                            Over this 4-6 month dormant period, the scaling accumulated on the outer surface and inside the holes <strong className="text-amber-400">hardens like stone</strong>. Its grip on the pads becomes permanent and unbreakable.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 backdrop-blur-sm relative group hover:bg-red-950/30 transition-colors">
                      <div className={`absolute ${language === 'ur' ? '-right-3' : '-left-3'} -top-3 w-8 h-8 rounded-full bg-red-900/50 border border-red-500/50 flex items-center justify-center shadow-lg`}>
                        <BadgeInfo className="w-4 h-4 text-red-400" />
                      </div>
                      <p className="text-slate-200 leading-relaxed font-semibold">
                        {t('winterAdvisory.advisory3')}
                        <br /><br />
                        <span className="text-red-400 font-bold block">
                          {t('winterAdvisory.warningPill')}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="guidelines"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm relative group hover:border-cyan-500/30 transition-colors">
                      <div className={`absolute ${language === 'ur' ? '-right-3' : '-left-3'} -top-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-lg`}>
                        <RefreshCw className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{t('winterAdvisory.tip1Title')}</h3>
                      <p className="text-slate-300 leading-relaxed text-sm font-medium">
                        {t('winterAdvisory.tip1Desc1')}
                        <br /><br />
                        {t('winterAdvisory.tip1Desc2')}
                      </p>
                      <span className="text-amber-400 font-bold block mt-3 text-sm border-t border-slate-800/80 pt-2.5">
                        {t('winterAdvisory.tip1Warning')}
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm relative group hover:border-amber-500/30 transition-colors">
                      <div className={`absolute ${language === 'ur' ? '-right-3' : '-left-3'} -top-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-lg`}>
                        <EyeOff className="w-4 h-4 text-amber-500 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{t('winterAdvisory.tip2Title')}</h3>
                      <p className="text-slate-300 leading-relaxed text-sm font-medium">
                        {t('winterAdvisory.tip2Desc1')}
                        <br /><br />
                        {t('winterAdvisory.tip2Desc2')}
                      </p>
                      <span className="text-red-400 font-bold block mt-3 text-sm border-t border-slate-800/80 pt-2.5">
                        {t('winterAdvisory.tip2Warning')}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-xl md:text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {t('winterAdvisory.quote')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
