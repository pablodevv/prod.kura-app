import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Headphones, BarChart2, Settings } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/session', icon: Headphones, label: 'Sessão' },
    { path: '/progress', icon: BarChart2, label: 'Progresso' },
    { path: '/settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center justify-center w-full h-full
              ${location.pathname === path 
                ? 'text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;