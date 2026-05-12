import React from 'react';
import { X, Camera, Film } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VisualsModal({ day, onClose }) {
  const visuals = day?.visuals || [];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white border-[4px] border-black shadow-[20px_20px_0px_0px_#000] w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[#2DD4BF] p-6 flex justify-between items-center border-b-[4px] border-black">
          <div className="flex items-center gap-4">
            <div className="bg-black text-white p-2 border-2 border-black -rotate-2">
              <Camera size={24} strokeWidth={3} />
            </div>
            <h2 className="font-[1000] uppercase italic tracking-tighter text-2xl leading-none text-black">Directorial Storyboard</h2>
          </div>
          <button onClick={onClose} className="bg-black text-white p-2 hover:bg-[#E63946] border-2 border-black">
            <X size={24} strokeWidth={4} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto bg-[#F8F9FA] relative custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visuals.map((shot, idx) => (
              <div key={idx} className="bg-white border-[3px] border-black p-5 shadow-[8px_8px_0px_0px_#000] relative group">
                <div className="absolute -top-3 -right-3 bg-black text-white px-3 py-1 text-[10px] font-black italic border-2 border-black">
                  SHOT {idx + 1}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Film size={14} className="text-[#E63946]" />
                  <span className="text-[10px] font-black uppercase text-[#E63946] border-b-2 border-[#E63946]">
                    {shot.shotType}
                  </span>
                </div>
                <p className="text-sm font-bold italic text-black/80">"{shot.description}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-white border-t-[4px] border-black flex justify-end">
          <button 
            onClick={onClose}
            className="px-10 py-3 bg-black text-white font-[1000] uppercase text-[11px] border-[3px] border-black hover:bg-[#2DD4BF] hover:text-black transition-all"
          >
            Acknowledge Intelligence
          </button>
        </div>
      </motion.div>
    </div>
  );
}