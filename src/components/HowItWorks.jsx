"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Droplets, ThermometerSun, ShieldCheck } from 'lucide-react';
import TextReveal from './TextReveal';

const steps = [
  {
    number: "01",
    icon: Droplets,
    title: 'Chemical Injection',
    desc: 'Inject Cleanex directly into the main water tank using the recommended dosing ratio based on matrix scaling severity.',
    color: 'text-blue-400',
  },
  {
    number: "02",
    icon: Settings,
    title: 'System Circulation',
    desc: 'Run the water circulation pumps without exhaust fans for 2-3 hours. This allows the bio-surfactants to penetrate deep into the cellulose matrix.',
    color: 'text-cyan-400',
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: 'Scale Dissolution',
    desc: 'The formula chemically breaks down hard calcium bonds and eradicates fungal spores. Flush the system with clean water to remove debris.',
    color: 'text-emerald-400',
  },
  {
    number: "04",
    icon: ThermometerSun,
    title: 'Thermal Drop',
    desc: 'Re-engage exhaust fans. The newly restored airflow capacity immediately drops internal shed temperatures by up to 4°C.',
    color: 'text-orange-400',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-[#0B0F19] py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4"
          >
            <Settings className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Deployment Protocol</span>
          </motion.div>
          <TextReveal 
            text="Application Procedure" 
            className="text-4xl sm:text-5xl font-black text-white" 
          />
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-orange-500 w-[90%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.15 }}
                  className="relative group"
                >
                  <div className="glass-panel p-8 rounded-3xl relative z-10 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                    {/* Node marker */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0B0F19] border-4 border-slate-800 group-hover:border-blue-500 flex items-center justify-center transition-colors z-20">
                      <span className="text-sm font-black text-white">{step.number}</span>
                    </div>

                    <div className="mt-6 flex flex-col items-center text-center">
                      <Icon className={`w-8 h-8 ${step.color} mb-4`} />
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">{step.desc}</p>
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
