import React, { useState } from 'react';
import axios from 'axios';
import { Zap } from 'lucide-react';

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onAuthSuccess(res.data.user);
    } catch (err) {
      alert(err.response?.data?.error || "Auth Failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="bg-white border-4 border-black p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
        <h2 className="text-3xl font-black uppercase mb-6 italic text-[#E63946] flex items-center gap-2">
          <Zap className="fill-[#E63946]" /> {isLogin ? 'Access Portal' : 'Join Agency'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input 
              className="w-full border-4 border-black p-3 font-bold outline-none focus:bg-yellow-100"
              placeholder="Name" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          )}
          <input 
            className="w-full border-4 border-black p-3 font-bold outline-none focus:bg-yellow-100"
            placeholder="Email" 
            type="email"
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            className="w-full border-4 border-black p-3 font-bold outline-none focus:bg-yellow-100"
            placeholder="Password" 
            type="password"
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          <button className="w-full bg-black text-white py-4 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(230,57,70,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="mt-6 text-xs font-black uppercase border-b-2 border-black"
        >
          {isLogin ? 'Need a mission? Sign Up' : 'Already an agent? Login'}
        </button>
      </div>
    </div>
  );
}