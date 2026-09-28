'use client';

import React from 'react';
import { useGameState } from '@/context/GameStateContext';
import { calculateLevel } from '@/lib/progression/xp';
import { 
  Flame, 
  Award, 
  Trophy, 
  RotateCcw, 
  Coins,
  CheckCircle2, 
  Sparkles,
  BarChart2,
  Compass
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

export const ProfileView: React.FC = () => {
  const { 
    profile, 
    masteries, 
    achievements, 
    completedLevels, 
    resetProgress, 
    setActiveView 
  } = useGameState();

  const levelInfo = calculateLevel(profile.xp);
  const unlockedCount = achievements.filter(a => a.unlockedAt).length;

  const handleReset = () => {
    if (confirm('¿Estás seguro de que deseas reiniciar tu progreso? Se restablecerán tus niveles superados, monedas, estrellas y logros al Día 1.')) {
      sfx.playClick();
      resetProgress();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      
      {/* RPG Character Sheet Card */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-amber-400 bg-gradient-to-r from-amber-500/15 via-slate-900 to-sky-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          
          {/* Avatar Frame */}
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-amber-400 bg-gradient-to-br from-amber-400/30 to-slate-900 text-amber-300 font-mono text-3xl font-black shadow-lg">
              {profile.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-mono text-xs font-black border-2 border-slate-900 shadow">
              {profile.level}
            </div>
          </div>

          {/* Player Identity Details */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                  {profile.username}
                </h1>
                <div className="mt-1 flex items-center justify-center sm:justify-start space-x-2">
                  <span className="rounded-full bg-amber-400/20 px-3 py-0.5 font-mono text-xs font-black text-amber-300 border border-amber-400/40">
                    ⭐ {profile.title}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="font-mono text-xs text-slate-300 font-bold">
                    {profile.isGuest ? 'Explorador Aventurero' : 'Usuario Conectado'}
                  </span>
                </div>
              </div>

              {/* Badges / Streak / Coins */}
              <div className="flex items-center gap-2 self-center sm:self-auto">
                <div className="flex items-center space-x-2 rounded-2xl border-2 border-amber-400/50 bg-amber-950/30 px-3.5 py-1.5 font-mono">
                  <Flame className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <div className="text-left">
                    <span className="block text-xs font-black text-amber-300">
                      {profile.streakDays} DÍAS
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                      RACHA ACTIVA
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 rounded-2xl border-2 border-yellow-400/50 bg-yellow-950/30 px-3.5 py-1.5 font-mono">
                  <Coins className="h-5 w-5 text-yellow-400" />
                  <div className="text-left">
                    <span className="block text-xs font-black text-yellow-300">
                      {profile.coins ?? 60}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                      MONEDAS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-5 border-t border-slate-700/80 pt-4">
              <div className="flex justify-between text-xs font-mono text-slate-200 mb-1.5 font-bold">
                <span>
                  Puntos de Experiencia: <span className="text-amber-300 font-black">{profile.xp.toLocaleString()} XP</span>
                </span>
                <span className="text-slate-300">
                  Nivel {levelInfo.level} ({levelInfo.progressPercent}%)
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden border-2 border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SKILL MASTERY SHEET */}
      <div className="rounded-3xl border-2 border-slate-700/80 bg-slate-900/90 p-6 shadow-xl">
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-4">
          <div>
            <span className="font-mono text-xs font-black uppercase tracking-wider text-amber-400">
              MATRIZ DE HABILIDADES
            </span>
            <h2 className="text-lg font-black text-white">
              Competencias de SQL Relacional
            </h2>
          </div>
          <span className="rounded-full bg-sky-500/20 px-3 py-1 font-mono text-xs text-sky-300 font-bold border border-sky-500/30">
            {completedLevels.size} / 100 Niveles Superados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {masteries.map((m) => {
            const statusLabel =
              m.levelStatus === 'Mastered' ? 'Dominado' :
              m.levelStatus === 'Advanced' ? 'Avanzado' :
              m.levelStatus === 'Developing' ? 'En Progreso' :
              m.levelStatus === 'Novice' ? 'Iniciante' : 'Bloqueado';

            const statusColor =
              m.levelStatus === 'Mastered'
                ? 'text-emerald-300 border-emerald-400 bg-emerald-950/30'
                : m.levelStatus === 'Advanced'
                ? 'text-cyan-300 border-cyan-400 bg-cyan-950/30'
                : m.levelStatus === 'Developing'
                ? 'text-amber-300 border-amber-400 bg-amber-950/30'
                : 'text-slate-400 border-slate-700 bg-slate-800/40';

            return (
              <div
                key={m.skillId}
                className="rounded-2xl border-2 border-slate-800 bg-slate-950/70 p-4 transition-all hover:border-slate-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-white">
                    {m.name}
                  </span>
                  <span className={`rounded-lg px-2 py-0.5 font-mono text-[10px] font-black uppercase border ${statusColor}`}>
                    {statusLabel}
                  </span>
                </div>

                <div className="flex justify-between font-mono text-xs text-slate-400 mb-1 font-bold">
                  <span>Progreso</span>
                  <span className="text-slate-200">{m.percentage}%</span>
                </div>

                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
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
      <div className="rounded-3xl border-2 border-slate-700/80 bg-slate-900/90 p-6 shadow-xl">
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-4">
          <div>
            <span className="font-mono text-xs font-black uppercase tracking-wider text-amber-400">
              SALA DE TROFEOS
            </span>
            <h2 className="text-lg font-black text-white">
              Insignias Desbloqueadas ({unlockedCount} / {achievements.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((ach) => {
            const isUnlocked = Boolean(ach.unlockedAt);
            return (
              <div
                key={ach.id}
                className={`flex flex-col items-center justify-between rounded-2xl border-2 p-4 text-center transition-all ${
                  isUnlocked
                    ? 'border-amber-400 bg-amber-400/10 text-amber-200 shadow-md'
                    : 'border-slate-800 bg-slate-950/40 opacity-40'
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 mb-2 ${
                  isUnlocked
                    ? 'border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'border-slate-700 bg-slate-800 text-slate-500'
                }`}>
                  <Trophy className="h-6 w-6" />
                </div>

                <div>
                  <h4 className="font-black text-xs text-white">
                    {ach.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-300 leading-snug font-medium">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 w-full">
                  <span className={`font-mono text-[10px] font-black uppercase ${
                    isUnlocked ? 'text-emerald-300' : 'text-slate-500'
                  }`}>
                    {isUnlocked ? '✓ DESBLOQUEADO' : 'BLOQUEADO'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Developer / Reset Testing Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border-2 border-red-500/30 bg-red-950/20 p-4">
        <div>
          <span className="text-xs font-bold text-red-200 block">
            Reiniciar Progreso de Partida
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Restablece los 100 niveles, monedas, estrellas y logros para recomenzar tu aventura desde cero.
          </span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 rounded-xl border border-red-500 bg-red-600 px-4 py-2 text-xs font-black text-white hover:bg-red-500 transition-all shadow-md active:scale-95"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reiniciar Partida</span>
        </button>
      </div>

    </div>
  );
};
