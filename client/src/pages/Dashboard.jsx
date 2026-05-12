import React, { useState } from 'react';
import RoadmapCard from '../components/RoadmapCard';
import ProgressBar from '../components/ProgressBar';
import EditModal from '../components/EditModal';
import VisualsModal from '../components/VisualsModal';

export default function Dashboard({ roadmap, progress, toggleDay, onStart, reset, updateDayScript }) {
  // --- CENTRAL MODAL STATE ---
  const [activeDay, setActiveDay] = useState(null); 
  const [modalType, setModalType] = useState(null); // 'edit' ya 'visuals'

  if (!roadmap || !roadmap.days) return null;

  const completedCount = roadmap.days.filter(d => d.completed).length;

  // --- SAVE HANDLER ---
  const handleEditSave = async (dayNumber, newScript) => {
    const success = await updateDayScript(dayNumber, newScript);
    if (success) {
      setActiveDay(null);
      setModalType(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      
      <ProgressBar progress={progress} completedCount={completedCount} />

      {/* Mission Niche Sticker */}
      {/* Dashboard.jsx sticker section */}
<div className="relative mb-10 -rotate-1 group max-w-xl mx-auto">
  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1" />
  <div className="relative bg-[#FACC15] border-[3px] border-black py-4 px-6 flex flex-col items-center text-center">
    <div className="flex items-center gap-2 mb-1 opacity-40">
       <span className="h-1 w-1 bg-black rounded-full" />
       <span className="text-[8px] font-black uppercase italic tracking-[0.2em]">Objective Directive</span>
       <span className="h-1 w-1 bg-black rounded-full" />
    </div>
    <h3 className="text-base md:text-lg font-[1000] uppercase italic tracking-tighter text-black leading-tight">
      {roadmap.niche}
    </h3>
  </div>
</div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {roadmap.days.map((day) => (
          <RoadmapCard 
            key={day.dayNumber}
            day={day} 
            onStart={onStart} 
            onToggle={toggleDay} 
            onEdit={(d) => { setActiveDay(d); setModalType('edit'); }}
            onShots={(d) => { setActiveDay(d); setModalType('visuals'); }}
          />
        ))}
      </div>

      {/* --- ACTUAL MODALS (REPLACING PLACEHOLDERS) --- */}
      {modalType === 'edit' && activeDay && (
        <EditModal 
          day={activeDay} 
          onClose={() => { setActiveDay(null); setModalType(null); }} 
          onSave={handleEditSave}
        />
      )}

      {modalType === 'visuals' && activeDay && (
        <VisualsModal 
          day={activeDay} 
          onClose={() => { setActiveDay(null); setModalType(null); }} 
        />
      )}

      {/* Reset Section */}
      <div className="mt-24 border-t-2 border-black/10 pt-10 flex justify-center">
        <button 
          onClick={() => window.confirm("Reset Mission?") && reset()}
          className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 hover:text-[#E63946] transition-colors"
        >
          System Abort / Reset
        </button>
      </div>
    </div>
  );
}