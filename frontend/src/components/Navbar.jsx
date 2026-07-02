import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Droplet } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about-problem' },
    { name: 'Product', href: '#product' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
                <Droplet className="w-6 h-6 fill-current text-white animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary dark:text-[#E2E8F0] tracking-tight">
                  ECO <span className="text-accent">Chemicals</span>
                </span>
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 -mt-1 tracking-wider uppercase">
                  Poultry Solutions
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-textDark/80 dark:text-darkText/80 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-blue-50/80 dark:bg-darkCard hover:bg-blue-100 dark:hover:bg-darkBorder transition-colors duration-200 text-primary dark:text-amber-400"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin Console */}
            <a href="#admin" className="text-xs font-bold text-primary dark:text-darkText hover:text-accent dark:hover:text-accent transition-colors">
              Admin Portal
            </a>

            {/* CTA Button */}
            <a href="#contact-form" className="btn-primary text-sm py-2 px-5">
              Get a Quote
            </a>
          </div>

          {/* Mobile hamburger & theme toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-blue-50/80 dark:bg-darkCard text-primary dark:text-amber-400"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-textDark dark:text-darkText hover:bg-blue-50 dark:hover:bg-darkCard transition-colors duration-200"
              aria-label="Open Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden glass-nav border-t border-gray-100 dark:border-darkBorder/40 animate-fadeIn">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-textDark/80 dark:text-darkText/80 hover:bg-primary/10 dark:hover:bg-darkCard hover:text-primary"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 px-4 space-y-3">
              <a
                href="#admin"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm font-bold text-primary py-2 hover:text-accent"
              >
                Admin Portal
              </a>
              <a
                href="#contact-form"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-center py-3"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
