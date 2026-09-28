'use client';

import React, { useEffect } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { Trophy, X } from 'lucide-react';

export const AchievementToast: React.FC = () => {
  const { recentAchievementUnlocked, dismissAchievement } = useGameState();

  useEffect(() => {
    if (recentAchievementUnlocked) {
      const timer = setTimeout(() => {
        dismissAchievement();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentAchievementUnlocked, dismissAchievement]);

  if (!recentAchievementUnlocked) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce transition-all duration-300">
      <div className="flex items-center space-x-3 rounded-2xl border border-amber-500/50 bg-[#0B0F17]/95 p-4 shadow-[0_0_30px_rgba(245,158,11,0.3)] backdrop-blur-md max-w-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/20 text-amber-400 flex-shrink-0">
          <Trophy className="h-6 w-6" />
        </div>

        <div className="flex-1 pr-2">
          <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-amber-400">
            ACHIEVEMENT UNLOCKED
          </span>
          <h4 className="font-bold text-xs text-white">
            {recentAchievementUnlocked.title}
          </h4>
          <p className="text-[11px] text-slate-300 line-clamp-1">
            {recentAchievementUnlocked.description}
          </p>
        </div>

        <button
          onClick={dismissAchievement}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
