"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import Stats from '@/components/Stats';
import ProblemSolution from '@/components/ProblemSolution';
import WinterAdvisory from '@/components/WinterAdvisory';
import Product from '@/components/Product';
import BrochureShowcase from '@/components/BrochureShowcase';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import LeadForm from '@/components/LeadForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [prefilledMsg, setPrefilledMsg] = useState('');
  const { dir } = useLanguage();

  useEffect(() => {
    const handleHashChange = () => setIsAdminView(window.location.hash === '#admin');
    setIsAdminView(window.location.hash === '#admin');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminView) {
    return (
      <Dashboard onClose={() => {
        window.location.hash = '';
        setIsAdminView(false);
      }} />
    );
  }

  return (
    <div dir={dir} className="min-h-screen bg-[#0B0F19] text-slate-50 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="relative">
        <Hero />
        <Partners />
        <Stats />
        <ProblemSolution />
        <WinterAdvisory />
        <Product onCalculatorSubmit={setPrefilledMsg} />
        <BrochureShowcase />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <LeadForm prefilledMessage={prefilledMsg} />
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
        <div className="glass-panel text-white text-xs font-bold px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap border-emerald-500/30">
          Chat on WhatsApp
        </div>
        <a
          href="https://wa.me/923214858418?text=Hi%20ECO%20Chemicals,%20I%20have%20an%20inquiry%20regarding%20Cleanex%20Pad%20Cleaner."
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-110 active:scale-95 border-2 border-emerald-400/50"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
        </a>
      </div>
    </div>
  );
}
