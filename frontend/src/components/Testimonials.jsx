import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ name, role, farm, city, quote, rating, initials, gradient }) => {
  return (
    <div className="p-8 rounded-[2rem] bg-white dark:bg-darkCard relative border border-slate-100 dark:border-darkBorder/60 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group">
      
      {/* Quote Icon */}
      <div className="absolute top-6 right-8 text-primary/10 dark:text-[#E2E8F0]/5 group-hover:text-primary/20 transition-colors duration-300 pointer-events-none">
        <Quote className="w-12 h-12 fill-current" />
      </div>

      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex gap-1 mb-6">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote Content */}
        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-8 font-medium">
          "{quote}"
        </p>
      </div>

      {/* Customer Info */}
      <div className="flex items-center gap-4 border-t border-slate-100 dark:border-darkBorder/60 pt-5 relative z-10">
        {/* Initials Avatar */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-black shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}>
          {initials}
        </div>
        <div>
          <h4 className="text-sm font-bold text-textDark dark:text-darkText leading-none">
            {name}
          </h4>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">
            {role}, {farm}
          </span>
          <span className="text-[10px] text-accent font-black block">
            {city}, Pakistan
          </span>
        </div>
      </div>

    </div>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: 'Haji Muhammad Asif',
      role: 'Owner',
      farm: 'Asif Broiler Farms',
      city: 'Sargodha',
      quote: 'We had thick white calcium scaling that wouldn\'t budge with regular water washing. Cleanex dissolved the entire crust in just 3 hours of running. The air flow is now perfect, and shed temperature is down by 4 degrees.',
      rating: 5,
      initials: 'MA',
      gradient: 'from-blue-600 to-primary',
    },
    {
      name: 'Chaudhary Nabeel',
      role: 'Managing Director',
      farm: 'Al-Rehman Broilers',
      city: 'Kamalia',
      quote: 'We suffered a severe Aspergillus (fungus) outbreak last year causing high chick mortality. Since we started washing our pads with Cleanex before stocking new chicks, we have had 0% fungal infections. This chemical is a lifesaver.',
      rating: 5,
      initials: 'CN',
      gradient: 'from-accent to-emerald-400',
    },
    {
      name: 'Mian Tariq Javed',
      role: 'Senior Supervisor',
      farm: 'Javed Poultry Integrations',
      city: 'Faisalabad',
      quote: 'The 25 Liter pack is highly concentrated and extremely cost-effective for commercial operations. Customer service from ECO Chemicals was excellent — they calculated the dosage and guided our staff on site.',
      rating: 5,
      initials: 'TJ',
      gradient: 'from-primary to-cyan-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-darkCard transition-colors duration-300 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-accent tracking-widest uppercase mb-3"
          >
            Farmer Testimonials
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-textDark dark:text-darkText"
          >
            Trusted by Commercial Poultry Owners
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full origin-left"
          ></motion.div>
        </div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((rev, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <TestimonialCard
                name={rev.name}
                role={rev.role}
                farm={rev.farm}
                city={rev.city}
                quote={rev.quote}
                rating={rev.rating}
                initials={rev.initials}
                gradient={rev.gradient}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
