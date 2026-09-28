'use client';

import React from 'react';
import { useGameState } from '@/context/GameStateContext';
import { Award, Sparkles, X, ChevronRight } from 'lucide-react';

export const LevelUpCelebration: React.FC = () => {
  const { levelUpInfo, dismissLevelUp } = useGameState();

  if (!levelUpInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-amber-500/60 bg-[#0B0F17] p-8 text-center shadow-[0_0_60px_rgba(245,158,11,0.35)]">
        
        <button
          onClick={dismissLevelUp}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-amber-400 bg-amber-500/20 text-amber-300 font-mono text-3xl font-black shadow-[0_0_25px_rgba(245,158,11,0.4)] mb-4">
          L{levelUpInfo.level}
        </div>

        <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
          PROMOTION EARNED
        </span>
        <h2 className="mt-1 text-2xl font-black text-white tracking-tight">
          LEVEL UP!
        </h2>

        <p className="mt-2 text-xs text-slate-300">
          Your analytical endurance and relational query fluency have reached Level {levelUpInfo.level}.
        </p>

        <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Current Player Title
          </span>
          <span className="font-extrabold font-mono text-base text-amber-300">
            ⭐ {levelUpInfo.title}
          </span>
        </div>

        <button
          onClick={dismissLevelUp}
          className="mt-6 w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 font-bold text-slate-950 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg text-sm"
        >
          <span>Claim &amp; Continue Expedition</span>
          <ChevronRight className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
};
