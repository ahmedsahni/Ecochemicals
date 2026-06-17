"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Stats() {
  const { t } = useLanguage();

  const stats = [
    { value: t('stats.servedVal'), label: t('stats.servedLabel') },
    { value: t('stats.packVal'),  label: t('stats.packLabel') },
    { value: t('stats.fungiVal'), label: t('stats.fungiLabel') },
    { value: t('stats.tempVal'),  label: t('stats.tempLabel') },
  ];

  return (
    <section className="bg-white py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-blue-50 border border-blue-200 px-6 py-10 shadow-[0_0_30px_rgba(37,99,235,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">{stat.value}</p>
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
