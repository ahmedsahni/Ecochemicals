import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import Navbar from './components/Navbar';

import Hero from './components/Hero';
import Partners from './components/Partners';
import Stats from './components/Stats';
import ProblemSolution from './components/ProblemSolution';
import Product from './components/Product';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import LeadForm from './components/LeadForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

const trackEvent = (eventType, source) => {
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventType, source }),
  }).catch(() => {});
};

function App() {
  // Dark mode state - checks localStorage first, default to light
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // State to switch to Admin Dashboard
  const [isAdminView, setIsAdminView] = useState(window.location.hash === '#admin');

  // Prefilled message state for form integration
  const [prefilledMsg, setPrefilledMsg] = useState('');

  // Track hash changes for admin routing
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Toggle theme class on HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCalculatorData = (msg) => {
    setPrefilledMsg(msg);
  };

  // If in admin view, render dashboard component
  if (isAdminView) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <Dashboard onClose={() => {
          window.location.hash = '';
          setIsAdminView(false);
        }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-textDark bg-bgLight dark:text-darkText dark:bg-darkBg transition-colors duration-300">
      
      {/* Sticky Navigation */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Single Page Sections */}
      <main>
        
        {/* Hero Section */}
        <Hero />

        {/* Trusted Partners Marquee */}
        <Partners />

        {/* Dynamic Stats Bar */}
        <Stats />

        {/* Problem vs Solution Split */}
        <ProblemSolution />

        {/* Product Spec Table + Dosage Calculator */}
        <Product onCalculatorSubmit={handleCalculatorData} />

        {/* Step-by-Step Clean Timeline */}
        <HowItWorks />

        {/* Why Choose Us Feature Cards */}
        <WhyChooseUs />

        {/* Farmer Testimonials */}
        <Testimonials />

        {/* Lead Gen Form (Quote Inquiry) */}
        <LeadForm prefilledMessage={prefilledMsg} />

        {/* Contact details */}
        <Contact />

      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
        
        {/* Tooltip speech bubble */}
        <div className="bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-lg border border-emerald-400 pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Chat on WhatsApp
        </div>

        {/* Glowing floating button */}
        <a
          href="https://wa.me/923226057885?text=Hi%20ECO%20Chemicals,%20I%20have%20an%20inquiry%20regarding%20Cleanex%20Pad%20Cleaner."
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('whatsapp_click', 'floating_button')}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-300 hover:scale-115 active:scale-95 animate-pulse-subtle border border-emerald-400"
          aria-label="Direct WhatsApp helpline"
        >
          <MessageSquare className="w-7 h-7 fill-current" />
        </a>
      </div>

    </div>
  );
}

export default App;
