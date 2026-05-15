import React from 'react';
import { LogOut, BarChart3, LayoutDashboard, User } from 'lucide-react';

export default function Navbar({ user, logout, setView, currentView }) {
  return (
    <>
      {/* TOP DESKTOP & MOBILE LOGO HEADER */}
      <nav className="bg-white border-b-[2.5px] border-[#362F4F]/10 sticky top-0 z-[1000] px-4 sm:px-6 h-20 flex items-center font-sans overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* LOGO */}
          <div 
            onClick={() => setView('dashboard')} 
            className="flex items-center gap-3 sm:gap-4 cursor-pointer group transition-all active:scale-95"
          >
            <div className="bg-[#362F4F] text-[#E4FF30] w-10 h-10 flex items-center justify-center rounded-lg border-[2px] border-[#362F4F] font-[1000] text-lg italic tracking-tighter shadow-sm group-hover:rotate-3 transition-transform">
              CF.
            </div>
            <div className="hidden sm:block leading-none pt-1">
              <h1 className="text-xl font-[1000] uppercase italic tracking-tighter text-[#362F4F]">
                CREATOR<span className="text-[#008BFF]">FLOW.</span>
              </h1>
            </div>
          </div>

          {/* DESKTOP NAVIGATION HUB & USER CONTROLS */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Desktop Only Tab Switcher */}
            <div className="hidden md:flex items-center border-[2px] border-[#362F4F] rounded-lg overflow-hidden bg-white shadow-sm">
              <button 
                onClick={() => setView('dashboard')}
                className={`px-6 py-2.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all border-r-[2px] border-[#362F4F] 
                  ${currentView === 'dashboard' 
                    ? 'bg-[#E4FF30] text-[#362F4F]' 
                    : 'text-[#362F4F] hover:bg-[#E4FF30] transition-colors'}`}
              >
                <LayoutDashboard size={14} strokeWidth={3} /> HUB
              </button>
              <button 
                onClick={() => setView('progress')}
                className={`px-6 py-2.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all 
                  ${currentView === 'progress' 
                    ? 'bg-[#008BFF] text-white' 
                    : 'text-[#362F4F] hover:bg-[#008BFF] hover:text-white transition-colors'}`}
              >
                <BarChart3 size={14} strokeWidth={3} /> PROGRESS
              </button>
            </div>

            {/* USER PROFILE CARD */}
            <div className="flex items-center gap-2 sm:gap-4 bg-[#362F4F] pl-3 sm:pl-4 pr-1 py-1 rounded-lg border-[2px] border-[#362F4F] shadow-sm group hover:shadow-[0_0_15px_rgba(54,47,79,0.2)] transition-all cursor-pointer">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[12px] font-[1000] text-white italic uppercase tracking-tighter">
                  {user?.name?.split(' ')[0] || 'Shivani'}
                </span>
              </div>
              <div className="h-8 w-8 bg-[#E4FF30] flex items-center justify-center text-[#362F4F] rounded-md border-[1.5px] border-[#362F4F] group-hover:scale-105 group-active:scale-95 transition-transform">
                <User size={16} strokeWidth={3} />
              </div>
            </div>

            {/* LOGOUT */}
            <button 
              onClick={logout}
              className="w-10 h-10 flex items-center justify-center rounded-lg border-[2px] border-[#362F4F] text-[#362F4F] hover:bg-[#E63946] hover:text-white hover:border-[#E63946] transition-all active:scale-95 shadow-sm"
            >
              <LogOut size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM TACTICAL NAVIGATION DOCK */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t-[2.5px] border-[#362F4F]/10 md:hidden z-[1000] px-6 py-3 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setView('dashboard')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-4 rounded-xl transition-all active:scale-95 text-[10px] font-black uppercase tracking-wider
            ${currentView === 'dashboard' ? 'text-[#008BFF]' : 'text-[#362F4F]/40'}`}
        >
          <LayoutDashboard size={20} strokeWidth={currentView === 'dashboard' ? 3 : 2} />
          <span>Hub</span>
        </button>

        <button 
          onClick={() => setView('progress')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-4 rounded-xl transition-all active:scale-95 text-[10px] font-black uppercase tracking-wider
            ${currentView === 'progress' ? 'text-[#008BFF]' : 'text-[#362F4F]/40'}`}
        >
          <BarChart3 size={20} strokeWidth={currentView === 'progress' ? 3 : 2} />
          <span>Progress</span>
        </button>
      </div>
    </>
  );
}