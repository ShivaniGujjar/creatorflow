import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#FDFCF8] flex flex-col items-center justify-center z-[5000] font-sans">
      {/* Background HUD Decor */}
      <div className="absolute inset-0 halftone-bg opacity-[0.015] pointer-events-none" />
      <div className="absolute top-10 left-10 text-[9px] font-black uppercase tracking-[0.6em] text-[#362F4F]/20 italic">
        CreatorFlow Systems
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex flex-col items-center"
      >
        {/* LOGO CONTAINER - Halka Rounded */}
        <div className="relative mb-12">
           <div className="bg-[#362F4F] text-[#E4FF30] w-20 h-20 flex items-center justify-center rounded-[1rem] border-[3px] border-[#362F4F] font-[1000] text-3xl italic tracking-tighter shadow-2xl shadow-[#362F4F]/20 relative z-10">
            CF.
           </div>
           {/* Offset Glow */}
           <div className="absolute -inset-1 bg-[#E4FF30] rounded-[1.5rem] opacity-30 blur-md animate-pulse" />
        </div>

        {/* LOADING TEXT & STATUS */}
        <div className="w-64 space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#362F4F] italic animate-pulse">
              Initialising...
            </span>
            <span className="text-[8px] font-black uppercase tracking-widest text-[#008BFF]">
              SECURE
            </span>
          </div>

          {/* PROGRESS BAR - Rounded Capsule */}
          <div className="h-1.5 w-full bg-[#362F4F]/5 rounded-full overflow-hidden p-[1px] border border-[#362F4F]/5">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
              className="h-full bg-[#362F4F] rounded-full"
            />
          </div>

          {/* TACTICAL MARKERS */}
          <div className="flex justify-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                className="h-1 w-4 bg-[#E4FF30] rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* FOOTER SPECS */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
         <div className="h-px w-12 bg-[#362F4F]/10" />
         <span className="text-[8px] font-black uppercase text-[#362F4F]/30 tracking-[0.5em] italic">
            Connecting to Neural Grid
         </span>
      </div>
    </div>
  );
}