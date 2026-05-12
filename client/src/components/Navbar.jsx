import React from 'react';
import { Activity, LogOut } from 'lucide-react';

export default function Navbar({ user, roadmap, logout, setView }) {
  // Global Day Sync: Sabse bada day number dhundna (e.g. Day 43)
  const lastSecuredDay = roadmap?.days
    ?.filter(d => d.completed)
    .sort((a, b) => b.dayNumber - a.dayNumber)[0]?.dayNumber || 0;

  return (
    <nav className="border-b-[3px] border-black bg-white sticky top-0 z-[100] px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO: CF. CREATORFLOW */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('dashboard')}
        >
          <div className="bg-[#E63946] text-white p-1 font-black italic border-2 border-black leading-none">
            CF.
          </div>
          <h1 className="text-xl md:text-2xl font-[900] uppercase tracking-tighter italic">
            CREATOR<span className="text-[#E63946]">FLOW.</span>
          </h1>
        </div>

        {user && (
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* ANALYTICS / RECORDS BUTTON */}
            <button 
              onClick={() => setView('progress')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 border-2 border-black bg-[#FEF08A] hover:bg-black hover:text-[#FEF08A] transition-all shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <Activity size={14} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-tight">Records</span>
            </button>

            {/* GLOBAL STATUS BADGE (Day 43 Logic) */}
            <div className="bg-black text-white px-3 md:px-4 py-1.5 border-2 border-black flex items-center gap-3">
              <div className="h-2 w-2 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_8px_#4ADE80]" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest italic whitespace-nowrap">
                AGENT: {user.name} | DAY {lastSecuredDay} SECURED
              </span>
            </div>

            {/* LOGOUT BUTTON */}
            <button 
              onClick={logout} 
              className="p-2 border-2 border-black hover:bg-[#E63946] hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <LogOut size={18} strokeWidth={3}/>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}