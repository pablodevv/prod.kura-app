import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Moon, Sparkles } from 'lucide-react';
import { useProgressStore } from '../store';

const Home = () => {
  const navigate = useNavigate();
  const { currentDay, completedSessions, subscriptionDays } = useProgressStore();

  return (
    <div className="min-h-screen p-6 dark:text-white">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Kure</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sua jornada personalizada de transformação através da hipnoterapia
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
          <div className="flex items-center mb-4">
            <Brain className="text-purple-600 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Sua Sessão de Hoje</h2>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300">
              Dia {currentDay} de {subscriptionDays}
            </p>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(completedSessions.length / subscriptionDays) * 100}%`,
                }}
              />
            </div>
          </div>
          <button
            onClick={() => navigate('/session')}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Iniciar Sessão Noturna
          </button>
        </div>

        <div className="grid gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <Moon className="text-purple-600 mr-2" size={20} />
              <h3 className="font-semibold">Sessões Noturnas</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ouça antes de dormir para reprogramação mental profunda
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <Sparkles className="text-purple-600 mr-2" size={20} />
              <h3 className="font-semibold">Programa Personalizado</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Sessões adaptadas ao seu perfil e objetivos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
