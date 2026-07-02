import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Droplet, Leaf, Play } from 'lucide-react';

const trackEvent = (eventType, source) => {
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventType, source }),
  }).catch(() => {});
};

const Hero = () => {
  // Trust Badges data
  const trustBadges = [
    { text: 'Removes Algae', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10' },
    { text: 'Kills Bacteria', icon: Flame, color: 'text-accent bg-accent/10' },
    { text: 'Removes Salt & Calcium', icon: Droplet, color: 'text-primary bg-primary/10' },
    { text: 'Eco Friendly', icon: Leaf, color: 'text-emerald-500 bg-emerald-500/10' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden py-12 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-darkBg dark:via-[#0c121e] dark:to-darkBg transition-colors duration-300">
      
      {/* Background Animated Particles */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/clean_poultry_farm.png')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.05] mix-blend-luminosity"></div>
        <div className="hero-particle w-72 h-72 top-20 left-12 animate-float filter blur-3xl opacity-20"></div>
        <div className="hero-particle w-96 h-96 bottom-10 right-10 animate-float filter blur-3xl opacity-20" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            {/* Tagline Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-primary dark:text-[#E2E8F0] bg-white dark:bg-darkBorder border border-primary/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Pakistan's #1 Poultry Pad Cleaning Solution
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-textDark dark:text-darkText leading-[1.1]">
              Revolutionize Your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Poultry Farm</span> Hygiene
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Pakistan's most powerful cooling pad cleaning chemical. Specifically formulated to dissolve stubborn algae, kill pathogenic bacteria, and melt away scale. Trusted by thousands of top-tier poultry farms nationwide.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#contact-form" onClick={() => trackEvent('contact_click', 'hero_cta')} className="btn-primary w-full sm:w-auto text-base py-4 px-8 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1">
                Get Free Quote
              </a>
              <a href="#how-it-works" className="group w-full sm:w-auto text-base py-4 px-8 flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 bg-white dark:bg-darkCard text-textDark dark:text-darkText border border-slate-200 dark:border-darkBorder hover:border-primary dark:hover:border-primary shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-darkBorder flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                See It In Action
              </a>
            </motion.div>

            {/* Trust Badges Grid */}
            <motion.div variants={itemVariants} className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
              {trustBadges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className="group flex flex-col items-center lg:items-start p-4 rounded-2xl bg-white dark:bg-darkCard shadow-sm hover:shadow-md border border-slate-100 dark:border-darkBorder transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`p-2.5 rounded-xl ${badge.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 text-center lg:text-left">
                    {badge.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Physical Product Images */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center items-center relative mt-12 lg:mt-0"
          >
            {/* Ambient Glow */}
            <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full filter blur-[100px] opacity-60 dark:opacity-40 animate-pulse-subtle"></div>
            
            {/* Animated floating 25L badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-0 sm:top-4 left-0 sm:left-4 bg-gradient-to-r from-accent to-red-500 text-white font-extrabold px-5 py-3 rounded-2xl shadow-xl shadow-accent/20 rotate-[-8deg] z-30 animate-float"
            >
              <span className="block text-[10px] uppercase tracking-widest font-bold opacity-90 mb-0.5">Industrial Size</span>
              <span className="text-xl sm:text-2xl leading-none">25 Liters</span>
            </motion.div>

            {/* Product Composition: Can + Sticker */}
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] h-[400px] sm:h-[450px] animate-float" style={{ animationDuration: '6s' }}>
              
              {/* The White Can */}
              <img 
                src="/images/can.png" 
                alt="Cleanex 25L Canister" 
                className="absolute top-0 right-0 w-[70%] sm:w-[75%] h-[70%] sm:h-[75%] object-contain drop-shadow-2xl z-10 filter brightness-110"
                onError={(e) => { e.target.src = "https://via.placeholder.com/300x400/ffffff/cccccc?text=can.png"; }}
              />
              
              {/* The Front Sticker */}
              <img 
                src="/images/sticker_front.jpg" 
                alt="Cleanex Front Label" 
                className="absolute bottom-4 left-0 w-[65%] sm:w-[70%] h-auto object-contain drop-shadow-2xl shadow-black/50 z-20 rounded-[1.5rem] rotate-[-5deg] border-4 border-white dark:border-slate-800 transition-transform duration-500 hover:rotate-0 hover:scale-105"
                onError={(e) => { e.target.src = "https://via.placeholder.com/300x300/1D4ED8/ffffff?text=sticker_front.jpg"; }}
              />

            </div>
            
            {/* Trust badge stamp */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 150 }}
              className="absolute -bottom-4 sm:-bottom-8 right-4 sm:right-8 bg-white/90 backdrop-blur-md dark:bg-darkCard/90 text-primary dark:text-blue-400 font-bold p-4 rounded-full shadow-2xl border border-white dark:border-darkBorder/40 flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rotate-[15deg] z-30"
            >
              <ShieldCheck className="w-8 h-8 mb-1" />
              <span className="text-[10px] sm:text-xs text-center uppercase tracking-widest leading-tight font-black">100%<br/>Proven</span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[80px] fill-white dark:fill-[#090D16] transition-colors duration-300">
          <path d="M0,0 C150,90 350,120 600,90 C850,60 1050,90 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

    </section>
  );
};

export default Hero;

