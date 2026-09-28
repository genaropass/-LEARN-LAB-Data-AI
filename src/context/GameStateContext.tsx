'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { UserProfile, Achievement, DailyQuest, SkillMastery, ExerciseAttempt } from '@/types/gamification';
import { SQL_LEARNING_NODES, NODE_SKILL_MAPPING } from '@/content/data-ai/sql/nodes';
import { ALL_ACHIEVEMENTS } from '@/lib/progression/achievements';
import { calculateLevel } from '@/lib/progression/xp';
import { calculateSkillMasteries } from '@/lib/progression/mastery';
import { getDailyQuests } from '@/lib/progression/quests';
import { sfx } from '@/lib/audio/sfx';
import confetti from 'canvas-confetti';

interface GameStateContextType {
  profile: UserProfile;
  completedNodes: Set<string>;
  unlockedNodes: Set<string>;
  completedExercises: Set<string>;
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  masteries: SkillMastery[];
  activeView: 'world' | 'dashboard' | 'profile';
  setActiveView: (view: 'world' | 'dashboard' | 'profile') => void;
  activeNodeId: string | null;
  setActiveNodeId: (nodeId: string | null) => void;
  isAudioMuted: boolean;
  toggleAudio: () => void;
  completeNode: (nodeId: string, xpEarned: number) => void;
  recordExerciseAttempt: (attempt: ExerciseAttempt) => void;
  recentAchievementUnlocked: Achievement | null;
  dismissAchievement: () => void;
  levelUpInfo: { level: number; title: string } | null;
  dismissLevelUp: () => void;
  resetProgress: () => void;
}

const STORAGE_KEYS = {
  PROFILE: 'learnlab_profile_v1',
  COMPLETED_NODES: 'learnlab_completed_nodes_v1',
  COMPLETED_EXERCISES: 'learnlab_completed_exercises_v1',
  UNLOCKED_ACHIEVEMENTS: 'learnlab_unlocked_achievements_v1'
};

