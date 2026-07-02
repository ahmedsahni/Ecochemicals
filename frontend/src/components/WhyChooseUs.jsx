import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ShieldAlert, 
  Heart, 
  TrendingDown, 
  Users, 
  Leaf 
} from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Powerful Washing Agent',
      desc: 'Formulated with strong surfactant agents that quickly lift mud and scale particles out of tight cellulose pores.',
      icon: Zap,
      color: 'text-primary bg-primary/10 group-hover:bg-primary group-hover:text-white',
    },
    {
      title: 'Eradicates Fungi Spores',
      desc: 'Eliminates deadly Aspergillus fumigatus spores, guarding your flock against respiratory diseases like brooder pneumonia.',
      icon: ShieldAlert,
      color: 'text-accent bg-accent/10 group-hover:bg-accent group-hover:text-white',
    },
    {
      title: 'Safe Cellulose Chemistry',
      desc: 'Harmless to the organic paper bindings. Dissolves hard salts and scale without melting or degrading cooling pads.',
      icon: Heart,
      color: 'text-cyan-500 bg-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-white',
    },
    {
      title: 'Cost-Effective 25L Packing',
      desc: 'Economical bulk packaging custom-tailored for commercial farms. Treats up to 10,000 liters of water at low cost.',
      icon: TrendingDown,
      color: 'text-emerald-500 bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white',
    },
    {
      title: 'Trusted by Pakistani Farmers',
      desc: 'The chemical choice of major poultry integrations and private farmers across Punjab, Sindh, and KPK regions.',
      icon: Users,
      color: 'text-blue-500 bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white',
    },
    {
      title: 'Eco-Friendly Formula',
      desc: 'Biodegradable surfactants break down naturally, leaving zero toxic residues behind in your farm soil drainage.',
      icon: Leaf,
      color: 'text-teal-600 bg-teal-600/10 group-hover:bg-teal-600 group-hover:text-white',
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-[#F8FAFC] dark:bg-darkBg transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-primary tracking-widest uppercase mb-3"
          >
            Our Competitive Edge
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-textDark dark:text-darkText"
          >
            Why Leading Farms Choose ECO Chemicals
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full origin-left"
          ></motion.div>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="p-8 rounded-[2rem] bg-white dark:bg-darkCard border border-slate-100 dark:border-darkBorder/60 hover:border-primary/30 dark:hover:border-primary/30 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden"
              >
                {/* Subtle hover background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className={`p-4 rounded-2xl ${feat.color} inline-block mb-6 transition-all duration-300 group-hover:scale-110 shadow-sm relative z-10`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-textDark dark:text-darkText mb-3 relative z-10">
                  {feat.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium relative z-10">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
