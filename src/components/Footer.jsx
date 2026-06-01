import React from 'react';
import { Droplet } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] pt-16 pb-8 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white border border-blue-400/30">
                <Droplet className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="block text-xl font-black text-white tracking-tight glow-text">ECO <span className="text-blue-400">Chemicals</span></span>
                <span className="block text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase -mt-1">Poultry Solutions</span>
              </div>
            </a>
            <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-sm mb-6">
              Pakistan's leading chemical engineering firm for commercial poultry infrastructure. Specialized in high-performance descalers and sanitizers.
            </p>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-slate-800 rounded-md text-[10px] font-bold text-slate-300 uppercase tracking-widest border border-slate-700">ISO 9001</span>
              <span className="px-3 py-1 bg-slate-800 rounded-md text-[10px] font-bold text-slate-300 uppercase tracking-widest border border-slate-700">Industrial Grade</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#product" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Product Specs</a></li>
              <li><a href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Deployment Protocol</a></li>
              <li><a href="#why-us" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Technical Edge</a></li>
              <li><a href="#contact" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Get Quote</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Contact HQ</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li>Sargodha, Pakistan</li>
              <li>+92 322 6057885</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-500 tracking-wider">
            © {new Date().getFullYear()} ECO CHEMICALS. ALL RIGHTS RESERVED. <span className="text-white ml-2">MADE BY AVANDUM</span>
          </p>
          <div className="flex gap-6 text-xs font-bold text-slate-500 tracking-wider uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
