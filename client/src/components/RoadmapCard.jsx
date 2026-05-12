import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Edit3, Camera, Lock, Activity } from 'lucide-react';

export default function RoadmapCard({ day, onStart, onToggle, onEdit, onShots }) {
  const { dayNumber, title, hook, completed } = day;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      {/* 1. Offset Shadow Effect */}
      <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />

      {/* 2. Main Card Body */}
      <div className={`relative bg-white border-[3px] border-black p-6 h-full flex flex-col transition-colors ${completed ? 'bg-gray-50/50' : 'bg-white'}`}>
        
        {/* Header: Day Sticker & Checkbox */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="bg-black text-white px-3 py-1 text-[10px] font-[1000] uppercase tracking-widest italic w-fit border-2 border-black">
              DAY 0{dayNumber}
            </span>
            <div className="h-1.5 w-12 bg-[#E63946] mt-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]" />
          </div>

          <button 
            onClick={() => onToggle(dayNumber)}
            className={`p-1.5 border-2 border-black transition-all shadow-[3px_3px_0px_0px_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 ${
              completed ? 'bg-[#4ADE80] text-black' : 'bg-white text-gray-200 hover:text-black'
            }`}
          >
            <CheckCircle size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Title & Viral Hook Section */}
        <div className="flex-grow mb-6">
          <h3 className={`text-xl font-[1000] uppercase italic tracking-tighter leading-tight mb-4 ${completed ? 'text-gray-400 line-through' : 'text-black'}`}>
            {title}
          </h3>
          <div className="bg-[#E0F2FE] border-l-4 border-black p-4 group-hover:border-[#E63946] transition-colors relative">
            <span className="absolute -top-2.5 left-4 bg-white border-2 border-black px-2 py-0.5 text-[8px] font-black uppercase italic">Viral Hook</span>
            <p className="text-[11px] font-bold text-black/80 leading-relaxed italic line-clamp-3">"{hook}"</p>
          </div>
        </div>

        {/* TACTICAL TOOLBAR: Edit & Visuals */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button 
            onClick={() => onEdit(day)} 
            className="flex items-center justify-center gap-2 py-3 border-[3px] border-black bg-white hover:bg-[#FFD700] transition-all text-[10px] font-black uppercase shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 btn-pop"
          >
            <Edit3 size={14} strokeWidth={3} /> Edit Script
          </button>
          
          <button 
            onClick={() => onShots(day)} 
            className="flex items-center justify-center gap-2 py-3 border-[3px] border-black bg-white hover:bg-[#2DD4BF] transition-all text-[10px] font-black uppercase shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 btn-pop"
          >
            <Camera size={14} strokeWidth={3} /> Visuals
          </button>
        </div>

        {/* MAIN ACTION: Launch Prompt */}
        <button 
          onClick={() => onStart(day)}
          disabled={completed}
          className={`w-full py-4 border-[3px] border-black font-[1000] uppercase text-xs flex items-center justify-center gap-3 transition-all ${
            completed 
            ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' 
            : 'bg-[#A855F7] text-white shadow-[6px_6px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
          }`}
        >
          {completed ? <Lock size={16} /> : <Play size={16} fill="currentColor" />}
          {completed ? 'MISSION SECURED' : 'Launch Teleprompter'}
        </button>

        {/* Footer Status */}
        {!completed && (
          <div className="mt-4 flex items-center justify-center gap-2 border-t-2 border-black/5 pt-3">
             <Activity size={12} className="text-[#E63946] animate-pulse" />
             <span className="text-[9px] font-black uppercase tracking-widest text-[#E63946] italic">System Directive Active</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}