import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, MapPin, Building2, Clock, Globe } from 'lucide-react';

const trackEvent = (eventType, source) => {
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventType, source }),
  }).catch(() => {}); // fire-and-forget
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#F0F7FF] dark:bg-darkBg transition-colors duration-300 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Direct Contact</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-textDark dark:text-darkText">
            Connect With Our Experts Immediately
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Company Details Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-8 rounded-3xl glass-card border border-blue-50 dark:border-darkBorder/40 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-textDark/60 dark:text-darkText/50 uppercase tracking-widest">Head Office</h3>
                  <p className="text-lg font-extrabold text-textDark dark:text-darkText">ECO Chemicals</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-textDark/60 dark:text-darkText/50 uppercase tracking-widest">Service Region</h3>
                  <p className="text-sm font-semibold text-textDark/85 dark:text-darkText/75">
                    Lahore, Faisalabad, Sargodha & nationwide delivery across Pakistan.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-textDark/60 dark:text-darkText/50 uppercase tracking-widest">Business Hours</h3>
                  <p className="text-sm font-semibold text-textDark/85 dark:text-darkText/75">
                    Mon - Sat: 09:00 AM - 06:00 PM (PKT)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-blue-50 dark:border-darkBorder/40 pt-6">
              <span className="text-xs font-bold text-accent uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <Globe className="w-4 h-4" /> Nationwide Logistics
              </span>
              <p className="text-xs text-textDark/70 dark:text-darkText/60 leading-relaxed font-semibold">
                We deliver Cleanex canisters directly to your poultry farm gate via reliable logistics networks. Cash on delivery options available for approved farm networks.
              </p>
            </div>

          </motion.div>

          {/* Quick Call & WhatsApp Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Phone Card 1 */}
            <div className="p-6 rounded-3xl glass-card border border-blue-50 dark:border-darkBorder/40 flex flex-col justify-between">
              <div>
                <span className="inline-block p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                  <Phone className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-textDark dark:text-darkText">Primary Helpline</h3>
                <p className="text-xs text-textDark/60 dark:text-darkText/50 mt-1">Direct call for sales, packaging, & transport queries.</p>
              </div>
              <div className="mt-8">
                <a 
                  href="tel:+923226057885" 
                  onClick={() => trackEvent('call_click', 'contact_primary')}
                  className="block w-full py-3 text-center rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all text-sm shadow-md shadow-primary/10"
                >
                  +92 322 6057885
                </a>
              </div>
            </div>

            {/* Phone Card 2 */}
            <div className="p-6 rounded-3xl glass-card border border-blue-50 dark:border-darkBorder/40 flex flex-col justify-between">
              <div>
                <span className="inline-block p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                  <Phone className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-textDark dark:text-darkText">Secondary Helpline</h3>
                <p className="text-xs text-textDark/60 dark:text-darkText/50 mt-1">Alternative support for technical advice & site inspections.</p>
              </div>
              <div className="mt-8">
                <a 
                  href="tel:+923214858418" 
                  onClick={() => trackEvent('call_click', 'contact_secondary')}
                  className="block w-full py-3 text-center rounded-xl border-2 border-primary/20 dark:border-darkBorder hover:border-primary text-primary dark:text-darkText font-bold transition-all text-sm"
                >
                  +92 321 4858418
                </a>
              </div>
            </div>

            {/* WhatsApp Big Button Card */}
            <div className="sm:col-span-2 p-6 rounded-3xl glass-card border-2 border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <MessageSquare className="w-8 h-8 fill-current" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-textDark dark:text-darkText">Need Instantly Fast Support?</h3>
                  <p className="text-xs text-textDark/70 dark:text-darkText/60 font-semibold mt-1">Get custom rates, pictures, and delivery timeline directly on WhatsApp.</p>
                </div>
              </div>
              <a 
                href="https://wa.me/923226057885" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => trackEvent('whatsapp_click', 'contact_section')}
                className="btn-accent bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/15 hover:shadow-emerald-500/30 w-full sm:w-auto text-center"
              >
                💬 Chat on WhatsApp
              </a>
            </div>

          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default Contact;
