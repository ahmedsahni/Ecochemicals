"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, MapPin, Building2, Clock, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t, language } = useLanguage();

  return (
    <section id="contact-info" className="bg-[#0B0F19] py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-cyan-400 tracking-[0.25em] uppercase mb-4"
          >
            {t('contact.tag')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            {t('contact.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t('contact.titleGlow')}
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass-panel rounded-3xl p-8 flex flex-col justify-between border border-blue-500/20"
          >
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-700/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t('contact.hqLabel')}</p>
                  <p className="text-lg font-extrabold text-white">ECO Chemicals</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-700/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t('contact.regionLabel')}</p>
                  <p className="text-sm font-semibold text-slate-300">
                    {t('contact.regionVal')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-700/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t('contact.hoursLabel')}</p>
                  <p className="text-sm font-semibold text-slate-300">{t('contact.hoursVal')}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                <Globe className="w-4 h-4" /> {t('contact.logisticsLabel')}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('contact.logisticsVal')}
              </p>
            </div>
          </motion.div>

          {/* Phone & WhatsApp Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Phone 1 */}
            <div className="glass-panel border border-slate-700/50 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50 transition-colors">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 mb-4 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t('contact.primaryTitle')}</h3>
                <p className="text-xs text-slate-400 mt-1">{t('contact.primaryDesc')}</p>
              </div>
              <a
                href="tel:+923226057885"
                className="relative z-10 mt-6 block w-full py-3 text-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                {language === 'ur' ? '+۹۲ ۳۲۲ ۶۰۵۷۸۸۵' : '+92 322 6057885'}
              </a>
            </div>

            {/* Phone 2 */}
            <div className="glass-panel border border-slate-700/50 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t('contact.secondaryTitle')}</h3>
                <p className="text-xs text-slate-400 mt-1">{t('contact.secondaryDesc')}</p>
              </div>
              <a
                href="tel:+923214858418"
                className="relative z-10 mt-6 block w-full py-3 text-center rounded-xl border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 font-bold text-sm transition-all"
              >
                {language === 'ur' ? '+۹۲ ۳۲۱ ۴۸۵۸۴۱۸' : '+92 321 4858418'}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="sm:col-span-2 glass-panel border-emerald-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5" />
              <div className="relative z-10 flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex-shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <MessageSquare className="w-8 h-8 fill-current" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{t('contact.chatTitle')}</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">{t('contact.chatDesc')}</p>
                </div>
              </div>
              <a
                href="https://wa.me/923214858418"
                target="_blank"
                rel="noreferrer"
                className="relative z-10 flex-shrink-0 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all w-full sm:w-auto text-center"
              >
                {t('contact.openWa')}
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
