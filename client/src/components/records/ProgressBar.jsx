import React from 'react';

export default function ProgressBar({ progress, completedCount }) {
  return (
    /* RESPONSIVE FIX: Mobile par p-4 aur normal rounded corners, desktop par back to p-7 aur custom radius */
    <div className="relative bg-white border-[2px] border-[#362F4F] p-4 sm:p-7 rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-sm">
      
      {/* RESPONSIVE FIX: Mobile par stack vertically text and stats, desktop par horizontally row */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="space-y-0.5">
           <div className="flex items-center gap-2 mb-1">
              <div className="bg-[#362F4F] p-1 rounded-md">
                <div className="w-1 h-1 bg-[#E4FF30] rounded-full animate-pulse" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#362F4F]/40 italic">
                Mission Directive: Active
              </span>
           </div>
           <h2 className="text-2xl sm:text-3xl font-[1000] uppercase italic tracking-tighter text-[#362F4F] leading-none">
              Analytics <span className="text-[#008BFF]">Sync.</span>
           </h2>
        </div>

        {/* COMPACT STATS BOX */}
        {/* RESPONSIVE FIX: Full width on mobile with balanced justify, auto width on desktop */}
        <div className="bg-[#362F4F] px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl flex justify-around sm:justify-start gap-6 text-white items-center w-full sm:w-auto">
           <div className="text-center">
              <p className="text-[7px] font-black uppercase tracking-widest opacity-30 mb-0.5">Secured</p>
              <p className="text-xl sm:text-2xl font-[1000] italic leading-none">{completedCount}<span className="text-[9px] opacity-20 ml-0.5">/30</span></p>
           </div>
           <div className="w-px h-6 bg-white/10" />
           <div className="text-center">
              <p className="text-[7px] font-black uppercase tracking-widest opacity-30 mb-0.5">Efficiency</p>
              <p className="text-xl sm:text-2xl font-[1000] italic leading-none">{progress}%</p>
           </div>
        </div>
      </div>

      {/* TRACK SECTION */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.2em] gap-2">
            <span className="text-[#362F4F]/30 flex items-center gap-2 font-bold truncate">
               — System Optimization
            </span>
            <span className="text-[#008BFF] font-bold tracking-widest font-mono whitespace-nowrap">STATUS: {progress}/100</span>
        </div>
        
        {/* SLIMMER PROGRESS BAR */}
        <div className="h-3 w-full border-[1.5px] border-[#362F4F] rounded-full overflow-hidden p-[1.5px] bg-[#FDFCF8]">
          <div 
            className="h-full bg-[#362F4F] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* COMPACT TACTICAL MARKERS */}
        {/* RESPONSIVE FIX: Gap slightly reduced on small viewports so lines don't mash */}
        <div className="flex gap-1 sm:gap-1.5">
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