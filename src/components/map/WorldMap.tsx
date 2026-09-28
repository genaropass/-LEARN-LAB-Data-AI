'use client';

import React, { useState, useMemo } from 'react';
import { useGameState } from '@/context/GameStateContext';
import { ALL_100_LEVELS, GAME_WORLDS, GameLevel } from '@/content/data-ai/sql/levels';
import { LevelGameLab } from '../learning/LevelGameLab';
import { PowerUpShopModal } from '../gamification/PowerUpShopModal';
import { 
  Star, 
  Lock, 
  Check, 
  Coins, 
  ShoppingBag, 
  Trophy, 
  Compass, 
  ChevronRight, 
  Flame, 
  Castle, 
  Sparkles,
  Play
} from 'lucide-react';
import { sfx } from '@/lib/audio/sfx';

export const WorldMap: React.FC = () => {
  const { 
    profile, 
    completedLevels, 
    unlockedLevelMax, 
    stars, 
    selectedWorldNumber, 
    setSelectedWorldNumber 
  } = useGameState();

  const [activeLevel, setActiveLevel] = useState<GameLevel | null>(null);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const currentWorld = useMemo(() => {
    return GAME_WORLDS.find(w => w.number === selectedWorldNumber) || GAME_WORLDS[0];
  }, [selectedWorldNumber]);

  const worldLevels = useMemo(() => {
    return ALL_100_LEVELS.filter(l => l.worldNumber === selectedWorldNumber);
  }, [selectedWorldNumber]);

  // Total Stars
  const totalStarsEarned = useMemo(() => {
    return Object.values(stars).reduce((acc, curr) => acc + curr, 0);
  }, [stars]);

  const handleLevelClick = (level: GameLevel) => {
    if (level.levelNumber > unlockedLevelMax) {
      sfx.playError();
      return;
    }
    sfx.playClick();
    setActiveLevel(level);
  };

  const handleNextLevel = () => {
    if (!activeLevel) return;
    const nextNum = activeLevel.levelNumber + 1;
    const nextLvl = ALL_100_LEVELS.find(l => l.levelNumber === nextNum);
    if (nextLvl) {
      // Check if world change is needed
      if (nextLvl.worldNumber !== selectedWorldNumber) {
        setSelectedWorldNumber(nextLvl.worldNumber);
      }
      setActiveLevel(nextLvl);
    } else {
      setActiveLevel(null);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#080C14] text-slate-100 overflow-x-hidden pb-32">
      
      {/* Top Mario HUD Bar */}
      <div className="sticky top-16 z-30 border-b-4 border-slate-800 bg-[#0B101D]/95 backdrop-blur-md px-4 py-3 shadow-xl">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* World Selector Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {GAME_WORLDS.map((world) => {
              const isSelected = world.number === selectedWorldNumber;
              const isUnlocked = unlockedLevelMax >= world.levelsRange[0];

              return (
                <button
                  key={world.number}
                  onClick={() => {
                    sfx.playClick();
                    setSelectedWorldNumber(world.number);
                  }}
                  className={`flex items-center space-x-2 rounded-2xl px-3.5 py-2 font-black text-xs transition-all whitespace-nowrap border-2 shadow-sm ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500 text-slate-950 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : isUnlocked
                      ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                      : 'border-slate-800/80 bg-slate-950 text-slate-600 opacity-60'
                  }`}
                >
                  <span>WORLD {world.number}</span>
                  {!isUnlocked && <Lock className="h-3 w-3" />}
                </button>
              );
            })}
          </div>

          {/* Right Game Metrics: Stars, Coins, Shop */}
          <div className="flex items-center space-x-3">
            {/* Stars Counter */}
            <div className="flex items-center space-x-1.5 rounded-2xl border-2 border-amber-400/40 bg-amber-500/10 px-3 py-1 font-mono text-xs font-black text-amber-300">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{totalStarsEarned}</span>
              <span className="text-[10px] text-amber-500 font-sans">/ 300</span>
            </div>

            {/* Coins Counter */}
            <div 
              onClick={() => setIsShopOpen(true)}
              className="cursor-pointer flex items-center space-x-1.5 rounded-2xl border-2 border-yellow-400/40 bg-yellow-500/10 px-3 py-1 font-mono text-xs font-black text-yellow-300 hover:border-yellow-400 transition-all"
            >
              <Coins className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span>{profile.coins}</span>
              <span className="text-[10px] text-yellow-500 font-sans">COINS</span>
            </div>

            {/* Shop Button */}
            <button
              onClick={() => setIsShopOpen(true)}
              className="flex items-center space-x-1.5 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-400 to-amber-500 px-3.5 py-1.5 text-xs font-black text-slate-950 hover:from-amber-300 hover:to-amber-400 shadow-md active:scale-95 transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">ITEM SHOP</span>
            </button>
          </div>

        </div>
      </div>

      {/* World Board Container with Thematic Background Art */}
      <div className="mx-auto max-w-4xl px-3 sm:px-6 pt-6">
        
        {/* World Header Card */}
        <div className="relative mb-6 overflow-hidden rounded-3xl border-4 border-slate-800 bg-[#0E1526] p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-amber-400">
                WORLD {currentWorld.number} • {currentWorld.biome.toUpperCase()} BIOME
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentWorld.name}
              </h1>
              <p className="mt-1 text-xs text-slate-300">
                {currentWorld.subtitle} (Levels {currentWorld.levelsRange[0]}–{currentWorld.levelsRange[1]})
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="rounded-2xl border-2 border-slate-700 bg-slate-900/80 px-4 py-2 font-mono text-xs text-slate-300 text-center">
                <span className="block text-[10px] text-slate-500 uppercase">Progress</span>
                <span className="font-black text-amber-400 text-sm">
                  {completedLevels.size} / 100 Cleared
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MARIO ADVENTURE BOARD with Real Background Landscape! */}
        <div className="relative w-full rounded-3xl border-4 border-slate-800 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          {/* Background Map Art Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none transition-all duration-700"
            style={{ backgroundImage: `url(${currentWorld.bgImage})` }}
          />
          {/* Dark Overlay Tint for contrast */}
          <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />

          {/* Stepping-Stone Road Canvas */}
          <div className="relative w-full h-[1800px]">
            
            {/* SVG Stepping Cobblestone Path connecting all 20 levels in the world */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {worldLevels.map((lvl, idx) => {
                if (idx === worldLevels.length - 1) return null;
                const nextLvl = worldLevels[idx + 1];
                const x1 = lvl.position.x;
                const y1 = lvl.position.y;
                const x2 = nextLvl.position.x;
                const y2 = nextLvl.position.y;
                const midY = (y1 + y2) / 2;
                const pathData = `M ${x1}% ${y1}% C ${x1}% ${midY}%, ${x2}% ${midY}%, ${x2}% ${y2}%`;

                const isCompleted = completedLevels.has(lvl.levelNumber) && completedLevels.has(nextLvl.levelNumber);
                const isUnlocked = completedLevels.has(lvl.levelNumber) || lvl.levelNumber < unlockedLevelMax;

                return (
                  <g key={lvl.levelNumber}>
                    {/* Shadow road */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#000000"
                      strokeWidth="14"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                    />
                    {/* Cobblestone path */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isCompleted ? '#10B981' : isUnlocked ? '#F59E0B' : '#475569'}
                      strokeWidth="8"
                      strokeDasharray="6,6"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Stepping-Stone Nodes */}
            {worldLevels.map((lvl) => {
              const isCompleted = completedLevels.has(lvl.levelNumber);
              const isCurrent = lvl.levelNumber === unlockedLevelMax;
              const isLocked = lvl.levelNumber > unlockedLevelMax;
              const starCount = stars[lvl.levelNumber] || 0;

              return (
                <div
                  key={lvl.levelNumber}
                  onClick={() => handleLevelClick(lvl)}
                  style={{ left: `${lvl.position.x}%`, top: `${lvl.position.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isLocked
                      ? 'cursor-not-allowed opacity-60'
                      : 'cursor-pointer hover:scale-125 active:scale-95 z-20'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    
                    {/* Current Player Token (Mario Character Pin) */}
                    {isCurrent && (
                      <div className="absolute -top-10 flex flex-col items-center animate-bounce z-30">
                        <div className="rounded-full bg-red-600 border-2 border-white px-2 py-0.5 text-[9px] font-black text-white uppercase shadow-lg">
                          YOU
                        </div>
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-red-600" />
                      </div>
                    )}

                    {/* Stepping Stone Disk */}
                    <div
                      className={`relative flex items-center justify-center transition-all ${
                        lvl.type === 'boss_fortress'
                          ? 'h-18 w-18 rounded-3xl border-4'
                          : lvl.type === 'mystery_block'
                          ? 'h-14 w-14 rounded-2xl border-3 rotate-6'
                          : 'h-14 w-14 rounded-full border-4'
                      } ${
                        isCompleted
                          ? 'border-emerald-400 bg-emerald-600 text-white shadow-[0_6px_0_#065F46,0_10px_20px_rgba(16,185,129,0.5)]'
                          : isCurrent
                          ? 'border-amber-300 bg-amber-500 text-slate-950 shadow-[0_6px_0_#B45309,0_10px_25px_rgba(245,158,11,0.6)] animate-pulse'
                          : 'border-slate-700 bg-slate-800 text-slate-500 shadow-[0_4px_0_#1E293B]'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-7 w-7 stroke-[3]" />
                      ) : isLocked ? (
                        <Lock className="h-5 w-5" />
                      ) : lvl.type === 'boss_fortress' ? (
                        <Castle className="h-8 w-8 text-red-950" />
                      ) : lvl.type === 'mystery_block' ? (
                        <span className="font-mono text-xl font-black text-slate-950">?</span>
                      ) : (
                        <span className="font-mono text-lg font-black">{lvl.levelNumber}</span>
                      )}
                    </div>

                    {/* Stars Earned Under Stone */}
                    {isCompleted && (
                      <div className="mt-1 flex items-center space-x-0.5">
                        {[1, 2, 3].map(st => (
                          <Star
                            key={st}
                            className={`h-3 w-3 ${
                              st <= starCount
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Level Name Capsule */}
                    <div className="mt-1 max-w-[120px] text-center pointer-events-none">
                      <span className={`inline-block truncate rounded-lg px-2 py-0.5 font-bold text-[9px] border backdrop-blur-md ${
                        isCompleted
                          ? 'border-emerald-500/40 bg-emerald-950/80 text-emerald-200'
                          : isCurrent
                          ? 'border-amber-400 bg-amber-950/90 text-amber-300 font-black'
                          : 'border-slate-800 bg-slate-950/80 text-slate-500'
                      }`}>
                        {lvl.title}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* Active Level Player */}
      {activeLevel && (
        <LevelGameLab
          level={activeLevel}
          onClose={() => setActiveLevel(null)}
          onNextLevel={handleNextLevel}
        />
      )}

      {/* Item & Help Shop Modal */}
      {isShopOpen && (
        <PowerUpShopModal onClose={() => setIsShopOpen(false)} />
      )}

    </div>
  );
};
