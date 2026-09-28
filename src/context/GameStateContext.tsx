'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { UserProfile, Achievement, DailyQuest, SkillMastery, ExerciseAttempt } from '@/types/gamification';
import { ALL_100_LEVELS, GAME_WORLDS, GameLevel } from '@/content/data-ai/sql/levels';
import { ALL_ACHIEVEMENTS } from '@/lib/progression/achievements';
import { calculateLevel } from '@/lib/progression/xp';
import { calculateSkillMasteries } from '@/lib/progression/mastery';
import { getDailyQuests } from '@/lib/progression/quests';
import { SHOP_POWERUPS } from '@/lib/progression/powerups';
import { sfx } from '@/lib/audio/sfx';
import confetti from 'canvas-confetti';

interface GameStateContextType {
  profile: UserProfile;
  completedLevels: Set<number>;
  currentLevelNumber: number;
  unlockedLevelMax: number;
  stars: Record<number, number>;
  inventory: Record<string, number>;
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  masteries: SkillMastery[];
  completedNodes: Set<string>;
  activeView: 'world' | 'dashboard' | 'profile' | 'shop';
  setActiveView: (view: 'world' | 'dashboard' | 'profile' | 'shop') => void;
  selectedLevel: GameLevel | null;
  setSelectedLevel: (level: GameLevel | null) => void;
  selectedWorldNumber: number;
  setSelectedWorldNumber: (w: number) => void;
  isAudioMuted: boolean;
  toggleAudio: () => void;
  completeGameLevel: (levelNum: number, starsEarned: number, xpEarned: number, coinsEarned: number) => void;
  completeNode: (nodeId: string, xpEarned: number) => void;
  recordExerciseAttempt: (attempt: ExerciseAttempt) => void;
  buyPowerUp: (powerUpId: string) => boolean;
  usePowerUp: (powerUpId: string) => boolean;
  recentAchievementUnlocked: Achievement | null;
  dismissAchievement: () => void;
  levelUpInfo: { level: number; title: string } | null;
  dismissLevelUp: () => void;
  isLevelUnlocked: (levelNumber: number) => boolean;
  resetProgress: () => void;
}

const STORAGE_KEYS = {
  PROFILE: 'learnlab_profile_v2',
  COMPLETED_LEVELS: 'learnlab_completed_levels_v2',
  STARS: 'learnlab_stars_v2',
  INVENTORY: 'learnlab_inventory_v2',
  UNLOCKED_ACHIEVEMENTS: 'learnlab_unlocked_achievements_v2'
};

