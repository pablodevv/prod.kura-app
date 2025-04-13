import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useProgressStore } from '../store';

interface AudioPlayerProps {
  audioUrl: string;
  sessionId: number;
  onComplete: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, sessionId, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<number>(0);
  const completedSessions = useProgressStore((state) => state.completedSessions);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        progressRef.current = audio.currentTime;

        // Mark session as complete when audio finishes
        if (audio.ended && !completedSessions.includes(sessionId)) {
          onComplete();
          setIsPlaying(false);
        }
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [sessionId, completedSessions, onComplete]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle any playback errors
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      progressRef.current = 0;
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatTime(currentTime)}
        </span>
        <div className="flex gap-4">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={resetAudio}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Reset"
          >
            <RotateCcw size={24} />
          </button>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatTime(duration)}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;