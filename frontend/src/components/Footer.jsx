import React from 'react';
import { Droplet, Phone, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#050B14] border-t border-blue-50 dark:border-darkBorder/40 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10">
          
          {/* Column 1: Branding */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Droplet className="w-5 h-5 fill-current" />
              </div>
              <span className="text-lg font-bold text-primary dark:text-[#E2E8F0] tracking-tight">
                ECO <span className="text-accent">Chemicals</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-textDark/70 dark:text-darkText/60 max-w-sm leading-relaxed font-semibold">
              Pakistan's premium poultry farm hygiene provider. Helping commercial poultry farmers optimize air filtration, reduce pathogenic bird mortality, and increase profits since 2016.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-textDark dark:text-darkText uppercase tracking-widest border-l-2 border-accent pl-2">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <a href="#home" className="text-xs text-textDark/70 dark:text-darkText/60 hover:text-primary dark:hover:text-primary transition-colors font-semibold">Home</a>
              <a href="#about-problem" className="text-xs text-textDark/70 dark:text-darkText/60 hover:text-primary dark:hover:text-primary transition-colors font-semibold">About Problems</a>
              <a href="#product" className="text-xs text-textDark/70 dark:text-darkText/60 hover:text-primary dark:hover:text-primary transition-colors font-semibold">Cleanex Specs</a>
              <a href="#how-it-works" className="text-xs text-textDark/70 dark:text-darkText/60 hover:text-primary dark:hover:text-primary transition-colors font-semibold">How It Works</a>
              <a href="#testimonials" className="text-xs text-textDark/70 dark:text-darkText/60 hover:text-primary dark:hover:text-primary transition-colors font-semibold">Testimonials</a>
              <a href="#contact" className="text-xs text-textDark/70 dark:text-darkText/60 hover:text-primary dark:hover:text-primary transition-colors font-semibold">Contact</a>
            </div>
          </div>

          {/* Column 3: Contact & Support */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-textDark dark:text-darkText uppercase tracking-widest border-l-2 border-primary pl-2">
              Contact Helplines
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-textDark/75 dark:text-darkText/70">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <a href="tel:+923226057885" className="hover:text-primary transition-colors">+92 322 6057885</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <a href="tel:+923214858418" className="hover:text-primary transition-colors">+92 321 4858418</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>info@ecochemicals.com.pk (Placeholder)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & scroll-up */}
        <div className="border-t border-blue-50 dark:border-darkBorder/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[11px] font-bold text-textDark/50 dark:text-darkText/40">
            © 2026 ECO Chemicals. All rights reserved. Made for Pakistani poultry farming sectors.
          </p>
          <a 
            href="#home" 
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-blue-50 dark:bg-darkCard text-primary dark:text-[#E2E8F0] hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-white transition-all shadow-md"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