const INITIAL_PROFILE: UserProfile = {
  id: 'guest_user_1',
  username: 'Mario Developer',
  isGuest: true,
  xp: 0,
  level: 1,
  coins: 60, // 60 starter coins!
  stars: {},
  inventory: { hint_scroll: 2, sql_blueprint: 1 }, // Starter power-ups
  streakDays: 4,
  lastActiveDate: new Date().toISOString(),
  title: 'SQL Novice',
  avatarSeed: 'mario_adventurer',
  createdAt: new Date().toISOString()
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [stars, setStars] = useState<Record<number, number>>({});
  const [inventory, setInventory] = useState<Record<string, number>>(INITIAL_PROFILE.inventory);
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<Set<string>>(new Set());
  const [activeView, setActiveView] = useState<'world' | 'dashboard' | 'profile' | 'shop'>('world');
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [selectedWorldNumber, setSelectedWorldNumber] = useState<number>(1);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [recentAchievementUnlocked, setRecentAchievementUnlocked] = useState<Achievement | null>(null);
  const [levelUpInfo, setLevelUpInfo] = useState<{ level: number; title: string } | null>(null);

  // Load saved state
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      setIsAudioMuted(sfx.getMuted());

      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(prev => ({ ...prev, ...parsed }));
        if (parsed.coins !== undefined) {
          setProfile(parsed);
        }
      }

      const savedLevels = localStorage.getItem(STORAGE_KEYS.COMPLETED_LEVELS);
      if (savedLevels) {
        setCompletedLevels(new Set(JSON.parse(savedLevels)));
      }

      const savedStars = localStorage.getItem(STORAGE_KEYS.STARS);
      if (savedStars) {
        setStars(JSON.parse(savedStars));
      }

      const savedInventory = localStorage.getItem(STORAGE_KEYS.INVENTORY);
      if (savedInventory) {
        setInventory(JSON.parse(savedInventory));
      }

      const savedAchievements = localStorage.getItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS);
      if (savedAchievements) {
        setUnlockedAchievementIds(new Set(JSON.parse(savedAchievements)));
      }
    } catch (e) {
      console.warn('Failed to load local progress:', e);
    }
  }, []);

  // Compute highest unlocked level
  const unlockedLevelMax = useMemo(() => {
    if (completedLevels.size === 0) return 1;
    const maxCompleted = Math.max(...Array.from(completedLevels));
    return Math.min(100, maxCompleted + 1);
  }, [completedLevels]);

  const currentLevelNumber = unlockedLevelMax;

  // Check if a specific level is unlocked (supporting branching paths & prerequisites)
  const isLevelUnlocked = useCallback((levelNumber: number) => {
    if (levelNumber === 1) return true;
    if (completedLevels.has(levelNumber)) return true;

    const level = ALL_100_LEVELS.find(l => l.levelNumber === levelNumber);
    if (!level) return levelNumber <= unlockedLevelMax;

    if (level.prerequisites && level.prerequisites.length > 0) {
      return level.prerequisites.some(p => completedLevels.has(p));
    }

    return levelNumber <= unlockedLevelMax;
  }, [completedLevels, unlockedLevelMax]);

  // Sync selected world with highest level
  useEffect(() => {
    const foundWorld = GAME_WORLDS.find(w => unlockedLevelMax >= w.levelsRange[0] && unlockedLevelMax <= w.levelsRange[1]);
    if (foundWorld) {
      setSelectedWorldNumber(foundWorld.number);
    }
  }, [unlockedLevelMax]);

  // Daily Quests
  const dailyQuests = useMemo(() => {
    const quests = getDailyQuests(completedLevels.size);
    return quests.map(q => ({
      ...q,
      coinReward: 20
    }));
  }, [completedLevels.size]);

  // Achievements
  const achievements = useMemo(() => {
    return ALL_ACHIEVEMENTS.map(ach => ({
      ...ach,
      unlockedAt: unlockedAchievementIds.has(ach.id) ? 'Unlocked' : undefined
    }));
  }, [unlockedAchievementIds]);

  // Completed Nodes as string Set
  const completedNodes = useMemo(() => {
    return new Set(Array.from(completedLevels).map(n => `level_${n}`));
  }, [completedLevels]);

  // Skill Masteries across 100 levels
  const masteries = useMemo((): SkillMastery[] => {
    const list = [
      { id: 'foundations', name: 'SELECT & Filtering', levels: [1, 20] },
      { id: 'aggregation', name: 'GROUP BY & Aggregates', levels: [21, 40] },
      { id: 'joins', name: 'Relational JOINs', levels: [41, 60] },
      { id: 'logic', name: 'CASE & Transformations', levels: [61, 75] },
      { id: 'subqueries', name: 'Nested Subqueries', levels: [76, 80] },
      { id: 'ctes', name: 'CTEs (WITH Pipelines)', levels: [81, 90] },
      { id: 'windows', name: 'Window Functions', levels: [91, 100] }
    ];

    return list.map(item => {
      const total = item.levels[1] - item.levels[0] + 1;
      let completedInItem = 0;
      for (let lvl = item.levels[0]; lvl <= item.levels[1]; lvl++) {
        if (completedLevels.has(lvl)) completedInItem++;
      }
      const pct = Math.round((completedInItem / total) * 100);
      let status: 'Locked' | 'Novice' | 'Developing' | 'Advanced' | 'Mastered' = 'Locked';
      if (pct >= 100) status = 'Mastered';
      else if (pct >= 70) status = 'Advanced';
      else if (pct >= 35) status = 'Developing';
      else if (pct > 0) status = 'Novice';

      return {
        skillId: item.id,
        name: item.name,
        percentage: pct,
        exercisesCompleted: completedInItem,
        totalExercises: total,
        levelStatus: status
      };
    });
  }, [completedLevels]);

  // Audio Toggle
  const toggleAudio = useCallback(() => {
    const muted = sfx.toggleMute();
    setIsAudioMuted(muted);
    if (!muted) {
      sfx.playClick();
    }
  }, []);

  // Grant Achievement
  const grantAchievement = useCallback((achievementId: string) => {
    setUnlockedAchievementIds(prev => {
      if (prev.has(achievementId)) return prev;
      const next = new Set(prev);
      next.add(achievementId);
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS, JSON.stringify(Array.from(next)));
      
      const ach = ALL_ACHIEVEMENTS.find(a => a.id === achievementId);
      if (ach) {
        setRecentAchievementUnlocked(ach);
        sfx.playSuccess();
      }
      return next;
    });
  }, []);

  // Complete a level
  const completeGameLevel = useCallback((
    levelNum: number,
    starsEarned: number,
    xpEarned: number,
    coinsEarned: number
  ) => {
    setCompletedLevels(prevLevels => {
      const nextLevels = new Set(prevLevels);
      const isFirstTime = !nextLevels.has(levelNum);
      nextLevels.add(levelNum);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LEVELS, JSON.stringify(Array.from(nextLevels)));

      // Update Stars
      setStars(prevStars => {
        const bestStars = Math.max(prevStars[levelNum] || 0, starsEarned);
        const nextStars = { ...prevStars, [levelNum]: bestStars };
        localStorage.setItem(STORAGE_KEYS.STARS, JSON.stringify(nextStars));
        return nextStars;
      });

      // Update Profile (XP + Coins + Level Up)
      setProfile(prevProf => {
        const earnedCoins = isFirstTime ? coinsEarned : Math.round(coinsEarned / 3);
        const earnedXp = isFirstTime ? xpEarned : Math.round(xpEarned / 3);
        const newXp = prevProf.xp + earnedXp;
        const newCoins = prevProf.coins + earnedCoins;
        const prevLevel = prevProf.level;
        const levelDetails = calculateLevel(newXp);

        if (levelDetails.level > prevLevel) {
          setLevelUpInfo({ level: levelDetails.level, title: levelDetails.title });
          sfx.playBossDefeated();
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {
            // ignore
          }
        }

        const updatedProfile: UserProfile = {
          ...prevProf,
          xp: newXp,
          coins: newCoins,
          level: levelDetails.level,
          title: levelDetails.title,
          lastActiveDate: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
        return updatedProfile;
      });

      // Achievements triggers
      if (levelNum === 1) grantAchievement('first_query');
      if (levelNum === 20) grantAchievement('first_boss');
      if (levelNum === 40) grantAchievement('first_boss');
      if (levelNum === 60) grantAchievement('joins_virtuoso');
      if (levelNum === 80) grantAchievement('second_boss');
      if (levelNum === 95) grantAchievement('window_wizard');
      if (levelNum === 100) grantAchievement('capstone_master');

      return nextLevels;
    });
  }, [grantAchievement]);

  // Backward-compatibility node completion
  const completeNode = useCallback((nodeId: string, xpEarned: number) => {
    setProfile(prev => {
      const newXp = prev.xp + xpEarned;
      const lvl = calculateLevel(newXp);
      const updated = { ...prev, xp: newXp, level: lvl.level, title: lvl.title };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const recordExerciseAttempt = useCallback((attempt: ExerciseAttempt) => {
    if (attempt.passed) {
      grantAchievement('first_query');
    }
  }, [grantAchievement]);

  // Buy PowerUp in Shop
  const buyPowerUp = useCallback((powerUpId: string): boolean => {
    const item = SHOP_POWERUPS.find(p => p.id === powerUpId);
    if (!item) return false;

    if (profile.coins < item.cost) {
      sfx.playError();
      return false;
    }

    // Deduct coins & add to inventory
    setProfile(prev => {
      const updated = { ...prev, coins: prev.coins - item.cost };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      return updated;
    });

    setInventory(prev => {
      const nextInv = { ...prev, [powerUpId]: (prev[powerUpId] || 0) + 1 };
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(nextInv));
      return nextInv;
    });

    sfx.playSuccess();
    return true;
  }, [profile.coins]);

  // Use PowerUp
  const usePowerUp = useCallback((powerUpId: string): boolean => {
    if (!inventory[powerUpId] || inventory[powerUpId] <= 0) {
      return false;
    }

    setInventory(prev => {
      const count = prev[powerUpId] || 1;
      const nextInv = { ...prev, [powerUpId]: Math.max(0, count - 1) };
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(nextInv));
      return nextInv;
    });

    sfx.playClick();
    return true;
  }, [inventory]);

  const dismissAchievement = useCallback(() => {
    setRecentAchievementUnlocked(null);
  }, []);

  const dismissLevelUp = useCallback(() => {
    setLevelUpInfo(null);
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_LEVELS);
    localStorage.removeItem(STORAGE_KEYS.STARS);
    localStorage.removeItem(STORAGE_KEYS.INVENTORY);
    localStorage.removeItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS);
    setProfile(INITIAL_PROFILE);
    setCompletedLevels(new Set());
    setStars({});
    setInventory(INITIAL_PROFILE.inventory);
    setUnlockedAchievementIds(new Set());
    setSelectedLevel(null);
    setSelectedWorldNumber(1);
  }, []);

  return (
    <GameStateContext.Provider
      value={{
        profile,
        completedLevels,
        currentLevelNumber,
        unlockedLevelMax,
        stars,
        inventory,
        achievements,
        dailyQuests,
        masteries,
        completedNodes,
        activeView,
        setActiveView,
        selectedLevel,
        setSelectedLevel,
        selectedWorldNumber,
        setSelectedWorldNumber,
        isAudioMuted,
        toggleAudio,
        completeGameLevel,
        completeNode,
        recordExerciseAttempt,
        buyPowerUp,
        usePowerUp,
        recentAchievementUnlocked,
        dismissAchievement,
        levelUpInfo,
        dismissLevelUp,
        isLevelUnlocked,
        resetProgress
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
