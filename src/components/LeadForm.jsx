"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, PhoneCall, ArrowRight, User, MapPin, Building2, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

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

export default function LeadForm({ prefilledMessage }) {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, t('leadForm.errName')),
    company: z.string().min(2, t('leadForm.errCompany')),
    phone: z.string().min(10, t('leadForm.errPhone')),
    city: z.string().min(2, t('leadForm.errCity')),
    message: z.string().optional(),
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (prefilledMessage) {
      setValue('message', prefilledMessage);
    }
  }, [prefilledMessage, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'Website Quote Form' })
      });
      if (!res.ok) throw new Error('Failed to submit');
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      alert(language === 'ur' 
        ? "سسٹم کی خرابی: ڈیٹا منتقل نہیں ہو سکا۔ براہ کرم واٹس ایپ پر رابطہ کریں۔" 
        : "Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0F19] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text & Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={language === 'ur' ? 'text-right' : 'text-left'}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <Send className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">{t('leadForm.tag')}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            {t('leadForm.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t('leadForm.titleGlow')}
            </span>
          </h2>
          <p className="text-slate-400 leading-relaxed font-medium mb-10 max-w-md">
            {t('leadForm.desc')}
          </p>

          <div className="space-y-6 flex flex-col items-start lg:items-stretch">
            <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl w-fit border border-[#25D366]/20">
              <div className="p-3 bg-[#25D366]/20 rounded-xl">
                <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
              </div>
              <div className={language === 'ur' ? 'text-right' : 'text-left'}>
                <p className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-1">{t('leadForm.waPriority')}</p>
                <a href="https://wa.me/923214858418" target="_blank" rel="noreferrer" className="text-xl font-bold text-white hover:text-[#25D366] transition-colors">
                  +92 321 4858418
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl w-fit border border-blue-500/20">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <PhoneCall className="w-6 h-6 text-blue-400" />
              </div>
              <div className={language === 'ur' ? 'text-right' : 'text-left'}>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">{t('leadForm.hqLabel')}</p>
                <p className="text-xl font-bold text-white">{language === 'ur' ? '۰۳۲۲ ۶۰۵۷۸۸۵' : '0322 6057885'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: The Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 sm:p-10 rounded-3xl relative border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.15)]"
        >
          {isSuccess ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">{t('leadForm.successTitle')}</h3>
              <p className="text-slate-400 font-medium">{t('leadForm.successDesc')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('leadForm.labelName')}</label>
                  <div className="relative">
                    <User className={`absolute ${language === 'ur' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500`} />
                    <input {...register('name')} placeholder={t('leadForm.placeholderName')} className={`w-full ${language === 'ur' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium`} />
                  </div>
                  {errors.name && <p className="text-orange-400 text-xs ml-1 font-bold">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('leadForm.labelCompany')}</label>
                  <div className="relative">
                    <Building2 className={`absolute ${language === 'ur' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500`} />
                    <input {...register('company')} placeholder={t('leadForm.placeholderCompany')} className={`w-full ${language === 'ur' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium`} />
                  </div>
                  {errors.company && <p className="text-orange-400 text-xs ml-1 font-bold">{errors.company.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('leadForm.labelPhone')}</label>
                  <div className="relative">
                    <PhoneCall className={`absolute ${language === 'ur' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500`} />
                    <input {...register('phone')} placeholder={t('leadForm.placeholderPhone')} className={`w-full ${language === 'ur' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium`} />
                  </div>
                  {errors.phone && <p className="text-orange-400 text-xs ml-1 font-bold">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('leadForm.labelLocation')}</label>
                  <div className="relative">
                    <MapPin className={`absolute ${language === 'ur' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500`} />
                    <input {...register('city')} placeholder={t('leadForm.placeholderCity')} className={`w-full ${language === 'ur' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium`} />
                  </div>
                  {errors.city && <p className="text-orange-400 text-xs ml-1 font-bold">{errors.city.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('leadForm.labelMsg')}</label>
                <textarea 
                  {...register('message')} 
                  placeholder={t('leadForm.placeholderMsg')} 
                  rows={4}
                  className="w-full px-4 py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium resize-none" 
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>{t('leadForm.submitBtn')} <ArrowRight className={`w-5 h-5 ${language === 'ur' ? 'rotate-180' : ''}`} /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
