import React from 'react';
import { ArrowLeft, Star, Trophy, Target, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// Modular Components Imports
import ProgressHub from '../components/records/ProgressHub';
import MissionVelocity from '../components/records/MissionVelocity';

export default function ProgressPage({ roadmap, onBack }) {
  // Logic Calculations
  const totalDays = roadmap?.days?.length || 0;
  const completedDays = roadmap?.days?.filter(d => d.completed).length || 0;
  const currentDay = roadmap?.days?.findLast(d => d.completed)?.dayNumber || 1;
  const efficiency = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  if (!roadmap) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-10 border-b-2 border-[#362F4F]/5 pb-6">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-2 font-black uppercase text-[10px] tracking-tighter border-b-[2.5px] border-[#362F4F] pb-1 hover:text-[#008BFF] hover:border-[#008BFF] transition-all"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-all" /> 
          RETURN TO HUB
        </button>
        <div className="text-right">
           {/* <div className="text-[9px] font-black uppercase text-[#362F4F]/40 tracking-[0.3em] mb-1 italic">System Logs // Records</div> */}
           <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter leading-none text-[#362F4F]">
             COMBAT <span className="text-[#008BFF]">RECORDS.</span>
           </h2>
        </div>
      </div>

      {/* TACTICAL STAT CARDS - REFINED ROUNDED BORDERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-white border-[2.5px] border-[#362F4F] p-6 relative rounded-xl overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 bg-[#362F4F] text-[#E4FF30] px-3 py-1 font-black text-[8px] uppercase italic">System Rank</div>
          <div className="flex items-center gap-2 mb-6 text-[#362F4F]/40"><Trophy size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Mission Day</span></div>
          <div className="text-7xl font-[1000] italic leading-none text-[#362F4F]">DAY{currentDay}</div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border-[2.5px] border-[#362F4F] p-6 relative rounded-xl overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 bg-[#008BFF] text-white px-3 py-1 font-black text-[8px] uppercase italic">Sync Rate</div>
          <div className="flex items-center gap-2 mb-6 text-[#008BFF]"><Activity size={18} /> <span className="text-[10px] font-black uppercase tracking-widest text-[#362F4F]">Efficiency</span></div>
          <div className="text-7xl font-[1000] italic leading-none text-[#008BFF]">{efficiency}%</div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border-[2.5px] border-[#362F4F] p-6 relative rounded-xl overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 bg-[#E4FF30] text-[#362F4F] px-3 py-1 font-black text-[8px] uppercase italic">Tier Status</div>
          <div className="flex items-center gap-2 mb-6 text-[#E4FF30]"><Star size={18} fill="#E4FF30" /> <span className="text-[10px] font-black uppercase tracking-widest text-[#362F4F]">Streak Status</span></div>
          <div className="text-6xl font-[1000] italic leading-none uppercase text-[#362F4F]">{efficiency > 70 ? 'ELITE' : 'ACTIVE'}</div>
        </div>
      </div>

      {/* BOXES HUB */}
      <ProgressHub roadmap={roadmap} />

      {/* RECHARTS GRAPH */}
      <MissionVelocity roadmap={roadmap} />

    </div>
  );
}