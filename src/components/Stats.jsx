"use client";

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Farms Served' },
  { value: '25L',  label: 'Commercial Pack' },
  { value: '100%', label: 'Fungi Eliminated' },
  { value: '4°C',  label: 'Avg Temp Drop' },
];

export default function Stats() {
  return (
    <section className="bg-[#0B0F19] py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-blue-600/10 border border-blue-500/20 px-6 py-10 shadow-[0_0_30px_rgba(37,99,235,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/10 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <p className="text-4xl sm:text-5xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-sm font-semibold text-blue-200 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
