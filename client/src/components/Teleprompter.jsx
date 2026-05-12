import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Plus, Minus, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Teleprompter({ day, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2); 
  const [fontSize, setFontSize] = useState(54); 
  const scrollRef = useRef(null);
  const requestRef = useRef();

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
    <div className="fixed inset-0 bg-[#050505] z-[10000] flex flex-col text-white overflow-hidden font-sans">
      
      {/* 1. TACTICAL HUD TOP BAR */}
      <div className="p-6 border-b-4 border-[#E63946] flex justify-between items-center bg-black/80 backdrop-blur-xl z-50 shadow-[0_10px_30px_rgba(230,57,70,0.2)]">
        <div className="flex gap-10 items-center">
          <div className="relative">
            <div className="text-[10px] font-black uppercase text-[#E63946] tracking-[0.3em] mb-1 flex items-center gap-2">
               <div className="h-2 w-2 bg-[#E63946] rounded-full animate-ping" />
               Live Teleprompter Output
            </div>
            <h3 className="text-xl font-[1000] uppercase italic tracking-tighter text-white leading-none">
              Day {day.dayNumber}: <span className="text-yellow-400">{day.title}</span>
            </h3>
          </div>

          {/* HUD Speed & Size Controls */}
          <div className="hidden lg:flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-2 rounded-sm">
            <div className="flex items-center gap-3 border-r border-white/10 pr-6">
              <span className="text-[9px] font-black uppercase text-gray-500">Speed</span>
              <button onClick={() => setSpeed(s => Math.max(1, s - 1))} className="hover:text-yellow-400"><Minus size={16}/></button>
              <span className="w-8 text-center font-black text-yellow-400">{speed}</span>
              <button onClick={() => setSpeed(s => Math.min(10, s + 1))} className="hover:text-yellow-400"><Plus size={16}/></button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black uppercase text-gray-400">Size</span>
              <button onClick={() => setFontSize(s => Math.max(30, s - 4))} className="hover:text-yellow-400"><Type size={14}/></button>
              <span className="w-8 text-center font-black text-yellow-400">{fontSize}px</span>
              <button onClick={() => setFontSize(s => Math.min(100, s + 4))} className="hover:text-yellow-400"><Type size={18}/></button>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={handleReset} className="bg-white/10 hover:bg-white hover:text-black p-3 border-2 border-white/20 transition-all">
            <RotateCcw size={22} strokeWidth={3} />
          </button>
          <button onClick={onClose} className="bg-[#E63946] text-white p-3 hover:scale-105 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            <X size={22} strokeWidth={4} />
          </button>
        </div>
      </div>

      {/* 2. EYE-LINE FOCUS BOX (The Center "Read Zone") */}
      <div className="fixed top-1/2 left-0 right-0 h-[140px] -translate-y-1/2 pointer-events-none z-20">
        <div className="absolute inset-0 bg-yellow-400/[0.03] border-y-[1px] border-yellow-400/20 shadow-[0_0_50px_rgba(255,215,0,0.05)]" />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
        
        {/* Tactical Corner Brackets */}
        <div className="absolute -top-4 left-6 w-8 h-8 border-t-4 border-l-4 border-yellow-400 opacity-40" />
        <div className="absolute -bottom-4 right-6 w-8 h-8 border-b-4 border-r-4 border-yellow-400 opacity-40" />
      </div>

      {/* 3. READING ENGINE */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-hide px-8 md:px-[20%] text-center cursor-ns-resize selection:bg-yellow-400 selection:text-black"
      >
        <div 
          style={{ fontSize: `${fontSize}px` }} 
          className="font-[900] leading-[1.3] uppercase tracking-tighter py-[45vh] transition-all"
        >
          {/* HOOK STICKER */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#FFD700] text-black px-10 py-6 mb-40 italic border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(255,215,0,0.1)]"
          >
            <div className="text-[12px] not-italic font-black mb-2 border-b-2 border-black/20 pb-1">VIRAL HOOK START</div>
            {day.hook}
          </motion.div>

          {/* MAIN SCRIPT BODY */}
          <div className="mb-[50vh] whitespace-pre-wrap opacity-90">
            {day.script}
          </div>

          <div className="text-[#E63946] text-4xl font-black italic tracking-[0.5em] opacity-40 pb-20">
            // MISSION COMPLETE //
          </div>
        </div>
      </div>

      {/* 4. MASTER PLAY BUTTON (Bottom Center) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-4 px-12 py-6 rounded-full border-4 border-black shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all transform active:scale-95 ${
            isPlaying ? 'bg-white text-black' : 'bg-[#E63946] text-white animate-pulse'
          }`}
        >
          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          <span className="font-black uppercase tracking-widest text-sm">
            {isPlaying ? 'Hold Mission' : 'Resume Directive'}
          </span>
        </button>
      </div>

      {/* Sidebar Metadata */}
      <div className="fixed left-6 bottom-10 hidden xl:block opacity-20">
         <div className="text-[10px] font-black uppercase vertical-text tracking-[0.5em]">CreatorFlow Systems v3.0</div>
      </div>
    </div>
  );
}