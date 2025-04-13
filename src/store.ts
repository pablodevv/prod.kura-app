import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState, UserProgress } from './types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true,
      toggle: () => set((state) => ({ isDark: !state.isDark })),
    }),
    { name: 'theme-storage' }
  )
);

export const useProgressStore = create<UserProgress>()(
  persist(
    (set) => ({
      currentDay: 1,
      completedSessions: [],
      subscriptionDays: 90,
    }),
    { name: 'progress-storage' }
  )
);