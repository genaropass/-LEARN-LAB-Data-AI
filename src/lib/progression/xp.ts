export const XP_REWARDS = {
  LESSON: 20,
  PRACTICE: 15,
  CHALLENGE: 30,
  BOSS: 100,
  PROJECT: 250,
  DAILY_QUEST: 40
} as const;

export interface LevelInfo {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  title: string;
}

export function calculateLevel(xp: number): LevelInfo {
  // RPG progressive XP curve: level = floor(sqrt(xp / 40)) + 1
  const level = Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 40)) + 1);
  const currentBaseXp = Math.pow(level - 1, 2) * 40;
  const nextBaseXp = Math.pow(level, 2) * 40;
  const range = nextBaseXp - currentBaseXp;
  const progressInLevel = Math.max(0, xp - currentBaseXp);
  const progressPercent = Math.min(100, Math.round((progressInLevel / range) * 100));

  let title = 'SQL Novice';
  if (level >= 10) title = 'Master of Relational Logic';
  else if (level >= 8) title = 'Analytics Specialist';
  else if (level >= 6) title = 'SQL Explorer';
  else if (level >= 4) title = 'Data Operator';
  else if (level >= 2) title = 'Query Apprentice';

  return {
    level,
    currentLevelXp: xp,
    nextLevelXp: nextBaseXp,
    progressPercent,
    title
  };
}
