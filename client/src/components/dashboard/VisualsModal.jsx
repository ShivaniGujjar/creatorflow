import React from 'react';
import { X, Camera, Film, Layout, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VisualsModal({ day, onClose }) {
  const visuals = day?.visuals || [];

  return (
    /* RESPONSIVE FIX: Mobile view borders par gap banane ke liye dynamic padding toggle ki */
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-[#362F4F]/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border-[3px] border-[#362F4F] w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[85vh] shadow-xl rounded-3xl"
      >
        {/* MONITOR HEADER */}
        {/* RESPONSIVE FIX: Content spacing shrinked on mobile viewports */}
        <div className="bg-[#362F4F] p-4 sm:p-5 flex justify-between items-center border-b-[3px] border-[#362F4F]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-[#E4FF30] text-[#362F4F] p-2 border-2 border-[#362F4F] rounded-md flex-shrink-0">
              <Camera size={18} className="sm:w-[20px] sm:h-[20px]" strokeWidth={3} />
            </div>
            <div>
              <div className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] text-[#E4FF30] opacity-80 leading-none mb-1">Visual Directive</div>
              <h2 className="font-[1000] uppercase italic tracking-tighter text-lg sm:text-xl leading-none text-white">Directorial Storyboard</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-[#E4FF30] transition-colors p-1">
            <X size={20} className="sm:w-[24px] sm:h-[24px]" strokeWidth={3} />
          </button>
        </div>

        {/* SHOT GRID */}
        {/* RESPONSIVE FIX: Changed p-8 to p-4 sm:p-8 and gap-8 to gap-4 sm:gap-8 for balanced mobile tiles */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-[#FDFCF8] scrollbar-hide flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {visuals.map((shot, idx) => (
              <div key={idx} className="bg-white border-[2.5px] border-[#362F4F] p-4 sm:p-6 pt-10 relative group transition-all hover:border-[#008BFF] rounded-2xl overflow-hidden shadow-sm">
                
                {/* Badge shifted INSIDE the card */}
                <div className="absolute top-0 right-0 bg-[#362F4F] text-[#E4FF30] px-3 py-1 text-[8px] font-black italic border-l-[2.5px] border-b-[2.5px] border-[#362F4F] rounded-bl-lg">
                  SHOT-{idx + 1}
                </div>
                
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <Film size={14} className="text-[#008BFF]" />
                    <span className="text-[10px] font-black uppercase text-[#362F4F] tracking-widest border-b-2 border-[#008BFF] whitespace-nowrap">
                      {shot.shotType}
                    </span>
                  </div>
                  <Maximize size={12} className="text-[#362F4F]/20 group-hover:text-[#008BFF] flex-shrink-0" />
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
        {/* RESPONSIVE FIX: Fixed full width stretch alignment issues for phone actions button */}
        <div className="p-4 sm:p-5 bg-white border-t-[3px] border-[#362F4F] flex justify-end items-center gap-6 flex-shrink-0">
          <div className="text-[8px] font-black uppercase text-[#362F4F]/30 italic tracking-widest hidden sm:block font-mono">
            End of Visual Protocol
          </div>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto text-center px-8 py-3 bg-[#E4FF30] text-[#362F4F] font-[1000] uppercase text-[10px] border-[2px] border-[#362F4F] rounded-xl transition-all shadow-lg shadow-[#E4FF30]/20 hover:bg-[#362F4F] hover:text-[#E4FF30] hover:-translate-y-0.5 active:scale-95 italic tracking-widest whitespace-nowrap"
          >
            Acknowledge Feed
          </button>
        </div>
      </motion.div>
    </div>
  );
}