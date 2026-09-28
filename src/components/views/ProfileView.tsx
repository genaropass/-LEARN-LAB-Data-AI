'use client';

import React from 'react';
import { useGameState } from '@/context/GameStateContext';
import { calculateLevel } from '@/lib/progression/xp';
import { 
  User, 
  Flame, 
  Award, 
  Trophy, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Lock,
  ChevronRight
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

export const ProfileView: React.FC = () => {
  const { 
    profile, 
    masteries, 
    achievements, 
    completedNodes, 
    resetProgress, 
    setActiveView 
  } = useGameState();

  const levelInfo = calculateLevel(profile.xp);
  const unlockedCount = achievements.filter(a => a.unlockedAt).length;

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your local testing progress? This will reset completed nodes, XP, and achievements to Day 1.')) {
      sfx.playClick();
      resetProgress();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      
      {/* RPG Character Sheet Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#090D14] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          
          {/* Avatar Frame */}
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-slate-950 text-amber-400 font-mono text-3xl font-black shadow-[0_0_25px_rgba(245,158,11,0.2)]">
              {profile.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-mono text-xs font-black border-2 border-[#090D14]">
              {profile.level}
            </div>
          </div>

          {/* Player Identity Details */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight uppercase">
                  {profile.username}
                </h1>
                <div className="mt-1 flex items-center justify-center sm:justify-start space-x-2">
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 font-mono text-xs font-bold text-amber-400 border border-amber-500/20">
                    ⭐ {profile.title}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="font-mono text-xs text-slate-400">
                    {profile.isGuest ? 'Guest Explorer' : 'Supabase Authenticated'}
                  </span>
                </div>
              </div>

              {/* Streak Badge */}
              <div className="flex items-center space-x-2 rounded-xl border border-amber-500/30 bg-amber-950/20 px-3.5 py-1.5 self-center sm:self-auto">
                <Flame className="h-5 w-5 fill-amber-400 text-amber-400" />
                <div className="text-left font-mono">
                  <span className="block text-xs font-extrabold text-amber-400">
                    {profile.streakDays} DAYS
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest">
                    ACTIVE STREAK
                  </span>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-5 border-t border-slate-800/80 pt-4">
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                <span>
                  Experience Points: <span className="font-bold text-amber-400">{profile.xp.toLocaleString()} XP</span>
                </span>
                <span className="text-slate-400">
                  Level {levelInfo.level} ({levelInfo.progressPercent}%)
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SKILL MASTERY SHEET (Section 24 & 26) */}
      <div className="rounded-2xl border border-slate-800 bg-[#090D14] p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
              TACTICAL SKILL MATRIX
            </span>
            <h2 className="text-base font-extrabold text-white">
              Relational SQL Competencies
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {completedNodes.size} / 17 Nodes Cleared
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {masteries.map((m) => {
            const statusColor =
              m.levelStatus === 'Mastered'
                ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20'
                : m.levelStatus === 'Advanced'
                ? 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20'
                : m.levelStatus === 'Developing'
                ? 'text-amber-400 border-amber-500/30 bg-amber-950/20'
                : 'text-slate-500 border-slate-800 bg-slate-950/40';

            return (
              <div
                key={m.skillId}
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 transition-all hover:border-slate-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-white">
                    {m.name}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase border ${statusColor}`}>
                    {m.levelStatus}
                  </span>
                </div>

                <div className="flex justify-between font-mono text-[11px] text-slate-400 mb-1">
                  <span>Progress</span>
                  <span className="text-slate-200 font-bold">{m.percentage}%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      m.percentage >= 100
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                        : m.percentage > 50
                        ? 'bg-amber-400'
                        : 'bg-cyan-400'
                    }`}
                    style={{ width: `${m.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACHIEVEMENTS TROPHY ROOM */}
      <div className="rounded-2xl border border-slate-800 bg-[#090D14] p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
              HALL OF TRIUMPHS
            </span>
            <h2 className="text-base font-extrabold text-white">
              Unlocked Badges ({unlockedCount} / {achievements.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((ach) => {
            const isUnlocked = Boolean(ach.unlockedAt);
            return (
              <div
                key={ach.id}
                className={`flex flex-col items-center justify-between rounded-xl border p-4 text-center transition-all ${
                  isUnlocked
                    ? 'border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-slate-950 text-amber-300 shadow-sm'
                    : 'border-slate-800/80 bg-slate-950/40 opacity-40'
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border mb-2 ${
                  isUnlocked
                    ? 'border-amber-500/50 bg-amber-500/20 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'border-slate-800 bg-slate-900 text-slate-600'
                }`}>
                  <Trophy className="h-6 w-6" />
                </div>

                <div>
                  <h4 className="font-bold text-xs text-white">
                    {ach.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 w-full">
                  <span className={`font-mono text-[9px] font-bold uppercase ${
                    isUnlocked ? 'text-emerald-400' : 'text-slate-600'
                  }`}>
                    {isUnlocked ? '✓ UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Developer / Reset Testing Controls */}
      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-4">
        <div>
          <span className="text-xs font-semibold text-slate-300 block">
            Reset Development Progress
          </span>
          <span className="text-[11px] text-slate-500">
            Resets all local client-side progress, completed exercises, and achievements back to Level 1.
          </span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 rounded-lg border border-red-500/30 bg-red-950/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-950/40 transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>

    </div>
  );
};
