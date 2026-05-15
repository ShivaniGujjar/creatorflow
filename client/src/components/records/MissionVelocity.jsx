import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, BarChart3, Globe } from 'lucide-react';

export default function MissionVelocity({ roadmap, legacyData }) {
  const [view, setView] = useState('weekly'); // 'weekly' or 'legacy'

  // Weekly Data Logic
  const weeklyData = roadmap?.days?.map(d => ({
    name: `D${d.dayNumber}`,
    efficiency: d.completed ? 100 : 0,
    status: d.completed ? 'SECURED' : 'PENDING'
  })) || [];

  // Dummy Legacy Data (Ye backend se map hoga)
  const allTimeData = [
    { name: 'W1', efficiency: 85 },
    { name: 'W2', efficiency: 70 },
    { name: 'W3', efficiency: 95 },
    { name: 'W4', efficiency: 43 }, // Current Week
  ];

  const activeData = view === 'weekly' ? weeklyData : allTimeData;

  return (
    /* RESPONSIVE FIX: Mobile padding reduce to p-5, rounded radius scaled for mobile viewports */
    <div className="bg-[#362F4F] border-[2.5px] border-[#362F4F] rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-500">
      {/* Background HUD Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#008BFF]/5 blur-[100px] pointer-events-none" />

      {/* CHART HEADER & TOGGLE */}
      {/* RESPONSIVE FIX: Stack items on top of each other on mobile view, handle wide view layout gaps */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-6 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <Activity size={14} className="text-[#E4FF30] animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">
               Analytics Engine
             </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-[1000] uppercase italic tracking-tighter text-white">
            Mission <span className="text-[#008BFF]">Velocity.</span>
          </h3>
        </div>

        {/* TACTICAL TOGGLE */}
        {/* RESPONSIVE FIX: Full stretch control bar on single stack mobile windows */}
        <div className="flex bg-[#FDFCF8]/5 p-1 rounded-2xl border border-white/10 w-full sm:w-auto">
          <button 
            onClick={() => setView('weekly')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic tracking-widest transition-all ${view === 'weekly' ? 'bg-[#E4FF30] text-[#362F4F]' : 'text-white/40 hover:text-white'}`}
          >
            Weekly View
          </button>
          <button 
            onClick={() => setView('legacy')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic tracking-widest transition-all ${view === 'legacy' ? 'bg-[#008BFF] text-white' : 'text-white/40 hover:text-white'}`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* CHART CONTAINER */}
      {/* RESPONSIVE FIX: Height tight padding scale so it scales fluidly across all breakpoints */}
      <div className="h-60 sm:h-64 w-full -ml-3 sm:ml-0 pr-2 sm:pr-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activeData}>
            <defs>
              <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={view === 'weekly' ? "#E4FF30" : "#008BFF"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={view === 'weekly' ? "#E4FF30" : "#008BFF"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.2)" 
              fontSize={10} 
              fontWeight="900" 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#362F4F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#E4FF30', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
              labelStyle={{ display: 'none' }}
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="efficiency" 
              stroke={view === 'weekly' ? "#E4FF30" : "#008BFF"} 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorEff)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* CHART FOOTER SPECS */}
      <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-6">
        <div className="flex gap-6 sm:gap-8">
           <div className="space-y-1">
             <p className="text-[7px] font-black uppercase text-white/30 tracking-widest leading-none">Sync Status</p>
             <p className="text-xs sm:text-sm font-black italic text-white uppercase leading-none tracking-tighter">Live Feed</p>
           </div>
           <div className="space-y-1">
             <p className="text-[7px] font-black uppercase text-white/30 tracking-widest leading-none">Data Quality</p>
             <p className="text-xs sm:text-sm font-black italic text-[#E4FF30] uppercase leading-none tracking-tighter">High</p>
           </div>
        </div>
      </div>
    </div>
  );
}