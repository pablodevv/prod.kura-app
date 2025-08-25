import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useThemeStore, useProgressStore } from './store';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Session from './pages/Session';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

const RouteHandler = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const duration = searchParams.get('duration');

  useEffect(() => {
    if (duration) {
      const days = parseInt(duration, 10);
      if ([7, 30, 90].includes(days)) {
        useProgressStore.setState({ 
          subscriptionDays: days,
          currentDay: 1,
          completedSessions: []
        });
      }
    }
  }, [duration]);

  return null;
};

function App() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <BrowserRouter>
        <RouteHandler />
        <Header />
        <div className="pt-16 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/session" element={<Session />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
