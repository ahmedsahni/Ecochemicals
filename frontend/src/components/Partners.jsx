import React from 'react';
import { motion } from 'framer-motion';

const Partners = () => {
  // We use stylized text for the partner logos if actual SVG/PNG logos are missing.
  // In a real scenario, you'd replace the span with <img src="..." />
  const partners = [
    { name: "K&N's", style: "font-serif italic font-bold tracking-tight text-red-600 dark:text-red-500 text-3xl" },
    { name: "SABROSO", style: "font-sans font-black tracking-widest text-orange-600 dark:text-orange-500 text-2xl uppercase" },
    { name: "JADEED FARMS", style: "font-sans font-extrabold tracking-tight text-emerald-700 dark:text-emerald-500 text-2xl uppercase" },
    { name: "BIG BIRD", style: "font-serif font-black tracking-widest text-blue-800 dark:text-blue-400 text-2xl uppercase" },
    { name: "SB POULTRY", style: "font-sans font-extrabold tracking-tighter text-slate-800 dark:text-slate-200 text-2xl" },
  ];

  return (
    <section className="py-12 bg-white dark:bg-darkCard border-y border-slate-100 dark:border-darkBorder/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Trust Text */}
          <div className="md:w-1/4 text-center md:text-left flex-shrink-0">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
              Trusted By The Best
            </p>
            <p className="text-xl font-black text-textDark dark:text-darkText leading-tight">
              Powering Pakistan's Top Poultry Integrations
            </p>
          </div>

          {/* Marquee / Logos */}
          <div className="md:w-3/4 w-full relative">
            {/* Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-darkCard to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-darkCard to-transparent z-10"></div>
            
            <div className="flex overflow-hidden group">
              {/* First Track */}
              <motion.div 
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                className="flex items-center gap-16 pr-16 whitespace-nowrap"
              >
                {partners.map((partner, idx) => (
                  <div key={idx} className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer">
                    <span className={partner.style}>{partner.name}</span>
                  </div>
                ))}
              </motion.div>
              
              {/* Second Track (for seamless looping) */}
              <motion.div 
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                className="flex items-center gap-16 pr-16 whitespace-nowrap"
              >
                {partners.map((partner, idx) => (
                  <div key={`dup-${idx}`} className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer">
                    <span className={partner.style}>{partner.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Partners;
