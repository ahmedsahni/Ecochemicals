"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Droplet } from 'lucide-react';

import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0F19]/80 backdrop-blur-xl border-b border-blue-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent pt-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group relative">
            <div className="absolute inset-0 bg-blue-600 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white border border-blue-400/30">
              <Droplet className="w-6 h-6 fill-current drop-shadow-md" />
            </div>
            <div className="relative">
              <span className="block text-xl font-black text-white tracking-tight glow-text">ECO <span className="text-blue-400">Chemicals</span></span>
              <span className="block text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase -mt-1">Poultry Solutions</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-[#1F2937]/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/5">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a 
              href="#contact" 
              className="relative group overflow-hidden rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-transform duration-300 group-hover:scale-105" />
              <div className="relative px-6 py-2.5 text-sm font-bold text-white flex items-center gap-2">
                Get Quote
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            </motion.a>
          </div>

          {/* Mobile Menu Btn */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-white/10 transition-colors relative z-50">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t-0 pb-6 pt-4 px-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-base font-bold text-slate-200 hover:bg-blue-600/20 hover:text-blue-400 transition-colors">
                {link.name}
              </a>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <a href="#contact" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl bg-blue-600 text-white font-bold text-center border border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Get Free Quote
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
