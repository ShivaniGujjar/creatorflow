import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Sparkles, Lightbulb, PencilLine, Rocket, ChevronRight, Activity, Command } from 'lucide-react';

const TacticalTag = ({ text }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full shadow-sm">
    <div className="w-1 h-1 rounded-full bg-[#3A9AFF]" />
    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#1C0770]/60">{text}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, accent }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="relative p-10 bg-white/60 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] transition-all duration-500 group shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
  >
    <div className="mb-8 w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-50 transition-transform group-hover:rotate-6">
      <Icon size={20} style={{ color: accent }} strokeWidth={2} />
    </div>
    <h3 className="text-xl font-black uppercase italic text-[#1C0770] mb-4 tracking-tight leading-none">{title}</h3>
    <p className="text-[14px] font-bold text-[#1C0770]/30 leading-relaxed italic tracking-tight">{desc}</p>
  </motion.div>
);

export default function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen bg-[#FDFCF8] selection:bg-[#F1FF5E] selection:text-[#1C0770] font-sans">
      
      {/* REFINED MESH BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#3A9AFF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] bg-[#F1FF5E]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#1C0770 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />
      </div>

      {/* SLEEK CAPSULE NAV */}
      <nav className="fixed top-6 left-0 w-full z-[100] px-6">
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl px-6 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#1C0770] p-1.5 rounded-lg shadow-md">
              <Zap size={16} className="text-[#F1FF5E]" fill="currentColor" />
            </div>
            <span className="font-black text-lg italic uppercase tracking-tighter text-[#1C0770]">CreatorFlow.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onEnter} className="text-[10px] font-black uppercase tracking-widest text-[#1C0770]/40 hover:text-[#1C0770] transition-colors">Protocol</button>
            <button onClick={onEnter} className="bg-[#1C0770] text-white px-6 py-2 rounded-xl font-black uppercase italic text-[10px] tracking-widest hover:bg-[#261CC1] transition-all shadow-lg shadow-[#1C0770]/10">Access Terminal</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION: REFINED SCALE */}
      <header className="relative pt-48 pb-32 px-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-3">
            <TacticalTag text="v2.6 Stable" />
            <TacticalTag text="Neural Sync Active" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-[1000] uppercase italic text-[#1C0770] leading-[0.9] tracking-tighter">
              Stop <span className="text-[#1C0770]/10">Overthinking.</span> <br />
              <span className="text-[#3A9AFF] relative">
                Start Creating.
                <div className="absolute -bottom-1.5 left-0 w-full h-2 bg-[#F1FF5E] rounded-full opacity-50 blur-[2px] -z-10" />
              </span>
            </h1>
            <p className="text-lg md:text-xl font-bold text-[#1C0770]/30 italic max-w-xl mx-auto leading-relaxed">
              We turn your blank screen into a structured content roadmap. Designed for creators who want to build, not just browse.
            </p>
          </motion.div>

          <div className="pt-6 flex flex-col items-center gap-8">
            <button onClick={onEnter} className="group relative bg-[#F1FF5E] text-[#1C0770] px-12 py-6 rounded-[2rem] text-2xl font-[1000] uppercase italic shadow-[0_30px_60px_-10px_rgba(241,255,94,0.4)] hover:shadow-[0_40px_80px_-10px_rgba(241,255,94,0.5)] hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-4">
              Initiate Mission <ChevronRight size={28} strokeWidth={3} />
            </button>
            
            <div className="flex gap-10 opacity-20">
                {['Ideate', 'Script', 'Analyze'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <Command size={12} className="text-[#1C0770]" />
                        <span className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-[#1C0770]">{item}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </header>

      {/* REFINED FEATURE GRID */}
      <section className="px-10 py-20 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Lightbulb} 
            title="Idea Finder" 
            desc="30 days of data-locked topics. Zero blank screen anxiety." 
            accent="#F1FF5E" 
          />
          <FeatureCard 
            icon={PencilLine} 
            title="Script Mentor" 
            desc="Structured hooks and story-beats engineered for maximum retention." 
            accent="#3A9AFF" 
          />
          <FeatureCard 
            icon={Rocket} 
            title="Strategic HUD" 
            desc="Visualize your creative velocity with a high-fidelity dashboard." 
            accent="#1C0770" 
          />
        </div>
      </section>

      {/* FINAL CTA: MEDIUM FINISH */}
      <section className="py-32 px-10">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }} 
          initial={{ opacity: 0, y: 20 }} 
          viewport={{ once: true }} 
          className="max-w-5xl mx-auto relative rounded-[3.5rem] bg-[#1C0770] p-20 text-center overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3A9AFF]/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F1FF5E]/5 blur-[120px]" />
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-5xl md:text-7xl font-[1000] uppercase italic text-white leading-none tracking-tighter">Ready To <br /><span className="text-[#F1FF5E]">Launch?</span></h2>
            <button onClick={onEnter} className="bg-white text-[#1C0770] px-12 py-4 rounded-xl text-sm font-black uppercase italic hover:scale-105 transition-all shadow-xl">Access Terminal</button>
          </div>
        </motion.div>
      </section>

      <footer className="py-16 text-center border-t border-gray-50/50">
        <p className="font-[1000] italic text-xl uppercase tracking-tighter text-[#1C0770]/10">CreatorFlow.</p>
        <p className="text-[9px] font-mono font-black uppercase tracking-[0.6em] mt-4 text-gray-200">Terminal V2.6 // Est. 2026</p>
      </footer>
    </div>
  );
}