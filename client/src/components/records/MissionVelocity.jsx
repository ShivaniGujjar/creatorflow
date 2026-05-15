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

  // Dummy Legacy Data
  const allTimeData = [
    { name: 'W1', efficiency: 85 },
    { name: 'W2', efficiency: 70 },
    { name: 'W3', efficiency: 95 },
    { name: 'W4', efficiency: 43 }, // Current Week
  ];

  const activeData = view === 'weekly' ? weeklyData : allTimeData;

  return (
    /* RESPONSIVE FIX: Padding aur rounded corners ko mobile ke liye aur tight kiya taaki side compress na ho */
    <div className="bg-[#362F4F] border-[2px] border-[#362F4F] rounded-xl sm:rounded-[2.5rem] p-4 sm:p-8 shadow-2xl relative overflow-visible sm:overflow-hidden transition-all duration-500">
      {/* Background HUD Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#008BFF]/5 blur-[100px] pointer-events-none" />

      {/* CHART HEADER & TOGGLE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-10 gap-3 sm:gap-6 relative z-10 px-0.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
             <Activity size={12} className="text-[#E4FF30] animate-pulse" />
             <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 italic">
               Analytics Engine
             </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-[1000] uppercase italic tracking-tighter text-white">
            Mission <span className="text-[#008BFF]">Velocity.</span>
          </h3>
        </div>

        {/* TACTICAL TOGGLE */}
        <div className="flex bg-[#FDFCF8]/5 p-0.5 rounded-xl border border-white/10 w-full sm:w-auto">
          <button 
            type="button"
            onClick={() => setView('weekly')}
            className={`flex-1 sm:flex-none px-3 sm:px-6 py-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase italic tracking-widest transition-all ${view === 'weekly' ? 'bg-[#E4FF30] text-[#362F4F]' : 'text-white/40 hover:text-white'}`}
          >
            Weekly View
          </button>
          <button 
            type="button"
            onClick={() => setView('legacy')}
            className={`flex-1 sm:flex-none px-3 sm:px-6 py-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase italic tracking-widest transition-all ${view === 'legacy' ? 'bg-[#008BFF] text-white' : 'text-white/40 hover:text-white'}`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* CHART CONTAINER */}
      {/* RESPONSIVE FIX: Height tight h-52 kari aur negative margins hataye taaki Recharts internal area drop na kare */}
      <div className="h-52 sm:h-72 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          {/* RESPONSIVE FIX: Left and Right padding 0 kar di taaki line full stretch ho, bottom 25 stable rakha */}
          <AreaChart data={activeData} margin={{ top: 10, right: 0, left: 0, bottom: 25 }}>
            <defs>
              <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={view === 'weekly' ? "#E4FF30" : "#008BFF"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={view === 'weekly' ? "#E4FF30" : "#008BFF"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.4)" 
              fontSize={10} 
              fontWeight="900" 
              tickLine={false} 
              axisLine={false} 
              dy={12}
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
      <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-4 px-0.5 relative z-10">
        <div className="flex gap-6 sm:gap-8">
           <div className="space-y-0.5">
             <p className="text-[6px] sm:text-[7px] font-black uppercase text-white/30 tracking-widest leading-none">Sync Status</p>
             <p className="text-[10px] sm:text-sm font-black italic text-white uppercase leading-none tracking-tighter">Live Feed</p>
           </div>
           <div className="space-y-0.5">
             <p className="text-[6px] sm:text-[7px] font-black uppercase text-white/30 tracking-widest leading-none">Data Quality</p>
             <p className="text-[10px] sm:text-sm font-black italic text-[#E4FF30] uppercase leading-none tracking-tighter">High</p>
           </div>
        </div>
      </div>
    </div>
  );
}