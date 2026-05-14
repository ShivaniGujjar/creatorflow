import React, { useState } from 'react';
import { useMission } from './hooks/useMission';

// Components 
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import ProgressPage from './pages/ProgressPage';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Teleprompter from './components/dashboard/Teleprompter';
import LoadingScreen from './components/ui/LoadingScreen';
import LandingPage from './pages/LandingPage'; // 1. Import Landing Page

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [view, setView] = useState('dashboard');
  const [activeScript, setActiveScript] = useState(null);
  
  // 2. State to track if we are on landing or auth/dashboard
  const [showLanding, setShowLanding] = useState(!user); 

  const { 
    roadmap, 
    loading, 
    progress, 
    handleGenerate, 
    toggleDay, 
    logout, 
    setRoadmap, 
    updateDayScript 
  } = useMission(user, setUser);

  // 3. Landing Page First Flow
  if (showLanding && !user) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  // 4. Then Auth Flow
  if (!user) return <Auth onAuthSuccess={setUser} />;
  
  // 5. Then Loading
  if (loading) return <LoadingScreen progress={progress} />;

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#362F4F] font-sans selection:bg-[#E4FF30] selection:text-[#362F4F]">
      
      <Navbar user={user} roadmap={roadmap} logout={logout} setView={setView} />
      
      {activeScript && (
        <Teleprompter 
          day={activeScript} 
          onClose={() => setActiveScript(null)} 
        />
      )}

      <main className="max-w-7xl mx-auto">
        {view === 'progress' ? (
          <div className="p-4 md:p-8">
            <ProgressPage 
              roadmap={roadmap} 
              onBack={() => setView('dashboard')} 
            />
          </div>
        ) : !roadmap ? (
          <Onboarding onGenerate={handleGenerate} />
        ) : (
          <Dashboard 
            roadmap={roadmap} 
            progress={progress} 
            toggleDay={toggleDay} 
            onStart={setActiveScript}
            reset={(newNiche) => {
              if (newNiche) {
                handleGenerate(newNiche);
              } else {
                setRoadmap(null);
              }
            }}
            updateDayScript={updateDayScript}
          />
        )}
      </main>

      <div className="fixed inset-0 border-[6px] border-[#362F4F]/5 pointer-events-none z-[9999]" />
    </div>
  );
}