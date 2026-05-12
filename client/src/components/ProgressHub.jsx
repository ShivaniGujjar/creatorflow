import React from 'react';
import { Check, Lock, PlayCircle } from 'lucide-react';

export default function ProgressHub({ roadmap }) {
  if (!roadmap) return null;

  return (
    <div className="mb-10 w-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-black text-white px-2 py-0.5 text-[8px] font-[1000] uppercase tracking-widest italic">
          Progress Hub
        </span>
        <div className="h-[1px] flex-1 bg-black/10" />
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {roadmap.days.map((day, idx) => (
          <div key={idx} className="relative group">
            {/* Day Box */}
            <div className={`aspect-square border-[3px] border-black flex flex-col items-center justify-center transition-all duration-300 ${
              day.completed 
              ? 'bg-[#4ADE80] shadow-[4px_4px_0px_0px_#000]' 
              : 'bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]'
            }`}>
              <span className={`text-[9px] font-[1000] mb-1 ${day.completed ? 'text-black' : 'text-gray-300'}`}>
                D0{day.dayNumber}
              </span>
              {day.completed ? (
                <Check size={16} strokeWidth={4} className="text-black" />
              ) : (
                <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
              )}
            </div>

            {/* Tooltip on Hover */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap bg-black text-white text-[8px] font-bold px-2 py-1 uppercase tracking-tighter border border-black shadow-[2px_2px_0px_0px_#E63946]">
              {day.completed ? 'OBJECTIVE SECURED' : 'PENDING ACTIVATION'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}