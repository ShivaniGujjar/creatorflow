import React, { useState } from 'react';
import { Search, Sparkles, RefreshCcw, Activity, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import RoadmapCard from '../components/dashboard/RoadmapCard';
import ProgressBar from '../components/records/ProgressBar';
import EditModal from '../components/dashboard/EditModal';
import VisualsModal from '../components/dashboard/VisualsModal';
import HookArchitectModal from '../components/dashboard/HookArchitectModal';

export default function Dashboard({ roadmap, progress, toggleDay, onStart, reset, updateDayScript }) {
  const [activeDay, setActiveDay] = useState(null); 
  const [modalType, setModalType] = useState(null);
  const [newNiche, setNewNiche] = useState("");

  const [hookData, setHookData] = useState(null);
  const [isHookLoading, setIsHookLoading] = useState(false);
  const [showHookModal, setShowHookModal] = useState(false);

  if (!roadmap || !roadmap.days) return null;
  const completedCount = roadmap.days.filter(d => d.completed).length;
  const isMissionComplete = progress === 100;

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const handleArchitectHooks = async (dayData) => {
    setShowHookModal(true);
    setIsHookLoading(true);
    setHookData(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/roadmaps/architect-hooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({ dayData })
      });
      const data = await res.json();
      setHookData(data);
    } catch (err) {
      console.error("Architect failed:", err);
    } finally {
      setIsHookLoading(false);
    }
  };

  const handleEditSave = async (dayNumber, newScript) => {
    const success = await updateDayScript(dayNumber, newScript);
    if (success) {
      setActiveDay(null);
      setModalType(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] relative pb-32 font-sans overflow-x-hidden">
      
      {/* BACKGROUND TEXTURE */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(#1C0770 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-8 pt-12 relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-end mb-12 px-2">
            <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1C0770]/20 italic flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#3A9AFF] animate-pulse" />Active
                </span>
                <h1 className="text-3xl font-[1000] uppercase italic text-[#1C0770] tracking-tighter leading-none">
                   Mission <span className="text-[#3A9AFF]">Control.</span>
                </h1>
            </div>
            <div className="text-right hidden sm:block leading-tight">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 italic">Target Niche</span>
                <span className="text-[11px] font-bold text-[#1C0770] uppercase block">{roadmap.niche}</span>
            </div>
        </div>

        {/* PROGRESS HUD - Refined Module Style */}
        <div className="mb-16">
            <ProgressBar progress={progress} completedCount={completedCount} />
        </div>

        <AnimatePresence mode="wait">
          {isMissionComplete ? (
            <motion.div 
              key="new-op-portal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 p-12 bg-white rounded-[3rem] border-[2.5px] border-[#1C0770] shadow-sm relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                <div className="bg-gray-50 text-[#1C0770]/40 px-5 py-2 rounded-full border border-gray-100 text-[10px] font-black uppercase tracking-[0.5em] italic">
                  Mission Secured // Deploy New Directive
                </div>
                <h2 className="text-5xl font-[1000] uppercase italic text-[#1C0770] tracking-tighter leading-none">
                  Initiate <span className="text-[#3A9AFF]">New Mission.</span>
                </h2>

                <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4 pt-4">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1C0770]/20 group-focus-within:text-[#3A9AFF] transition-colors" size={20} />
                    <input 
                      value={newNiche}
                      onChange={(e) => setNewNiche(e.target.value)}
                      placeholder="ENTER NEW NICHE..."
                      className="w-full bg-[#FDFCF8] border-[2px] border-[#1C0770] p-5 pl-16 rounded-2xl font-bold text-sm outline-none focus:border-[#3A9AFF] transition-all uppercase"
                    />
                  </div>
                  <button 
                    onClick={() => newNiche && reset(newNiche)}
                    className="bg-[#1C0770] text-white px-10 py-5 rounded-2xl font-[1000] uppercase italic text-xs tracking-widest hover:bg-[#261CC1] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-[#1C0770]/10"
                  >
                    <Sparkles size={18} className="text-[#F1FF5E]" /> Deploy
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="mb-16 flex justify-center">
                 <div className="inline-flex items-center gap-4 px-8 py-3 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md transition-all">
                    <div className="relative">
                        <Activity size={16} className="text-[#3A9AFF] relative z-10" />
                        <div className="absolute inset-0 bg-[#3A9AFF]/20 rounded-full animate-ping opacity-20" />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] font-[1000] uppercase italic tracking-[0.2em] text-[#1C0770]">
                            {roadmap.niche}
                        </span>
                        <div className="w-px h-3 bg-gray-100" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1C0770]/20 italic">Active Mission</span>
                    </div>
                 </div>
            </div>
          )}
        </AnimatePresence>

        {/* ROADMAP SECTION */}
        <div className="flex items-center gap-6 mb-12 px-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1C0770]/20 italic">Mission Roadmap Grid</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {roadmap.days.map((day) => (
            <RoadmapCard 
              key={day.dayNumber}
              day={day} 
              onStart={onStart} 
              onToggle={toggleDay} 
              onEdit={(d) => { setActiveDay(d); setModalType('edit'); }}
              onShots={(d) => { setActiveDay(d); setModalType('visuals'); }}
              onArchitect={handleArchitectHooks}
            />
          ))}
        </div>

        {/* SYSTEM ABORT */}
        <div className="mt-32 flex justify-center">
          <button 
            onClick={() => window.confirm("Reset System Archive?") && reset()}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-[#1C0770]/20 hover:text-red-400 transition-all"
          >
            <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-700" /> 
            RESET
          </button>
        </div>
      </div>

      {/* MODALS */}
      {modalType === 'edit' && activeDay && (
        <EditModal day={activeDay} onClose={() => { setActiveDay(null); setModalType(null); }} onSave={handleEditSave} />
      )}
      {modalType === 'visuals' && activeDay && (
        <VisualsModal day={activeDay} onClose={() => { setActiveDay(null); setModalType(null); }} />
      )}
      {showHookModal && (
        <HookArchitectModal data={hookData} loading={isHookLoading} onClose={() => { setShowHookModal(false); setHookData(null); }} />
      )}
    </div>
  );
}