import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  ChevronRight, 
  Activity, 
  Clock, 
  FlaskConical, 
  Layers, 
  Zap, 
  Waves, 
  AlertTriangle 
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Prepare the Basin',
      desc: 'Thoroughly clean the water pond, basin, and surrounding tiles. Remove physical dirt, mud, and sediment first.',
      icon: Trash2,
    },
    {
      num: '02',
      title: 'Fill Water & Measure',
      desc: 'Fill the pond with water. Calculate total capacity in liters using the dimension formula: L × W × D × 28.3.',
      icon: Waves,
    },
    {
      num: '03',
      title: 'Pipeline Drip Check',
      desc: 'Run plain water through the system. Inspect pads for dry spots (indicating pipe blockages). If blocked, clear nozzles first.',
      icon: Activity,
    },
    {
      num: '04',
      title: 'Pre-Wet Cooling Pads',
      desc: 'Circulate plain water for 2 hours. Ensuring pads are completely saturated allows the chemical to penetrate deep scale.',
      icon: Clock,
    },
    {
      num: '05',
      title: 'Add Cleanex Chemical',
      desc: 'Pour the calculated Cleanex Pad Cleaner chemical directly into the water pond. Avoid placing it directly on pads.',
      icon: FlaskConical,
    },
    {
      num: '06',
      title: 'Apply Standard Dosage',
      desc: 'Maintain a ratio of 2.5 Liters of Cleanex for every 1000 Liters of water inside your pond basin.',
      icon: Layers,
    },
    {
      num: '07',
      title: 'Adjust for Heavy Algae',
      desc: 'If pads are severely clogged or have thick green algae, increase the chemical dose up to 5 Liters per 1000 Liters (2x dose).',
      icon: Zap,
    },
    {
      num: '08',
      title: 'Circulate & Pressure Wash',
      desc: 'Circulate chemical water continuously for 3-4 hours. Finally, drain the chemical water and pressure wash pads with clean water.',
      icon: Waves,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-darkCard transition-colors duration-300 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-2">Step-by-Step Guide</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-textDark dark:text-darkText">
            How to Use Cleanex Pad Cleaner
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-blue-100 dark:border-darkBorder/60 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 max-w-4xl">
          
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isLeft = idx % 2 === 0;

            return (
              <div key={idx} className="relative mb-12 last:mb-0">
                {/* Node circle */}
                <div className="absolute -left-[13px] md:left-1/2 md:-translate-x-1/2 top-0 w-6 h-6 rounded-full bg-white dark:bg-darkCard border-4 border-primary z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                </div>

                {/* Timeline Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                  className={`ml-8 md:ml-0 md:w-[45%] ${isLeft ? 'md:text-right md:mr-auto' : 'md:text-left md:ml-auto'}`}
                >
                  <div className="p-6 rounded-2xl glass-card relative border border-blue-50 dark:border-darkBorder/40 hover:border-primary/30 transition-all duration-300">
                    {/* Icon container */}
                    <div className={`inline-flex p-2.5 rounded-xl bg-primary/10 dark:bg-darkBorder text-primary dark:text-[#E2E8F0] mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <span className="block text-2xl font-black text-primary/30 dark:text-[#E2E8F0]/20 -mt-2">
                      {step.num}
                    </span>
                    
                    <h3 className="text-lg font-bold text-textDark dark:text-darkText mb-1.5">
                      {step.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-textDark/75 dark:text-darkText/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Safety Callout Cards */}
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bird Safety Protocol */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 flex gap-4"
          >
            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2">
                In Birds' Presence (Safety Protocol)
              </h4>
              <p className="text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed font-semibold">
                To prevent humidity shock or chemical fumes, always wash one side of the cooling pad completely before washing the other. Ensure chemical water is collected from all 3 sides of the pads properly during circulation.
              </p>
            </div>
          </motion.div>

          {/* General Directions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 flex gap-4"
          >
            <AlertTriangle className="w-8 h-8 text-primary dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-primary dark:text-blue-300 uppercase tracking-wider mb-2">
                Critical Instruction
              </h4>
              <p className="text-xs text-blue-900/80 dark:text-blue-300/80 leading-relaxed font-semibold">
                Shake the canister vigorously before introducing the liquid into the pond. Store in a cool, dry area away from direct sunlight. Wear gloves and eye protection when handling the chemical.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
