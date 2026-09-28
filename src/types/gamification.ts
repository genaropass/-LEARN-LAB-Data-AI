export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  isGuest: boolean;
  xp: number;
  level: number;
  coins: number; // In-game coins to buy power-ups and helps
  stars: Record<number, number>; // levelNumber -> stars earned (1-3)
  inventory: Record<string, number>; // powerUpId -> quantity
  streakDays: number;
  lastActiveDate: string; // ISO string
  title: string;
  avatarSeed: string;
  createdAt: string;
}

export interface PowerUpItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  category: 'hint' | 'blueprint' | 'master_key' | 'shield';
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
  coinReward: number;
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
  levelNumber?: number;
  passed: boolean;
  submittedQuery: string;
  executionTimeMs: number;
  hintsUsed: number;
  timestamp: string;
}
