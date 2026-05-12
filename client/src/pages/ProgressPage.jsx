import React from 'react';
import { ArrowLeft, Star, Zap, Trophy, TrendingUp, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgressPage({ roadmap, onBack }) {
  const totalDays = roadmap?.days?.length || 0;
  const completedDays = roadmap?.days?.filter(d => d.completed).length || 0;
  const currentDay = roadmap?.days?.findLast(d => d.completed)?.dayNumber || 0;
  const efficiency = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  const graphData = [
    { label: 'WK 1', val: 20 }, { label: 'WK 2', val: 45 }, { label: 'WK 3', val: 30 },
    { label: 'WK 4', val: 60 }, { label: 'WK 5', val: 50 }, { label: 'WK 6', val: 85 },
    { label: 'WK 7', val: efficiency || 40 },
  ];

  const chartWidth = 800;
  const chartHeight = 180; // Height tight kar di
  const points = graphData.map((d, i) => {
    const x = (i * (chartWidth / (graphData.length - 1)));
    const y = chartHeight - (d.val * (chartHeight / 100));
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* 1. COMPACT HEADER */}
      <div className="flex justify-between items-end mb-8">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-2 font-[1000] uppercase text-[10px] tracking-tighter border-b-[3px] border-black pb-1 hover:text-[#E63946] hover:border-[#E63946] transition-all"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-all" /> 
          RETURN TO MISSION
        </button>
        <div className="text-right">
           <h2 className="text-4xl md:text-5xl font-[1000] uppercase italic tracking-tighter leading-none">
             COMBAT <span className="text-[#E63946]">RECORDS.</span>
           </h2>
        </div>
      </div>

      {/* 2. COMPACT IMPACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        
        {/* TOTAL RANK */}
        <div className="bg-white border-[3px] border-black p-5 shadow-[8px_8px_0px_0px_#A855F7] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#A855F7] text-white px-2 py-0.5 font-black text-[8px] uppercase italic">Rank Status</div>
          <div className="flex items-center gap-2 mb-4 text-[#A855F7]">
            <Trophy size={16} strokeWidth={3} />
            <span className="text-[9px] font-[1000] uppercase tracking-widest text-black">TOTAL RANK</span>
          </div>
          <div className="text-6xl font-[1000] tracking-tighter italic leading-none">D{currentDay}</div>
          <div className="mt-4 text-[8px] font-black text-gray-400 uppercase italic flex items-center gap-1">
            <Target size={10} /> Verified Milestone
          </div>
        </div>

        {/* EFFICIENCY */}
        <div className="bg-white border-[3px] border-black p-5 shadow-[8px_8px_0px_0px_#2DD4BF] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#2DD4BF] text-white px-2 py-0.5 font-black text-[8px] uppercase italic">Sync Rate</div>
          <div className="flex items-center gap-2 mb-4 text-[#2DD4BF]">
            <Zap size={16} strokeWidth={3} />
            <span className="text-[9px] font-[1000] uppercase tracking-widest text-black">EFFICIENCY</span>
          </div>
          <div className="text-6xl font-[1000] tracking-tighter italic leading-none text-[#2DD4BF]">{efficiency}%</div>
          <div className="mt-6 h-2 w-full bg-gray-100 border-2 border-black p-0.5">
            <motion.div initial={{ width: 0 }} animate={{ width: `${efficiency}%` }} className="h-full bg-black" />
          </div>
        </div>

        {/* VIRAL STREAK */}
        <div className="bg-white border-[3px] border-black p-5 shadow-[8px_8px_0px_0px_#FACC15] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FACC15] text-black px-2 py-0.5 font-black text-[8px] uppercase italic">Tier</div>
          <div className="flex items-center gap-2 mb-4 text-[#FACC15]">
            <Star size={16} strokeWidth={3} fill="currentColor" />
            <span className="text-[9px] font-[1000] uppercase tracking-widest text-black">STREAK</span>
          </div>
          <div className="text-5xl font-[1000] tracking-tighter italic leading-none uppercase">ELITE</div>
          <div className="mt-6 text-[8px] font-black text-gray-400 uppercase italic">Retention: Optimized</div>
        </div>
      </div>

      {/* 3. TACTICAL VELOCITY CHART (Tightened) */}
      <div className="bg-white border-[3px] border-black p-6 shadow-[12px_12px_0px_0px_#000] relative">
        <div className="absolute inset-0 halftone-bg opacity-[0.03] pointer-events-none" />
        
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-[1000] uppercase italic flex items-center gap-3">
            <TrendingUp className="text-[#E63946]" strokeWidth={3} /> 
            MISSION VELOCITY <span className="text-gray-300 font-light tracking-tighter ml-1">// v3.0</span>
          </h3>
        </div>

        <div className="relative w-full overflow-visible">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
            {/* Horizontal Grid Lines */}
            {[0, 50, 100].map((level) => (
              <line 
                key={level} x1="0" y1={chartHeight - (level * (chartHeight / 100))} 
                x2={chartWidth} y2={chartHeight - (level * (chartHeight / 100))} 
                stroke="black" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="4,4" 
              />
            ))}

            <motion.polyline
              fill="none" stroke="black" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"
              points={points}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {graphData.map((d, i) => {
              const x = (i * (chartWidth / (graphData.length - 1)));
              const y = chartHeight - (d.val * (chartHeight / 100));
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="4" fill={i === graphData.length - 1 ? "#E63946" : "black"} stroke="white" strokeWidth="2" />
                  <text x={x} y={chartHeight + 20} textAnchor="middle" className="text-[10px] font-black fill-gray-400 uppercase italic">{d.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}