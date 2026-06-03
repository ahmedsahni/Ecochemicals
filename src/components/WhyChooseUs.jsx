"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Leaf, TrendingDown, Layers, FlaskConical } from 'lucide-react';
import TextReveal from './TextReveal';

const features = [
  {
    icon: Zap,
    title: 'Bio-Surfactant Formula',
    desc: 'Rapidly penetrates and cuts through thick calcium scale and organic biofilm in hours.',
    color: 'text-cyan-400',
    glow: 'from-cyan-500/20',
    span: '',
  },
  {
    icon: ShieldCheck,
    title: 'Pathogen Elimination',
    desc: 'Targeted destruction of Aspergillus fumigatus spores preventing brooder pneumonia.',
    color: 'text-blue-500',
    glow: 'from-blue-500/20',
    span: '',
  },
  {
    icon: FlaskConical,
    title: 'Cellulose Integrity',
    desc: 'Scientifically engineered to preserve delicate paper fibers. Cleans without melting pads.',
    color: 'text-orange-400',
    glow: 'from-orange-500/20',
    span: '',
  },
  {
    icon: TrendingDown,
    title: 'Optimized Economics',
    desc: 'High concentration allows one 25L canister to service a complete commercial shed matrix.',
    color: 'text-emerald-400',
    glow: 'from-emerald-500/20',
    span: '',
  },
  {
    icon: Leaf,
    title: 'Environmental Compliance',
    desc: 'Breaks down naturally post-flush. Leaves zero toxic residual in soil or effluent water.',
    color: 'text-blue-400',
    glow: 'from-blue-500/20',
    span: 'lg:col-span-2',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative bg-[#0B0F19] py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase">Technical Superiority</span>
          </motion.div>
          <TextReveal 
            text="Engineered for Maximum Efficiency" 
            className="text-4xl sm:text-5xl font-black text-white leading-tight" 
          />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-slate-700/50 md:col-span-2 lg:col-span-2 h-[350px]"
          >
            <img 
              src="/images/healthy_flock.png" 
              alt="Healthy pristine poultry flock" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent opacity-90" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl font-black text-white mb-2">Ensuring Ultimate Flock Health</h3>
              <p className="text-slate-300 font-medium text-sm max-w-md">Our chemical engineering guarantees a hygienic, pathogen-free environment, directly maximizing bird health and farm yield.</p>
            </div>
          </motion.div>
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
               <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.08 }}
                className={`group relative p-8 rounded-3xl glass-panel border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden ${feat.span}`}
              >
                {/* Background glow injected on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-2xl bg-slate-800/80 border border-slate-700 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{feat.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm font-medium">{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
