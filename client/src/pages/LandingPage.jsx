import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Lightbulb, PencilLine, Rocket, ChevronRight, Activity, Command } from 'lucide-react';

// BRAND NEW MINIMAL LOGO IDENTITY COMPONENT (Solid Geometric Vectors)
// 100% ACCURATE TRACKING FOR YOUR OFFICIAL BRAND LOGO
const CreatorFlowLogo = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 120 70" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Asli C Shape aur Integrated Tactical Lightning F Bolt */}
    <path 
      d="M50 10H18C8 10 0 18 0 35C0 52 8 60 18 60H50V46H22C17 46 14 43 14 35C14 27 17 24 22 24H44L50 10Z" 
      fill="#E4FF30" 
    />
    <path 
      d="M72 10H110V24H82L76 38H100V52H68L62 66H48L58 42H44L60 10H72Z" 
      fill="#E4FF30" 
    />
  </svg>
);

const TacticalTag = ({ text }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full shadow-sm">
    <div className="w-1 h-1 rounded-full bg-[#3A9AFF]" />
    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#362F4F]/60 whitespace-nowrap">{text}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, accent }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="relative p-6 sm:p-10 bg-white/60 backdrop-blur-xl border border-gray-100 rounded-[1.5rem] sm:rounded-[2.5rem] transition-all duration-500 group shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
  >
    <div className="mb-6 sm:mb-8 w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-50 transition-transform group-hover:rotate-6">
      <Icon size={20} style={{ color: accent }} strokeWidth={2} />
    </div>
    <h3 className="text-lg sm:text-xl font-black uppercase italic text-[#362F4F] mb-3 sm:mb-4 tracking-tight leading-none">{title}</h3>
    <p className="text-[13px] sm:text-[14px] font-bold text-[#362F4F]/30 leading-relaxed italic tracking-tight">{desc}</p>
  </motion.div>
);

export default function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen bg-[#FDFCF8] selection:bg-[#F1FF5E] selection:text-[#362F4F] font-sans overflow-x-hidden">
      
      {/* REFINED MESH BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] bg-[#3A9AFF]/5 rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#F1FF5E]/10 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#362F4F 0.5px, transparent 0.5px)`, backgroundSize: '20px 20px' }} />
      </div>

      {/* SLEEK CAPSULE NAV */}
      <nav className="fixed top-3 sm:top-6 left-0 w-full z-[100] px-3 sm:px-6">
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/80 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* INTEGRATED: Upgraded default container with new minimalist logo asset */}
            <div className="bg-[#362F4F] p-1.5 sm:p-2 rounded-xl shadow-md flex-shrink-0 flex items-center justify-center">
              <CreatorFlowLogo className="w-[18px] h-[12px] sm:w-[24px] sm:h-[16px]" />
            </div>
            <span className="font-black text-sm sm:text-lg italic uppercase tracking-tighter text-[#362F4F] truncate">
              CREATOR<span className="text-[#3A9AFF] sm:text-[#362F4F]">FLOW.</span>
              <span className="hidden sm:inline text-[#362F4F]/20 font-mono text-[10px] ml-1 font-bold tracking-widest">PROTOCOL</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
            <button onClick={onEnter} className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-[#362F4F]/40 hover:text-[#362F4F] transition-colors">Protocol</button>
            <button onClick={onEnter} className="bg-[#362F4F] text-white px-3 sm:px-6 py-2 rounded-lg sm:rounded-xl font-black uppercase italic text-[8px] sm:text-[10px] tracking-widest hover:bg-[#251F3B] transition-all shadow-lg shadow-[#362F4F]/10 whitespace-nowrap">Access Terminal</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION: REFINED SCALE */}
      <header className="relative pt-32 sm:pt-48 pb-20 sm:pb-32 px-4 sm:px-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <TacticalTag text="v2.6 Stable" />
            <TacticalTag text="Neural Sync Active" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-[1000] uppercase italic text-[#362F4F] leading-[0.95] sm:leading-[0.9] tracking-tighter">
              Stop <span className="text-[#362F4F]/10">Overthinking.</span> <br />
              <span className="text-[#3A9AFF] relative inline-block mt-1 sm:mt-0">
                Start Creating.
                <div className="absolute -bottom-1 left-0 w-full h-1.5 sm:h-2 bg-[#F1FF5E] rounded-full opacity-50 blur-[2px] -z-10" />
              </span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl font-bold text-[#362F4F]/30 italic max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
              We turn your blank screen into a structured content roadmap. Designed for creators who want to build, not just browse.
            </p>
          </motion.div>

          <div className="pt-4 sm:pt-6 flex flex-col items-center gap-6 sm:gap-8">
            <button onClick={onEnter} className="group relative bg-[#F1FF5E] text-[#362F4F] px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-[2rem] text-lg sm:text-2xl font-[1000] uppercase italic shadow-[0_20px_40px_-10px_rgba(241,255,94,0.4)] hover:shadow-[0_40px_80px_-10px_rgba(241,255,94,0.5)] hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 sm:gap-4 border-[2px] border-[#362F4F]">
              Initiate Mission <ChevronRight size={22} className="sm:w-[28px] sm:h-[28px]" strokeWidth={3} />
            </button>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-10 opacity-20">
              {['Ideate', 'Script', 'Analyze'].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                  <Command size={10} className="sm:w-[12px] sm:h-[12px] text-[#362F4F]" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-black uppercase tracking-[0.4em] text-[#362F4F]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* REFINED FEATURE GRID */}
      <section className="px-4 sm:px-10 py-12 sm:py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <FeatureCard 
            icon={Lightbulb} 
            title="Idea Finder" 
            desc="30 days of data-locked topics. Zero blank screen anxiety." 
            accent="#E4FF30" 
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
            accent="#362F4F" 
          />
        </div>
      </section>

      {/* FINAL CTA: MEDIUM FINISH */}
      <section className="py-16 sm:py-32 px-4 sm:px-10">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }} 
          initial={{ opacity: 0, y: 20 }} 
          viewport={{ once: true }} 
          className="max-w-5xl mx-auto relative rounded-3xl sm:rounded-[3.5rem] bg-[#362F4F] p-8 sm:p-20 text-center overflow-hidden shadow-2xl border-[3px] border-[#362F4F]"
        >
          <div className="absolute top-0 right-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-[#3A9AFF]/10 blur-[80px] sm:blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-[#F1FF5E]/5 blur-[80px] sm:blur-[120px]" />
          
          <div className="relative z-10 space-y-6 sm:space-y-10">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-[1000] uppercase italic text-white leading-none tracking-tighter">Ready To <br /><span className="text-[#F1FF5E]">Launch?</span></h2>
            <button onClick={onEnter} className="bg-white text-[#362F4F] px-8 sm:px-12 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-black uppercase italic hover:bg-[#F1FF5E] transition-all shadow-xl font-sans tracking-widest">Access Terminal</button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER SECTION BRAND INTEGRATED */}
      <footer className="py-12 sm:py-16 text-center border-t border-gray-100/50 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2 opacity-30">
          <CreatorFlowLogo className="w-5 h-3" />
          <p className="font-[1000] italic text-lg sm:text-xl uppercase tracking-tighter text-[#362F4F]">CreatorFlow.</p>
        </div>
        <p className="text-[8px] sm:text-[9px] font-mono font-black uppercase tracking-[0.6em] text-gray-400">Terminal V2.6 // Est. 2026</p>
      </footer>
    </div>
  );
}