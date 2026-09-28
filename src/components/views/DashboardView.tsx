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
  Coins,
  Sparkles,
  BarChart2,
  Compass
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

export const DashboardView: React.FC = () => {
  const { 
    profile, 
    completedNodes, 
    completedLevels,
    masteries, 
    dailyQuests, 
    achievements, 
    setActiveView 
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
      <div className="relative overflow-hidden rounded-3xl border-4 border-amber-400 bg-gradient-to-r from-amber-500/20 via-slate-900 to-sky-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 font-mono text-xs font-black uppercase tracking-wider text-amber-300 border border-amber-400/40">
                <Compass className="h-3.5 w-3.5" />
                EXPEDICIÓN ACTIVA
              </span>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-xs text-sky-300 font-bold">Data &amp; IA / Reino SQL</span>
            </div>
            
            <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white tracking-tight">
              ¡Bienvenido de vuelta, {profile.username}! 👋
            </h1>
            
            <p className="mt-2 text-base text-slate-200 max-w-xl leading-relaxed font-medium">
              {nextStep.reason}
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => {
                sfx.playClick();
                setActiveView('world');
              }}
              className="btn-mario flex items-center space-x-3 px-7 py-4 text-base font-black tracking-wide"
            >
              <Play className="h-5 w-5 fill-slate-950 text-slate-950" />
              <span>Continuar Aventura</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 3 Clean Focused Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Misiones Diarias */}
        <div className="rounded-3xl border-2 border-slate-700/80 bg-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-3">
              <span className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-sky-300">
                <Target className="h-4 w-4 text-sky-400" />
                <span>Misiones de Hoy</span>
              </span>
              <span className="font-mono text-xs text-amber-400 font-black">
                {dailyQuests.filter(q => q.completed).length} / {dailyQuests.length}
              </span>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`rounded-2xl border-2 p-3 transition-all ${
                    quest.completed
                      ? 'border-emerald-400 bg-emerald-950/30 text-emerald-200'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center border-2 ${
                        quest.completed
                          ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                          : 'border-slate-600 bg-slate-800'
                      }`}>
                        {quest.completed && <CheckCircle2 className="h-3.5 w-3.5 font-black" />}
                      </div>
                      <span className="text-xs font-bold">{quest.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-black text-amber-400">
                      <span>+{quest.xpReward} XP</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-yellow-300">+{quest.coinReward} 🪙</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-400 pl-7 leading-snug">
                    {quest.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Progreso de Personaje */}
        <div className="rounded-3xl border-2 border-slate-700/80 bg-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-3">
              <span className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-amber-300">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Nivel y Rango</span>
              </span>
              <span className="flex items-center space-x-1 font-mono text-xs font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                <Flame className="h-3.5 w-3.5 fill-amber-400" />
                <span>Racha {profile.streakDays} Días</span>
              </span>
            </div>

            <div className="text-center py-2">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-amber-400 bg-amber-400/20 font-mono text-2xl font-black text-amber-300 shadow-md">
                L{profile.level}
              </div>
              <h3 className="mt-2 text-lg font-black text-white">
                {profile.title}
              </h3>
              <p className="font-mono text-xs text-slate-400 mt-0.5">
                {profile.xp.toLocaleString()} XP acumulados • {completedLevels.size} de 100 Niveles
              </p>
            </div>

            {/* Level XP Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Progreso al Nivel {profile.level + 1}</span>
                <span className="text-amber-300 font-black">{levelInfo.progressPercent}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden border-2 border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('profile')}
            className="mt-4 w-full flex items-center justify-center space-x-1 text-xs text-slate-300 hover:text-white pt-2.5 border-t border-slate-800 transition-colors font-bold"
          >
            <span>Ver Hoja de Personaje Completa</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 3. Dominio de Habilidades */}
        <div className="rounded-3xl border-2 border-slate-700/80 bg-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-3">
              <span className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-emerald-300">
                <BarChart2 className="h-4 w-4 text-emerald-400" />
                <span>Dominio de Habilidades</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400 font-bold">
                8 Dominios
              </span>
            </div>

            {weakestSkill && (
              <div className="rounded-2xl border-2 border-amber-400/40 bg-amber-950/20 p-3.5">
                <div className="flex items-center space-x-1.5 text-xs font-black text-amber-300 mb-1">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <span>Reforzar: {weakestSkill.name}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {weakestSkill.percentage}% de dominio actual. Superar más niveles de este tema desbloqueará los mundos avanzados.
                </p>
              </div>
            )}

            {/* Quick 3 Skills Preview */}
            <div className="mt-3 space-y-2">
              {masteries.slice(0, 3).map((m) => (
                <div key={m.skillId}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300 font-bold">{m.name}</span>
                    <span className="text-slate-400">{m.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
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
            className="mt-4 w-full flex items-center justify-center space-x-1 text-xs text-amber-400 hover:text-amber-300 pt-2.5 border-t border-slate-800 transition-colors font-black"
          >
            <span>Explorar Ruta del Mapa</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

      {/* Recent Achievements Row */}
      <div className="rounded-3xl border-2 border-slate-700/80 bg-slate-900/90 p-5 shadow-lg">
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-200">
              Logros y Trofeos ({unlockedAchievements.length} / {achievements.length})
            </span>
          </div>
          <button
            onClick={() => setActiveView('profile')}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold"
          >
            Ver Todos
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievements.slice(0, 4).map((ach) => (
            <div
              key={ach.id}
              className={`rounded-2xl border-2 p-3 text-center transition-all ${
                ach.unlockedAt
                  ? 'border-amber-400 bg-amber-400/10 text-amber-200 shadow-md'
                  : 'border-slate-800 bg-slate-950/40 opacity-40'
              }`}
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border-2 border-amber-400 bg-amber-400/20 mb-2">
                <Trophy className="h-5 w-5 text-amber-300" />
              </div>
              <h4 className="font-black text-xs truncate text-white">{ach.title}</h4>
              <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-snug font-medium">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
