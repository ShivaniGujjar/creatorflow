import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Plus, Minus, Type, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Teleprompter({ day, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2); 
  const [fontSize, setFontSize] = useState(54); 
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
      <div className="p-6 flex justify-between items-center bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="flex gap-10 items-center">
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase text-[#E63946] tracking-[0.4em] flex items-center gap-2 italic">
               <div className="h-1.5 w-1.5 bg-[#E63946] rounded-full animate-pulse shadow-[0_0_8px_#E63946]" />
               ACTIVE
            </div>
            <h3 className="text-xl font-[1000] uppercase italic tracking-tighter text-white/90 leading-none">
              D{day.dayNumber}: <span style={{ color: neon }}>{day.title}</span>
            </h3>
          </div>

          {/* Controls - Refined Modules */}
          <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 px-4 border-r border-white/5">
              <span className="text-[8px] font-black uppercase text-white/20 tracking-widest italic">Velocity</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setSpeed(s => Math.max(1, s - 1))} className="p-1.5 hover:text-[#E4FF30] transition-colors"><Minus size={14}/></button>
                <span className="w-4 text-center font-black text-sm" style={{ color: neon }}>{speed}</span>
                <button onClick={() => setSpeed(s => Math.min(10, s + 1))} className="p-1.5 hover:text-[#E4FF30] transition-colors"><Plus size={14}/></button>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4">
              <span className="text-[8px] font-black uppercase text-white/20 tracking-widest italic">Text Size</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setFontSize(s => Math.max(30, s - 4))} className="p-1.5 hover:text-[#E4FF30] transition-colors"><Type size={14}/></button>
                <span className="w-10 text-center font-black text-sm" style={{ color: neon }}>{fontSize}</span>
                <button onClick={() => setFontSize(s => Math.min(100, s + 4))} className="p-1.5 hover:text-[#E4FF30] transition-colors"><Type size={18}/></button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={handleReset} className="p-3 rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all">
            <RotateCcw size={20} strokeWidth={2.5} />
          </button>
          <button onClick={onClose} className="bg-[#E63946] text-white p-3 rounded-2xl hover:scale-105 active:scale-95 transition-all border border-[#E63946] shadow-lg shadow-[#E63946]/20">
            <X size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* 2. EYE-LINE READ ZONE - Refined with Glass effect */}
      <div className="fixed top-1/2 left-0 right-0 h-[140px] -translate-y-1/2 pointer-events-none z-20">
        <div className="absolute inset-0 bg-white/[0.02] border-y border-white/5 backdrop-blur-[2px]" />
        
        {/* Eye-line Markers */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-20">
           <div className="w-1 h-1 bg-[#E4FF30] rounded-full" />
           <div className="w-[1px] h-10 bg-[#E4FF30]" />
           <div className="w-1 h-1 bg-[#E4FF30] rounded-full" />
        </div>
        
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-3">
           <span className="text-[8px] font-black uppercase text-[#E4FF30] tracking-[0.6em] opacity-30 italic">Focus Anchor</span>
        </div>
      </div>

      {/* 3. READING ENGINE */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-hide px-8 md:px-[20%] text-center selection:bg-[#E4FF30] selection:text-black"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          style={{ fontSize: `${fontSize}px` }} 
          className="font-black leading-[1.4] uppercase tracking-tight py-[50vh] transition-all"
        >
          {/* HOOK MODULE - Rounded & Refined */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#008BFF] text-white px-12 py-8 mb-60 rounded-[2.5rem] border-[4px] border-white/10 shadow-2xl relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#008BFF] px-4 py-1 rounded-full text-[9px] font-black tracking-widest italic shadow-lg">
                HOOK START
            </div>
            <div className="text-[10px] not-italic font-black mb-3 opacity-60 tracking-[0.4em] flex items-center justify-center gap-2">
                <Zap size={10} fill="currentColor" /> SYSTEM PRIORITY
            </div>
            {day.hook}
          </motion.div>

          {/* SCRIPT BODY */}
          <div className="mb-[60vh] opacity-90 text-white/95">
            {day.script}
          </div>

          <div className="text-[#E63946] text-4xl font-black italic tracking-[0.8em] opacity-20 pb-40">
            FINISH LINE
          </div>
        </div>
      </div>

      {/* 4. MASTER CONTROLLER - Rounded Sleek Style */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-5 px-12 py-6 rounded-full border border-white/10 transition-all transform active:scale-90 shadow-2xl ${
            isPlaying 
            ? 'bg-white text-[#0A0A0A]' 
            : 'bg-[#E4FF30] text-[#362F4F] shadow-[#E4FF30]/30'
          }`}
        >
          <div className="relative">
            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </div>
          <span className="font-black uppercase tracking-[0.3em] text-xs italic">
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