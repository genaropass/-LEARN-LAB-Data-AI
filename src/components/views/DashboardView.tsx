'use client';

import React, { useMemo } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { SQL_LEARNING_NODES } from '@/content/data-ai/sql/nodes';
import { getSmartNextStep } from '@/lib/progression/recommender';
import { calculateLevel } from '@/lib/progression/xp';
import { 
  Play, 
  Flame, 
  Target, 
  Trophy, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  ChevronRight, 
  Compass, 
  Sparkles,
  BarChart2
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

export const DashboardView: React.FC = () => {
  const { 
    profile, 
    completedNodes, 
    masteries, 
    dailyQuests, 
    achievements, 
    setActiveView,
    resetProgress 
  } = useGameState();

  const nextStep = useMemo(() => {
    return getSmartNextStep(SQL_LEARNING_NODES, completedNodes, masteries);
  }, [completedNodes, masteries]);

  const levelInfo = calculateLevel(profile.xp);
  const weakestSkill = [...masteries].sort((a, b) => a.percentage - b.percentage)[0];
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      
      {/* Welcome & Primary "Continue Journey" Hero Card */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-950 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                ACTIVE LEARNING EXPEDITION
              </span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-xs text-slate-400">Data &amp; AI / SQL World</span>
            </div>
            
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {profile.username}.
            </h1>
            
            <p className="mt-1 text-sm text-slate-300 max-w-xl leading-relaxed">
              {nextStep.reason}
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => {
                sfx.playClick();
                setActiveView('world');
              }}
              className="flex items-center space-x-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 font-bold text-slate-950 hover:from-amber-300 hover:to-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95 text-sm"
            >
              <Play className="h-4 w-4 fill-slate-950" />
              <span>Continue Journey</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 3 Clean Focused Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Today's Quest Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#090D14] p-5 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Target className="h-4 w-4 text-cyan-400" />
                <span>Today&#39;s Quests</span>
              </span>
              <span className="font-mono text-xs text-amber-400 font-bold">
                {dailyQuests.filter(q => q.completed).length} / {dailyQuests.length}
              </span>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`rounded-xl border p-3 transition-all ${
                    quest.completed
                      ? 'border-emerald-500/30 bg-emerald-950/15 text-emerald-300'
                      : 'border-slate-800/80 bg-slate-950/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`h-4 w-4 rounded-full flex items-center justify-center border ${
                        quest.completed
                          ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                          : 'border-slate-700 bg-slate-900'
                      }`}>
                        {quest.completed && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                      <span className="text-xs font-bold">{quest.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-amber-400 font-bold">
                      +{quest.xpReward} XP
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 pl-6">
                    {quest.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Character Progression Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#090D14] p-5 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Level &amp; Rank</span>
              </span>
              <span className="flex items-center space-x-1 font-mono text-xs font-bold text-amber-400">
                <Flame className="h-3.5 w-3.5 fill-amber-400" />
                <span>{profile.streakDays} Day Streak</span>
              </span>
            </div>

            <div className="text-center py-2">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 font-mono text-2xl font-extrabold text-amber-400 shadow-sm">
                L{profile.level}
              </div>
              <h3 className="mt-2 text-base font-bold text-white">
                {profile.title}
              </h3>
              <p className="font-mono text-xs text-slate-400 mt-0.5">
                {profile.xp.toLocaleString()} total XP
              </p>
            </div>

            {/* Level XP Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>Level Progress</span>
                <span className="text-amber-300 font-bold">{levelInfo.progressPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('profile')}
            className="mt-4 w-full flex items-center justify-center space-x-1 text-xs text-slate-400 hover:text-white pt-2 border-t border-slate-800/80 transition-colors"
          >
            <span>View Full Character Sheet</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 3. Skill Radar & Weakest Skill Alert */}
        <div className="rounded-2xl border border-slate-800 bg-[#090D14] p-5 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <BarChart2 className="h-4 w-4 text-emerald-400" />
                <span>Targeted Mastery</span>
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                8 Skill Domains
              </span>
            </div>

            {weakestSkill && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-3.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300 mb-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                  <span>Weakest Domain: {weakestSkill.name}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Currently at {weakestSkill.percentage}% mastery. Reinforcing this foundation unlocks higher-tier analytical modules with ease.
                </p>
              </div>
            )}

            {/* Quick 3 Skills Preview */}
            <div className="mt-3 space-y-2">
              {masteries.slice(0, 3).map((m) => (
                <div key={m.skillId}>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-slate-300">{m.name}</span>
                    <span className="text-slate-400">{m.percentage}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400"
                      style={{ width: `${m.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveView('world')}
            className="mt-4 w-full flex items-center justify-center space-x-1 text-xs text-amber-400 hover:text-amber-300 pt-2 border-t border-slate-800/80 transition-colors font-semibold"
          >
            <span>Explore World Route</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

      {/* Recent Achievements Row */}
      <div className="rounded-2xl border border-slate-800 bg-[#090D14] p-5 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Recent Achievements ({unlockedAchievements.length} / {achievements.length})
            </span>
          </div>
          <button
            onClick={() => setActiveView('profile')}
            className="text-xs text-slate-400 hover:text-white"
          >
            Show All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievements.slice(0, 4).map((ach) => (
            <div
              key={ach.id}
              className={`rounded-xl border p-3 text-center transition-all ${
                ach.unlockedAt
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                  : 'border-slate-800/60 bg-slate-950/40 opacity-40'
              }`}
            >
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 mb-2">
                <Trophy className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-xs truncate">{ach.title}</h4>
              <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
