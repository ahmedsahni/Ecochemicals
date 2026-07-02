import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Flame, Airplay, ChevronRight, Wind } from 'lucide-react';

const ProblemSolution = () => {
  const [sliderPos, setSliderPos] = useState(50); // percentage

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section id="about-problem" className="py-24 bg-white dark:bg-darkCard transition-colors duration-300 relative overflow-hidden">
      
      {/* Dynamic Background wave lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-accent tracking-widest uppercase mb-3"
          >
            The Critical Challenge
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-textDark dark:text-darkText"
          >
            Why Clean Pads Mean Farm Profitability
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-1.5 bg-gradient-to-r from-accent to-primary mx-auto mt-6 rounded-full origin-left"
          ></motion.div>
        </div>

        {/* Core Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Problem (Amber Highlight) */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 shadow-sm">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">The Problem</span>
            </div>
            
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-textDark dark:text-darkText mb-4">
                Clogged & Caked Cooling Pads
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium">
                During hot summers, pads accumulate dust, algae, and salt crusts. This build-up chokes ventilation, forcing fans to work harder while dropping airflow.
              </p>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="mt-1 p-2 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-sm">
                  <Flame className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-textDark dark:text-darkText mb-1">Aspergillus Fumigatus Fungi</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Moist, dirty pads are breeding grounds for deadly fungi, causing respiratory distress.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 p-2 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-sm">
                  <Airplay className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-textDark dark:text-darkText mb-1">Airflow Suffocation</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Calcium scale forms a seal that reduces cooling capacity by up to 60%.</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Center Column: Interactive Visual Slider (SVG/CSS Clogged vs Clean) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col items-center justify-center py-8 lg:py-0"
          >
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white dark:border-darkBorder select-none">
              
              {/* CLEAN SIDE (Right Base) */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#E6F0FA] to-white dark:from-[#112349] dark:to-darkCard flex flex-col justify-between p-6">
                
                {/* Visual clean pads structure */}
                <div className="w-full flex-grow flex justify-around opacity-60">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-3 sm:w-4 h-full bg-[#D4E6F1] dark:bg-[#1E3A6B] rounded-full transform -skew-x-[20deg]"
                    />
                  ))}
                </div>

                {/* Airflow waves passing through (Clean Side) */}
                <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none overflow-hidden">
                  <div className="flex flex-col gap-8">
                    <Wind className="w-10 h-10 text-primary animate-pulse mr-4" />
                    <Wind className="w-10 h-10 text-primary animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>

                <div className="z-10 text-right bg-white/50 dark:bg-darkCard/50 backdrop-blur-sm p-3 rounded-xl border border-white dark:border-darkBorder self-end">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg shadow-sm">
                    CLEAN
                  </span>
                  <p className="text-[10px] font-bold text-primary dark:text-[#E2E8F0] mt-1.5 uppercase tracking-wider">High Airflow</p>
                </div>
              </div>

              {/* CLOGGED SIDE (Left Overlay) */}
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-b from-[#FAF4E6] to-[#F2E5D4] dark:from-[#2A2319] dark:to-[#1C160F] flex flex-col justify-between p-6 overflow-hidden border-r-4 border-white dark:border-accent"
                style={{ width: `${sliderPos}%` }}
              >
                {/* Clogged pads structure - narrower width container */}
                <div className="w-[300px] h-full flex-grow flex justify-around opacity-90 relative">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-3 sm:w-4 h-full bg-[#D4B28A] dark:bg-[#4A3926] rounded-full transform -skew-x-[20deg] relative"
                    >
                      {/* Algae/Salt blockages overlay */}
                      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-4 h-8 bg-amber-700/80 rounded-full blur-[1px]"></div>
                      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-5 h-10 bg-slate-500/90 rounded-full blur-[1px]"></div>
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-6 bg-emerald-800/80 rounded-full blur-[1px]"></div>
                    </div>
                  ))}
                  
                  {/* Clogged alert marker */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 dark:bg-black/50 p-3 rounded-full backdrop-blur-sm animate-bounce">
                      <AlertTriangle className="w-10 h-10 text-amber-500 drop-shadow-md" />
                    </div>
                  </div>
                </div>

                <div className="z-10 w-[200px]">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm">
                    CLOGGED
                  </span>
                  <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-1.5 uppercase tracking-wider">Blocked Air</p>
                </div>
              </div>

              {/* Slider Center Line handle */}
              <div 
                className="absolute top-0 bottom-0 pointer-events-none w-1 bg-white dark:bg-accent z-20 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-darkCard shadow-xl flex items-center justify-center border-[3px] border-primary dark:border-accent">
                  <span className="text-[14px] font-black text-primary dark:text-accent select-none">↔</span>
                </div>
              </div>

            </div>

            {/* Slider controller input */}
            <div className="w-full max-w-[300px] mt-8 space-y-3">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={handleSliderChange}
                className="w-full h-2 bg-slate-200 dark:bg-darkBorder rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-dark transition-all"
              />
              <p className="text-center text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Drag slider to see the difference
              </p>
            </div>

          </motion.div>

          {/* Right Column: Solution (Blue Highlight) */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-primary/10 border border-blue-200 dark:border-primary/20 text-primary shadow-sm">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Our Solution</span>
            </div>
            
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-textDark dark:text-darkText mb-4">
                Cleanex Pad Cleaner
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium">
                A premium, fast-acting chemical descaler and sanitizer. Cleanex is formulated to rapidly dissolve scaling salts and algae binders, rinsing clean with plain water.
              </p>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="mt-1 p-2 rounded-xl bg-blue-100 dark:bg-primary/20 text-primary shadow-sm">
                  <CheckCircle className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-textDark dark:text-darkText mb-1">Dissolves Mineral Scaling</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Melts hard calcium build-up and salt rings instantly without damaging the cellulose pad.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 p-2 rounded-xl bg-blue-100 dark:bg-primary/20 text-primary shadow-sm">
                  <CheckCircle className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-textDark dark:text-darkText mb-1">Fungicidal & Germicidal</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Eradicates spores of Aspergillus fumigatus, algae, and odor-causing bacteria.</p>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
      
    </section>
  );
};

export default ProblemSolution;
