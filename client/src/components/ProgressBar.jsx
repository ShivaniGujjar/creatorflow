import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Activity, Target } from 'lucide-react';

export default function ProgressBar({ progress, completedCount }) {
  // Naya "Muted Tactical Yellow"
  const tacticalYellow = "#FACC15"; 

  return (
    <section className="mb-8 relative p-5 md:p-6 border-[3px] border-black bg-white shadow-[10px_10px_0px_0px_#000] overflow-hidden max-w-6xl mx-auto">
      <div className="absolute inset-0 halftone-bg opacity-[0.03] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-black text-[#FACC15] p-1 border border-black shadow-[2px_2px_0px_0px_#FACC15]">
                <ShieldAlert size={10} strokeWidth={3} />
              </div>
              <span className="text-[9px] font-[1000] uppercase tracking-[0.3em] text-black italic opacity-60">Mission Directive: Active</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-[1000] uppercase tracking-tighter leading-none italic">
              ANALYTICS <span className="text-[#E63946]">SYNC.</span>
            </h2>
            <div className="h-1.5 w-full bg-black mt-2" />
          </div>

          <div className="relative group">
            {/* Box shadow color changed to muted yellow */}
            <div className={`absolute inset-0 translate-x-1 translate-y-1 border-2 border-black`} style={{ backgroundColor: tacticalYellow }} />
            <div className="relative bg-black text-white px-5 py-3 border-[2px] border-black flex items-center gap-6 shadow-inner">
              <div>
                <div className="text-[8px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-1 mb-1">
                  <Target size={8} /> Points
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-[1000] leading-none tracking-tighter" style={{ color: tacticalYellow }}>{completedCount}</span>
                  <span className="text-xs font-black opacity-30 italic">/07</span>
                </div>
              </div>
              
              <div className="w-[1px] h-8 bg-white/10" />

              <div className="text-right">
                <div className="text-[8px] font-black uppercase text-gray-500 tracking-widest mb-1">Efficiency</div>
                <div className="text-2xl font-[1000] text-white leading-none">{progress}%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
              <Activity size={10} className="text-[#E63946]" /> System Optimization Status
            </span>
            <span className="text-[9px] font-black italic text-[#E63946] opacity-80">DEPLOYMENT: {progress}/100</span>
          </div>

          <div className="h-4 w-full bg-gray-100 border-[2px] border-black relative p-0.5">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${progress}%` }} 
              className="h-full bg-black relative"
            >
              <div className="absolute inset-0 bg-white/10 w-full h-full skew-x-12 animate-[shimmer_3s_infinite]" />
            </motion.div>
          </div>
          
          <div className="mt-3 flex gap-1">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className={`h-1 flex-1 border border-black/5 transition-colors duration-500`} 
                style={{ 
                  backgroundColor: i < (progress / 5) ? tacticalYellow : 'transparent',
                  opacity: i < (progress / 5) ? 1 : 0.05,
                  boxShadow: i < (progress / 5) ? `0 0 8px ${tacticalYellow}44` : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}