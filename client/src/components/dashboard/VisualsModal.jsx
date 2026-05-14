import React from 'react';
import { X, Camera, Film, Layout, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VisualsModal({ day, onClose }) {
  const visuals = day?.visuals || [];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#362F4F]/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border-[3px] border-[#362F4F] w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[85vh] shadow-xl rounded-3xl"
      >
        {/* MONITOR HEADER */}
        <div className="bg-[#362F4F] p-5 flex justify-between items-center border-b-[3px] border-[#362F4F]">
          <div className="flex items-center gap-4">
            <div className="bg-[#E4FF30] text-[#362F4F] p-2 border-2 border-[#362F4F] rounded-md">
              <Camera size={20} strokeWidth={3} />
            </div>
            <div>
              <div className="text-[8px] font-black uppercase tracking-[0.3em] text-[#E4FF30] opacity-80 leading-none mb-1">Visual Directive</div>
              <h2 className="font-[1000] uppercase italic tracking-tighter text-xl leading-none text-white">Directorial Storyboard</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-[#E4FF30] transition-colors">
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* SHOT GRID */}
        <div className="p-8 overflow-y-auto bg-[#FDFCF8] scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visuals.map((shot, idx) => (
              /* Added pt-8 to make room for the internal badge */
              <div key={idx} className="bg-white border-[2.5px] border-[#362F4F] p-6 pt-10 relative group transition-all hover:border-[#008BFF] rounded-2xl overflow-hidden shadow-sm">
                
                {/* Badge shifted INSIDE the card (top-0 right-0) */}
                <div className="absolute top-0 right-0 bg-[#362F4F] text-[#E4FF30] px-3 py-1 text-[8px] font-black italic border-l-[2.5px] border-b-[2.5px] border-[#362F4F] rounded-bl-lg">
                  SHOT-{idx + 1}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Film size={14} className="text-[#008BFF]" />
                    <span className="text-[10px] font-black uppercase text-[#362F4F] tracking-widest border-b-2 border-[#008BFF]">
                      {shot.shotType}
                    </span>
                  </div>
                  <Maximize size={12} className="text-[#362F4F]/20 group-hover:text-[#008BFF]" />
                </div>

                <div className="p-3 bg-[#362F4F]/5 border-l-4 border-[#362F4F] rounded-lg">
                   <p className="text-sm font-bold italic text-[#362F4F] leading-relaxed">
                     "{shot.description}"
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TACTICAL FOOTER */}
        <div className="p-5 bg-white border-t-[3px] border-[#362F4F] flex justify-end items-center gap-6">
          <div className="text-[8px] font-black uppercase text-[#362F4F]/30 italic tracking-widest hidden sm:block font-mono">
            End of Visual Protocol
          </div>
         <button 
  onClick={onClose}
  className="px-8 py-3 bg-[#E4FF30] text-[#362F4F] font-[1000] uppercase text-[10px] border-[2px] border-[#362F4F] rounded-xl transition-all shadow-lg shadow-[#E4FF30]/20 hover:bg-[#362F4F] hover:text-[#E4FF30] hover:-translate-y-0.5 active:scale-95 italic tracking-widest"
>
  Acknowledge Feed
</button>
        </div>
      </motion.div>
    </div>
  );
}