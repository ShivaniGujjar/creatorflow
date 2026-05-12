import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity } from 'lucide-react';

export default function LoadingScreen({ progress }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border-[3px] border-black p-10 shadow-[15px_15px_0px_0px_#000] max-w-md w-full relative overflow-hidden"
      >
        {/* Top Decorative Header */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-black halftone-bg opacity-20" />
        
        {/* Animated Spinner with Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 border-[6px] border-black border-t-[#E63946] animate-spin rounded-full" />
            <Zap size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 fill-current animate-pulse" />
          </div>
        </div>

        {/* Text Status */}
        <div className="space-y-6 text-center">
          <div>
            <h2 className="text-3xl font-[1000] uppercase italic tracking-tighter mb-2 leading-none">
              Strategizing Mission...
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 animate-pulse italic">
              AI Intelligence Link Active
            </p>
          </div>

          {/* Persistent Progress Box */}
          <div className="bg-[#FAFAFA] border-2 border-dashed border-black/10 p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] font-black uppercase text-gray-400 flex items-center gap-2">
                <Activity size={10} /> Sync Readiness
              </span>
              <span className="text-[11px] font-[1000] uppercase text-[#E63946]">
                {progress}%
              </span>
            </div>
            
            {/* Minimal Progress Bar */}
            <div className="h-2 w-full bg-white border-2 border-black p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-black shadow-[2px_0px_5px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
             <div className="h-1.5 w-1.5 bg-[#4ADE80] rounded-full animate-ping" />
             <span className="text-[9px] font-black uppercase tracking-widest italic text-gray-500">
               Decrypting Next Directive
             </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}