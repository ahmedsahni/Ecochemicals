"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t('testimonials.t1Quote'),
      name: t('testimonials.t1Name'),
      role: t('testimonials.t1Role'),
    },
    {
      quote: t('testimonials.t2Quote'),
      name: t('testimonials.t2Name'),
      role: t('testimonials.t2Role'),
    },
  ];

  return (
    <section id="testimonials" className="bg-slate-100 py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4"
          >
            <MessageCircle className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">{t('testimonials.tag')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight"
          >
            {t('testimonials.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t('testimonials.titleGlow')}
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-panel p-8 rounded-3xl relative flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">"{t.quote}"</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 tracking-wide">{t.name}</h4>
                <p className="text-xs font-bold text-blue-400 mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
