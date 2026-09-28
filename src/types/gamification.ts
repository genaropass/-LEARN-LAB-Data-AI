export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  isGuest: boolean;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string; // ISO string
  title: string;
  avatarSeed: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progression' | 'mastery' | 'boss' | 'streak';
  unlockedAt?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  category: 'lesson' | 'exercises' | 'boss' | 'mastery';
  target: number;
  current: number;
  xpReward: number;
  completed: boolean;
}

export interface SkillMastery {
  skillId: string;
  name: string;
  percentage: number;
  exercisesCompleted: number;
  totalExercises: number;
  levelStatus: 'Locked' | 'Novice' | 'Developing' | 'Advanced' | 'Mastered';
}

export interface ExerciseAttempt {
  exerciseId: string;
  passed: boolean;
  submittedQuery: string;
  executionTimeMs: number;
  hintsUsed: number;
  timestamp: string;
}
