import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const useMission = (user, setUser) => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  // FIX: API base URL properly handle karo
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user) fetchUserRoadmap();
  }, [user]);

  const fetchUserRoadmap = async () => {
    const token = localStorage.getItem('token'); // Token hamesha call ke andar lo
    try {
      const res = await axios.get(`${API_BASE_URL}/api/roadmaps/my-roadmap`, {
        headers: { 'x-auth-token': token }
      });
      if (res.data) setRoadmap(res.data);
    } catch (err) { 
      console.log("Mission Log: Idle."); 
    }
  };

  // --- PROGRESS CALCULATION (THE FIX) ---
  // useMemo ensure karta hai ki jaise hi roadmap state badlegi, progress bar update hoga
  const progress = useMemo(() => {
    if (!roadmap || !roadmap.days || roadmap.days.length === 0) return 0;
    const completed = roadmap.days.filter(d => d.completed).length;
    return Math.round((completed / roadmap.days.length) * 100);
  }, [roadmap]);

  const toggleDay = async (dayNumber) => {
    if (!roadmap) return;
    const token = localStorage.getItem('token');

    try {
      const res = await axios.patch(`${API_BASE_URL}/api/roadmaps/${roadmap._id}/check-day`, 
        { dayNumber }, 
        { headers: { 'x-auth-token': token } }
      );

      if (res.data) {
        // Spread operator is critical for React to see the object changed
        setRoadmap({ ...res.data }); 
        console.log(`Sync Success: Day ${dayNumber}`);
      }
    } catch (err) { 
      console.error("Sync Error:", err.response?.data || err.message); 
    }
  };

  const handleGenerate = async (niche) => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/roadmaps/generate`, 
        { niche }, { headers: { 'x-auth-token': token } }
      );
      setRoadmap({ ...res.data });
      return true;
    } catch (err) { 
      alert("AI Link Failed."); 
      return false;
    } finally { 
      setLoading(false); 
    }
  };

  const updateDayScript = async (dayNumber, newScript) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(`${API_BASE_URL}/api/roadmaps/${roadmap._id}/update-script`, 
        { dayNumber, newScript }, 
        { headers: { 'x-auth-token': token } }
      );
      if (res.data) setRoadmap({ ...res.data });
      return true;
    } catch (err) {
      console.error("Sync Failed.");
      return false;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setRoadmap(null);
  };

  return { roadmap, loading, progress, handleGenerate, toggleDay, logout, setRoadmap, updateDayScript };
};