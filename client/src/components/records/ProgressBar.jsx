import React from 'react';

export default function ProgressBar({ progress, completedCount }) {
  return (
    /* Reduced padding from p-10 to p-7 and main container height */
    <div className="relative bg-white border-[2px] border-[#362F4F] p-7 rounded-[2.5rem] overflow-hidden shadow-sm">
      
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-0.5">
           <div className="flex items-center gap-2 mb-1">
              <div className="bg-[#362F4F] p-1 rounded-md">
                <div className="w-1 h-1 bg-[#E4FF30] rounded-full animate-pulse" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#362F4F]/40 italic">
                Mission Directive: Active
              </span>
           </div>
           <h2 className="text-3xl font-[1000] uppercase italic tracking-tighter text-[#362F4F] leading-none">
             Analytics <span className="text-[#008BFF]">Sync.</span>
           </h2>
        </div>

        {/* COMPACT STATS BOX - Reduced padding and text size */}
        <div className="bg-[#362F4F] px-5 py-3.5 rounded-2xl flex gap-6 text-white items-center">
           <div className="text-center">
              <p className="text-[7px] font-black uppercase tracking-widest opacity-30 mb-0.5">Secured</p>
              <p className="text-2xl font-[1000] italic leading-none">{completedCount}<span className="text-[9px] opacity-20 ml-0.5">/30</span></p>
           </div>
           <div className="w-px h-6 bg-white/10" />
           <div className="text-center">
              <p className="text-[7px] font-black uppercase tracking-widest opacity-30 mb-0.5">Efficiency</p>
              <p className="text-2xl font-[1000] italic leading-none">{progress}%</p>
           </div>
        </div>
      </div>

      {/* TRACK SECTION - Tightened spacing */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.2em]">
            <span className="text-[#362F4F]/30 flex items-center gap-2 font-bold">
               — System Optimization
            </span>
            <span className="text-[#008BFF] font-bold tracking-widest font-mono">STATUS: {progress}/100</span>
        </div>
        
        {/* SLIMMER PROGRESS BAR - Height reduced to h-3 */}
        <div className="h-3 w-full border-[1.5px] border-[#362F4F] rounded-full overflow-hidden p-[1.5px] bg-[#FDFCF8]">
          <div 
            className="h-full bg-[#362F4F] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* COMPACT TACTICAL MARKERS */}
        <div className="flex gap-1.5">
            {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < progress/10 ? 'bg-[#E4FF30]' : 'bg-[#362F4F]/5'}`} 
                />
            ))}
        </div>
      </div>
    </div>
  );
}