import React from 'react';
import { useProgressStore } from '../store';
import { CheckCircle, Circle } from 'lucide-react';

const Progress = () => {
  const { currentDay, completedSessions, subscriptionDays } = useProgressStore();

  const weeks = Array.from(
    { length: Math.ceil(subscriptionDays / 7) },
    (_, i) => i + 1
  );

  const getWeekProgress = (week: number) => {
    const startDay = (week - 1) * 7 + 1;
    const endDay = Math.min(week * 7, subscriptionDays);
    const completedInWeek = completedSessions.filter(
      day => day >= startDay && day <= endDay
    ).length;
    return (completedInWeek / (endDay - startDay + 1)) * 100;
  };

  const getWeekTitle = (week: number) => {
    switch (week) {
      case 1: return "Transformação Profunda da Mente";
      case 2: return "Bloqueio de Desejos por Comida";
      case 3: return "Novos Hábitos Alimentares";
      case 4: return "Remoção de Crenças Tóxicas";
      default: return "Reforço da Transformação Mental";
    }
  };

  return (
    <div className="min-h-screen p-6 dark:text-white">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sua Jornada</h1>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Progresso Total</span>
            <span className="text-purple-600">
              {Math.round((completedSessions.length / subscriptionDays) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(completedSessions.length / subscriptionDays) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {weeks.map((week) => (
            <div
              key={week}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
            >
              <h3 className="font-semibold mb-2">Semana {week}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {getWeekTitle(week)}
              </p>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const day = (week - 1) * 7 + i + 1;
                  if (day > subscriptionDays) return null;
                  
                  return (
                    <div
                      key={day}
                      className="flex flex-col items-center"
                    >
                      <div className="text-sm mb-1">{day}</div>
                      {completedSessions.includes(day) ? (
                        <CheckCircle className="text-purple-600" size={20} />
                      ) : (
                        <Circle
                          className="text-gray-300 dark:text-gray-600"
                          size={20}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;