"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Building2, Clock, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Real WhatsApp SVG logo
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 3C8.82 3 3 8.82 3 16c0 2.42.65 4.69 1.79 6.64L3 29l6.54-1.71A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
        fill="currentColor"
      />
      <path
        d="M22.11 19.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
        fill="white"
      />
    </svg>
  );
}

export default function Contact() {
  const { t, language } = useLanguage();

  return (
    <section id="contact-info" className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
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
            className="text-4xl sm:text-5xl font-black text-slate-900"
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
              {/* Head Office — name + address only, no duplicate delivery text */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-700/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t('contact.hqLabel')}</p>
                  <p className="text-lg font-extrabold text-slate-900">ECO Chemicals</p>
                  <p className="text-sm font-semibold text-slate-500 mt-0.5">
                    {language === 'ur' ? 'مینگورہ، سوات' : 'Mingora, Swat'}
                  </p>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-700/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t('contact.logisticsLabel')}</p>
                  <p className="text-sm font-semibold text-slate-600">
                    {t('contact.logisticsVal')}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-700/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t('contact.hoursLabel')}</p>
                  <p className="text-sm font-semibold text-slate-600">{t('contact.hoursVal')}</p>
                </div>
              </div>
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
            <div className="glass-panel border border-slate-200 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50 transition-colors">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 mb-4 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t('contact.primaryTitle')}</h3>
                <p className="text-xs text-slate-500 mt-1">{t('contact.primaryDesc')}</p>
              </div>
              <a
                href="tel:+923226057885"
                className="relative z-10 mt-6 block w-full py-3 text-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                {language === 'ur' ? '+۹۲ ۳۲۲ ۶۰۵۷۸۸۵' : '+92 322 6057885'}
              </a>
            </div>

            {/* Phone 2 */}
            <div className="glass-panel border border-slate-200 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t('contact.secondaryTitle')}</h3>
                <p className="text-xs text-slate-500 mt-1">{t('contact.secondaryDesc')}</p>
              </div>
              <a
                href="tel:+923214858418"
                className="relative z-10 mt-6 block w-full py-3 text-center rounded-xl border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 font-bold text-sm transition-all"
              >
                {language === 'ur' ? '+۹۲ ۳۲۱ ۴۸۵۸۴۱۸' : '+92 321 4858418'}
              </a>
            </div>

            {/* WhatsApp — real logo */}
            <div className="sm:col-span-2 glass-panel border-emerald-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5" />
              <div className="relative z-10 flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                <div className="p-4 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/30 flex-shrink-0 shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                  <WhatsAppIcon className="w-8 h-8 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{t('contact.chatTitle')}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">{t('contact.chatDesc')}</p>
                </div>
              </div>
              <a
                href="https://wa.me/923214858418"
                target="_blank"
                rel="noreferrer"
                className="relative z-10 flex-shrink-0 flex items-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#20c55e] text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all w-full sm:w-auto justify-center"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                {t('contact.openWa')}
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
