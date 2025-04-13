import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store';
import AudioPlayer from '../components/AudioPlayer';

const Session = () => {
  const navigate = useNavigate();
  const { currentDay, completedSessions, subscriptionDays } = useProgressStore();
  
  useEffect(() => {
    if (currentDay > subscriptionDays) {
      navigate('/progress');
    }
  }, [currentDay, subscriptionDays, navigate]);

  const sessionData = {
    id: currentDay,
    title: `Dia ${currentDay}: ${getSessionTitle(currentDay)}`,
    description: getSessionDescription(currentDay),
    audioUrl: `https://hipnose-kura.netlify.app/src/sessions/day${currentDay}.mp3`, // Replace with actual audio URL
    duration: "20:00",
  };

  const handleSessionComplete = () => {
    if (!completedSessions.includes(currentDay)) {
      useProgressStore.setState((state) => ({
        completedSessions: [...state.completedSessions, currentDay],
        currentDay: Math.min(currentDay + 1, subscriptionDays),
      }));
      
      // Navigate to progress page if all sessions are completed
      if (currentDay >= subscriptionDays) {
        navigate('/progress');
      }
    }
  };

  return (
    <div className="min-h-screen p-6 dark:text-white">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{sessionData.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {sessionData.description}
          </p>
          
          <AudioPlayer
            audioUrl={sessionData.audioUrl}
            sessionId={sessionData.id}
            onComplete={handleSessionComplete}
          />
          
          <div className="mt-6 space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p className="flex items-center">
              <span className="mr-2">✓</span>
              Encontre um lugar calmo e confortável
            </p>
            <p className="flex items-center">
              <span className="mr-2">✓</span>
              Use fones de ouvido para melhor experiência
            </p>
            <p className="flex items-center">
              <span className="mr-2">✓</span>
              Relaxe e deixe a hipnose fazer seu trabalho
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function getSessionTitle(day: number): string {
  const week = Math.ceil(day / 7);
  switch (week) {
    case 1: return "Transformação Profunda da Mente";
    case 2: return "Bloqueio de Desejos por Comida";
    case 3: return "Novos Hábitos Alimentares";
    case 4: return "Remoção de Crenças Tóxicas";
    default: return "Reforço da Transformação Mental";
  }
}

function getSessionDescription(day: number): string {
  const week = Math.ceil(day / 7);
  switch (week) {
    case 1:
      return "Hoje vamos iniciar sua transformação mental, alterando profundamente sua percepção sobre alimentação e saúde.";
    case 2:
      return "Nesta sessão, trabalharemos no controle da compulsão alimentar e no bloqueio de desejos por alimentos não saudáveis.";
    case 3:
      return "Vamos estabelecer novos padrões alimentares saudáveis e fortalecer sua conexão com escolhas nutritivas.";
    case 4:
      return "Hoje focaremos na libertação mental, removendo crenças limitantes que impedem sua evolução.";
    default:
      return "Esta sessão reforçará sua transformação mental e fortalecerá seus novos hábitos saudáveis.";
  }
}

export default Session;
