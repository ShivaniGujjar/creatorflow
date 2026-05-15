import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Plus, Minus, Type, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Teleprompter({ day, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2); 
  /* RESPONSIVE FIX: Mobile view ports par default font size tight rakha taaki wrap na tute */
  const [fontSize, setFontSize] = useState(window.innerWidth < 640 ? 28 : 54); 
  const scrollRef = useRef(null);
  const requestRef = useRef();

  const neon = "#E4FF30";
  const navy = "#362F4F";
  const blue = "#008BFF";
  const red = "#E63946";

  const scroll = () => {
    if (scrollRef.current && isPlaying) {
      scrollRef.current.scrollTop += speed / 1.5;
    }
    requestRef.current = requestAnimationFrame(scroll);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, speed]);

  const handleReset = () => {
    setIsPlaying(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-[10000] flex flex-col text-white overflow-hidden font-sans">
      
      {/* 1. TACTICAL FLOATING HEADER */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 z-50 gap-4 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:gap-10 sm:items-center gap-3">
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase text-[#E63946] tracking-[0.4em] flex items-center gap-2 italic">
               <div className="h-1.5 w-1.5 bg-[#E63946] rounded-full animate-pulse shadow-[0_0_8px_#E63946]" />
               ACTIVE
            </div>
            <h3 className="text-lg sm:text-xl font-[1000] uppercase italic tracking-tighter text-white/90 leading-none truncate max-w-xs sm:max-w-none">
              D{day.dayNumber}: <span style={{ color: neon }}>{day.title}</span>
            </h3>
          </div>

          {/* Controls - Refined Modules */}
          <div className="flex items-center justify-between sm:justify-start gap-2 bg-white/5 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-white/10 w-full sm:w-auto">
            <div className="flex flex-1 sm:flex-none items-center justify-between sm:justify-start gap-2 sm:gap-4 px-3 sm:px-4 border-r border-white/5">
              <span className="text-[8px] font-black uppercase text-white/20 tracking-widest italic whitespace-nowrap">Velocity</span>
              <div className="flex items-center gap-1 sm:gap-2">
                <button type="button" onClick={() => setSpeed(s => Math.max(1, s - 1))} className="p-1.5 hover:text-[#E4FF30] transition-colors"><Minus size={12}/></button>
                <span className="w-4 text-center font-black text-xs sm:text-sm" style={{ color: neon }}>{speed}</span>
                <button type="button" onClick={() => setSpeed(s => Math.min(10, s + 1))} className="p-1.5 hover:text-[#E4FF30] transition-colors"><Plus size={12}/></button>
              </div>
            </div>
            <div className="flex flex-1 sm:flex-none items-center justify-between sm:justify-start gap-2 sm:gap-4 px-3 sm:px-4">
              <span className="text-[8px] font-black uppercase text-white/20 tracking-widest italic whitespace-nowrap">Text Size</span>
              <div className="flex items-center gap-1 sm:gap-2">
                <button type="button" onClick={() => setFontSize(s => Math.max(16, s - 2))} className="p-1.5 hover:text-[#E4FF30] transition-colors"><Type size={12}/></button>
                <span className="w-6 sm:w-10 text-center font-black text-xs sm:text-sm" style={{ color: neon }}>{fontSize}</span>
                <button type="button" onClick={() => setFontSize(s => Math.min(100, s + 2))} className="p-1.5 hover:text-[#E4FF30] transition-colors"><Type size={14}/></button>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons layout fixed */}
        <div className="flex gap-3 justify-end flex-shrink-0">
          <button type="button" onClick={handleReset} className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all">
            <RotateCcw size={16} className="sm:w-[20px] sm:h-[20px]" strokeWidth={2.5} />
          </button>
          <button type="button" onClick={onClose} className="bg-[#E63946] text-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl hover:scale-105 active:scale-95 transition-all border border-[#E63946] shadow-lg shadow-[#E63946]/20">
            <X size={16} className="sm:w-[20px] sm:h-[20px]" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* 2. EYE-LINE READ ZONE - FIXED: Removed backdrop-blur to eradicate the foggy filter */}
      <div className="fixed top-1/2 left-0 right-0 h-[100px] sm:h-[140px] -translate-y-1/2 pointer-events-none z-20">
        {/* FIXED: Subtle sharp container boundaries to ensure 100% text readability */}
        <div className="absolute inset-0 bg-white/[0.01] border-y border-white/10" />
        
        {/* Eye-line Markers */}
        <div className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-40">
           <div className="w-1 h-1 bg-[#E4FF30] rounded-full shadow-[0_0_6px_#E4FF30]" />
           <div className="w-[1px] h-6 sm:h-10 bg-gradient-to-b from-transparent via-[#E4FF30] to-transparent" />
           <div className="w-1 h-1 bg-[#E4FF30] rounded-full shadow-[0_0_6px_#E4FF30]" />
        </div>
        
        <div className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 flex items-center gap-3">
           <span className="text-[7px] sm:text-[8px] font-black uppercase text-[#E4FF30] tracking-[0.4em] sm:tracking-[0.6em] opacity-40 italic">Focus Anchor</span>
        </div>
      </div>

      {/* 3. READING ENGINE */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-hide px-4 sm:px-[15%] md:px-[20%] text-center selection:bg-[#E4FF30] selection:text-black z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          style={{ fontSize: `${fontSize}px` }} 
          className="font-black leading-[1.4] uppercase tracking-tight py-[45vh] transition-all"
        >
          {/* HOOK MODULE */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#008BFF] text-white px-6 sm:px-12 py-5 sm:py-8 mb-40 sm:mb-60 rounded-2xl sm:rounded-[2.5rem] border-[3px] sm:border-[4px] border-white/10 shadow-2xl relative max-w-full"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-[#008BFF] px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-black tracking-widest italic shadow-lg whitespace-nowrap">
                HOOK START
            </div>
            <div className="text-[8px] sm:text-[10px] not-italic font-black mb-2 sm:mb-3 opacity-60 tracking-[0.3em] sm:tracking-[0.4em] flex items-center justify-center gap-2">
                <Zap size={10} fill="currentColor" /> SYSTEM PRIORITY
            </div>
            {day.hook}
          </motion.div>

          {/* SCRIPT BODY */}
          <div className="mb-[50vh] opacity-90 text-white/95 break-words">
            {day.script}
          </div>

          <div className="text-[#E63946] text-2xl sm:text-4xl font-black italic tracking-[0.4em] sm:tracking-[0.8em] opacity-20 pb-40">
            FINISH LINE
          </div>
        </div>
      </div>

      {/* 4. MASTER CONTROLLER */}
      <div className="fixed bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 max-w-full">
        <button 
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-3 sm:gap-5 px-8 sm:px-12 py-3.5 sm:py-6 rounded-full border border-white/10 transition-all transform active:scale-90 shadow-2xl ${
            isPlaying 
            ? 'bg-white text-[#0A0A0A]' 
            : 'bg-[#E4FF30] text-[#362F4F] shadow-[#E4FF30]/30'
          }`}
        >
          <div className="relative">
            {isPlaying ? <Pause size={20} className="sm:w-[32px] sm:h-[32px]" fill="currentColor" /> : <Play size={20} className="sm:w-[32px] sm:h-[32px] ml-0.5" fill="currentColor" />}
          </div>
          <span className="font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs italic whitespace-nowrap">
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </span>
        </button>
      </div>

      {/* Background HUD Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] grid-bg" 
           style={{ backgroundImage: `radial-gradient(white 1px, transparent 0px)`, backgroundSize: '40px 40px' }} />
    </div>
  );
}