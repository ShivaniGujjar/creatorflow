import React, { useState } from 'react';
import { useMission } from './hooks/useMission';

// Components
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProgressPage from './pages/ProgressPage';
import Auth from './pages/Auth';
import Teleprompter from './components/Teleprompter';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [view, setView] = useState('dashboard');
  const [activeScript, setActiveScript] = useState(null);

  // STEP 1: updateDayScript ko yahan hook se nikal lo
  const { roadmap, loading, progress, handleGenerate, toggleDay, logout, setRoadmap, updateDayScript } = useMission(user, setUser);

  if (!user) return <Auth onAuthSuccess={setUser} />;

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-black">
      <Navbar user={user} roadmap={roadmap} logout={logout} setView={setView} />
      
      {activeScript && <Teleprompter day={activeScript} onClose={() => setActiveScript(null)} />}

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {loading ? (
          <LoadingScreen progress={progress} />
        ) : view === 'progress' ? (
          <ProgressPage roadmap={roadmap} onBack={() => setView('dashboard')} />
        ) : (
          <Dashboard 
            roadmap={roadmap} 
            progress={progress} 
            toggleDay={toggleDay} 
            onStart={setActiveScript}
            reset={() => setRoadmap(null)}
            handleGenerate={handleGenerate}
            updateDayScript={updateDayScript} // STEP 2: Dashboard ko ye function pass kar do
          />
        )}
      </main>
    </div>
  );
}