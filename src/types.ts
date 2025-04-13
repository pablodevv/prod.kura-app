export interface Session {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  duration: string;
  completed: boolean;
  week: number;
  day: number;
}

export interface UserProgress {
  currentDay: number;
  completedSessions: number[];
  subscriptionDays: number;
}

export interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}