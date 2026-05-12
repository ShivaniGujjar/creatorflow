import React, { useState } from 'react';
import { X, Save, Edit3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EditModal({ day, onClose, onSave }) {
  const [script, setScript] = useState(day.script);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white border-[4px] border-black shadow-[20px_20px_0px_0px_#000] w-full max-w-3xl relative overflow-hidden flex flex-col"
      >
        <div className="bg-[#FFD700] p-6 flex justify-between items-center border-b-[4px] border-black">
          <div className="flex items-center gap-4">
            <div className="bg-black text-white p-2 border-2 border-black rotate-3">
              <Edit3 size={24} strokeWidth={3} />
            </div>
            <h2 className="font-[1000] uppercase italic tracking-tighter text-2xl leading-none text-black">Script Directive</h2>
          </div>
          <button onClick={onClose} className="bg-black text-white p-2 hover:bg-[#E63946] border-2 border-black">
            <X size={24} strokeWidth={4} />
          </button>
        </div>

        <div className="p-8 bg-[#FAFAFA]">
          <textarea 
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-80 p-6 border-[3px] border-black font-bold text-lg leading-snug outline-none bg-white resize-none"
          />
        </div>

        <div className="p-6 bg-white border-t-[4px] border-black flex justify-end gap-4">
          <button onClick={onClose} className="px-8 py-3 font-[1000] uppercase text-[11px] border-[3px] border-black">Abort</button>
          <button 
            onClick={() => onSave(day.dayNumber, script)}
            className="px-10 py-3 bg-black text-white font-[1000] uppercase text-[11px] border-[3px] border-black hover:bg-[#4ADE80] hover:text-black transition-all"
          >
            Synchronize
          </button>
        </div>
      </motion.div>
    </div>
  );
}