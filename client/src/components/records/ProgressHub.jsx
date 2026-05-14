import React from 'react';
import { Check, Zap } from 'lucide-react';

export default function ProgressHub({ roadmap }) {
  if (!roadmap) return null;

  const completedCount = roadmap.days.filter(d => d.completed).length;
  const efficiency = Math.round((completedCount / roadmap.days.length) * 100);

  return (
    <div className="mb-12 w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-[#362F4F] text-[#E4FF30] px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] italic flex items-center gap-2">
          <Zap size={10} fill="currentColor" /> Progress Hub
        </div>
        <div className="h-[2px] flex-1 bg-[#362F4F]/5" />
        <div className="text-[10px] font-black uppercase text-[#362F4F]/40 italic tracking-widest">
          SYNC STATUS: {efficiency}%
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
        {roadmap.days.map((day, idx) => (
          <div key={idx} className={`aspect-square border-[2.5px] flex flex-col items-center justify-center transition-all ${
            day.completed ? 'bg-[#E4FF30] border-[#362F4F]' : 'bg-white border-[#362F4F]/10'
          }`}>
            <span className="text-[10px] font-black mb-1 italic">D{day.dayNumber}</span>
            {day.completed && <Check size={18} strokeWidth={4} className="text-[#362F4F]" />}
          </div>
        ))}
      </div>
    </div>
  );
}