import React from 'react';
import { Zap } from 'lucide-react';

export default function Onboarding({ niche, setNiche, handleGenerate, loading }) {
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="bg-white border-4 border-black p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full">
        <h2 className="text-3xl font-black uppercase mb-6 italic flex items-center gap-2">
          <Zap className="text-yellow-400 fill-yellow-400" /> Start Mission
        </h2>
        <input 
          className="w-full border-4 border-black p-4 mb-6 text-xl font-bold outline-none focus:ring-4 ring-red-100" 
          placeholder="e.g. Cinematic Cooking" 
          value={niche} 
          onChange={(e) => setNiche(e.target.value)} 
        />
        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="w-full bg-[#E63946] text-white py-4 font-black uppercase text-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
        >
          {loading ? "ANALYZING..." : "Initialize Roadmap"}
        </button>
      </div>
    </div>
  );
}