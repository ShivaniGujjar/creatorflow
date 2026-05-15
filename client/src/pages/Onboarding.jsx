import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Target, PencilLine } from 'lucide-react';

export default function Onboarding({ onGenerate }) {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!niche) return;
    setLoading(true);
    onGenerate(niche);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 relative font-sans overflow-x-hidden">
      {/* 1. HUD TEXTURES */}
      <div className="fixed inset-0 halftone-bg opacity-[0.015] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(#362F4F_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.02] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full text-center relative z-10 px-2 sm:px-0"
      >
        {/* 2. TOP TACTICAL BADGE */}
        {/* RESPONSIVE FIX: Mobile spacing tighten kari taaki screen folding na ho */}
        <div className="inline-flex items-center gap-3 bg-[#362F4F] text-[#E4FF30] px-5 py-2 border-[2px] border-[#362F4F] mb-6 sm:mb-10 italic rounded-full shadow-lg shadow-[#362F4F]/10">
          <PencilLine size={14} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Creative Direction Protocol</span>
        </div>

        {/* 3. HERO HEADING */}
        {/* RESPONSIVE FIX: Text scale down kiya text-4xl standard mobile displays ke liye */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-[1000] uppercase italic tracking-tighter text-[#362F4F] leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8">
          START YOUR <br />
          <span className="text-[#008BFF]">JOURNEY.</span>
        </h1>

        {/* Updated Copy: Focus on Writing & Topics */}
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[#362F4F]/30 mb-10 sm:mb-14 max-w-sm mx-auto leading-relaxed px-4 sm:px-0">
          Not sure where to start? <br /> We guide you with data-driven topics and structured scripts to kickstart your content.
        </p>

        {/* 4. ROUNDED SEARCH ENGINE */}
        {/* RESPONSIVE FIX: Mobile par layout flex-col kiya aur internal padding/text size normalize kiya code ko safe rakhte hue */}
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
          <div className="bg-white border-[3px] border-[#362F4F] flex flex-col sm:flex-row p-2 sm:p-2.5 gap-2 shadow-sm hover:shadow-xl transition-all rounded-3xl sm:rounded-[2.5rem] overflow-hidden">
            <div className="flex-1 flex items-center px-3 sm:px-5 gap-3 sm:gap-4">
              <Search size={20} className="text-[#362F4F]/20 flex-shrink-0" />
              <input 
                autoFocus
                className="w-full py-3 sm:py-4 text-base sm:text-xl font-black uppercase italic outline-none placeholder:text-[#362F4F]/20 text-[#362F4F] bg-transparent"
                placeholder="WHAT'S YOUR NICHE? (E.G. TECH)"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                disabled={loading}
              />
            </div>
            
            <button 
              disabled={loading}
              className="bg-[#E4FF30] text-[#362F4F] border-[2px] border-[#362F4F] px-8 sm:px-12 py-4 sm:py-5 font-[1000] uppercase italic tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#362F4F] hover:text-[#E4FF30] transition-all disabled:opacity-50 group rounded-xl sm:rounded-2xl active:scale-95 shadow-md shadow-[#E4FF30]/10 w-full sm:w-auto"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-[#362F4F] border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  <Sparkles size={18} className="group-hover:rotate-12 transition-transform" /> 
                  Initiate Guide
                </>
              )}
            </button>
          </div>
        </form>

        {/* 5. MINIMALIST FOOTER SPECS */}
        {/* RESPONSIVE FIX: Stack details into a cleaner wrapping grid or flex layout on small viewports */}
        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-16 border-t border-[#362F4F]/5 pt-8 sm:pt-10">
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full bg-[#008BFF]" />
            <span className="text-[9px] font-black uppercase text-[#362F4F]/40 tracking-widest italic">Script Architecture</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full bg-[#E4FF30]" />
            <span className="text-[9px] font-black uppercase text-[#362F4F]/40 tracking-widest italic">Topic Strategy</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}