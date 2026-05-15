import React, { useState } from 'react';
import { X, Save, Terminal, AlertCircle } from 'lucide-react';

export default function EditModal({ day, onClose, onSave }) {
  const [script, setScript] = useState(day.script);

  return (
    /* RESPONSIVE FIX: Mobile par spacing p-3 ya p-4 kari taaki modal edges screen se na takrayein */
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-[#1C0770]/20 backdrop-blur-md">
      
      {/* RESPONSIVE FIX: Mobile par max-h-[90vh] lagaya aur flex flex-col kiya taaki keyboard pop-up hone par modal content responsive rahe */}
      <div className="bg-white w-full max-w-2xl rounded-3xl sm:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(28,7,112,0.15)] overflow-hidden border border-white/50 max-h-[92vh] sm:max-h-none flex flex-col">
        
        {/* HEADER SECTION */}
        {/* RESPONSIVE FIX: Mobile padding tightly packed from p-8 to p-5 */}
        <div className="bg-[#362F4F] p-5 sm:p-8 text-white flex-shrink-0">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <div className="flex items-center gap-2 text-[#E4FF30]">
               <Terminal size={14} className="sm:w-[16px] sm:h-[16px]" strokeWidth={3} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Script Editor</span>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={20} className="sm:w-[24px] sm:h-[24px]" strokeWidth={2.5} />
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-[1000] uppercase italic tracking-tighter leading-tight truncate">
            {day.title}
          </h2>
        </div>

        {/* EDITOR BODY */}
        {/* RESPONSIVE FIX: Padding and scrolling layout managed dynamically for lower height mobile screens */}
        <div className="p-5 sm:p-8 space-y-4 sm:space-y-6 flex-1 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-2.5 text-[#362F4F]/30 flex-shrink-0">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest italic leading-none truncate">Modify script buffer for teleprompter feed</span>
          </div>

          {/* TEXT AREA CONTAINER */}
          {/* RESPONSIVE FIX: Textarea height mobile par flex-1 dynamic kari aur padding adjust ki */}
          <div className="relative group flex-1 flex flex-col min-h-[220px] sm:min-h-0">
            <textarea 
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full h-full sm:h-80 flex-1 bg-[#FDFCF8] border-[2px] border-[#362F4F] rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 font-bold text-sm text-[#362F4F]/80 outline-none focus:border-[#008BFF] transition-all resize-none overflow-y-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            />
            
            {/* Custom Edge for indicator - Hidden on very small screens to avoid over-lapping */}
            <div className="absolute bottom-4 sm:bottom-6 right-5 sm:right-8 text-[8px] font-black uppercase text-[#362F4F]/20 tracking-widest italic pointer-events-none">
              Buffer Ready
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          {/* RESPONSIVE FIX: Handled items alignment smoothly */}
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
              className="bg-[#E4FF30] text-[#362F4F] px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-[1000] uppercase italic text-xs tracking-widest shadow-lg shadow-[#E4FF30]/20 hover:bg-[#D4EF20] active:scale-95 transition-all flex items-center gap-2.5 border-[2px] border-[#362F4F] whitespace-nowrap"
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