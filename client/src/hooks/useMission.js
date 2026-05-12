import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMission = (user, setUser) => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user) fetchUserRoadmap();
  }, [user]);

  const fetchUserRoadmap = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/roadmaps/my-roadmap', {
        headers: { 'x-auth-token': token }
      });
      if (res.data) setRoadmap(res.data);
    } catch (err) { console.log("Mission Log: Idle."); }
  };

  const handleGenerate = async (niche) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/roadmaps/generate', 
        { niche }, { headers: { 'x-auth-token': token } }
      );
      setRoadmap(res.data);
      return true;
    } catch (err) { 
      alert("AI Link Failed."); 
      return false;
    } finally { setLoading(false); }
  };

  const toggleDay = async (dayNumber) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/roadmaps/${roadmap._id}/check-day`, 
        { dayNumber }, { headers: { 'x-auth-token': token } }
      );
      setRoadmap(res.data);
    } catch (err) { console.error("Sync Error."); }
  };

  // --- YE NAYA FUNCTION HAI ---
  const updateDayScript = async (dayNumber, newScript) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/roadmaps/${roadmap._id}/update-script`, 
        { dayNumber, newScript }, 
        { headers: { 'x-auth-token': token } }
      );
      setRoadmap(res.data);
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

  const progress = roadmap?.days 
    ? Math.round((roadmap.days.filter(d => d.completed).length / roadmap.days.length) * 100) 
    : 0;

  return { roadmap, loading, progress, handleGenerate, toggleDay, logout, setRoadmap, updateDayScript };
};