import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore, useProgressStore } from '../store';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { isDark, toggle } = useThemeStore();
  const subscriptionDays = useProgressStore((state) => state.subscriptionDays);
  const navigate = useNavigate();

  const handleSubscriptionChange = (days: number) => {
    useProgressStore.setState({ 
      subscriptionDays: days,
      currentDay: 1,
      completedSessions: []
    });
    navigate('/?duration=' + days);
  };

  return (
    <div className="min-h-screen p-6 dark:text-white">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">Configurações</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">Tema</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Alterar entre tema claro e escuro
                </p>
              </div>
              <button
                onClick={toggle}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                {isDark ? (
                  <Sun className="text-yellow-500" size={24} />
                ) : (
                  <Moon className="text-purple-600" size={24} />
                )}
              </button>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Settings;
