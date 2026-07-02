import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Package, Droplet, Calculator, ClipboardList, Info } from 'lucide-react';

const Product = ({ onCalculatorSubmit }) => {
  // Calculator States
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(4);
  const [depth, setDepth] = useState(3);
  const [dirtLevel, setDirtLevel] = useState('normal'); // 'normal' = 2.5L per 1000L, 'heavy' = 5.0L per 1000L
  
  const [volumeLiters, setVolumeLiters] = useState(0);
  const [cleanexNeeded, setCleanexNeeded] = useState(0);
  const [cansNeeded, setCansNeeded] = useState(0);

  useEffect(() => {
    // Volume in Liters = Length * Width * Depth * 28.3
    const vol = Math.round(length * width * depth * 28.3);
    setVolumeLiters(vol);

    // Dosage: 2.5L per 1000L for normal, 5L per 1000L for heavy
    const dosageRate = dirtLevel === 'normal' ? 2.5 : 5.0;
    const chemicalNeeded = parseFloat(((vol / 1000) * dosageRate).toFixed(1));
    setCleanexNeeded(chemicalNeeded);

    // 25L cans needed (rounded up)
    const cans = Math.ceil(chemicalNeeded / 25);
    setCansNeeded(cans);
  }, [length, width, depth, dirtLevel]);

  const handleApplyCalculations = () => {
    const calcSummary = `Pond Volume: ${volumeLiters} Liters (${length}x${width}x${depth} ft). Required Cleanex: ${cleanexNeeded} Liters (~${cansNeeded} Cans). Dirtiness: ${dirtLevel === 'normal' ? 'Normal' : 'Heavy (2x Dose)'}.`;
    if (onCalculatorSubmit) {
      onCalculatorSubmit(calcSummary);
    }
    
    // Smooth scroll to lead form
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const specsList = [
    { label: 'Active Ingredients', value: 'Synergistic cleaning agents, bio-surfactants, corrosion inhibitors, conditioning agents' },
    { label: 'Removes', value: 'Green algae, Aspergillus fumigatus, pathogenic bacteria, calcium crusts, salt deposits' },
    { label: 'Packaging Size', value: '25 Liters High-Density Polyethylene (HDPE) Canister' },
    { label: 'Application Rate', value: '2.5 Liters per 1000 Liters of water (Normal) / 5 Liters per 1000 Liters (Heavy)' },
    { label: 'Manufacturer', value: 'ECO Chemicals, Pakistan' },
  ];

  return (
    <section id="product" className="py-20 bg-[#F0F7FF] dark:bg-darkBg transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Our Premium Product</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-textDark dark:text-darkText">
            Cleanex Product Specs & Pond Calculator
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Product Info & Specs Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 rounded-3xl glass-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-textDark dark:text-darkText">Cleanex Pad Cleaner</h3>
                  <p className="text-xs text-textDark/60 dark:text-darkText/50">Scientific formulation for poultry cool pads</p>
                </div>
              </div>

              <p className="text-textDark/80 dark:text-darkText/70 text-sm sm:text-base mb-8 leading-relaxed">
                Cleanex is a heavy-duty cooling pad washing chemical designed specifically for the extreme conditions of Pakistani poultry farming. It dissolves the toughest salt deposits, eliminates bacterial mats, and halts Aspergillus fumigatus outbreaks.
              </p>

              {/* Specifications List */}
              <div className="space-y-4">
                {specsList.map((spec, idx) => (
                  <div key={idx} className="border-b border-blue-50 dark:border-darkBorder/40 pb-3">
                    <span className="block text-xs font-bold text-primary dark:text-[#E2E8F0] tracking-wider uppercase mb-1">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-textDark/85 dark:text-darkText/75 leading-relaxed">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Note Warning */}
            <div className="mt-8 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-semibold">
                <strong>Important:</strong> Shake the canister well before using. When washing pads while birds are in the shed, read our step-by-step guideline below to ensure safety.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Pond Calculator */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 rounded-3xl glass-card p-6 sm:p-8 border-2 border-primary/20"
          >
            <div className="flex items-center gap-3.5 mb-6">
              <div className="p-3 bg-accent text-white rounded-2xl shadow-lg shadow-accent/20">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-textDark dark:text-darkText">Dosage Calculator</h3>
                <p className="text-xs text-textDark/60 dark:text-darkText/50">Calculate pond capacity & Cleanex requirements</p>
              </div>
            </div>

            <p className="text-xs text-textDark/75 dark:text-darkText/60 mb-6 font-semibold">
              Fill in your water pond dimensions in feet to automatically compute water capacity and estimated Cleanex dosage.
            </p>

            {/* Slider inputs for dimensions */}
            <div className="space-y-5">
              {/* Length Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-textDark dark:text-darkText">Pond Length (feet)</span>
                  <span className="text-primary">{length} ft</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="0.5"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-blue-100 dark:bg-darkBorder rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Width Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-textDark dark:text-darkText">Pond Width (feet)</span>
                  <span className="text-primary">{width} ft</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.5"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-blue-100 dark:bg-darkBorder rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Depth Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-textDark dark:text-darkText">Water Depth (feet)</span>
                  <span className="text-primary">{depth} ft</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={depth}
                  onChange={(e) => setDepth(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-blue-100 dark:bg-darkBorder rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Pad Dirtiness Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-textDark dark:text-darkText">
                  Pad Condition / Dirtiness
                </label>
                <select
                  value={dirtLevel}
                  onChange={(e) => setDirtLevel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-darkBorder bg-white dark:bg-darkCard text-sm text-textDark dark:text-darkText font-semibold focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="normal">Normal Scaling / Algae (2.5L Cleanex per 1000L)</option>
                  <option value="heavy">Heavy Algae / Salt Crusts (5.0L Cleanex - 2x Dose)</option>
                </select>
              </div>
            </div>

            {/* Calculations Dashboard View */}
            <div className="mt-8 p-5 bg-primary/5 dark:bg-darkBorder/40 rounded-2xl border border-primary/10 grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="block text-[9px] font-bold text-textDark/60 dark:text-darkText/50 uppercase tracking-wider mb-1">Pond Capacity</span>
                <span className="text-lg sm:text-xl font-extrabold text-primary">{volumeLiters} L</span>
              </div>
              <div className="border-x border-blue-100 dark:border-darkBorder/60">
                <span className="block text-[9px] font-bold text-textDark/60 dark:text-darkText/50 uppercase tracking-wider mb-1">Cleanex Liquid</span>
                <span className="text-lg sm:text-xl font-extrabold text-accent">{cleanexNeeded} L</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-textDark/60 dark:text-darkText/50 uppercase tracking-wider mb-1">HDPE Canisters</span>
                <span className="text-lg sm:text-xl font-extrabold text-primary">~{cansNeeded} Cans</span>
              </div>
            </div>

            {/* Apply & Quote Action */}
            <div className="mt-6">
              <button
                onClick={handleApplyCalculations}
                className="btn-accent w-full text-sm py-3.5"
              >
                <ClipboardList className="w-5 h-5" />
                Apply & Request Quote
              </button>
              <p className="text-center text-[10px] text-textDark/50 dark:text-darkText/40 mt-2 font-medium">
                Formula: {length}' × {width}' × {depth}' = {length*width*depth} ft³ × 28.3 = {volumeLiters} Liters
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Product;
