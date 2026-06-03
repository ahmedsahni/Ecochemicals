"use client";

import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  "K&N's Foods", "Sabroso", "Big Bird", "SB Poultry", "Al-Rehman Farms", "Punjab Broilers",
];

export default function Partners() {
  // Duplicate for seamless loop
  const items = [...partners, ...partners];

  return (
    <section className="bg-slate-900 py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-[0.25em]">
          Trusted by Pakistan's Leading Poultry Integrations
        </p>
      </div>

      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div className="flex" style={{ animation: 'marquee 30s linear infinite' }}>
          {items.map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-10 flex items-center"
            >
              <span className="text-2xl font-black text-slate-400 hover:text-white transition-colors duration-300 whitespace-nowrap cursor-default">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
