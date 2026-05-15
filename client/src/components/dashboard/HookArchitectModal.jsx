import React from 'react';
import { Copy, X, Zap, Image as ImageIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HookArchitectModal({ data, onClose, loading }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: add toast here
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#362F4F]/60 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        /* Removed 2D shadow, added rounded-3xl and scrollbar-hide */
        className="bg-white border-[3px] border-[#362F4F] w-full max-w-2xl overflow-hidden rounded-[2.5rem] shadow-xl"
      >
        {/* Header - Added rounded-t */}
        <div className="bg-[#362F4F] p-5 flex justify-between items-center border-b-[3px] border-[#362F4F]">
          <div className="flex items-center gap-3 text-[#E4FF30]">
            <Zap size={18} fill="currentColor" className="animate-pulse" />
            <h2 className="font-black uppercase italic tracking-widest text-sm text-white">Viral Architect</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-[#E4FF30] transition-colors">
            <X size={24}/>
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto scrollbar-hide">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4 text-[#362F4F]">
              <Sparkles className="animate-spin text-[#008BFF]" size={40} />
              <p className="font-black italic uppercase tracking-widest text-xs">Simulating Viral Outcomes...</p>
            </div>
          ) : data ? (
            <>
              {/* Hooks Section */}
              <section>
                <h3 className="text-[10px] font-black uppercase text-[#362F4F]/40 mb-4 tracking-[0.4em] flex items-center gap-2">
                  <div className="h-1 w-1 bg-[#362F4F]/40" /> Retension Hooks
                </h3>
                <div className="grid gap-3">
                  {data.hooks.map((hook, i) => (
                    /* Added rounded-2xl */
                    <div key={i} className="group relative border-2 border-[#362F4F] p-5 bg-[#FDFCF8] hover:bg-[#008BFF]/5 transition-all rounded-2xl overflow-hidden">
                      <p className="text-[11px] md:text-xs font-black text-[#362F4F] pr-12 leading-relaxed italic">"{hook}"</p>
                      <button 
                        onClick={() => copyToClipboard(hook)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 hover:bg-[#362F4F] hover:text-[#E4FF30] transition-all rounded-xl border border-[#362F4F]/10 text-[#362F4F]/30"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Thumbnails Section */}
              <section>
                <h3 className="text-[10px] font-black uppercase text-[#362F4F]/40 mb-4 tracking-[0.4em] flex items-center gap-2">
                  <div className="h-1 w-1 bg-[#362F4F]/40" /> Thumbnail Intelligence
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.thumbnails.map((thumb, i) => (
                    /* Added rounded-3xl */
                    <div key={i} className="border-[3px] border-[#362F4F] bg-[#362F4F] text-white flex flex-col justify-between rounded-3xl overflow-hidden shadow-lg">
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3 text-[#E4FF30]">
                          <ImageIcon size={14} />
                          <span className="text-[9px] font-black uppercase tracking-widest italic">Option 0{i+1}</span>
                        </div>
                        <p className="text-[11px] font-bold leading-relaxed mb-6 opacity-90 italic">"{thumb.concept}"</p>
                      </div>
                      <div className="bg-[#008BFF] text-white p-3 text-center font-black text-[10px] uppercase italic tracking-widest">
                        Overlay: {thumb.overlay}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : null}
        </div>
      </motion.div>

      {/* Global CSS for scrollbar hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}