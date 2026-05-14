import React, { useState } from 'react';
import { X, Save, Terminal, AlertCircle } from 'lucide-react';

export default function EditModal({ day, onClose, onSave }) {
  const [script, setScript] = useState(day.script);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-[#1C0770]/20 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(28,7,112,0.15)] overflow-hidden border border-white/50">
        
        {/* HEADER SECTION */}
        <div className="bg-[#362F4F] p-8 text-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[#E4FF30]">
               <Terminal size={16} strokeWidth={3} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Script Editor</span>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>
          <h2 className="text-2xl font-[1000] uppercase italic tracking-tighter leading-tight">
            {day.title}
          </h2>
        </div>

        {/* EDITOR BODY */}
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#362F4F]/30">
            <AlertCircle size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest italic">Modify script buffer for teleprompter feed</span>
          </div>

          {/* TEXT AREA WITH HIDDEN SCROLLBAR */}
          <div className="relative group">
            <textarea 
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full h-80 bg-[#FDFCF8] border-[2px] border-[#362F4F] rounded-[2rem] p-8 font-bold text-sm text-[#362F4F]/80 outline-none focus:border-[#008BFF] transition-all resize-none overflow-y-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            />
            {/* Custom Edge for indicator */}
            <div className="absolute bottom-6 right-8 text-[8px] font-black uppercase text-[#362F4F]/20 tracking-widest italic">
              Buffer Ready
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-between items-center pt-4">
            <button 
              onClick={onClose}
              className="text-[10px] font-black uppercase tracking-widest text-[#362F4F]/30 hover:text-red-400 transition-colors"
            >
              Abort Changes
            </button>
            <button 
              onClick={() => onSave(day.dayNumber, script)}
              className="bg-[#E4FF30] text-[#362F4F] px-8 py-4 rounded-2xl font-[1000] uppercase italic text-xs tracking-widest shadow-lg shadow-[#E4FF30]/20 hover:bg-[#D4EF20] active:scale-95 transition-all flex items-center gap-3 border-[2px] border-[#362F4F]"
            >
              <Save size={16} /> Save Sync
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