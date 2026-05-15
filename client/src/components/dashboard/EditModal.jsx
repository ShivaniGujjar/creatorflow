import React, { useState } from 'react';
import { X, Save, Terminal, AlertCircle } from 'lucide-react';

export default function EditModal({ day, onClose, onSave }) {
  const [script, setScript] = useState(day.script);

  return (
    /* RESPONSIVE FIX: Mobile spacing tighten p-2 ya p-3 taaki modal sides choke na hon */
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-2 sm:p-6 bg-[#1C0770]/20 backdrop-blur-md">
      
      {/* RESPONSIVE FIX: Max-h optimized for mobile windows so keyboard doesnt crash header */}
      <div className="bg-white w-full max-w-2xl rounded-3xl sm:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(28,7,112,0.15)] overflow-hidden border border-white/50 max-h-[92vh] sm:max-h-none flex flex-col flex-shrink-0">
        
        {/* HEADER SECTION */}
        {/* RESPONSIVE FIX: Spacing squeezed from p-8 to p-4/p-5 taaki content room bache phone par */}
        <div className="bg-[#362F4F] p-4 sm:p-8 text-white flex-shrink-0">
          <div className="flex justify-between items-center mb-2.5 sm:mb-4">
            <div className="flex items-center gap-2 text-[#E4FF30]">
               <Terminal size={14} className="sm:w-[16px] sm:h-[16px]" strokeWidth={3} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] italic truncate">Script Editor</span>
            </div>
            <button type="button" onClick={onClose} className="text-white/40 hover:text-white transition-colors p-1">
              <X size={18} className="sm:w-[24px] sm:h-[24px]" strokeWidth={2.5} />
            </button>
          </div>
          {/* RESPONSIVE FIX: Laptop par white-space rule wrap rakha aur mobile par truncate safety hook */}
          <h2 className="text-lg sm:text-2xl font-[1000] uppercase italic tracking-tighter leading-tight truncate sm:whitespace-normal sm:overflow-visible">
            {day.title}
          </h2>
        </div>

        {/* EDITOR BODY */}
        {/* RESPONSIVE FIX: body spacing optimized from p-8 sm p-4 taaki content tight compact rahe */}
        <div className="p-4 sm:p-8 space-y-3 sm:space-y-6 flex-1 flex flex-col min-h-0 sm:min-h-[320px] sm:overflow-visible">
          <div className="flex items-center gap-2.5 text-[#362F4F]/30 flex-shrink-0">
            <AlertCircle size={12} className="sm:w-[14px] sm:h-[14px] flex-shrink-0" />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest italic leading-none truncate max-w-[80%] sm:max-w-full">Modify script buffer for teleprompter feed</span>
          </div>

          {/* TEXT AREA CONTAINER */}
          {/* RESPONSIVE FIX: Sized down mobile targets and maintained explicit h-80 stretch on widescreen */}
          <div className="relative group flex-1 sm:h-80 flex flex-col min-h-[200px] sm:min-h-[320px] sm:h-80">
            <textarea 
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full h-full flex-1 sm:h-full bg-[#FDFCF8] border-[2px] border-[#362F4F] rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 font-bold text-sm text-[#362F4F]/80 outline-none focus:border-[#008BFF] transition-all resize-none overflow-y-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            />
            
            <div className="absolute bottom-4 sm:bottom-6 right-5 sm:right-8 text-[8px] font-black uppercase text-[#362F4F]/20 tracking-widest italic pointer-events-none">
              Buffer Ready
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          {/* RESPONSIVE FIX: Balanced padding scale down to keep master save safe from overlapping */}
          <div className="flex justify-between items-center pt-2 sm:pt-4 flex-shrink-0 gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#362F4F]/30 hover:text-red-400 transition-colors whitespace-nowrap"
            >
              Abort Changes
            </button>
            <button 
              type="button"
              onClick={() => onSave(day.dayNumber, script)}
              className="bg-[#E4FF30] text-[#362F4F] px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-[1000] uppercase italic text-xs tracking-widest shadow-lg shadow-[#E4FF30]/20 hover:bg-[#D4EF20] active:scale-95 transition-all flex items-center gap-2.5 border-[2px] border-[#362F4F] whitespace-nowrap"
            >
              <Save size={14} className="sm:w-[16px] sm:h-[16px]" /> Save Sync
            </button>
          </div>
        </div>
      </div>

      {/* CSS to hide scrollbar across browsers */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}