const INITIAL_PROFILE: UserProfile = {
  id: 'guest_user_1',
  username: 'Data Pioneer',
  isGuest: true,
  xp: 0,
  level: 1,
  streakDays: 3,
  lastActiveDate: new Date().toISOString(),
  title: 'SQL Novice',
  avatarSeed: 'pioneer',
  createdAt: new Date().toISOString()
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<Set<string>>(new Set());
  const [activeView, setActiveView] = useState<'world' | 'dashboard' | 'profile'>('world');
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [recentAchievementUnlocked, setRecentAchievementUnlocked] = useState<Achievement | null>(null);
  const [levelUpInfo, setLevelUpInfo] = useState<{ level: number; title: string } | null>(null);

  // Load saved state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      setIsAudioMuted(sfx.getMuted());

      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }

      const savedNodes = localStorage.getItem(STORAGE_KEYS.COMPLETED_NODES);
      if (savedNodes) {
        setCompletedNodes(new Set(JSON.parse(savedNodes)));
      }

      const savedExercises = localStorage.getItem(STORAGE_KEYS.COMPLETED_EXERCISES);
      if (savedExercises) {
        setCompletedExercises(new Set(JSON.parse(savedExercises)));
      }

      const savedAchievements = localStorage.getItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS);
      if (savedAchievements) {
        setUnlockedAchievementIds(new Set(JSON.parse(savedAchievements)));
      }
    } catch (e) {
      console.warn('Failed to load local game progress:', e);
    }
  }, []);

  // Compute Unlocked Nodes dynamically
  const unlockedNodes = useMemo(() => {
    const unlocked = new Set<string>();

    SQL_LEARNING_NODES.forEach(node => {
      if (node.prerequisites.length === 0) {
        unlocked.add(node.id);
      } else {
        const canUnlock = node.prerequisites.every(prereqId => completedNodes.has(prereqId));
        if (canUnlock) {
          unlocked.add(node.id);
        }
      }
    });

    return unlocked;
  }, [completedNodes]);

  // Compute Skill Masteries
  const masteries = useMemo(() => {
    return calculateSkillMasteries(completedNodes, NODE_SKILL_MAPPING);
  }, [completedNodes]);

  // Compute Daily Quests
  const dailyQuests = useMemo(() => {
    return getDailyQuests(completedNodes.size);
  }, [completedNodes.size]);

  // Compute Achievements with unlock status
  const achievements = useMemo(() => {
    return ALL_ACHIEVEMENTS.map(ach => ({
      ...ach,
      unlockedAt: unlockedAchievementIds.has(ach.id) ? 'Unlocked' : undefined
    }));
  }, [unlockedAchievementIds]);

  // Audio Toggle
  const toggleAudio = useCallback(() => {
    const muted = sfx.toggleMute();
    setIsAudioMuted(muted);
    if (!muted) {
      sfx.playClick();
    }
  }, []);

  // Unlock an achievement
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

  // Complete a Node
  const completeNode = useCallback((nodeId: string, xpEarned: number) => {
    setCompletedNodes(prevNodes => {
      const nextNodes = new Set(prevNodes);
      const isNewCompletion = !nextNodes.has(nodeId);
      if (isNewCompletion) {
        nextNodes.add(nodeId);
        localStorage.setItem(STORAGE_KEYS.COMPLETED_NODES, JSON.stringify(Array.from(nextNodes)));
      }

      setProfile(prevProf => {
        const newXp = prevProf.xp + (isNewCompletion ? xpEarned : 5);
        const prevLevel = prevProf.level;
        const levelDetails = calculateLevel(newXp);
        
        // Trigger Level-up
        if (levelDetails.level > prevLevel) {
          setLevelUpInfo({ level: levelDetails.level, title: levelDetails.title });
          sfx.playBossDefeated();
          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch {
            // Ignore confetti errors
          }
        }

        const updatedProfile: UserProfile = {
          ...prevProf,
          xp: newXp,
          level: levelDetails.level,
          title: levelDetails.title,
          lastActiveDate: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
        return updatedProfile;
      });

      // Check for node-based achievements
      if (nodeId === 'node_select') {
        grantAchievement('first_query');
      }
      if (nodeId === 'node_null') {
        grantAchievement('foundation_complete');
      }
      if (nodeId === 'boss_01_sales') {
        grantAchievement('first_boss');
      }
      if (nodeId === 'node_inner_join' || nodeId === 'node_left_join') {
        grantAchievement('joins_virtuoso');
      }
      if (nodeId === 'boss_02_cohorts') {
        grantAchievement('second_boss');
      }
      if (nodeId === 'node_window_functions') {
        grantAchievement('window_wizard');
      }
      if (nodeId === 'node_capstone_project') {
        grantAchievement('capstone_master');
      }

      return nextNodes;
    });
  }, [grantAchievement]);

  // Record Exercise Attempt
  const recordExerciseAttempt = useCallback((attempt: ExerciseAttempt) => {
    if (attempt.passed) {
      setCompletedExercises(prev => {
        const next = new Set(prev);
        next.add(attempt.exerciseId);
        localStorage.setItem(STORAGE_KEYS.COMPLETED_EXERCISES, JSON.stringify(Array.from(next)));
        return next;
      });
      grantAchievement('first_query');
    }
  }, [grantAchievement]);

  const dismissAchievement = useCallback(() => {
    setRecentAchievementUnlocked(null);
  }, []);

  const dismissLevelUp = useCallback(() => {
    setLevelUpInfo(null);
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_NODES);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_EXERCISES);
    localStorage.removeItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS);
    setProfile(INITIAL_PROFILE);
    setCompletedNodes(new Set());
    setCompletedExercises(new Set());
    setUnlockedAchievementIds(new Set());
    setActiveNodeId(null);
  }, []);

  return (
    <GameStateContext.Provider
      value={{
        profile,
        completedNodes,
        unlockedNodes,
        completedExercises,
        achievements,
        dailyQuests,
        masteries,
        activeView,
        setActiveView,
        activeNodeId,
        setActiveNodeId,
        isAudioMuted,
        toggleAudio,
        completeNode,
        recordExerciseAttempt,
        recentAchievementUnlocked,
        dismissAchievement,
        levelUpInfo,
        dismissLevelUp,
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
