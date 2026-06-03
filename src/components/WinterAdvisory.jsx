"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Snowflake, ShieldAlert, BadgeInfo } from 'lucide-react';

export default function WinterAdvisory() {
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
          
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Icon & Title */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                Winter Maintenance <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                  Critical Advisory
                </span>
              </h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                The Hidden Cost of Neglect
              </p>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm relative group hover:border-red-500/30 transition-colors">
                <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-lg">
                  <Snowflake className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-slate-300 leading-relaxed font-medium">
                  It is a common observation that at the onset of winter, cooling pads are often shut down for <strong className="text-white">4 to 6 months without being washed</strong>. Closing the pads without proper cleaning completely destroys them.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm relative group hover:border-amber-500/30 transition-colors">
                <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-lg">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-slate-300 leading-relaxed font-medium">
                  Over this 4-6 month dormant period, the scaling accumulated on the outer surface and inside the holes <strong className="text-amber-400">hardens like stone</strong>. Its grip on the pads becomes permanent and unbreakable.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 backdrop-blur-sm relative group hover:bg-red-950/30 transition-colors">
                <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-red-900/50 border border-red-500/50 flex items-center justify-center shadow-lg">
                  <BadgeInfo className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-slate-200 leading-relaxed font-semibold">
                  Especially in areas where the water is salty, muddy, heavy, or has high TDS levels, this scaling renders the pads completely useless and unrecoverable. 
                  <br /><br />
                  <span className="text-red-400 font-bold block">
                    Never shut down your cooling pads at the start of winter without washing them.
                  </span>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-xl md:text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  "An expense of a few thousand today saves a loss of hundreds of thousands tomorrow."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
