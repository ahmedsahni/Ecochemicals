"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Calculator, Cpu, Beaker, ShieldAlert, CheckCircle2 } from 'lucide-react';

const specsList = [
  { label: 'Active Matrix', value: 'Bio-surfactants, corrosion inhibitors, stabilizing agents' },
  { label: 'Target Pathogens', value: 'Aspergillus fumigatus spores, pathogenic biofilm, algae mats' },
  { label: 'Form Factor', value: '25 Liters Industrial HDPE Canister' },
  { label: 'Dosing Ratio', value: '7L per 1000L water' },
];

export default function Product({ onCalculatorSubmit }) {
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(4);
  const [depth, setDepth] = useState(3);
  const [dirtLevel, setDirtLevel] = useState('normal');
  const [volumeLiters, setVolumeLiters] = useState(0);
  const [cleanexNeeded, setCleanexNeeded] = useState(0);
  const [cansNeeded, setCansNeeded] = useState(0);

  useEffect(() => {
    const vol = Math.round(length * width * depth * 28.3);
    setVolumeLiters(vol);
    const dosageRate = 7.0;
    const chemical = parseFloat(((vol / 1000) * dosageRate).toFixed(1));
    setCleanexNeeded(chemical);
    setCansNeeded(Math.ceil(chemical / 25));
  }, [length, width, depth]);

  const handleApply = () => {
    const summary = `System: ${volumeLiters}L (${length}×${width}×${depth} ft). Required Volume: ${cleanexNeeded}L (~${cansNeeded} cans). Dosing: 7L per 1000L water.`;
    if (onCalculatorSubmit) onCalculatorSubmit(summary);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="product" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-[#0B0F19] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4"
          >
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">System Analytics</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Chemical Profiling & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Calculator</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ─── Lab Specs Card ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <Beaker className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-wide">Cleanex Grade A</h3>
                  <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Scientific Formulation</p>
                </div>
              </div>

              <div className="space-y-5">
                {specsList.map((spec, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-700/50 last:border-0 group">
                    <span className="flex items-center gap-2 text-[10px] font-black text-cyan-500 tracking-[0.2em] uppercase mb-1.5">
                      <div className="w-1 h-1 rounded-full bg-cyan-400" />
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-300 leading-relaxed group-hover:text-white transition-colors">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <p className="text-xs text-orange-200/80 leading-relaxed font-medium">
                <strong className="text-orange-400">Hazard Protocol:</strong> Protective gear recommended during handling. Ensure vigorous shaking prior to dosing the main water matrix.
              </p>
            </div>
          </motion.div>

          {/* ─── Telemetry Calculator ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 bg-[#111827] border border-blue-500/20 relative overflow-hidden"
          >
            {/* Cyber grid bg */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxwb2x5Z29uIHBvaW50cz0iMCAwIDEgMCAxIDIwIDAgMjAiIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjA1KSIvPjxwb2x5Z29uIHBvaW50cz0iMCAwIDIwIDAgMjAgMSAwIDEiIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjA1KSIvPjwvc3ZnPg==')] pointer-events-none opacity-50" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-black text-white uppercase tracking-widest">Telemetry</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Length */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <span>Matrix Length</span>
                    <span className="text-blue-400">{length} ft</span>
                  </div>
                  <input type="range" min="2" max="40" step="0.5" value={length}
                    onChange={e => setLength(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 h-1 bg-slate-800 rounded-full cursor-pointer" />
                </div>

                {/* Width */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <span>Matrix Width</span>
                    <span className="text-blue-400">{width} ft</span>
                  </div>
                  <input type="range" min="2" max="20" step="0.5" value={width}
                    onChange={e => setWidth(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 h-1 bg-slate-800 rounded-full cursor-pointer" />
                </div>

                {/* Depth */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <span>Depth</span>
                    <span className="text-blue-400">{depth} ft</span>
                  </div>
                  <input type="range" min="1" max="10" step="0.5" value={depth}
                    onChange={e => setDepth(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 h-1 bg-slate-800 rounded-full cursor-pointer" />
                </div>

                {/* Condition */}
                <div className="pt-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Threat Level</label>
                  <select
                    value={dirtLevel}
                    onChange={e => setDirtLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/20 bg-slate-800/50 text-white text-sm font-semibold focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="normal" className="bg-slate-900">Standard Dosage (7.0L / 1000L)</option>
                  </select>
                </div>
              </div>

              {/* Data Output */}
              <div className="mt-8 p-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20">
                <div className="bg-[#0B0F19] rounded-xl p-4 grid grid-cols-3 gap-2 text-center divide-x divide-slate-800">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Capacity</span>
                    <span className="text-lg font-black text-white">{volumeLiters}<span className="text-xs text-slate-500 ml-0.5">L</span></span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Required</span>
                    <span className="text-lg font-black text-cyan-400">{cleanexNeeded}<span className="text-xs text-cyan-700 ml-0.5">L</span></span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Units</span>
                    <span className="text-lg font-black text-blue-400">~{cansNeeded}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleApply}
                className="mt-6 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                <CheckCircle2 className="w-5 h-5" />
                Transfer Data to Quote
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
