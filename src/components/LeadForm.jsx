"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, MessageSquare, PhoneCall, ArrowRight, User, MapPin, Building2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Farm/Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  city: z.string().min(2, "City is required"),
  message: z.string().optional(),
});

export default function LeadForm({ prefilledMessage }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      alert("System Error: Could not transmit data. Please contact via WhatsApp.");
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
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <Send className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Direct Transmission</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            Request Official <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Quotation</span>
          </h2>
          <p className="text-slate-400 leading-relaxed font-medium mb-10 max-w-md">
            Transmit your farm specifications to our chemical engineering team. We will calculate exact dosage requirements and dispatch commercial pricing.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl w-fit border border-emerald-500/20">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">WhatsApp Priority Channel</p>
                <a href="https://wa.me/923214858418" target="_blank" rel="noreferrer" className="text-xl font-bold text-white hover:text-emerald-300 transition-colors">
                  +92 321 4858418
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl w-fit border border-blue-500/20">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <PhoneCall className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Corporate HQ (Sargodha)</p>
                <p className="text-xl font-bold text-white">0322 6057885</p>
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
              <h3 className="text-2xl font-black text-white mb-2">Transmission Successful</h3>
              <p className="text-slate-400 font-medium">Our engineering team has received your telemetry and will respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Agent Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input {...register('name')} placeholder="Full Name" className="w-full pl-12 pr-4 py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium" />
                  </div>
                  {errors.name && <p className="text-orange-400 text-xs ml-1 font-bold">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Farm / Integration</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input {...register('company')} placeholder="Company Name" className="w-full pl-12 pr-4 py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium" />
                  </div>
                  {errors.company && <p className="text-orange-400 text-xs ml-1 font-bold">{errors.company.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Comms (Phone)</label>
                  <div className="relative">
                    <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input {...register('phone')} placeholder="03xx xxxxxxx" className="w-full pl-12 pr-4 py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium" />
                  </div>
                  {errors.phone && <p className="text-orange-400 text-xs ml-1 font-bold">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input {...register('city')} placeholder="City" className="w-full pl-12 pr-4 py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium" />
                  </div>
                  {errors.city && <p className="text-orange-400 text-xs ml-1 font-bold">{errors.city.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Telemetry / Details</label>
                <textarea 
                  {...register('message')} 
                  placeholder="Additional details or pasted calculator data..." 
                  rows={4}
                  className="w-full px-4 py-3.5 bg-[#0B0F19]/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium resize-none" 
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>Transmit Request <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
