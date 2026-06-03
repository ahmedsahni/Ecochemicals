"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Crosshair } from 'lucide-react';
import TextReveal from './TextReveal';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const container = useRef(null);
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

      {/* High-Tech Background */}
      <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0 bg-[#0B0F19]">
        {/* Farm Background Image */}
        <div 
          className="absolute inset-0 bg-[url('/images/farm_bg.png')] bg-cover bg-center opacity-[0.25] mix-blend-luminosity pointer-events-none" 
        />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwb2x5Z29uIHBvaW50cz0iMCAwIDEgMCAxIDQwIDAgNDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48cG9seWdvbiBwb2ludHM9IjAgMCA0MCAwIDQwIDEgMCAxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] opacity-50" />
        {/* Deep blue radial glow */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-900/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-900/30 rounded-full blur-[120px]" />
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]/30" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* ─── LEFT: Typography ─── */}
        <motion.div style={{ opacity: opacityText }} className="text-center lg:text-left">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-blue-500/30 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold text-blue-200 tracking-[0.2em] uppercase">High-Performance Formula</span>
            </div>
          </motion.div>

          <TextReveal 
            text="Industrial Grade Pad Descaler" 
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6" 
          />

          <motion.p {...fadeUp(0.2)} className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 font-medium">
            Scientifically formulated to instantly dissolve thick calcium scale and eradicate <span className="text-slate-200 font-bold border-b border-blue-500/50">Aspergillus fumigatus</span>. The only cellulose-safe chemical trusted by Pakistan's top poultry integrations.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <a href="#product" className="relative group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-blue-600 transition-all duration-300 group-hover:bg-blue-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_infinite]" />
              <span className="relative text-white font-bold text-base flex items-center gap-2">
                Calculate Dosage <ArrowRight className="w-5 h-5" />
              </span>
            </a>
            
            <a href="#why-us" className="inline-flex items-center justify-center px-8 py-4 glass-panel hover:bg-white/5 text-slate-200 font-bold text-base rounded-xl transition-all">
              View Lab Specs
            </a>
          </motion.div>

          {/* Tech specs mini-row */}
          <motion.div {...fadeUp(0.4)} className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center gap-8 justify-center lg:justify-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-blue-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Material</span>
              </div>
              <span className="text-sm font-bold text-slate-300">Cellulose Safe</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <Crosshair className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Efficacy</span>
              </div>
              <span className="text-sm font-bold text-slate-300">100% Fungi Kill</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-blue-500">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Action Time</span>
              </div>
              <span className="text-sm font-bold text-slate-300">Fast Acting (3 hrs)</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: High-Tech Can Showcase ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          style={{ y: yImage, scale: scaleImage }}
          className="relative flex justify-center items-center py-10"
        >
          {/* Intense neon backdrop */}
          <div className="absolute w-[280px] sm:w-[350px] h-[350px] bg-blue-600/30 rounded-full blur-[80px] animate-pulse-glow" />
          <div className="absolute w-[200px] h-[200px] bg-cyan-400/20 rounded-full blur-[60px]" />

          <div className="relative float-anim">
            {/* The Canister */}
            <img
              src="/images/can.png"
              alt="Cleanex 25L Canister"
              className="relative z-20 w-[240px] sm:w-[320px] lg:w-[360px] h-auto object-contain drop-shadow-[0_0_50px_rgba(37,99,235,0.4)] filter contrast-125"
            />
            
            {/* UI overlay element - scanning line effect */}
            <div className="absolute inset-0 z-30 pointer-events-none rounded-[3rem] overflow-hidden mix-blend-overlay">
               <div className="w-full h-1 bg-cyan-300/50 blur-[2px] absolute top-0 animate-[scan_4s_ease-in-out_infinite]" />
            </div>

            {/* High-tech orange badge */}
            <div className="absolute -top-4 -left-6 z-40 w-24 h-24 rounded-2xl bg-[#0B0F19] border border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.3)] flex flex-col items-center justify-center rotate-[-6deg] backdrop-blur-md">
              <div className="absolute inset-0 bg-orange-500/10 rounded-2xl" />
              <span className="text-[9px] text-orange-400 font-black tracking-[0.2em] uppercase leading-none mb-1">Vol</span>
              <span className="text-3xl font-black text-white leading-none">25<span className="text-orange-500">L</span></span>
            </div>
            
            {/* Holographic brand pill */}
            <div className="absolute -bottom-2 -right-2 z-40 glass-panel border-cyan-500/30 px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-50 tracking-widest uppercase">ECO Labs</span>
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
