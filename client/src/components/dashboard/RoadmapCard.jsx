import React from 'react';
import { Edit3, Eye, Rocket, CheckCircle2, Zap, Sparkles } from 'lucide-react';

export default function RoadmapCard({ day, onStart, onToggle, onEdit, onShots, onArchitect }) {
  const isCompleted = day.completed;

  // FIX: Separate handler for toggle to prevent event bubbling
  const handleToggleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(day.dayNumber);
  };

  return (
    <div className={`relative transition-all duration-300 ${isCompleted ? 'opacity-75 scale-[0.98]' : 'opacity-100 hover:-translate-y-1'}`}>
      
      {/* MAIN CARD BODY */}
      <div className={`bg-white border-[2.5px] border-[#362F4F] p-5 flex flex-col h-full rounded-2xl shadow-sm hover:shadow-[0_8px_25px_rgba(54,47,79,0.08)] transition-all overflow-hidden ${isCompleted ? 'bg-gray-50/50' : ''}`}>
        
        {/* TOP HUD BAR */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-0.5 text-[9px] font-black italic tracking-tighter uppercase rounded-md border-[1.5px] border-[#362F4F] ${isCompleted ? 'bg-gray-200 text-[#362F4F]/40' : 'bg-[#362F4F] text-[#E4FF30]'}`}>
              Day {day.dayNumber}
            </div>
            {day.isViral && (
              <div className="flex items-center gap-1 text-[#008BFF] text-[8px] font-black uppercase tracking-widest">
                <Zap size={10} fill="currentColor" /> Priority_Feed
              </div>
            )}
          </div>

          {/* THE TICK BUTTON */}
          <button 
            type="button"
            onClick={handleToggleClick}
            className={`transition-all duration-300 transform active:scale-90 p-1 rounded-full ${isCompleted ? 'text-[#008BFF]' : 'text-gray-200 hover:text-[#362F4F]'}`}
          >
            <CheckCircle2 
              size={24} 
              strokeWidth={3} 
              fill={isCompleted ? "#008BFF" : "transparent"} 
              className={isCompleted ? 'text-white' : ''} 
            />
          </button>
        </div>

        {/* TITLE */}
        <h3 className={`text-lg font-[1000] uppercase italic leading-[1.1] mb-4 tracking-tighter transition-all ${isCompleted ? 'line-through text-[#362F4F]/30 italic' : 'text-[#362F4F]'}`}>
          {day.title}
        </h3>

        {/* HOOK PREVIEW SECTION */}
        <div className="mb-6 relative group/hook">
          <div className={`absolute -top-2 left-2 text-white text-[7px] font-black px-1.5 py-0.5 uppercase tracking-widest italic z-10 rounded-sm transition-colors ${isCompleted ? 'bg-gray-300' : 'bg-[#008BFF]'}`}>
            Viral Hook Phase
          </div>
          <div className={`p-3 border-[1.5px] border-l-[3px] italic text-[10px] font-bold leading-snug rounded-xl transition-all ${isCompleted ? 'bg-gray-100/50 border-[#362F4F]/5 border-l-gray-300 text-[#362F4F]/30' : 'bg-[#FDFCF8] border-[#362F4F]/10 border-l-[#008BFF] text-[#362F4F]/70'}`}>
            "{day.hook.substring(0, 85)}..."
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-auto grid grid-cols-2 gap-2 mb-2">
          <button 
            onClick={() => onEdit(day)}
            className="flex items-center justify-center gap-2 py-1.5 border-[2px] border-[#362F4F] text-[9px] font-black uppercase hover:bg-[#362F4F] hover:text-white transition-all italic rounded-lg disabled:opacity-30"
          >
            <Edit3 size={12} /> Edit Script
          </button>
          <button 
            onClick={() => onShots(day)}
            className="flex items-center justify-center gap-2 py-1.5 border-[2px] border-[#362F4F] text-[9px] font-black uppercase hover:bg-[#362F4F] hover:text-white transition-all italic rounded-lg"
          >
            <Eye size={12} /> Visuals
          </button>
        </div>

        {/* ARCHITECT BUTTON */}
        <button 
          onClick={() => onArchitect(day)}
          className="w-full mb-3 py-2 flex items-center justify-center gap-2 font-black uppercase italic text-[9px] tracking-widest bg-[#362F4F] text-[#E4FF30] border-[2px] border-[#362F4F] hover:bg-[#008BFF] hover:text-white transition-all shadow-sm rounded-lg"
        >
          <Sparkles size={12} fill="currentColor" /> Viral Architect
        </button>

        {/* LAUNCH BUTTON */}
        <button 
          onClick={() => onStart(day)}
          disabled={isCompleted}
          className={`w-full py-3 flex items-center justify-center gap-2 font-[1000] uppercase italic text-[11px] tracking-widest border-[2.5px] transition-all shadow-sm rounded-xl ${
            isCompleted 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50' 
            : 'bg-[#E4FF30] text-[#362F4F] border-[#362F4F] hover:bg-[#D4EF20] active:translate-y-0.5'
          }`}
        >
          <Rocket size={16} strokeWidth={3} />
          {isCompleted ? 'Mission Secured' : 'Launch Teleprompter'}
        </button>
      </div>
    </div>
  );
}