import React, { useState } from 'react';
import axios from 'axios';
import { Zap, ShieldCheck, UserPlus, KeyRound, Eye, EyeOff } from 'lucide-react';

// AUTO-SWITCHING LOGIC
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal 
  ? 'http://localhost:5000' 
  : (import.meta.env.VITE_API_URL || 'https://creatorflow-gbci.onrender.com').replace(/\/$/, '');

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Eye toggle state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await axios.post(`${API_BASE_URL}${endpoint}`, formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      onAuthSuccess(res.data.user);
    } catch (err) {
      console.error("Auth Error:", err);
      alert(err.response?.data?.error || "Authentication Protocol Failed. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF8] p-4 relative overflow-hidden font-sans">
      {/* Background HUD Grid */}
      <div className="fixed inset-0 bg-[radial-gradient(#362F4F_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="relative w-full max-w-md">
        
        {/* Main Auth Card */}
        <div className="relative w-full bg-white border border-gray-100 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-12 flex flex-col items-center shadow-[0_40px_80px_-20px_rgba(54,47,79,0.1)] transition-all">
          
          {/* Header Section */}
          <div className="w-full mb-6 sm:mb-10 text-center">
            <div className="inline-flex bg-[#E4FF30] text-[#362F4F] p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-5 shadow-sm">
              {isLogin ? <ShieldCheck size={24} className="sm:w-[28px] sm:h-[28px]" strokeWidth={2.5} /> : <UserPlus size={24} className="sm:w-[28px] sm:h-[28px]" strokeWidth={2.5} />}
            </div>
            <div className="text-[9px] sm:text-[10px] font-black uppercase text-[#362F4F]/30 tracking-[0.4em] mb-2 italic">
              Terminal Access
            </div>
            <h2 className="text-3xl sm:text-4xl font-[1000] uppercase italic tracking-tighter text-[#362F4F] leading-none">
              {isLogin ? 'Access' : 'Join'} <span className="text-[#008BFF]">{isLogin ? 'Portal' : 'Portal'}</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-[#362F4F]/40 uppercase tracking-widest ml-4 italic">Agent Name</label>
                <input 
                  className="w-full bg-[#FDFCF8] border border-gray-100 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-[#008BFF] focus:ring-4 focus:ring-[#008BFF]/5 transition-all placeholder:text-gray-200"
                  placeholder="ENTER NAME" 
                  autoComplete="off"
                  required
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-[#362F4F]/40 uppercase tracking-widest ml-4 italic">Email Address</label>
              <input 
                className="w-full bg-[#FDFCF8] border border-gray-100 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-[#008BFF] focus:ring-4 focus:ring-[#008BFF]/5 transition-all placeholder:text-gray-200"
                placeholder="NAME@AGENCY.COM" 
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>

            {/* PASSWORD FIELD WITH INTEGRATED EYE TOGGLE */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-[#362F4F]/40 uppercase tracking-widest ml-4 italic">Secure Password</label>
              <div className="relative w-full">
                <input 
                  className="w-full bg-[#FDFCF8] border border-gray-100 p-3.5 sm:p-4 pr-12 sm:pr-14 rounded-xl sm:rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-[#008BFF] focus:ring-4 focus:ring-[#008BFF]/5 transition-all placeholder:text-gray-200"
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-[#362F4F]/40 hover:text-[#008BFF] transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                </button>
              </div>
            </div>

            {/* ULTIMATE INTERACTIVE BUTTON */}
            {/* Default state is Solid Yellow (image_ecb4db), Hover flips to Dark Navy (image_ecb4ba) */}
            <button 
              disabled={loading}
              className={`w-full bg-[#E4FF30] text-[#362F4F] py-4 sm:py-5 rounded-xl sm:rounded-2xl font-[1000] uppercase italic tracking-widest border-2 border-[#E4FF30] shadow-xl shadow-[#E4FF30]/10 hover:bg-[#362F4F] hover:text-[#E4FF30] hover:border-[#362F4F] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mt-4 group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <KeyRound size={18} className="text-[#362F4F] transition-colors duration-300 group-hover:text-[#E4FF30]" />
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
            </button>
          </form>

          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setShowPassword(false);
            }}
            className="mt-6 sm:mt-10 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#362F4F]/20 hover:text-[#008BFF] transition-all"
          >
            {isLogin ? 'Need a mission? Sign Up' : 'Already an agent? Login'}
          </button>
        </div>
      </div>
      
      <div className="fixed bottom-8 right-8 hidden md:block opacity-20">
        <div className="text-[10px] font-black uppercase tracking-[0.6em] text-[#362F4F]">CreatorFlow Security v3.1</div>
      </div>
    </div>
  );
}